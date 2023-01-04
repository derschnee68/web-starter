import Head from 'next/head';
import type { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode | ReactNode[];
  title: string;
}

/**
 * Default layout of all the non-auth pages
 * @param params
 * @param params.title Title of the page
 * @param params.children Content of the page
 */
const MainLayout: FC<MainLayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Box
        component="main"
        display="flex"
        flexDirection="column"
        sx={{ flexGrow: 1, px: { md: 4 }, py: { md: 3 }, gap: 2 }}
      >
        {children}
      </Box>

      <Footer />
    </>
  );
};

export default MainLayout;
