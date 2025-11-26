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
  
  // Payday field is typed as string (the raw input value) and refined for validation
  payday: z.string().optional().refine(val => { 
    // Allow empty string or undefined (optional field)
    if (!val || val === '') return true; 
    
    const num = Number(val);
    // Ensure that if a value is provided, it is a valid integer between 1 and 31
    return Number.isInteger(num) && num >= 1 && num <= 31;
  }, {
    message: "Payday must be a whole number between 1 and 31, or left blank.",
  }),
});

// 2. Define types based on Zod input and the final API payload
type RegisterFormInputs = z.infer<typeof RegisterFormSchema>;

// Manually define payload type expected by the backend (payday is a number)
type RegisterPayload = Omit<RegisterFormInputs, 'payday'> & {
    payday?: number; 
};


export default function RegisterPage() {
  const router = useRouter();
  const [registerUser, { isLoading, isError, isSuccess }] = useRegisterMutation();

  // Use RegisterFormInputs for the useForm generic argument
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
        name: '',
        email: '',
        phone: '',
        password: '',
        payday: '', // Must match RegisterFormInputs type (string)
    }
  });

  // The handler receives the raw form inputs (string for payday)
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    // Manually transform the input data into the correct payload format
    const payload: RegisterPayload = {
        ...data,
        // Convert the string payday to a number or undefined
        payday: data.payday ? Number(data.payday) : undefined,
    }

    try {
      // Send the correctly typed payload to the API
      await registerUser(payload).unwrap(); 
      alert('Registration successful! Redirecting to login.');
      router.push('/login'); 
    } catch (err) {
      console.error('Registration failed', err);
      // More robust error message:
      const errorMessage = (err as any)?.data?.message || 'Registration failed. A user with this email or phone may already exist.';
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