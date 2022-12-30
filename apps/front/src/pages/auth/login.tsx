import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import onError from '../../graphql/onError';
import { useLoginMutation } from '../../graphql/operations/login.generated';
import useJwt from '../../lib/auth/useJwt';
import TextField from '../../lib/forms/TextField';
import { useSendActivationMailMutation } from '../../graphql/operations/SendActivationMail.generated';
import { AlertTitle } from '@mui/lab';
import { Link } from '@mui/material';
import AuthLayout from '../../components/layout/AuthLayout';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
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
      if (data.login.token) {
        write(data.login.token);
        let next = '/';

        if (typeof router.query.next === 'string') {
          next = router.query.next as string;
        }

        void router.push(next);
      }
    },
    onError: onError({
      INVALID_CREDENTIALS: () => setError('Invalid credentials'),
      UNVERIFIED_ACCOUNT: () => setError('Unverified account'),
    }),
  });

  const [resendActivationEmail] = useSendActivationMailMutation();

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    void login({ variables: data }).then(
      (v) => {
        console.warn(v);
        return v;
      },
      (e) => {
        console.warn(e);
        return e;
      },
    );
  };

  return (
    <AuthLayout title="Welcome back!">
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
        <TextField control={control} name="password" type="password" label="Password" />

        <LoadingButton type="submit" fullWidth={true} sx={{ mt: 3, mb: 2 }} loading={loading}>
          Login
        </LoadingButton>

        <Grid container>
          <Grid item xs>
            <Link href="/auth/forgot" variant="body2" data-test="login--forgotPassword">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/auth/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
