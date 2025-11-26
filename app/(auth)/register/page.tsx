// app/(auth)/register/page.tsx (Updated for robust error handling)
'use client';

import { useRegisterMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. Define Zod schema for form input validation (all inputs start as strings)
const RegisterFormSchema = z.object({
  name: z.string().min(2, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  
  payday: z.string().optional().refine(val => { 
    if (!val || val === '') return true; 
    
    const num = Number(val);
    return Number.isInteger(num) && num >= 1 && num <= 31;
  }, {
    message: "Payday must be a whole number between 1 and 31, or left blank.",
  }),
});

type RegisterFormInputs = z.infer<typeof RegisterFormSchema>;
type RegisterPayload = Omit<RegisterFormInputs, 'payday'> & {
    payday?: number; 
};


export default function RegisterPage() {
  const router = useRouter();
  const [registerUser, { isLoading, isError, isSuccess }] = useRegisterMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
        name: '',
        email: '',
        phone: '',
        password: '',
        payday: '',
    }
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const payload: RegisterPayload = {
        ...data,
        payday: data.payday ? Number(data.payday) : undefined,
    }

    try {
      await registerUser(payload).unwrap(); 
      alert('Registration successful! Redirecting to login.');
      router.push('/login'); 
    } catch (err: any) {
      // IMPROVED ERROR LOGGING: Logs the full RTK Query error object
      console.error('Registration failed:', err); 
      
      // IMPROVED ERROR MESSAGE EXTRACTION (Handles the nested error structure from NestJS filter)
      let errorMessage = 'Registration failed. Please check your inputs.';

      if (err.data && err.data.message) {
        // If NestJS sent a custom message (e.g., ConflictException for duplicate user)
        errorMessage = Array.isArray(err.data.message) 
            ? err.data.message[0] // If NestJS ValidationPipe returned an array of errors
            : err.data.message; 
      }
      
      alert(errorMessage);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 border rounded-lg shadow-md w-96 bg-white"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          {...register('name')}
          className="w-full mb-3 p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-xs mb-3">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className="w-full mb-3 p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-xs mb-3">{errors.email.message}</p>}
        
        <input
          type="text"
          placeholder="Phone Number"
          {...register('phone')}
          className="w-full mb-3 p-2 border rounded"
        />
        {errors.phone && <p className="text-red-500 text-xs mb-3">{errors.phone.message}</p>}
        
        <input
          type="number"
          placeholder="Payday (1-31, optional)"
          {...register('payday')} 
          className="w-full mb-3 p-2 border rounded"
        />
        {errors.payday && <p className="text-red-500 text-xs mb-3">{errors.payday.message}</p>}
        
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          className="w-full mb-4 p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-xs mb-4">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {isError && (
          <p className="text-red-500 mt-3 text-center">Registration failed. Please try again.</p>
        )}
        {isSuccess && (
          <p className="text-green-500 mt-3 text-center">
            Registration successful! Redirecting to login.
          </p>
        )}
      </form>
    </div>
  );
}