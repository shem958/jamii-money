import { baseApi } from './baseApi';
import { AuthUser } from '../types';

// Response shape AFTER interceptor unwrapping
export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  payday?: number;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ LOGIN
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      // ✅ UNWRAP NestJS ResponseInterceptor
      transformResponse: (response: any) => response.data,
    }),

    // ✅ REGISTER
    register: builder.mutation<{ message: string; user: AuthUser }, RegisterRequest>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      // Optional but recommended for consistency
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
