import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, API_ROUTES } from '../constants/index';
import { store } from '@redux/configure-store';

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
    email: string;
    code: string;
}

interface IReview {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
}

interface ICreateReview {
    message: string;
    rating: number;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token') || store.getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Feedback'],
    endpoints: (builder) => ({
        registration: builder.mutation<unknown, IPropsRegistration>({
            query: (body) => ({
                url: API_ROUTES.registration,
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<IResponseLogin, IPropsRegistration>({
            query: (body) => ({
                url: API_ROUTES.login,
                method: 'POST',
                body,
            }),
        }),
        checkEmail: builder.mutation<unknown, string>({
            query: (email) => ({
                url: API_ROUTES.checkEmail,
                method: 'POST',
                body: { email },
            }),
        }),
        confirmEmail: builder.mutation<unknown, IConfirmEmailProps>({
            query: (body) => ({
                url: API_ROUTES.confirmEmail,
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        changePassword: builder.mutation<string, IChangePasswordProps>({
            query: (body) => ({
                url: API_ROUTES.changePassword,
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        getReviews: builder.query<IReview[], void>({
            query: () => ({
                url: API_ROUTES.getFeedback,
            }),
            providesTags: ['Feedback'],
        }),
        createReview: builder.mutation<unknown, ICreateReview>({
            query: (review) => ({
                url: API_ROUTES.getFeedback,
                method: 'POST',
                body: review,
            }),
            invalidatesTags: ['Feedback'],
        }),
    }),
});

export const {
    useRegistrationMutation,
    useLoginMutation,
    useChangePasswordMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useGetReviewsQuery,
    useCreateReviewMutation,
} = authApi;
