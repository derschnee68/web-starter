import { Command } from 'commander';
import { generateKeyPairSync } from 'node:crypto';

function exportVar(name: string, value: string | Buffer) {
  const printable = value.toString('utf-8').replace(/\n/g, '\\n');
  process.stdout.write(`${name}="${printable}"\n`);
}

const jwt = new Command('jwt');
jwt.description('Generate keypair for JWT signatures');
jwt.action(() => {
  const { privateKey, publicKey } = generateKeyPairSync('ec', {
    namedCurve: 'P-521',
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'sec1',
      format: 'pem',
    },
  });

  exportVar('JWT_PRIVATE_KEY', privateKey);
  exportVar('JWT_PUBLIC_KEY', publicKey);
});

export default jwt;
