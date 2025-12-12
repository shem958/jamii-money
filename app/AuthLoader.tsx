// app/AuthLoader.tsx (SIMPLIFIED FINAL VERSION)
'use client';

import { ReactNode } from 'react';

// This file is now redundant but kept as a simple wrapper.
// All initial state logic is handled in authSlice.ts
export default function AuthLoader({ children }: { children: ReactNode }) {
    // We simply render children. No dispatching, no useEffect.
    return children;
}