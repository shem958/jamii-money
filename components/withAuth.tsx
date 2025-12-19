"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ProtectedPage: React.FC<P> = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const token = useSelector((state: RootState) => state.auth.token);
    const user = useSelector((state: RootState) => state.auth.user);
    const [isReady, setIsReady] = useState(false);
    const hasChecked = useRef(false);

    useEffect(() => {
      // Prevent multiple checks
      if (hasChecked.current) return;

      console.log("🔍 withAuth initial check:", {
        hasToken: !!token,
        hasUser: !!user,
        pathname,
      });

      // Wait for rehydration
      const timer = setTimeout(() => {
        hasChecked.current = true;

        if (!token || !user) {
          console.log("❌ No auth, redirecting to login");
          router.replace("/login");
        } else {
          console.log("✅ Auth confirmed, showing content");
          setIsReady(true);
        }
      }, 400); // Increased to 400ms for safer rehydration

      return () => clearTimeout(timer);
    }, []); // Empty dependency array - only run once

    // Monitor auth changes after initial check
    useEffect(() => {
      if (hasChecked.current && isReady && (!token || !user)) {
        console.log("⚠️ Auth lost, redirecting to login");
        router.replace("/login");
      }
    }, [token, user, isReady, router]);

    if (!isReady) {
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
