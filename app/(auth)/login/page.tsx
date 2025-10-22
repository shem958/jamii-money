'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/redux/api/authApi';
import { setCredentials } from '@/redux/slices/authSlice';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginUser, { isLoading, isError, isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData).unwrap();

      // ✅ Save user & token to Redux + localStorage
      dispatch(setCredentials({ user: res.user, token: res.access_token }));

      alert('✅ Login successful!');
      router.push('/dashboard');
    } catch (err) {
      console.error('❌ Login failed:', err);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-8 border rounded-lg shadow-md w-96 bg-white"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {isError && (
          <p className="text-red-500 mt-3 text-center">
            Invalid email or password.
          </p>
        )}
        {isSuccess && (
          <p className="text-green-500 mt-3 text-center">
            Login successful!
          </p>
        )}
      </form>
    </div>
  );
}
