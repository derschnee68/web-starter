interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export default function decodeJWT(token: string): JwtPayload {
  try {
    return JSON.parse(atob(token.split('.')[1])) as JwtPayload;
  } catch (e) {
    throw new Error('Invalid JWT token');
  }
}
