import BaseError from './BaseError';

export default class NotFound extends BaseError {
  constructor(message: string) {
    super(message, 'NOT_FOUND');
    Object.defineProperty(this, 'name', { value: 'NotFound' });
  }

  get shouldReport(): boolean {
    return false;
  }
}
