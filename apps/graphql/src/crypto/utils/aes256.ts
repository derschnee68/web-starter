import type { CipherKey } from 'node:crypto';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

/**
 * Encrypt a clear text using the AES-256 algorithm.
 * @param {string} clearText The clear text.
 * @param {CipherKey} key The encryption key.
 * @return {string} The encrypted text, base64-encoded.
 */
export function encrypt(clearText: string, key: CipherKey): string {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(clearText, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return iv.toString('base64') + '|' + encrypted;
}

/**
 * Decrypt a cipher text using the AES-256 algorithm.
 * @param {string} cipherText The encrypted text, base64-encoded.
 * @param {CipherKey} key The encryption key.
 * @return {string} The clear text.
 */
export function decrypt(cipherText: string, key: CipherKey): string {
  const [ivBase64, cipherTextBase64] = cipherText.split('|');

  const iv = Buffer.from(ivBase64, 'base64');
  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = decipher.update(cipherTextBase64, 'base64', 'utf8');

  return decrypted + decipher.final('utf8');
}
