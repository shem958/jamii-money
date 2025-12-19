"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ProtectedPage: React.FC<P> = (props) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.token);
    const user = useSelector((state: RootState) => state.auth.user);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
      console.log("🔍 withAuth checking:", {
        hasToken: !!token,
        hasUser: !!user,
        isCheckingAuth,
      });

      // Give redux-persist more time to rehydrate (especially important on first load)
      const checkTimer = setTimeout(() => {
        setIsCheckingAuth(false);

        if (!token || !user) {
          console.log("❌ No auth found, redirecting to login");
          router.replace("/login");
        } else {
          console.log("✅ Auth verified, rendering protected content");
          setShouldRender(true);
        }
      }, 300); // Increased delay to 300ms

      return () => clearTimeout(checkTimer);
    }, [token, user, router]);

    // Show loading spinner while checking authentication
    if (isCheckingAuth || !shouldRender) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      );
    }

    // Render the protected component
    return <WrappedComponent {...props} />;
  };

  ProtectedPage.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ProtectedPage;
}
