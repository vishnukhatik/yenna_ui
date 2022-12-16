import { PUBLIC, HOTEL, ADMIN } from './config'
import {
  PUBLIC_HOME,
  PUBLIC_HOTEL,
  PUBLIC_ABOUT_US,
  PUBLIC_HOTEL_SEARCH,
  PUBLIC_SEARCH,
  AGENT_ADD_HOTELS,
  PUBLIC_HOTEL_DETAILS,
  PUBLIC_CHECHOUT,
  PUBLIC_PAYMENT,
  PUBLIC_CONTACT_PAGE,
  PUBLIC_CPANEL_LOGIN,
  ADMIN_LOGIN, PUBLIC_ALL_HOTEL,
  PUBLIC_TBO_HOTEL_DETAILS,
  PUBLIC_TBO_HOTEL_CHECKOUT
} from './types'
export const publicChildren = [
  {
    path: '/',
    component: () => import('./../pages/public/hotels/Index.vue'),
    name: PUBLIC_HOME,
    meta: { title: 'Home', roles: [PUBLIC], auth: false }
  },
  {
    path: '/hotels',
    component: () => import('./../pages/public/hotels/Index.vue'),
    name: PUBLIC_HOTEL,
    meta: { title: 'Hotels', roles: [PUBLIC], auth: false }
  },
  {
    path: '/all-hotels',
    component: () => import('./../pages/public/hotels/AllHotel.vue'),
    name: PUBLIC_ALL_HOTEL,
    meta: { title: 'All-Hotels', roles: [PUBLIC], auth: false }
  },
  {
    path: '/hotels/:id',
    component: () => import('./../pages/public/hotels/hotelDetails.vue'),
    name: PUBLIC_HOTEL_DETAILS,
    meta: { title: 'Hotels', roles: [PUBLIC], auth: false }
  },
  {
    path: '/tbo-hotel-details',
    component: () => import('./../pages/public/hotels/hotelDetailsTBO.vue'),
    name: PUBLIC_TBO_HOTEL_DETAILS,
    meta: { title: 'TBO Hotels', roles: [PUBLIC], auth: false }
  },
  {
    path: '/tbo-hotel-checkout',
    component: () => import('./../pages/public/checkout/tboCheckOut.vue'),
    name: PUBLIC_TBO_HOTEL_CHECKOUT,
    meta: { title: 'TBO Hotels Checkout', roles: [PUBLIC], auth: false }
  },
  {
    path: '/about-us',
    component: () => import('./../pages/public/about-us/Index.vue'),
    name: PUBLIC_ABOUT_US,
    meta: { title: 'About US', roles: [PUBLIC], auth: false }
  },
  {
    path: '/contact-us',
    component: () => import('./../pages/public/contact-page/Index.vue'),
    name: PUBLIC_CONTACT_PAGE,
    meta: { title: 'Contact Us', roles: [PUBLIC], auth: false }
  },
  {
    path: '/hotels-search',
    component: () => import('./../pages/public/hotels/SearchHotel.vue'),
    name: PUBLIC_HOTEL_SEARCH,
    meta: { title: 'Hotel Search', roles: [PUBLIC], auth: false }
  },
  {
    path: '/search',
    component: () => import('./../pages/public/search/Index.vue'),
    name: PUBLIC_SEARCH,
    meta: { title: 'Search', roles: [PUBLIC], auth: false }
  },
  {
    path: '/hotel-register',
    component: () => import('./../pages/agent/register/Index.vue'),
    name: AGENT_ADD_HOTELS,
    meta: { title: 'Agent Dashboard', roles: [HOTEL, ADMIN], auth: false }
  },
  {
    path: '/checkout',
    component: () => import('./../pages/public/checkout/Index.vue'),
    name: PUBLIC_CHECHOUT,
    meta: { title: 'Checkout', roles: [PUBLIC, HOTEL, ADMIN], auth: false }
  },
  {
    path: '/payment',
    component: () => import('./../pages/public/payment/Index.vue'),
    name: PUBLIC_PAYMENT,
    meta: { title: 'Payment', roles: [PUBLIC, HOTEL, ADMIN], auth: false }
  },
  {
    path: '/cpanel-login',
    component: () => import('./../pages/auth/CPanelLogin.vue'),
    name: PUBLIC_CPANEL_LOGIN,
    meta: { title: 'CPanel Login', roles: [PUBLIC], auth: false }
  },
  {
    path: '/yr-admin-login',
    component: () => import('./../pages/auth/CPanelLogin.vue'),
    name: ADMIN_LOGIN,
    meta: { title: 'Admin Login', roles: [PUBLIC], auth: false }
  },
  {
    path: '/blog/:slag',
    component: () => import('./../pages/public/content/ContentPage.vue'),
    name: PUBLIC_CONTACT_PAGE,
    meta: {
      title: 'Content Page',
      roles: [PUBLIC, HOTEL, ADMIN],
      auth: false,
      ContentPage: true
    }
  }
]
