import BaseError from './BaseError';

export default class UnverifiedAccount extends BaseError {
  constructor() {
    super('Unverified account', 'UNVERIFIED_ACCOUNT');
    Object.defineProperty(this, 'name', { value: 'UnverifiedAccount' });
  }

  get shouldReport(): boolean {
    return false;
  }
}
