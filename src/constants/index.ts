import { ResultStatusType } from 'antd/lib/result';

export const MAX_WIDTH_SIDEBAR = 208;
export const MIN_WIDTH_SIDEBAR = 64;
export const MOB_WIDTH_SIDEBAR = 108;

export const BASE_API_URL = 'https://marathon-api.clevertec.ru';

export const API_ROUTES = {
    registration: '/auth/registration',
    login: '/auth/login',
    checkEmail: '/auth/check-email',
    confirmEmail: '/auth/confirm-email',
    changePassword: '/auth/change-password',
    getFeedback: '/feedback',
    authGoogle: '/auth/google',
    getTrainig: '/training',
    createTraning: '/traning',
    updateTraining: '/training/{trainingId}',
    deleteTraining: '/training/{trainingId}',
    getTrainingList:'/catalogs/training-list'
};

export const STATUS_CODES: { [key: string]: ResultStatusType } = {
    SUCCESS: 'success',
    ERROR: 'error',
    INTERNAL_SERVER_ERROR: '500',
};

export const PATHS = {
    MAIN: '/main',
    AUTH: '/auth',
    FEEDBACKS: '/feedbacks',
    CALENDAR: '/calendar',
    AUTH_REGISTRATION: '/auth/registration',
    RESULT_SUCCESS: '/result/success',
    RESULT_SUCCESS_CHANGE_PASSWORD: '/result/success-change-password',
    RESULT_ERROR_USER_EXIST: '/result/error-user-exist',
    RESULT_ERROR_CHANGE_PASSWORD: '/result/error-change-password',
    RESULT_ERROR: '/result/error',
    RESULT_ERROR_LOGIN: '/result/error-login',
    RESULT_ERROR_CHECK_EMAIL_NO_EXIST: '/result/error-check-email-no-exist',
    RESULT_ERROR_CHECK_EMAIL: '/result/error-check-email',
    AUTH_CONFIRM_EMAIL: '/auth/confirm-email',
    AUTH_CHANGE_PASSWORD: '/auth/change-password',
};
