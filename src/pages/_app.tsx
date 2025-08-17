import Layout from "../components/layout";
import * as React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { wrapper } from "@/store";
import createEmotionCache from "@/createEmotionCache";
import { Provider } from "react-redux";

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

function App({ Component, ...rest }: MyAppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache } = props.pageProps;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout customerKey={props.pageProps.customerKey}>
            <Component {...props.pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default wrapper.withRedux(App);
