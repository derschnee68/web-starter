import BaseError from './BaseError';

export default class InvalidCredentials extends BaseError {
  constructor() {
    super('Invalid credentials', 'INVALID_CREDENTIALS');
    Object.defineProperty(this, 'name', { value: 'InvalidCredentials' });
  }

  get shouldReport(): boolean {
    return false;
  }
}
