import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSignupMutation } from '../../graphql/operations/signup.generated';
import TextField from '../../lib/forms/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthLayout from '../../components/layout/AuthLayout';
import { Link } from '@mui/material';
import React from 'react';
import { passwordSchema } from '../../lib/auth/passwordSchema';
import Typography from '@mui/material/Typography';
import PasswordTextField from '../../lib/forms/PasswordTextField';

const SignupSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

type SignupData = z.infer<typeof SignupSchema>;

const SignupPage: NextPage = () => {
  const router = useRouter();
  const { control, handleSubmit, setError } = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
  });

  const [signup, { loading }] = useSignupMutation({
    onCompleted: (data) => {
      switch (data.signUp.__typename) {
        case 'DuplicateEmailProblem':
          return void setError('email', { message: 'An account with this email address already exists.' });
        case 'Success':
          toast.success('Registration succeed, you may now login');
          return void router.push('/auth/login?from=signup');
      }
    },
  });

  const onSubmit: SubmitHandler<SignupData> = ({ email, password }) => {
    void signup({
      variables: { email, password },
    });
  };

  return (
    <AuthLayout title="Create your account">
      <form onSubmit={handleSubmit(onSubmit)} data-test="signup--form">
        <TextField control={control} name="email" type="email" label="Email address" />
        <PasswordTextField control={control} />
        <LoadingButton
          type="submit"
          fullWidth={true}
          sx={{ mt: 3, mb: 2 }}
          loading={loading}
          data-test="signup__button"
        >
          Create account
        </LoadingButton>
      </form>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Have an account ? <Link href="/auth/login">Sign in</Link>
      </Typography>
    </AuthLayout>
  );
};

export default SignupPage;
