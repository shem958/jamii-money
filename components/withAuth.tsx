'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  const ProtectedPage: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  // Set display name for easier debugging in React DevTools
  ProtectedPage.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ProtectedPage;
}
