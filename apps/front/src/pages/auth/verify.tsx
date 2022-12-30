import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CenterLayout from '../../components/layout/CenterLayout';
import { Paper } from '@mui/material';

const VerifyEmailPage: NextPage = () => {
  const router = useRouter();

  return (
    <CenterLayout>
      <Paper sx={{ p: 2 }}>
        <Typography component="h1" variant="h5" align="center">
          Your email was successfully verified
        </Typography>

        <Button
          fullWidth={true}
          onClick={() => void router.push('/auth/login', undefined, { shallow: true })}
          sx={{ mt: 2, mb: 1 }}
        >
          Go to login
        </Button>
      </Paper>
    </CenterLayout>
  );
};

export default VerifyEmailPage;
