import { useRouter } from 'next/router';
import useJwt from '../auth/useJwt';
import { useApolloClient } from '@apollo/client';

export default function useLogout() {
  const router = useRouter();
  const { clear } = useJwt();
  const client = useApolloClient();

  return () => {
    clear();
    void client.resetStore();
    return router.push('/auth/login');
  };
}
