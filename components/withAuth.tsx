// components/withAuth.tsx (Final Logic)
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
    // Read token status directly
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
      // If token is null/undefined, redirect. This is a definitive state 
      // because PersistGate ensures Redux is hydrated before this code runs.
      if (token === null) { 
        router.replace('/login');
      }
    }, [token, router]);

    // Show a loading spinner if the token is null. 
    // This catches the brief moment before the PersistGate renders or before redirect.
    if (!token) {
      return (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <CircularProgress />
          </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };

  ProtectedPage.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ProtectedPage;
}