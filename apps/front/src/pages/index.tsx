import CenterLayout from '../components/layout/CenterLayout';
import useUser from '../lib/hooks/useUser';
import Button from '@mui/material/Button';
import useLogout from '../lib/hooks/useLogout';
import type { NextPage } from 'next';
import withAuth from '../lib/auth/withAuth';

const Web: NextPage = () => {
  const { user } = useUser();
  const logout = useLogout();

  return (
    <CenterLayout>
      You are logged as : {user?.email}
      <Button onClick={logout}>Logout</Button>
    </CenterLayout>
  );
};
export default withAuth(Web);
