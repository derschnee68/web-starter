import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import AuthLayout from '../../components/layout/AuthLayout';

const VerifyEmailPage: NextPage = () => {
  const router = useRouter();

  return (
    <AuthLayout title="Your email was successfully verified">
      <Button
        fullWidth={true}
        onClick={() => void router.push('/auth/login', undefined, { shallow: true })}
        sx={{ mt: 2, mb: 1 }}
      >
        Go to login
      </Button>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
