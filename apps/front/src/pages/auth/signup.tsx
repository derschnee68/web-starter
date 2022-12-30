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
import onError from '../../graphql/onError';
import AuthLayout from '../../components/layout/AuthLayout';
import { IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignupData = z.infer<typeof SignupSchema>;

const SignupPage: NextPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, setError } = useForm<SignupData>({ resolver: zodResolver(SignupSchema) });
  const [signup, { loading }] = useSignupMutation({
    onCompleted: (data) => {
      if (data.register) {
        void router.push('/auth/login?from=signup');
      }
    },
    onError: onError({
      DUPLICATE_EMAIL: () => {
        setError('email', { message: 'An account with this email address already exists.' });
      },
    }),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<SignupData> = ({ email, password }) => {
    void toast.promise(
      signup({
        variables: { email, password },
      }),
      {
        success: 'Registration succeed, you may now login',
      },
    );
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
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          type="submit"
          fullWidth={true}
          sx={{ mt: 2, mb: 1 }}
          loading={loading}
          data-test="signup__button"
        >
          Sign up
        </LoadingButton>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
