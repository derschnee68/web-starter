export function isBrowser() {
  return typeof window === 'object';
}

export function isServer() {
  return typeof window === 'undefined';
}
