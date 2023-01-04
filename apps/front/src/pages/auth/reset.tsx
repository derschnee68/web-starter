import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import AuthLayout from '../../components/layout/AuthLayout';
import Box from '@mui/material/Box';
import { useResetPasswordMutation } from '../../graphql/operations/resetPassword.generated';
import { passwordSchema } from '../../lib/auth/passwordSchema';
import PasswordTextField from '../../lib/forms/PasswordTextField';

const ResetPasswordSchema = z.object({
  password: passwordSchema,
});

type NewPasswordData = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordPage: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const { control, handleSubmit } = useForm<NewPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

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
        <PasswordTextField control={control} />
        <LoadingButton fullWidth={true} loading={loading} sx={{ mt: 3, mb: 2 }} type="submit">
          Save new password
        </LoadingButton>
      </Box>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
