import { serviceMaker, methods } from '../index'

export const PUBLIC_NEWSLETTER = (payload) => serviceMaker('/subscription/subscribe', methods.POST, payload)
export const PUBLIC_UN_SUBSCRIPTION = (payload) => serviceMaker('/subscription/un-subscribe', methods.POST, payload)
export const ADMIN_FETCH_NEWSLETTER = () => serviceMaker('/subscription', methods.GET)
export const ADMIN_BLOG_FETCH_BY_URL = (id) => serviceMaker(`/blog?content_type=${id}`, methods.GET)
export const PUBLIC_SAVE_INVESTER_FORM = (payload) => serviceMaker('/contactUs/save', methods.POST, payload)

export const USER_POPULAR_HOTELS = () => serviceMaker('/hotel/popularHotels', methods.GET)
export const USER_RECOMMEND_HOTELS = () => serviceMaker('/hotel/recommendedHotels', methods.GET)
export const FETCH_SECIFIT_HOTEL_WITH_PAGINATION = p => serviceMaker(`/hotel/paginationWithSpecifitCol?perRowPage=${p.perRowPage}&currentPage=${p.currentPage}`, methods.GET)

export const USER_SEARCH_CITIES = (search) => serviceMaker(`/tbo/cities?search=${search}`, methods.GET)
export const USER_TBO_HOTEL_DETAILS = (p) => serviceMaker('/tbo/tbo-hotel-details', methods.POST, p)
export const USER_TBO_HOTEL_BLOCK = (p) => serviceMaker('/tbo/tbo-hotel-block', methods.POST, p)
export const TBO_YR_SAVE_BOOKING = (p) => serviceMaker('/tbo//tbo-yr-save-booking', methods.POST, p)
export const TBO_SAVE_BOOKING = (p) => serviceMaker('/tbo/tbo-hotel-save', methods.POST, p)
