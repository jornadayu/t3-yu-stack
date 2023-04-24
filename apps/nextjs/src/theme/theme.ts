import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    subtitle1: {
      opacity: 0.6,
    },
    subtitle2: {
      opacity: 0.6,
    },
    fontFamily: 'Roboto',
    h5: {
      fontWeight: 1000,
    },
  },
  shape: {
    borderRadius: 3,
  },
  spacing: 6,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        a {
          text-decoration: none;
          color: inherit;
        }
      `,
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
  },
});
