import { CUSTOMER } from './config'
import {
  USER_DASHBOARD,
  USER_PROFILE,
  USER_PRIFIX,
  MY_BOOK_DETAIL, USER_TOKENS, USER_BOOK_MARK_DETAILS
} from './types'
export const userChildren = [
  {
    path: `${USER_PRIFIX}/dashboard`,
    component: () => import('./../pages/user/dashboard/Index.vue'),
    name: USER_DASHBOARD,
    meta: { title: 'User Dashboard', roles: [CUSTOMER], auth: true }
  },
  {
    path: `${USER_PRIFIX}/my-profile`,
    component: () => import('./../pages/user/profile/Index.vue'),
    name: USER_PROFILE,
    meta: { title: 'My Profile', roles: [CUSTOMER], auth: true }
  },
  {
    path: `${USER_PRIFIX}/my-booking`,
    component: () => import('./../pages/user/my-book-detail/Index.vue'),
    name: MY_BOOK_DETAIL,
    meta: { title: 'My Book Detail', roles: [CUSTOMER], auth: true }
  },
  {
    path: `${USER_PRIFIX}/tokens`,
    component: () => import('./../pages/common-modules/tokens/Index.vue'),
    name: USER_TOKENS,
    meta: { title: "My Token's", roles: [CUSTOMER], auth: true }
  },
  {
    path: `${USER_PRIFIX}/bookmark`,
    component: () => import('./../pages/user/bookmark/Index.vue'),
    name: USER_BOOK_MARK_DETAILS,
    meta: { title: "My Bookmark's", roles: [CUSTOMER], auth: true }
  }
]
