"use client";

import React, { useEffect, useState, useRef } from "react";
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
    const [mounted, setMounted] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const hasRedirected = useRef(false);

    // Wait for client-side hydration
    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (!mounted) return;

      console.log("🔍 Auth Check:", {
        hasToken: !!token,
        hasUser: !!user,
        tokenValue: token?.substring(0, 10) + "...",
        userName: user?.name,
      });

      // Give redux-persist time to rehydrate
      const timer = setTimeout(() => {
        if (!token || !user) {
          if (!hasRedirected.current) {
            console.log("❌ No auth found, redirecting to login");
            hasRedirected.current = true;
            router.replace("/login");
          }
        } else {
          console.log("✅ Auth verified");
          setIsChecking(false);
        }
      }, 500); // Increased to 500ms

      return () => clearTimeout(timer);
    }, [mounted, token, user, router]);

    // Show nothing until mounted (prevents SSR mismatch)
    if (!mounted || isChecking) {
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

    return <WrappedComponent {...props} />;
  };

  ProtectedPage.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ProtectedPage;
}
