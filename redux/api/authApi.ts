import { baseApi } from './baseApi';
import { setCredentials } from '../slices/authSlice';

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data));
                } catch (err) {
                    console.error(err);
                }
            },
        }),

        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data));
                } catch (err) {
                    console.error(err);
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
