import type { NextPage } from 'next';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TextField from '../../lib/forms/TextField';
import { useForgotPasswordMutation } from '../../graphql/operations/forgotPassword.generated';
import AuthLayout from '../../components/layout/AuthLayout';
import Box from '@mui/material/Box';

const ResetPasswordSchema = z.object({
  email: z.string().nonempty().email(),
});

type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

/**
 * /reset page.
 * @description Allows the user to reset his/her password.
 */
const ResetPage: NextPage = () => {
  const [isReset, setIsReset] = useState(false);
  const { control, handleSubmit } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const [forgotPassword, { loading }] = useForgotPasswordMutation({
    onCompleted: () => setIsReset(true),
  });

  const onSubmit: SubmitHandler<ResetPasswordData> = (data) => {
    void forgotPassword({ variables: { ...data } });
  };

  return (
    <AuthLayout title="Forgot your password ?">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }} data-test="reset--form">
        <TextField control={control} label="Email" name="email" type="email" />
        <LoadingButton loading={loading} fullWidth={true} sx={{ mt: 2, mb: 1 }} type="submit">
          Reset password
        </LoadingButton>
      </Box>

      {isReset && <Typography align="center">An email with a reset link has been sent to this address.</Typography>}
    </AuthLayout>
  );
};

export default ResetPage;
