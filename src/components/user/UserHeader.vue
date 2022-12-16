<template>
  <header class="dash_header user_dashboard">
    <div class="left_logo d-flex align-items-center h-100">
      <div class="d-block d-lg-none d-xl-none mr-1" @click="$emit('toggle-sidebar', sidebarToogle)">
        <svg xmlns="http://www.w3.org/2000/svg"   width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu "><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </div>
        <router-link :to="{name: 'PUBLIC_HOME'}">
          <img
            src="~/assets/images/logo_small.png"
            class="img-fluid"
            alt="Yenna Rascala"
          />
        </router-link>
      </div>
    <div class="right_menu">
      <nav class="navbar navbar-expand-md navbar-light">
        <button
          type="button"
          class="navbar-toggler bg-light"
          data-toggle="collapse"
          data-target="#nav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-between right"
          id="nav"
        >
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
               <router-link :to="{ name: 'PUBLIC_HOME' }">
                <a class="nav-link text-light px-3">HOME</a>
              </router-link>
            </li>
             <li class="nav-item">
              <router-link :to="{ name: 'PUBLIC_HOTEL' }">
                <a class="nav-link text-light px-3">HOTELS</a>
              </router-link>
<!--            <li class="nav-item">-->
<!--              <a class="nav-link text-light px-3" href="#">ABOUT US</a>-->
<!--            </li>-->
            <li class="nav-item">
              <router-link :to="{ name: 'PUBLIC_CONTACT_PAGE' }">
                <a class="nav-link text-light px-3">CONTACT</a>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <div class="dash_menu_list_container">
        <ul>
<!-- Style temp css-->
          <li class="dash_menu_item headr_accnt_menu" style="top: 30px;display: flex;right: 19px;align-items: center;">
            <i class="far fa-user-circle user-icon"></i><a class="dash_menu_item_name" href="#">{{
              `${userInfo.firstName} ${userInfo.middleName} ${userInfo.lastName}`
            }}</a>
            <div class="acc_submenu_wrap profile-dropdown-list">
              <ul>
                <li  style="width: 100%;">
                  <router-link :to="{name: 'USER_DASHBOARD'}">
                    <i class="fas fa-home"></i>Dashboard
                  </router-link>
                </li>
                <li style="width: 100%;">
                  <router-link
                    :to="{ name: 'MY_BOOK_DETAIL' }"
                    class="hotel_signup_togl"
                  >
                    <i class="fas fa-info-circle"></i> My Booking
                  </router-link>
                </li>
                <li style="width: 100%;">
                  <router-link
                    :to="{ name: 'USER_BOOK_MARK_DETAILS' }"
                    class="hotel_signup_togl"
                  >
                    <i class="far fa-bookmark"></i> Bookmark
                  </router-link>
                </li>
                <li  style="width: 100%;">
                  <router-link :to="{name: 'USER_PROFILE'}">
                    <i class="fas fa-user"></i>Profile
                  </router-link>
                </li>
                <li  style="width: 100%;">
                  <a @click="logout" class="hotel_signup_togl"
                    ><i class="fas fa-power-off"></i> Logout</a
                  >
                </li>
              </ul>
            </div>
          </li>
          <!-- Header Tokens Display -->
           <li class="nav-item" v-show="false">
              <yo-token/>
            </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
import yoToken from '../common/YoToken'
import { mapGetters } from 'vuex'

export default {
  components: { yoToken },
  data () {
    return {
      sidebarToogle: false
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    })
  },
  methods: {
    logout () {
      const title = 'Confirmation!'
      const msg = 'Are you sure you want to logout'
      this.$root.$confirm(title, msg).then(async (confirmed) => {
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
<style>
.user_dashboard .dash_menu_list_container ul li{
  padding: 0 !important;
}
.user_dashboard .yr_token_sm_view_wrap ul {
  width: 50%;
  float: right;
}
.dash_menu_list_container .headr_accnt_menu {
  padding: 28px 0 !important;
}
.user_dashboard .acc_submenu_wrap {
  top: 25px !important;
}
.user_dashboard .yr_token_sm_view_wrap {
  right: 21px;
  top: 14px;
}
.user_dashboard .headr_accnt_menu{
  top: -7px;
}
.user_dashboard .yr_token_lg_view_wrap {
  right: 22px;
  top: 70px;
}
</style>
