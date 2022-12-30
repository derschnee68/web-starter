import type { NextPage } from 'next';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useActivateAccountMutation } from '../../graphql/operations/activateAccount.generated';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import AuthLayout from '../../components/layout/AuthLayout';

const ActivatePage: NextPage = () => {
  const { token } = useRouter().query;
  const [activate, { called, data }] = useActivateAccountMutation();

  useEffect(() => {
    if (typeof token === 'string' && !called) {
      void activate({ variables: { token } });
    }
  }, [activate, called, token]);

  return data ? (
    <AuthLayout title="Activate your account">
      {data.activateAccount ? (
        <Typography align="center" paddingTop={4}>
          Your account was successfully activated.
          <LoadingButton fullWidth={true} sx={{ mt: 2, mb: 1 }} href="/auth/login">
            Log-in
          </LoadingButton>
        </Typography>
      ) : (
        <>
          There was a problem with the activation of your account: your link is too old. To receive a new activation
          link:
          <ul>
            <li>Go to the login page.</li>
            <li>Try to login with the same email.</li>
            <li>The option to resent an activation email will be offered.</li>
          </ul>
          Go to the <Button href="/auth/login">Log-in</Button> page.
        </>
      )}
    </AuthLayout>
  ) : (
    <CircularProgress />
  );
};

export default ActivatePage;
