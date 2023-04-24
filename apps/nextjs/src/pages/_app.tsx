// src/pages/_app.tsx
import { ClerkProvider } from '@clerk/nextjs';
import '@fontsource/roboto/400.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import dayjs from 'dayjs';
import DayJsPluginRelativeTime from 'dayjs/plugin/relativeTime';
import type { AppType } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from '~/theme/theme';
import { api } from '~/utils/api';

dayjs.extend(DayJsPluginRelativeTime);

const App: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <ToastContainer theme='colored' position='bottom-right' />

        <Component {...pageProps} />
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(App);
