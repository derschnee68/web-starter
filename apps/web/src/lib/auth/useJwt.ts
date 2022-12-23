import { useEffect } from 'react';
import { deleteFromStorage, useLocalStorage } from '@rehooks/local-storage';
import isJwtValid from './isJwtValid';

export const JWT_KEY = 'access_token';

export default function useJwt() {
  const [jwt, setJwt] = useLocalStorage(JWT_KEY);

  const clear = () => deleteFromStorage(JWT_KEY);

  useEffect(() => {
    if (jwt && !isJwtValid(jwt)) {
      deleteFromStorage(JWT_KEY);
    }
  }, [jwt]);

  return { jwt, write: setJwt, clear };
}
