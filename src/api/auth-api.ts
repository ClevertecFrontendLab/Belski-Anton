import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../constants/index';

interface IPropsRegistration {
    email: string;
    password: string;
}

interface IResponseLogin {
    accessToken: string;
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    endpoints: (builder) => ({
        registration: builder.mutation<unknown, IPropsRegistration>({
            query: (body) => ({
                url: '/auth/registration',
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<IResponseLogin, IPropsRegistration>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegistrationMutation, useLoginMutation } = authApi;
