<template>
<div class="content_menu_container">
  <div class="user_info_wrap" />
  <ul>
    <li v-for="(menu, index) of menuList" :key="index">
      <router-link :to="{name: menu.path}" :class="activeMenu(menu.active)">
        <i :class="menu.icon"></i> <span>{{menu.label}}</span>
      </router-link>
    </li>
    <li>
      <a @click="logout" ><i class="fa fa-key"></i> <span>Log Out</span></a>
    </li>
  </ul>
</div>
</template>
<script>
const menuList = [
  {
    icon: 'fas fa-border-all',
    label: 'Dashboard',
    path: 'ADMIN_DASHBOARD',
    active: ['ADMIN_DASHBOARD']
  },
  {
    icon: 'fas fa-hotel',
    label: 'Properties',
    path: 'ADMIN_PROPERTIES',
    active: ['ADMIN_PROPERTIES', 'ADMIN_PROPERTIES_ADD', 'ADMIN_PROPERTIES_EDIT', 'ADMIN_PROPERTIES_DETILAS']
  },
  {
    icon: 'fas fa-border-all',
    label: 'Booking History',
    path: 'ADMIN_BOOKING_HISTORY',
    active: ['ADMIN_BOOKING_HISTORY']
  },
  {
    icon: 'fas fa-border-all',
    label: 'TBO Booking History',
    path: 'ADMIN_TBO_HOTEL_BOOKING',
    active: ['ADMIN_TBO_HOTEL_BOOKING']
  },
  {
    icon: 'fas fa-users',
    label: 'Admin Users',
    path: 'ADMIN_USERS',
    active: ['ADMIN_USERS', 'ADMIN_USER_ADD', 'ADMIN_USER_EDIT']
  },
  {
    icon: 'fas fa-key',
    label: 'User Role',
    path: 'ADMIN_USER_ROLE',
    active: ['ADMIN_USER_ROLE']
  },
  {
    icon: 'fas fa-user',
    label: 'Customers',
    path: 'ADMIN_CUSTOMERS',
    active: ['ADMIN_CUSTOMERS']
  },
  {
    icon: 'fas fa-hand-holding-usd',
    label: 'Contact Information',
    path: 'ADMIN_INVESTER_INFORMATION',
    active: ['ADMIN_INVESTER_INFORMATION']
  },
  // {
  //   icon: 'fas fa-border-all',
  //   label: 'Request Management',
  //   path: 'ADMIN_REQUEST_MANAGMENT',
  //   active: ['ADMIN_REQUEST_MANAGMENT']
  // },
  // {
  //   icon: 'fas fa-file',
  //   label: 'Verification',
  //   path: 'ADMIN_VERIFICATION',
  //   active: ['ADMIN_VERIFICATION']
  // },
  {
    icon: 'fas fa-file',
    label: 'Content Page',
    path: 'ADMIN_CONTACT',
    active: ['ADMIN_CONTACT', 'ADMIN_CONTACT_ADD', 'ADMIN_CONTACT_EDIT']
  },
  {
    icon: 'fas fa-envelope',
    label: 'Subscribe',
    path: 'ADMIN_CONTACT_SUBSCRIBE',
    active: ['ADMIN_CONTACT_SUBSCRIBE']
  }
]
export default {
  name: 'AdminSideBar',
  data () {
    return {
      menuList
    }
  },
  methods: {
    activeMenu (menu) {
      if (menu.includes(this.$route.name)) return 'active'
    },
    logout () {
      const title = 'Confirmation!'
      const msg = 'Are you sure you want to logout'
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          this.$store.dispatch('auth/resetUser')
          this.$notify({
            group: 'eb-notification',
            title: 'SUCCESS! ',
            text: 'See you soon! Have a Good Day.',
            type: 'success',
            duration: 7000
          })
          this.$router.push('/')
        })
    }
  }
}
</script>
