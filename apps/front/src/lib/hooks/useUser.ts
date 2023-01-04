import { useReadUserQuery } from '../../graphql/operations/readUser.generated';

export default function useUser() {
  const { data, loading, refetch } = useReadUserQuery();
  return { user: data?.me, loadingUser: loading, refetchUser: refetch };
}
