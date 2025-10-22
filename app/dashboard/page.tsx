'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (!storedUser || !token) {
        router.replace('/login');
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('Invalid stored user:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    // Wait until hydration is done
    setTimeout(checkAuth, 200);
  }, [router]);

  if (isLoading) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p>Checking authorization...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <p>Unauthorized. Redirecting...</p>
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
        <p><strong>Role:</strong> {user.role || '—'}</p>
      </div>
    </main>
  );
}
