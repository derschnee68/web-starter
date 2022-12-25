import type { NextPage } from 'next';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import CenterLayout from '../../components/layout/CenterLayout';
import TextField from '../../lib/forms/TextField';
import { useForgotPasswordMutation } from '../../graphql/operations/forgotPassword.generated';
import { Paper } from '@mui/material';

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
    <CenterLayout>
      <Paper>
        <Typography component="h1" variant="h5" align="center">
          Reset your password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} data-test="reset--form">
          <TextField control={control} label="Email" name="email" type="email" />
          <LoadingButton loading={loading} fullWidth={true} variant="contained" sx={{ mt: 2, mb: 1 }} type="submit">
            Reset password
          </LoadingButton>
        </form>

        {isReset && <Typography align="center">An email with a reset link has been sent to this address.</Typography>}
      </Paper>
    </CenterLayout>
  );
};

export default ResetPage;
