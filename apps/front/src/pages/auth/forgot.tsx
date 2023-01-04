import type { NextPage } from 'next';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TextField from '../../lib/forms/TextField';
import { useForgotPasswordMutation } from '../../graphql/operations/forgotPassword.generated';
import AuthLayout from '../../components/layout/AuthLayout';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ResetPasswordData = z.infer<typeof ForgotPasswordSchema>;

/**
 * /reset page.
 * @description Allows the user to reset his/her password.
 */
const ForgotPasswordPage: NextPage = () => {
  const [isReset, setIsReset] = useState(false);
  const { control, handleSubmit } = useForm<ResetPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const [forgotPassword, { loading }] = useForgotPasswordMutation({
    onCompleted: () => setIsReset(true),
  });

  const onSubmit: SubmitHandler<ResetPasswordData> = (data) => {
    void forgotPassword({ variables: { ...data } });
  };

  return (
    <AuthLayout title="Reset your password">
      {isReset ? (
        <Typography align="center" sx={{ mb: 2 }}>
          An email with a reset link has been sent to this address.
        </Typography>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }} data-test="reset--form">
          <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
            Enter the email address associated with your account and we will send you a link to reset your password.
          </Typography>
          <TextField control={control} label="Email" name="email" type="email" />
          <LoadingButton loading={loading} fullWidth={true} sx={{ mt: 3, mb: 2 }} type="submit">
            Continue
          </LoadingButton>
        </Box>
      )}

      <Link href="/auth/login" variant="body2">
        Return to sign in
      </Link>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
