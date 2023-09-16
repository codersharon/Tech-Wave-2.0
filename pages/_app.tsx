import { Analytics } from '@vercel/analytics/react';
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "./comps/navbar";
import LoadingBar from "react-top-loading-bar";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import Footer from "./comps/footer";

function MyApp({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });

    router.events.on("routeChangeComplete", () => {
      setProgress(400);
    });
  });

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingBar
        color="red"
        progress={progress}
        waitingTime={1000}
        onLoaderFinished={() => setProgress(0)}
      />
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <Navbar />
      <Component {...pageProps} />
      <Footer />
			<Analytics />
    </ThemeProvider>
  );
}

export default MyApp;