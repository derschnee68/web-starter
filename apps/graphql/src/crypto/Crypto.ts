import { scrypt } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import Config from '../config/Config';
import { decrypt, encrypt } from './utils/aes256';

/**
 * Cryptographic service which uses the APP_SECRET config entry as master key.
 */
@Injectable()
export default class Crypto {
  constructor(private readonly config: Config) {}

  /**
   * Derive a key from a salt using the {@see scrypt} function.
   * This function is deterministic, (e.g. same salt => same key).
   * The master key is read from the APP_SECRET config entry.
   * @param {string} salt The salt to use for the key derivation.
   * @return {Promise<Buffer>} The derived key.
   */
  deriveKey(salt: string): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      scrypt(this.config.get<string>('APP_SECRET'), salt, 32, (err, derivedKey) => {
        err ? reject(err) : resolve(derivedKey);
      });
    });
  }

  /**
   * Encrypt a clear text by referencing a salt.
   * The key is generated on-the-fly using {@see deriveKey}.
   * @param {string} clearText
   * @param {string} salt
   * @return {Promise<string>}
   */
  async encrypt(clearText: string, salt: string) {
    return encrypt(clearText, await this.deriveKey(salt));
  }

  /**
   * Decrypt a clear text by referencing a salt.
   * The key is generated on-the-fly using {@see deriveKey}.
   * @param {string} cipherText The encrypted text, base64-encoded.
   * @param {string} salt The salt to use for the key derivation.
   * @return {Promise<string>} The clear text.
   */
  async decrypt(cipherText: string, salt: string) {
    return decrypt(cipherText, await this.deriveKey(salt));
  }
}
