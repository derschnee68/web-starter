import type { NextPage } from 'next';
import { CircularProgress, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useActivateAccountMutation } from '../../graphql/operations/activateAccount.generated';
import { useRouter } from 'next/router';
import CenterLayout from '../../components/layout/CenterLayout';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

const ActivatePage: NextPage = () => {
  const { token } = useRouter().query;
  const [activate, { called, data }] = useActivateAccountMutation();

  useEffect(() => {
    if (typeof token === 'string' && !called) {
      void activate({ variables: { token } });
    }
  }, [activate, called, token]);

  return data ? (
    <CenterLayout>
      <Paper sx={{ p: 2 }}>
        <Typography component="h1" variant="h5" align="center">
          Activation of your account
        </Typography>

        {data.activateAccount ? (
          <Typography align="center" paddingTop={4}>
            Your account was successfully activated.
            <LoadingButton fullWidth={true} variant="contained" sx={{ mt: 2, mb: 1 }} href="/auth/login">
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
      </Paper>
    </CenterLayout>
  ) : (
    <CircularProgress />
  );
};

export default ActivatePage;
