import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import type { FC } from 'react';

const Copyright: FC = ({ ...props }) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      Your Website
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

export default Copyright;
