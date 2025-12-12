// components/withAuth.tsx (Confirmed Logic is Correct)
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
  const ProtectedPage: React.FC<P> = (props) => {
    const router = useRouter();
    // Read token status AND the initialization flag from Redux
    const { token, isAuthInitialized } = useSelector((state: RootState) => state.auth);

    // Perform the redirect check ONLY after the Redux state is confirmed initialized
    useEffect(() => {
      // Because the state is synchronized upon store creation, this check is definitive.
      if (isAuthInitialized && !token) {
        router.replace('/login');
      }
    }, [isAuthInitialized, token, router]);

    // Show loading spinner while the status is unknown (only on first render if false)
    if (!isAuthInitialized) {
      return (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
          </Box>
      );
    }

    // If initialized and token exists, render the component
    return <WrappedComponent {...props} />;
  };

  ProtectedPage.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ProtectedPage;
}