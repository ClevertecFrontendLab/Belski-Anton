import { API_ROUTES, BASE_API_URL } from '@constants/index';
import { store } from '@redux/configure-store';
import { Exercise } from '@redux/traninig-slice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

interface Traning {
    name: string;
    date: string;
    exercises: Exercise[];
}

interface IUpdateTraining {
    training: Traning;
    id: string;
    isImplementation: boolean;
}

interface TrainingExercise {
    _id: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
}

interface TrainingParameters {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[];
}

interface Training {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: TrainingParameters;
    exercises: TrainingExercise[];
}

interface TrainingListItem {
    name: string;
    key: string;
}

interface IIMage {
    name: string;
    url: string;
}

interface ITariff {
    tariffId: string;
    expired: string;
}

export interface IUser {
    email?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    password?: string;
    readyForJointTraining?: boolean;
    sendNotification?: boolean;
    tariff?: ITariff;
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
    tagTypes: ['Feedback', 'Training', 'TrainingList'],
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
        getTraining: builder.query<Training[], void>({
            query: () => ({
                url: API_ROUTES.getTraining,
                method: 'GET',
            }),
            providesTags: ['Training'],
        }),
        createTrainig: builder.mutation<unknown, Traning>({
            query: (training) => ({
                url: API_ROUTES.createTraining,
                method: 'POST',
                body: training,
            }),
            invalidatesTags: ['Training'],
        }),
        uptadeTraning: builder.mutation<unknown, IUpdateTraining>({
            query: ({ training, id, isImplementation }) => ({
                url: `${API_ROUTES.updateTraining}/${id}`,
                method: 'PUT',
                body: { ...training, isImplementation },
            }),
            invalidatesTags: ['Training', 'TrainingList'],
        }),

        getTrainingList: builder.query<TrainingListItem[], void>({
            query: () => ({
                url: API_ROUTES.getTrainingList,
                method: 'GET',
            }),
            providesTags: ['TrainingList'],
        }),
        uploadImage: builder.mutation<IIMage, FormData>({
            query: (image) => ({
                url: API_ROUTES.uploadImage,
                method: 'POST',
                body: image,
            }),
        }),
        getUserData: builder.query<IUser, void>({
            query: () => ({
                url: API_ROUTES.userMe,
            }),
        }),
        updateUserData: builder.mutation<IUser, IUser>({
            query: (body) => ({
                method: 'PUT',
                url: API_ROUTES.user,
                body,
            }),
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
    useGetTrainingQuery,
    useLazyGetTrainingQuery,
    useCreateTrainigMutation,
    useUptadeTraningMutation,
    useGetTrainingListQuery,
    useUploadImageMutation,
    useGetUserDataQuery,
    useUpdateUserDataMutation,
} = authApi;
