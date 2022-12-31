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
import { IconButton, InputAdornment, Link, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { passwordSchema } from '../../lib/auth/passwordSchema';

const SignupSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

type SignupData = z.infer<typeof SignupSchema>;

const SignupPage: NextPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, setError } = useForm<SignupData>({ resolver: zodResolver(SignupSchema) });
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
    signup({
      variables: { email, password },
    });
  };

  return (
    <AuthLayout title="Sign up">
      <form onSubmit={handleSubmit(onSubmit)} data-test="signup--form">
        <TextField control={control} name="email" type="email" label="Email address" />

        <TextField
          control={control}
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={showPassword ? 'Hide password' : 'Show password'}>
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          type="submit"
          fullWidth={true}
          sx={{ mt: 3, mb: 2 }}
          loading={loading}
          data-test="signup__button"
        >
          Sign up
        </LoadingButton>
      </form>

      <Link href="/auth/login" variant="body2" sx={{ alignSelf: 'start' }}>
        Back to login page
      </Link>
    </AuthLayout>
  );
};

export default SignupPage;
