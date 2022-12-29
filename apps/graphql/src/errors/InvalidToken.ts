import BaseError from './BaseError';

export default class InvalidToken extends BaseError {
  constructor() {
    super('Invalid token', 'INVALID_TOKEN');
    Object.defineProperty(this, 'name', { value: 'InvalidToken' });
  }

  get shouldReport(): boolean {
    return false;
  }
}
