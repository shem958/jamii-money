'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // ✅ Retrieve user info from localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      alert('Unauthorized! Please log in.');
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    alert('You have been logged out.');
    router.push('/login');
  };

  if (!user) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-10 text-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96 text-left border">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Welcome, {user.name || 'User'} 👋
        </h1>

        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || '—'}</p>
        <p><strong>Payday:</strong> {user.payday || '—'}</p>
        <p><strong>Role:</strong> {user.role || '—'}</p>
      </div>

      <p className="mt-8 text-gray-600">
        Wallets, Goals, Chamas, Transactions & Nudges — coming soon.
      </p>

      <button
        onClick={handleLogout}
        className="mt-10 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </main>
  );
}
