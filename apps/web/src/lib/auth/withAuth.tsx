import { useRouter } from 'next/router';
import type { ComponentType, FC } from 'react';
import { useEffect, useState } from 'react';
import useJwt from './useJwt';

export default function withAuth<P>(Component: ComponentType<P>): FC<P> {
  const WithAuth: FC<P> = (props) => {
    const router = useRouter();
    const [hasMounted, setHasMounted] = useState(false);
    const { jwt } = useJwt();

    useEffect(() => {
      setHasMounted(true);
    }, []);

    useEffect(() => {
      if (!jwt) {
        void router.replace({
          pathname: '/auth/login',
          query: {
            next: router.pathname,
          },
        });
      }
    }, [jwt, router]);

    if (!hasMounted) {
      return null;
    }

    return <Component {...props} />;
  };

  WithAuth.displayName = Component.displayName = '_withAuth';

  return WithAuth;
}
