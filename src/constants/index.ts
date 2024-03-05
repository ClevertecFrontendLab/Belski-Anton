import { ResultStatusType } from "antd/lib/result";

export const MAX_WIDTH_SIDEBAR = 208
export const MIN_WIDTH_SIDEBAR = 64
export const MOB_WIDTH_SIDEBAR = 108

export const BASE_API_URL = 'https://marathon-api.clevertec.ru'

export const API_ROUTES = {
   registration: '/auth/registration',
   login: '/auth/login',
   checkEmail: '/auth/check-email',
   confirmEmail: '/auth/confirm-email',
   changePassword: '/auth/change-password',
   getFeedback: '/feedback',
   authGoogle:'/auth/google'
 };

 export const STATUS_CODES: { [key: string]: ResultStatusType } = {
  SUCCESS: 'success',
  ERROR: 'error',
  INTERNAL_SERVER_ERROR: '500',
};