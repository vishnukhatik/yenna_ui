<template>
  <div class="q-pa-md" style="background-color: #1f1f1f">
    <q-layout view="hHh Lpr lff ma-2" padding style="height: 300px">
      <q-header class="header-color">
        <q-toolbar>
          <q-toolbar-title
            ><img
              style="height: 65px"
              src="~/assets/images/logo_small.png"
              class="img-fluid"
              @click="drawer = !drawer"
          />
          <q-btn style="left: 200px;" @click="drawer = !drawer" dense icon="menu" />
          </q-toolbar-title>
          <q-btn flat label="HOME" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="240"
        :breakpoint="500"
      >
        <q-scroll-area class="fit eb-custom" style="background-color: #1f1f1f">
          <q-img class="" style="height: 150px;">
            <div class="bg-transparent">
              <q-avatar size="90px" class="q-mb-sm text-center">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </div>
            <div class="username">
              <span>Razvan Stoenescu</span>
              <div>@rstoenescu</div>
            </div>
          </q-img>
          <q-list>
            <q-separator :key="'sep'" />
            <template v-for="(menuItem, index) in menuList">
              <q-item
                :key="index"
                clickable
                class="eb-menu"
                :class="activeMenu(menuItem.path)"
              >
                <q-item-section avatar class="eb-img">
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  <router-link :to="{ name: menuItem.path }">
                    <span class="eb-black">{{ menuItem.label }}</span>
                  </router-link>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container>
        <transition name="fade">
          <router-view />
        </transition>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
const menuList = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    path: 'ADMIN_DASHBOARD'
  },
  {
    icon: 'inbox',
    label: 'Leads',
    path: 'ADMIN_LEADS'
  },
  {
    icon: 'book',
    label: 'Booking History',
    path: 'ADMIN_BOOKING_HISTORY'
  },
  {
    icon: 'dashboard',
    label: 'Wishlist',
    path: 'ADMIN_WISHLIST'
  },
  {
    icon: 'inbox',
    label: 'Tours',
    path: 'ADMIN_TOURS'
  },
  {
    icon: 'hotel',
    label: 'Hotels',
    path: 'ADMIN_HOTELS'
  },
  {
    icon: 'inbox',
    label: 'Request Management',
    path: 'ADMIN_REQUEST_MANAGMENT'
  },
  {
    icon: 'hotel',
    label: 'Verification',
    path: 'ADMIN_VERIFICATION'
  }
]
export default {
  name: 'MainLayout',
  data () {
    return {
      drawer: false,
      menuList
    }
  },
  components: {},
  methods: {
    activeMenu (menu) {
      if (this.$route.name === menu) return 'active-menu'
    }
  }
}
</script>
<style scoped>
.header-color {
  background-color: #222222;
}
.eb-custom .bg-transparent {
  padding: 4px;
  padding-left: 80px;
}
.eb-custom .username {
  position: relative;
  background-color: transparent;
  top: 80px;
  font-size: 12px;
  text-align: center;
}
.fade-enter-active {
  transition: opacity 0.7s ease;
}
.fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity 0.7s;
}
.router-link-exact {
  color: #fff
}
.eb-menu {
  background-color: #222222;
  color: #fff
}
.active-menu {
  background-color: #ffc30d;
}
.eb-black {
  color: #fff;
}
.active-menu .router-link-active, .active-menu .eb-img, .active-menu .eb-black{
  color: #111 !important
}
</style>
