import { serviceMaker, methods } from '../index'

export const ADMIN_FETCH_BOOKING = () => serviceMaker('/booking', methods.GET)
export const AGENT_FETCH_BOOKING = (email) => serviceMaker(`/hotel/bookingByEmail?contactPersonEmail=${email}`, methods.GET)
export const ADMIN_BOOKING_APPROVE = (payload) => serviceMaker('/booking/approve', methods.POST, payload)
export const ADMIN_FETCH_COMPLETED_BOOKING = (payload) => serviceMaker(`/booking/countBystatus?status=${payload}`, methods.GET)
export const ADMIN_FETCH_CANCELLED_BOOKING = (payload) => serviceMaker(`/booking/countBystatus?status=${payload}`, methods.GET)
export const ADMIN_FETCH_PENDING_BOOKING = (payload) => serviceMaker(`/booking/countBystatus?status=${payload}`, methods.GET)
export const ADMIN_FETCH_BOOKING_PAGINATION = (p) => serviceMaker(`/booking/pagination?perRowPage=${p.perRowPage}&currentPage=${p.currentPage}`, methods.GET)
