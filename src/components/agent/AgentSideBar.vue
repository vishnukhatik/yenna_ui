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
    path: 'AGENT_DASHBOARD',
    active: ['AGENT_DASHBOARD']
  },
  {
    icon: 'fas fa-hotel',
    label: 'Properties',
    path: 'AGENT_PROPERTIES',
    active: ['AGENT_PROPERTIES', 'AGENT_PROPERTIES_ADD', 'AGENT_PROPERTIES_EDIT', 'AGENT_PROPERTIES_DETAILS']
  },
  {
    icon: 'fas fa-clipboard-list',
    label: 'Booking History',
    path: 'AGENT_HOTEL_BOOKING_HISTORY',
    active: ['AGENT_HOTEL_BOOKING_HISTORY']
  }
  // {
  //   icon: 'fas fa-coins',
  //   label: 'Token',
  //   path: 'AGENT_TOKENS',
  //   active: ['AGENT_TOKENS']
  // }
  // {
  //   icon: 'fas fa-hotel',
  //   label: 'My Leads',
  //   path: 'AGENT_ADD_HOTELS',
  //   active: ['AGENT_ADD_HOTELS']
  // }
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
