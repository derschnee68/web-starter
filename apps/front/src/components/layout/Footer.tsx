import type { FC } from 'react';
import Box from '@mui/material/Box';

/**
 * Default footer
 */
const Footer: FC = () => {
  return (
    <Box component="footer" display="flex" alignItems="center" justifyContent="center" gap={1} py={2}>
      Copyright &copy;{' '}
    </Box>
  );
};
export default Footer;
