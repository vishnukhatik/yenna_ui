import { serviceMaker, methods } from '../index'

export const HOTEL_FETCH_HOTEL_BY_EMAIL = (email) => serviceMaker(`/hotel/contactPersonEmail?contactPersonEmail=${email}`, methods.GET)
