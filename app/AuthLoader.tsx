// app/AuthLoader.tsx (SIMPLIFIED FINAL VERSION)
'use client';

import { ReactNode } from 'react';

// All logic is now handled in authSlice.ts
export default function AuthLoader({ children }: { children: ReactNode }) {
    // No dispatching, no useEffect. Just render children.
    return children;
}