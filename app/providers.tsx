// app/providers.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import theme from "../styles/theme";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // FIX: Use a plain HTML div to prevent MUI Hydration mismatches
  const loading = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      Loading...
    </div>
  );

  return (
    <Provider store={store}>
      <PersistGate loading={loading} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
