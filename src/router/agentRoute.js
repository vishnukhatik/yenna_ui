import { HOTEL } from './config'
import {
  AGENT_DASHBOARD,
  AGENT_HOTEL_BOOKING_HISTORY,
  AGENT_PROFILE,
  AGENT_PROPERTIES,
  AGENT_PROPERTIES_DETAILS,
  AGENT_PROPERTIES_ADD,
  AGENT_PROPERTIES_EDIT,
  AGENT_TOKENS
} from './types'
export const agentChildren = [
  {
    path: '/agent/dashboard',
    component: () => import('./../pages/agent/dashboard/Index.vue'),
    name: AGENT_DASHBOARD,
    meta: { title: 'Agent Dashboard', roles: [HOTEL], auth: true }
  },
  {
    path: '/agent/properties',
    component: () => import('./../pages/agent/properties/Index.vue'),
    name: AGENT_PROPERTIES,
    meta: { title: 'Agent Dashboard', roles: [HOTEL], auth: true }
  },
  {
    path: '/agent/properties-add',
    component: () => import('./../pages/agent/register/Index.vue'),
    name: AGENT_PROPERTIES_ADD,
    meta: { title: 'Agent Dashboard', roles: [HOTEL], auth: true }
  },
  {
    path: '/agent/properties-edit/:id',
    component: () => import('./../pages/agent/register/Index.vue'),
    name: AGENT_PROPERTIES_EDIT,
    meta: { title: 'Agent Properties Edit', roles: [HOTEL], auth: true }
  },
  {
    path: '/agent/properties/:id',
    component: () => import('./../pages/public/hotels/hotelDetails.vue'),
    name: AGENT_PROPERTIES_DETAILS,
    meta: { title: 'Agent propertie Details', roles: [HOTEL], auth: true }
  },
  {
    path: '/agent/booking-history',
    component: () => import('./../pages/common-modules/booking-history/Index.vue'),
    name: AGENT_HOTEL_BOOKING_HISTORY,
    meta: { title: 'Agent Hotel List', roles: [HOTEL], auth: true }
  },
  {
    path: '/agent/my-profile',
    component: () => import('./../pages/agent/profile/Index.vue'),
    name: AGENT_PROFILE,
    meta: { title: 'My Profile', roles: [HOTEL], auth: true }
  },
  {
    path: '/agent/tokens',
    component: () => import('./../pages/common-modules/tokens/Index.vue'),
    name: AGENT_TOKENS,
    meta: { title: "My Token's", roles: [HOTEL], auth: true }
  }
]
