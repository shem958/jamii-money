'use client';

import { useState } from 'react';
import { useRegisterMutation } from '@/redux/api/authApi';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    payday: '',
  });

  const [registerUser, { isLoading, isError, isSuccess }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({
        ...formData,
        payday: Number(formData.payday), // convert payday to number before sending
      }).unwrap();
      alert('Registration successful!');
    } catch (err) {
      console.error('Registration failed', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="p-8 border rounded-lg shadow-md w-96 bg-white"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Payday (e.g. 30)"
          value={formData.payday}
          onChange={(e) => setFormData({ ...formData, payday: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {isError && (
          <p className="text-red-500 mt-3 text-center">Registration failed.</p>
        )}
        {isSuccess && (
          <p className="text-green-500 mt-3 text-center">
            Registration successful!
          </p>
        )}
      </form>
    </div>
  );
}
