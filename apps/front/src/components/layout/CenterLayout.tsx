import type { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';

interface CenterLayoutProps {
  children: ReactNode | ReactNode[];
}

/**
 * Centered layout. Used as default for the /auth pages
 * @param params
 * @param params.children Content of the page
 */
const CenterLayout: FC<CenterLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default CenterLayout;
