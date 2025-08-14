import Layout from "../components/layout";
import * as React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { wrapper } from "@/store";
import createEmotionCache from "@/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  palette: {
    primary: { main: "#556cd6" },
    secondary: { main: "#19857b" },
  },
});

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

 function App({ Component, pageProps }: AppProps) {
  const { emotionCache = clientSideEmotionCache } = pageProps;

  return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout customerKey={pageProps.customerKey}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
  );
}

export default wrapper.withRedux(App);
