export default function isJwtValid(jwt: unknown): boolean {
  if (typeof jwt !== 'string') {
    return false;
  }

  const parts = jwt.split('.');

  if (parts.length !== 3) {
    return false;
  }
  let payload: unknown;

  try {
    payload = JSON.parse(atob(parts[1]));
  } catch (_) {
    return false;
  }

  if (typeof payload === 'object' && payload !== null && 'exp' in payload) {
    const exp = parseInt((payload as { exp: string | number }).exp.toString());

    return exp > Math.floor(new Date().getTime() / 1000);
  }

  return true;
}
