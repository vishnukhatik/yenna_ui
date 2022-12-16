import { serviceMaker, methods } from '../index'

export const USER_HOTEL_SEARCH = (payload) => serviceMaker('/hotel/search-new', methods.POST, payload)
export const USER_ADD_HOTEL = (payload) => serviceMaker('/hotel/save', methods.POST, payload)
export const USER_UPDATE_HOTEL = (payload) => serviceMaker('/hotel/update', methods.PATCH, payload)
export const USER_MY_BOOKING_COUNT = (payload) => serviceMaker('/booking/user-count-byUserID?userId=' + payload, methods.GET)
export const USER_MY_BOOKING = (payload) => serviceMaker('/booking/bookingByUserEmailId?userEmailId=' + payload, methods.GET)
export const USER_MY_BOOKING_LIMITED = (payload) => serviceMaker('/booking/limited/bookingByUserEmailId?userEmailId=' + payload, methods.GET)
export const AGENT_BOOKING_COUNT = (payload) => serviceMaker('/booking/user-count-byUserID?userId=' + payload, methods.GET)

export const USER_FETCH_TBO_BOOKING = (p) => serviceMaker(`/tbo/booking?perRowPage=${p.perRowPage}&currentPage=${p.currentPage}&userId=${p.userId}`, methods.GET)

export const USER_FETCH_TBO_BOOKING_BY_BOOKING_NO = (p) => serviceMaker('/tbo/tbo-get-booking-id', methods.POST, p)

export const HOTEL_IMG_UPLOAD_GET_ID_KEY = () => serviceMaker('/upload/?type=hotels', methods.GET)

export const USER_ADD_BOOK_MARK = (payload) => serviceMaker('/auth/user-update', methods.PATCH, payload)
export const USER_GET_BOOK_MARK = (id) => serviceMaker(`/user/bookmarks?userId=${id}`, methods.GET)

export const USER_ROOM_CANCEL = (payload) => serviceMaker('booking/update', methods.PATCH, payload)

export const USER_GET_TRANSACION_ORDER_ID = (payload) => serviceMaker('/transaction/order', methods.POST, payload)
export const USER_ROOM_BOOK = (payload) => serviceMaker('/booking/save', methods.POST, payload)
export const USER_REFUND = (payload) => serviceMaker('/transaction/refund', methods.POST, payload)
export const USER_TRANSACION_PAYMENT_CAPTURE = (payload) => serviceMaker('/transaction/paymentCapture', methods.POST, payload)
export const USER_SEND_MAIL_BOOKING = (payload) => serviceMaker('/email/booking', methods.POST, payload)
