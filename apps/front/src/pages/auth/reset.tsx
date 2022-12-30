import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TextField from '../../lib/forms/TextField';
import AuthLayout from '../../components/layout/AuthLayout';
import Box from '@mui/material/Box';
import { useResetPasswordMutation } from '../../graphql/operations/resetPassword.generated';

const ResetPasswordSchema = z.object({
  password: z.string().nonempty(),
  passwordConfirmation: z.string().nonempty(),
});

type NewPasswordData = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordPage: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const {
    control,
    handleSubmit,
    watch,
    formState: { dirtyFields },
  } = useForm<NewPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const areEqual = dirtyFields.passwordConfirmation && watch('passwordConfirmation') === watch('password');

  const [resetPassword, { loading }] = useResetPasswordMutation({
    onCompleted: () => void router.push('/auth/login', undefined, { shallow: true }),
  });

  const onSubmit: SubmitHandler<NewPasswordData> = (data) => {
    void resetPassword({ variables: { ...data, token: token as string } });
  };

  return (
    <AuthLayout>
      <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
        Enter your new password
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} data-test="reset--form" sx={{ width: '100%' }}>
        <TextField control={control} label="Password" name="password" type="password" />
        <TextField
          control={control}
          helperText={watch('passwordConfirmation') === watch('password') ? '' : 'Passwords are different.'}
          label="Password confirmation"
          name="passwordConfirmation"
          type="password"
        />

        <LoadingButton disabled={!areEqual} fullWidth={true} loading={loading} sx={{ mt: 2, mb: 1 }} type="submit">
          Reset your password
        </LoadingButton>
      </Box>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
