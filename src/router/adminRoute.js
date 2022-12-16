import { ADMIN } from './config'
import {
  ADMIN_LEADS,
  ADMIN_BOOKING_HISTORY,
  ADMIN_WISHLIST,
  ADMIN_TOURS,
  ADMIN_REQUEST_MANAGMENT,
  ADMIN_VERIFICATION,
  ADMIN_USERS,
  ADMIN_DASHBOARD,
  ADMIN_PROFILE,
  ADMIN_PROPERTIES,
  ADMIN_PROPERTIES_ADD,
  ADMIN_CONTACT,
  ADMIN_CONTACT_ADD,
  ADMIN_CONTACT_EDIT,
  ADMIN_CONTACT_SUBSCRIBE,
  ADMIN_PROPERTIES_DETILAS,
  ADMIN_CUSTOMERS,
  ADMIN_USER_ADD,
  ADMIN_USER_EDIT,
  ADMIN_USER_ROLE,
  ADMIN_PROPERTIES_EDIT,
  ADMIN_INVESTER_INFORMATION,
  ADMIN_TBO_HOTEL_BOOKING
} from './types'
export const adminChildren = [
  {
    path: '/admin/dashboard',
    component: () => import('./../pages/admin/dashboard/Index.vue'),
    name: ADMIN_DASHBOARD,
    meta: { title: 'Dashboard', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/properties',
    component: () => import('./../pages/admin/properties/Index.vue'),
    name: ADMIN_PROPERTIES,
    meta: { title: 'Properties List', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/properties/:id',
    component: () => import('./../pages/public/hotels/hotelDetails.vue'),
    name: ADMIN_PROPERTIES_DETILAS,
    meta: { title: 'Properties Detials', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/properties-add',
    component: () => import('./../pages/agent/register/Index.vue'),
    name: ADMIN_PROPERTIES_ADD,
    meta: { title: 'Propertie Create', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/properties-edit/:id',
    component: () => import('./../pages/agent/register/Index.vue'),
    name: ADMIN_PROPERTIES_EDIT,
    meta: { title: 'Propertie Edit', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/leade',
    component: () => import('./../pages/admin/leads/Index.vue'),
    name: ADMIN_LEADS,
    meta: { title: 'Leads List', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/booking-history',
    component: () => import('./../pages/common-modules/booking-history/Index.vue'),
    name: ADMIN_BOOKING_HISTORY,
    meta: { title: 'All Booking History', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/wishlist',
    component: () => import('./../pages/admin/wishlist/Index.vue'),
    name: ADMIN_WISHLIST,
    meta: { title: 'Wishlist', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/tours',
    component: () => import('./../pages/admin/tours/Index.vue'),
    name: ADMIN_TOURS,
    meta: { title: 'Tours', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/request-management',
    component: () => import('./../pages/admin/request-management/Index.vue'),
    name: ADMIN_REQUEST_MANAGMENT,
    meta: { title: 'Request Management List', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/verification',
    component: () => import('./../pages/admin/verification/Index.vue'),
    name: ADMIN_VERIFICATION,
    meta: { title: 'Verification', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/users',
    component: () => import('./../pages/admin/users/Index.vue'),
    name: ADMIN_USERS,
    meta: { title: 'Users List', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/user-page-add',
    component: () => import('./../pages/admin/users/AddEditUser.vue'),
    name: ADMIN_USER_ADD,
    meta: { title: 'User Add', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/user-page-edit/:id',
    component: () => import('./../pages/admin/users/AddEditUser.vue'),
    name: ADMIN_USER_EDIT,
    meta: { title: 'Admin User Edit', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/customer',
    component: () => import('./../pages/admin/customer/Index.vue'),
    name: ADMIN_CUSTOMERS,
    meta: { title: 'Customers List', roles: [ADMIN], auth: true }
  },
  {
    path: '/hotel/my-profile',
    component: () => import('./../pages/admin/profile/Index.vue'),
    name: ADMIN_PROFILE,
    meta: { title: 'My Profile', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/content-page',
    component: () => import('./../pages/admin/content/Index.vue'),
    name: ADMIN_CONTACT,
    meta: { title: 'Content Page', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/content-page-add',
    component: () => import('./../pages/admin/content/AddEditContact.vue'),
    name: ADMIN_CONTACT_ADD,
    meta: { title: 'Content Page Add', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/content-page-edit/:id',
    component: () => import('./../pages/admin/content/AddEditContact.vue'),
    name: ADMIN_CONTACT_EDIT,
    meta: { title: 'Content Page Edit', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/subscribe',
    component: () => import('./../pages/admin/subscribe/Index.vue'),
    name: ADMIN_CONTACT_SUBSCRIBE,
    meta: { title: 'Subscribe List', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/user-role',
    component: () => import('./../pages/admin/user-role/Index.vue'),
    name: ADMIN_USER_ROLE,
    meta: { title: 'Roles', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/contact-information',
    component: () => import('./../pages/admin/invester-information/Index.vue'),
    name: ADMIN_INVESTER_INFORMATION,
    meta: { title: 'Invester Information List', roles: [ADMIN], auth: true }
  },
  {
    path: '/admin/tbo-booking',
    component: () => import('./../pages/admin/tbo-booking/Index.vue'),
    name: ADMIN_TBO_HOTEL_BOOKING,
    meta: { title: 'TBO Hotel Booking List', roles: [ADMIN], auth: true }
  }
]
