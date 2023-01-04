import useUser from '../lib/hooks/useUser';
import Button from '@mui/material/Button';
import useLogout from '../lib/hooks/useLogout';
import type { NextPage } from 'next';
import withAuth from '../lib/auth/withAuth';
import MainLayout from '../components/layout/MainLayout';
import Typography from '@mui/material/Typography';

const Web: NextPage = () => {
  const { user } = useUser();
  const logout = useLogout();

  return (
    <MainLayout title="Dashboard">
      <Typography variant="h2">Dashboard</Typography>
      You are logged in as : {user?.email}
      <Button onClick={logout}>Logout</Button>
    </MainLayout>
  );
};
export default withAuth(Web);
