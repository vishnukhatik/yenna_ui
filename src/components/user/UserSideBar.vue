<template>
<div class="content_menu_container">
  <div class="user_info_wrap" />
  <ul>
    <li v-for="(menu, index) of menuList" :key="index">
      <router-link :to="{name: menu.path}" :class="activeMenu(menu.active)">
        <i :class="menu.icon"></i> <span>{{menu.label}}</span>
      </router-link>
    </li>
    <li class="pl-2">
      <a @click="logout()" ><i class="fa fa-key"></i> <span>Log Out</span></a>
    </li>
  </ul>
</div>
</template>
<script>
const menuList = [
  {
    icon: 'fas fa-border-all',
    label: 'Dashboard',
    path: 'USER_DASHBOARD',
    active: ['USER_DASHBOARD']
  },
  {
    icon: 'fas fa-info-circle',
    label: 'My Booking',
    path: 'MY_BOOK_DETAIL',
    active: ['MY_BOOK_DETAIL']
  },
  // {
  //   icon: 'fas fa-coins',
  //   label: 'Token',
  //   path: 'USER_TOKENS',
  //   active: ['USER_TOKENS']
  // },
  {
    icon: 'fas fa-bookmark',
    label: 'Bookmark',
    path: 'USER_BOOK_MARK_DETAILS',
    active: ['USER_BOOK_MARK_DETAILS']
  }
  // {
  //   icon: 'far fa-life-ring',
  //   label: 'Help',
  //   path: '',
  //   active: []
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
