import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import { useLoginMutation } from '../../graphql/operations/login.generated';
import useJwt from '../../lib/auth/useJwt';
import TextField from '../../lib/forms/TextField';
import { useSendActivationMailMutation } from '../../graphql/operations/SendActivationMail.generated';
import { AlertTitle } from '@mui/lab';
import { Link } from '@mui/material';
import AuthLayout from '../../components/layout/AuthLayout';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PasswordTextField from '../../lib/forms/PasswordTextField';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginData = z.infer<typeof LoginSchema>;

const LoginPage: NextPage = () => {
  const router = useRouter();
  const isFromSignUp = router.query?.from === 'signup';
  const [error, setError] = useState<string>();
  const { write } = useJwt();
  const { control, handleSubmit, getValues } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const [login, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      switch (data.login.__typename) {
        case 'InvalidCredentialsProblem':
          return void setError('The email and password combination is invalid.');
        case 'UnverifiedAccountProblem':
          return void setError('This account is not verified, please check your email.');
        case 'LoginSuccess': {
          write(data.login.token);
          let next = '/';

          if (typeof router.query.next === 'string') {
            next = router.query.next as string;
          }

          void router.push(next);
          return;
        }
      }
    },
  });

  const [resendActivationEmail] = useSendActivationMailMutation();

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    setError(undefined);
    void login({ variables: data });
  };

  return (
    <AuthLayout title="Sign in to your account">
      {isFromSignUp && (
        <Alert severity="info">
          <AlertTitle>Please confirm your account to login</AlertTitle>A confirmation email has been sent to you. If you
          have not received any email after a few minutes, please check your spam folder.
        </Alert>
      )}

      {error && (
        <Alert severity="error" data-test="login--error">
          {error}
          {error === 'Unverified account' && (
            <span
              className="underline cursor-pointer"
              onClick={() => {
                void resendActivationEmail({ variables: { email: getValues('email') } });
              }}
            ></span>
          )}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} data-test="login--form" sx={{ width: '100%' }}>
        <TextField control={control} name="email" type="email" label="Email address" />
        <PasswordTextField control={control} />

        <LoadingButton type="submit" fullWidth={true} sx={{ mt: 3, mb: 2 }} loading={loading}>
          Continue
        </LoadingButton>

        <Grid container>
          <Grid item xs>
            <Link href="/auth/forgot" variant="body2" data-test="login--forgotPassword">
              Forgot your password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/auth/signup" variant="body2">
              Don&apos;t have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
