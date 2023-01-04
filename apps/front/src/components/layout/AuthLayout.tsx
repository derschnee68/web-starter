import type { FC, ReactNode } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from './Copyright';
import Typography from '@mui/material/Typography';

interface AuthLayoutProps {
  title?: string;
  children: ReactNode | ReactNode[];
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => (
  <Grid container component="main" sx={{ height: '100vh' }}>
    <CssBaseline />
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        {title && (
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
            {title}
          </Typography>
        )}

        {children}
        <Box component={Copyright} sx={{ mt: 5 }} />
      </Box>
    </Grid>
  </Grid>
);

export default AuthLayout;
