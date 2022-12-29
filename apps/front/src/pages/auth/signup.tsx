import pick from 'lodash/pick';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import CenterLayout from '../../components/layout/CenterLayout';
import { useSignupMutation } from '../../graphql/operations/signup.generated';
import TextField from '../../lib/forms/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import onError from '../../graphql/onError';
import { Paper } from '@mui/material';

const SignupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['password'],
  });

type SignupData = z.infer<typeof SignupSchema>;

const SignupPage: NextPage = () => {
  const router = useRouter();
  const { control, handleSubmit, setError } = useForm<SignupData>({ resolver: zodResolver(SignupSchema) });
  const [signup, { loading }] = useSignupMutation({
    onCompleted: (data) => {
      if (data.register) {
        void router.push('/auth/login?from=signup');
      }
    },
    onError: onError({
      DUPLICATE_EMAIL: () => {
        setError('email', { message: 'An account with this email address already exists' });
      },
    }),
  });

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    void toast.promise(
      signup({
        variables: pick(data, ['email', 'password']),
      }),
      {
        success: 'Registration succeed, you may now login',
      },
    );
  };

  return (
    <CenterLayout>
      <Paper sx={{ p: 2 }}>
        <Typography component="h1" variant="h5" align="center">
          Signup to iSquare
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} data-test="signup--form">
          <TextField control={control} name="email" type="email" label="Email address" />
          <TextField control={control} name="password" type="password" label="Password" />
          <TextField control={control} name="passwordConfirmation" type="password" label="Password confirmation" />

          <LoadingButton
            type="submit"
            fullWidth={true}
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
            loading={loading}
            data-test="signup__button"
          >
            Sign up
          </LoadingButton>
        </form>
      </Paper>
    </CenterLayout>
  );
};

export default SignupPage;
