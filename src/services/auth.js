import { serviceMaker, methods } from './index'

export const AUTH_LOGIN = (payload) => serviceMaker('/auth/login', methods.POST, payload)
export const AUTH_ADMIN_LOGIN = (payload) => serviceMaker('/admin/login', methods.POST, payload)
export const AUTH_USER_REGISTER = (payload) => serviceMaker('/auth/user', methods.POST, payload)
export const AUTH_HOTEL_REGISTER = (payload) => serviceMaker('/auth/hotel', methods.POST, payload)
export const AUTH_RESET_PASSWORD = (payload) => serviceMaker('/auth/hotelSignUp', methods.POST, payload)
export const AUTH_SEND_OTP = (payload) => serviceMaker('/auth/generateOTP', methods.POST, payload)
export const AUTH_VERIFY_OTP = (payload) => serviceMaker('/auth/otp', methods.POST, payload)
export const AUTH_USER_UPDATE = (payload) => serviceMaker('/auth/user-update', methods.PATCH, payload)
export const AUTH_FETCH_USER_BY_ID = (payload) => serviceMaker(`/auth/userByEmail?email=${payload}`, methods.GET)
export const AUTH_HOTEL_UPDATE = (payload) => serviceMaker('/auth/hotel-profile-update', methods.PATCH, payload)

export const AUTH_USER_CHANGE_PASSWORD = (payload) => serviceMaker('/auth/user-changePassword', methods.POST, payload)
export const AUTH_HOTEL_CHANGE_PASSWORD = (payload) => serviceMaker('/auth/hotel-changePassword', methods.POST, payload)

export const AUTH_USER_FORGOT_PASSWORD = (payload) => serviceMaker('/auth/user-forgetPassword', methods.POST, payload)
export const AUTH_HOTEL_FORGOT_PASSWORD = (payload) => serviceMaker('/auth/hotel-forgetPassword', methods.POST, payload)

export const ADMIN_USER_APPOVE = (payload) => serviceMaker('/auth/userApprove', methods.POST, payload)
export const ADMIN_USER_STATUS = (payload) => serviceMaker('/auth/userToggle', methods.POST, payload)
