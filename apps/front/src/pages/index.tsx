import CenterLayout from '../components/layout/CenterLayout';
import useUser from '../lib/hooks/useUser';
import Button from '@mui/material/Button';
import useLogout from '../lib/hooks/useLogout';

export default function Web() {
  const { user } = useUser();
  const logout = useLogout();

  return (
    <CenterLayout>
      You are logged as : {user?.email}
      <Button onClick={logout}>Logout</Button>
    </CenterLayout>
  );
}
