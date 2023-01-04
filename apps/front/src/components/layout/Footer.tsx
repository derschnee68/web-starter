import type { FC } from 'react';
import Box from '@mui/material/Box';
import Copyright from './Copyright';

/**
 * Default footer
 */
const Footer: FC = () => {
  return <Box component={Copyright} display="flex" alignItems="center" justifyContent="center" gap={1} py={2}></Box>;
};
export default Footer;
