import {
  PUBLIC_HOME,
  ADMIN_DASHBOARD,
  AGENT_DASHBOARD,
  USER_DASHBOARD,
  USER_PRIFIX,
  AGENT_PRIFIX,
  ADMIN_PRIFIX
} from './types'
import { userChildren } from './userRoute'
import { publicChildren } from './publicRoute'
import { adminChildren } from './adminRoute'
import { agentChildren } from './agentRoute'

const routes = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    redirect: { name: PUBLIC_HOME },
    meta: { title: 'Public' },
    children: publicChildren
  },
  {
    path: ADMIN_PRIFIX,
    component: () => import('layouts/AdminLayout.vue'),
    meta: { title: 'Admin' },
    redirect: { name: ADMIN_DASHBOARD },
    children: adminChildren
  },
  {
    path: AGENT_PRIFIX,
    component: () => import('layouts/AgentLayout.vue'),
    redirect: { name: AGENT_DASHBOARD },
    meta: { title: 'Agent' },
    children: agentChildren
  },
  {
    path: USER_PRIFIX,
    component: () => import('layouts/UserLayout.vue'),
    redirect: { name: USER_DASHBOARD },
    meta: { title: 'User' },
    children: userChildren
  },
  {
    path: '/unauthorized',
    component: () => import('pages/unauthorized.vue'),
    meta: { title: 'Unauthorized 403' },
    name: 'Unauthorized'
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
    meta: { title: '404 Page Not Found' },
    name: 'pageNotFound'
  }

]

export default routes
