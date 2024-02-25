import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from '../constants/index';

interface IPropsRegistration {
    email: string;
    password: string;
}

interface IResponseLogin {
    accessToken: string;
}

interface IChangePasswordProps {
    password: string;
    confirmPassword: string;
}

interface IConfirmEmailProps {
    email:string,
    code: string 
}

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
        checkEmail: builder.mutation<unknown, string>({
            query: (email) => ({
                url: '/auth/check-email',
                method: 'POST',
                body:{email},
            }),
        }),
        confirmEmail: builder.mutation<unknown, IConfirmEmailProps>({
            query: (body) => ({
                url:'/auth/confirm-email',
                method: 'POST',
                body,
                credentials:'include'
            }),
        }),
        changePassword: builder.mutation<string, IChangePasswordProps>({
            query: (body) => ({
                url: '/auth/change-password',
                method: 'POST',
                body,
                credentials:'include'
            }),
        }),
    }),
});

export const { useRegistrationMutation, useLoginMutation, useChangePasswordMutation,useCheckEmailMutation,useConfirmEmailMutation } = authApi;
