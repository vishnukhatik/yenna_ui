import { serviceMaker, methods } from '../index'

export const ADMIN_FETCH_USERS = () => serviceMaker('/auth/fetchUser', methods.GET)
export const ADMIN_USER_APPROVE = (payload) => serviceMaker('/hotel/approve', methods.POST, payload)
export const ADMIN_USER_TOGGLE = (payload) => serviceMaker('/hotel/toggle', methods.POST, payload)
export const ADMIN_USER_DELETE = (payload) => serviceMaker('/hotel/toggle', methods.POST, payload)
export const ADMIN_BLOG_DELTE = payload => serviceMaker(`/user/delete?content_type=${payload.content_type}`, methods.DELETE)
export const ADMIN_SAVE = (payload) => serviceMaker('/admin/save', methods.POST, payload)
export const ADMIN_UPDATE = (payload) => serviceMaker(`/admin/update?content_type=${payload.content_type}`, methods.PUT, payload)
export const ADMIN_FETCH_BY_ID = (id) => serviceMaker(`/admin?content_type=${id}`, methods.GET)
export const ADMIN_FETCH_CUSTOMERS = () => serviceMaker('/auth/fetchUser', methods.GET)
export const ADMIN_FETCH_HOTEL_USER = () => serviceMaker('/auth/fetchHotel', methods.GET)
export const ADMIN_FETCH_ADMIN_USER_PAGINATION = (p) => serviceMaker(`/admin?perRowPage=${p.perRowPage}&currentPage=${p.currentPage}`, methods.GET)
export const ADMIN_FETCH_CUSTOMER_PAGINATION = (p) => serviceMaker(`/auth/fetchUser/pagination?perRowPage=${p.perRowPage}&currentPage=${p.currentPage}&isActive=`, methods.GET)
export const ADMIN_FETCH_SUBSCRIBE_PAGINATION = (p) => serviceMaker(`subscription?perRowPage=${p.perRowPage}&currentPage=${p.currentPage}&isSubscribed=${p.isSubscribed}&email=${p.email}`, methods.GET)
export const ADMIN_USER_ACTIVE_DEACTIVE = (payload) => serviceMaker('auth/activeDeactive', methods.POST, payload)
