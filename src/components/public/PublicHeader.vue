<template>
  <div>
    <header class="header">
      <nav class="navbar navbar-expand-md navbar-light">
        <router-link :to="{ name: 'PUBLIC_HOME' }">
          <a class="navbar-brand"
            ><img src="~/assets/images/logo_small.png" class="img-fluid pt-3" alt="Yenna Rascala"
          /></a>
        </router-link>
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
              <router-link :to="{ name: 'PUBLIC_ALL_HOTEL' }">
                <a class="nav-link text-light px-3">HOTELS</a>
              </router-link>
            </li>
<!--            <li class="nav-item">-->
<!--              &lt;!&ndash; <router-link :to="{ name: 'PUBLIC_ABOUT_US' }"> &ndash;&gt;-->
<!--              <a class="nav-link text-light px-3">ABOUT US</a>-->
<!--              &lt;!&ndash; </router-link> &ndash;&gt;-->
<!--            </li>-->
            <li class="nav-item">
             <router-link :to="{ name: 'PUBLIC_CONTACT_PAGE' }">
              <a class="nav-link text-light px-3">CONTACT</a>
             </router-link>
            </li>
            <li class="nav-item">
              <div class="signin_container" v-if="!loggedIn">
                <ul>
                  <li>
                    <a
                      class="nav-link text-light user_signin_togl"
                      @click="$bvModal.show('loginModal')"
                      ><i class="fas fa-user-circle"></i> Login</a
                    >
                    /
                  </li>
                  <li class="menu_signup_toggle">
                    <a class="nav-link text-light" href="signup.html"
                      >Sign Up</a
                    >
                    <div class="acc_submenu_wrap">
                      <ul>
                        <li>
                          <a
                            @click="$bvModal.show('userRegisterModal')"
                            class="user_signup_togl"
                            ><i class="fas fa-user"></i> User</a
                          >
                        </li>
                        <li>
                          <a
                            @click="$bvModal.show('hotelRegisterModal')"
                            class="hotel_signup_togl"
                            ><i class="fas fa-hotel"></i> Hotelier</a
                          >
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-if="loggedIn" class="user_acc_menu_container">
                <div class="user_acc_menu_name" v-if="loggedIn && userInfo">
                  <i
                    class="fas fa-user-circle mr-2"
                    v-if="loggedInUserType == 'CUSTOMER'"
                  ></i
                  ><span v-if="loggedInUserType == 'CUSTOMER'">
                    {{
                      `${userInfo.firstName} ${userInfo.middleName} ${userInfo.lastName}`
                    }}
                  </span>
                  <i
                    class="fas fa-user-circle mr-2"
                    v-if="loggedInUserType == 'HOTEL'"
                  ></i
                  ><span v-if="loggedInUserType == 'HOTEL'">{{
                    `${userInfo.hotelName}`
                  }}</span>
                  <i
                    class="fas fa-user-circle mr-2"
                    v-if="loggedInUserType == 'ADMIN'"
                  ></i
                  ><span v-if="loggedInUserType == 'ADMIN'">
                    {{ `${userInfo.firstName} ${userInfo.lastName}` }}
                  </span>
                </div>
                <div class="acc_submenu_wrap">
                  <ul>
                    <li>
                      <a @click="redirectDashboard" class="user_signup_togl"
                        ><i class="fas fa-border-all"></i> Dashboard</a
                      >
                    </li>
                    <li v-if="loggedInUserType == 'CUSTOMER'">
                      <router-link
                        :to="{ name: 'MY_BOOK_DETAIL' }"
                        class="hotel_signup_togl"
                      >
                        <i class="fas fa-info-circle"></i> My Booking
                      </router-link>
                    </li>
                    <li v-if="loggedInUserType == 'CUSTOMER'">
                      <router-link
                        :to="{ name: 'USER_BOOK_MARK_DETAILS' }"
                        class="hotel_signup_togl"
                      >
                        <i class="far fa-bookmark"></i> Bookmark
                      </router-link>
                    </li>
                    <li v-if="loggedInUserType == 'CUSTOMER'">
                      <router-link
                        :to="{ name: 'USER_PROFILE' }"
                        class="hotel_signup_togl"
                      >
                        <i class="fas fa-user"></i> Profile
                      </router-link>
                    </li>
                    <li>
                      <a @click="logout" class="hotel_signup_togl"
                        ><i class="fas fa-power-off"></i> Logout</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li class="nav-item" v-if="loggedIn && false">
              <yo-token/>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <div class="modal-main-div">
      <b-modal v-model="isShowLoginPopup" id="loginModal" hide-footer hide-header no-fade>
        <div class="modal_container">
          <div class="modal_overlay"></div>
          <login-modal
            @close="$bvModal.hide('loginModal')"
            @showforgotpasswordmodal="showForgotPassword"
          />
        </div>
      </b-modal>
      <b-modal id="userRegisterModal" hide-footer hide-header no-fade>
        <div class="modal_container">
          <div class="modal_overlay"></div>
          <user-register-modal
            @showforgotpasswordmodal="showForgotPassword"
            @close="$bvModal.hide('userRegisterModal')"
            @show-login="
              $bvModal.hide('userRegisterModal');
              $bvModal.show('loginModal');
            "
          />
        </div>
      </b-modal>
      <b-modal id="hotelRegisterModal" hide-footer hide-header no-fade>
        <div class="modal_container">
          <div class="modal_overlay"></div>
          <hotel-register-modal
            @showforgotpasswordmodal="showForgotPassword"
            @close="$bvModal.hide('hotelRegisterModal')"
            @show-login="$bvModal.hide('hotelRegisterModal')"
            @showOtpPopup="$bvModal.show('otpModal')"
          />
        </div>
      </b-modal>
      <b-modal id="forgotRegisterModal" hide-footer hide-header no-fade>
        <div class="modal_container">
          <div class="modal_overlay"></div>
          <forgot-password-modal
            @close="$bvModal.hide('forgotRegisterModal')"
          />
        </div>
      </b-modal>
      <b-modal id="otpModal" hide-footer hide-header no-fade>
        <div class="modal_container">
          <div class="modal_overlay"></div>
          <otp-modal
            @showLoginModal="$bvModal.show('loginModal')"
            @close="$bvModal.hide('otpModal')"
          />
        </div>
      </b-modal>
      <b-modal id="ResetPasswordModal" hide-footer hide-header no-fade>
        <div class="modal_container">
          <div class="modal_overlay"></div>
          <reset-password
            @show-login="
              $bvModal.hide('ResetPasswordModal');
              $bvModal.show('loginModal');
            "
            @close="$bvModal.hide('ResetPasswordModal')"
          />
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import loginModal from './LoginModal'
import UserRegisterModal from './UserRegisterModal'
import HotelRegisterModal from './HotelRegisterModal'
import ForgotPasswordModal from './ForgotPasswordModal'
import OtpModal from './OtpModal'
import ResetPassword from './ResetPassword'
import { mapGetters } from 'vuex'
import { redirectUrl } from './../../mixins/redirectUrl'
import YoToken from '../common/YoToken'
export default {
  components: {
    loginModal,
    UserRegisterModal,
    HotelRegisterModal,
    ForgotPasswordModal,
    OtpModal,
    ResetPassword,
    YoToken
  },
  data () {
    return {
      resetPassowrdToken: '',
      isShowLoginPopup: false
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    })
  },
  mounted () {
    if (this.$route.query && this.$route.query.reset) {
      this.resetPassowrdToken = this.$route.query.reset
      this.$bvModal.show('ResetPasswordModal')
    }
  },
  watch: {
    isShowLoginPopup (v) {
      if (!v) this.$router.push(`${this.$route.path}`)
      else this.$router.push(`${this.$route.path}?login=${true}`)
    },
    $route (value) {
      if (value.query.login) {
        this.$bvModal.show('loginModal')
      } else if (value.query.register) {
        this.$bvModal.show('userRegisterModal')
      }
    }
  },
  methods: {
    redirectDashboard () {
      this.$router.push({ name: redirectUrl(this.loggedInUserType) })
    },
    showOtpPopup (token) {
      this.$bvModal.show('otpModal')
    },
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
    },
    showForgotPassword () {
      this.$bvModal.hide('userRegisterModal')
      this.$bvModal.hide('loginModal')
      this.$bvModal.hide('hotelRegisterModal')
      this.$bvModal.show('forgotRegisterModal')
    }
  }
}
</script>
