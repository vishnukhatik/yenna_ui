import { serviceMaker, methods } from '../index'

export const ADMIN_FETCH_HOTEL = () => serviceMaker('/hotel', methods.GET)
export const ADMIN_FETCH_HOTEL_BY_ID = (payload) => serviceMaker(`/hotel/id?propertyId=${payload.propertyId}&toDate=${payload.toDate}&fromDate=${payload.fromDate}`, methods.GET)
export const ADMIN_HOTEL_APPROVE = (payload) => serviceMaker('/hotel/approve', methods.POST, payload)
export const ADMIN_HOTEL_TOGGLE = (payload) => serviceMaker('/hotel/toggle', methods.POST, payload)
export const ADMIN_HOTEL_CREATE = (payload) => serviceMaker('/hotel/save', methods.POST, payload)
export const ADMIN_HOTEL_UPDATE = (payload) => serviceMaker('/hotel/update', methods.PATCH, payload)

export const ADMIN_HOTEL_COUNT = () => serviceMaker('/booking/hotel-count', methods.GET)
export const ADMIN_FETCH_HOTEL_COUNT = () => serviceMaker('/hotel/hotelCounts', methods.GET)
export const ADMIN_FETCH_PROPERTIES_PAGINATION = (p) => serviceMaker(`/hotel/pagination?perRowPage=${p.perRowPage}&currentPage=${p.currentPage}&status=${p.status}&hotelStatus=${p.hotelStatus}&search=${p.search}`, methods.GET)
