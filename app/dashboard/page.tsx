'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Retrieve user info from localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      alert('Unauthorized! Please log in.');
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  if (!user) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name || 'User'} 👋</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-96 text-left border">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || '—'}</p>
        <p><strong>Payday:</strong> {user.payday || '—'}</p>
        <p><strong>Role:</strong> {user.role || '—'}</p>
      </div>

      <p className="mt-8 text-gray-600">
        Wallets, Goals, Chamas, Transactions & Nudges — coming soon.
      </p>
    </main>
  );
}
