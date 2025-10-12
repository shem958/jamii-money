'use client';

import { useState } from 'react';
import { useRegisterUserMutation } from '@/redux/api/authApi';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [registerUser, { isLoading, isError, isSuccess, error }] = useRegisterUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      alert('Registration successful!');
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-8 border rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {isError && <p className="text-red-500 mt-3">Registration failed.</p>}
        {isSuccess && <p className="text-green-500 mt-3">Registration successful!</p>}
      </form>
    </div>
  );
}
