import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';

export default function Custom404() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Typography variant="h1">404</Typography>
      <Typography sx={{ mt: 2, mb: 4 }}>We are sorry, the page you were looking for does not exist anymore.</Typography>
      <Link href="/">
        <Button>Go back to homepage</Button>
      </Link>
    </Box>
  );
}
