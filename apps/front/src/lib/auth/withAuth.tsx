import { useRouter } from 'next/router';
import type { ComponentType, FC } from 'react';
import { useEffect, useState } from 'react';
import useJwt from './useJwt';
import useUser from '../hooks/useUser';
import { CircularProgress, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function withAuth<P>(Component: ComponentType<P>): FC<P> {
  const WithAuth: FC<P> = (props) => {
    const router = useRouter();
    const { jwt } = useJwt();
    const { user, loadingUser } = useUser();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      if (!jwt || (!loadingUser && !user)) {
        void router.replace({
          pathname: '/auth/login',
          query: {
            next: router.pathname,
          },
        });
      } else if (!loadingUser && user) {
        setHasMounted(true);
      }
    }, [router, loadingUser, user, jwt]);

    if (!hasMounted)
      return (
        <Stack alignItems="center" justifyContent="center" width="100vw" height="100vh">
          <Stack alignItems="center">
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your content is loading...
            </Typography>
            <CircularProgress />
          </Stack>
        </Stack>
      );
    return <Component {...props} />;
  };

  WithAuth.displayName = Component.displayName = '_withAuth';

  return WithAuth;
}
