import { createHash, randomBytes } from 'node:crypto';

const PREFIX = '{SSHA}';

/**
 * Hash a password using the SSHA (salted sha1).
 * @param {string} clear The clear password.
 * @param {number=20} saltLength The length of the generated salt.
 * @return {string}
 */
export function hash(clear: string, saltLength = 20): string {
  const salt = randomBytes(saltLength);
  const hash = Buffer.concat([
    createHash('sha1')
      .update(Buffer.concat([Buffer.from(clear), salt]))
      .digest(),
    salt,
  ]);

  return `${PREFIX}${hash.toString('base64')}`;
}

export function compare(clear: string, hashed: string, saltLength = 20): boolean {
  const salt = Buffer.from(hashed.replace('{SSHA}', ''), 'base64').slice(saltLength);
  const hash = Buffer.concat([
    createHash('sha1')
      .update(Buffer.concat([Buffer.from(clear), salt]))
      .digest(),
    salt,
  ]);

  return hashed === `${PREFIX}${hash.toString('base64')}`;
}
