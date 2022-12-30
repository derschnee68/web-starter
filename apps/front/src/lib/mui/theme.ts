import '@mui/lab/themeAugmentation';
import type { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { blue, orange } from '@mui/material/colors';
import { LinkBehaviour } from './LinkBehaviour';
import type { LinkProps } from '@mui/material';

export const themeOptions: ThemeOptions = {
  typography: () => ({
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  }),
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: orange[500],
    },
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
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
