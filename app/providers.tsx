// app/providers.tsx (VERIFIED VERSION)
"use client";

import { ReactNode, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  Box,
} from "@mui/material";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import theme from "../styles/theme";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Remove server-side injected CSS (MUI requirement)
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Loading component while Redux is rehydrating
  const loading = (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );

  return (
    <Provider store={store}>
      <PersistGate
        loading={loading}
        persistor={persistor}
        onBeforeLift={() => {
          console.log("🔄 Redux state rehydrated");
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
