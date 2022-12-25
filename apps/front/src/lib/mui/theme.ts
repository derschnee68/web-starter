import '@mui/lab/themeAugmentation';
import type { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  typography: (palette) => ({
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    allVariants: {
      color: palette.tertiary.main,
    },
  }),

  // Palette and colors are extracted from the brand guidelines document
  palette: {
    primary: {
      main: '#00cdac',
      light: '#55d4c0',
      lighter: '#98e6d9',
      lighter2: '#d1f2ed',
      lighter3: '#f2fffd',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6753ff',
      light: '#a499ff',
      lighter: '#c8c2ff',
      lighter2: '#f2f0f6',
      lighter3: '#f3f2ff',
    },
    tertiary: {
      main: '#120641',
      light: '#241763',
      lighter: '#362397',
      lighter2: '#6650d6',
      lighter3: '#f3f2ff',
    },
    neutral: {
      main: '#495773',
      light: '#697999',
      lighter: '#8997b4',
      lighter2: '#b0bacd',
      lighter3: '#d8dce6',
      contrastText: '#ffffff',
    },
  },

  shape: {
    borderRadius: 0,
  },

  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '40px',
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
