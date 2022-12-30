import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import CenterLayout from '../../components/layout/CenterLayout';
import onError from '../../graphql/onError';
import { useLoginMutation } from '../../graphql/operations/login.generated';
import useJwt from '../../lib/auth/useJwt';
import TextField from '../../lib/forms/TextField';
import { useSendActivationMailMutation } from '../../graphql/operations/SendActivationMail.generated';
import { AlertTitle } from '@mui/lab';
import { Link, Paper } from '@mui/material';
import NextLink from 'next/link';

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
    <CenterLayout>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" component="h1" align="center" sx={{ mb: 6 }}>
          Welcome back!
        </Typography>

        {isFromSignUp && (
          <Alert severity="info">
            <AlertTitle>Please confirm your account to login</AlertTitle>A confirmation email has been sent to you. If
            you have not received any email after a few minutes, please check your spam folder.
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

        <form onSubmit={handleSubmit(onSubmit)} data-test="login--form">
          <TextField control={control} name="email" type="email" label="Email address" />
          <TextField control={control} name="password" type="password" label="Password" />

          <LoadingButton type="submit" fullWidth={true} sx={{ mt: 2, mb: 1 }} loading={loading}>
            Login
          </LoadingButton>
        </form>

        <Typography variant="caption" paragraph={true} sx={{ m: 0 }} align="center">
          No account yet? <Link href="/auth/signup">Sign up</Link>
        </Typography>
        <Typography variant="caption" paragraph={true} sx={{ m: 0 }} align="center">
          <Link href="/auth/forgot" data-test="login--forgotPassword">
            Forgot your password?
          </Link>
        </Typography>
      </Paper>
    </CenterLayout>
  );
};

export default LoginPage;
