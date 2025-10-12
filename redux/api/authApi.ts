// /home/shercy/jamii_money_frontend/redux/api/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api', // ✅ Correct base URL (no /auth here)
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any)?.auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),

    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register', // ✅ Just one /auth
                method: 'POST',
                body: data,
            }),
        }),

        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
        }),

        getProfile: builder.query({
            query: () => ({
                url: '/auth/profile',
                method: 'GET',
            }),
        }),
    }),
});

// ✅ Export hooks for components
export const {
    useRegisterMutation,
    useLoginMutation,
    useGetProfileQuery,
} = authApi;
