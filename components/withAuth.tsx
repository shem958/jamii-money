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

    useEffect(() => {
      // Add a small delay to ensure redux-persist has fully rehydrated
      const timer = setTimeout(() => {
        if (!token || !user) {
          console.log("No auth found, redirecting to login");
          router.replace("/login");
        } else {
          console.log("Auth verified, showing protected content");
          setIsCheckingAuth(false);
        }
      }, 200);

      return () => clearTimeout(timer);
    }, [token, user, router]);

    // Show loading spinner while checking authentication
    if (isCheckingAuth || !token || !user) {
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
