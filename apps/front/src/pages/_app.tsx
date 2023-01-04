import { ApolloProvider } from '@apollo/client';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useApolloClient from '../graphql/useApolloClient';
import createEmotionCache from '../lib/mui/createEmotionCache';
import theme from '../lib/mui/theme';
import '../styles/globals.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface TrainAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const WebStarterApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: TrainAppProps) => {
  const apollo = useApolloClient();

  return (
    <>
      <Head>
        <title>Web starter</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ApolloProvider client={apollo}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Component {...pageProps} />
            </LocalizationProvider>
            <ToastContainer />
          </ThemeProvider>
        </CacheProvider>
      </ApolloProvider>
    </>
  );
};

export default WebStarterApp;
