<template>
  <div class="main_container">
    <section class="duration_wrap">
      <div class="signin_form_container">
        <div class="signin_form" style="width: 390px;">
          <h1>{{ $route.meta.title }}</h1>
            <ul>
              <li>
                <label :class="{ 'text-danger': errors.first('Email') }">Email</label>
                <div class="dark_bg">
                  <span class="far fa-envelope"></span>
                  <input
                    type="email"
                    name="Email"
                    v-validate="'required|email'"
                    v-model="loginInfo.email"
                    placeholder="Please Enter Your Email"
                  >
                </div>
                  <span
                    class="eb-error-input text-danger"
                    v-if="errors.first('Email')"
                  >
                   {{ errors.first("Email") }}</span
                  >
              </li>
              <li>
                <label :class="{ 'text-danger': errors.first('Password') }"
                  >Password</label
                >
                <div class="dark_bg">
                  <span class="fas fa-key"></span>
                  <input
                    v-validate="'required|min:3|max:16'"
                    type="password"
                    name="Password"
                    v-model="loginInfo.password"
                    placeholder="Please Enter Your Password"
                  >
                </div>
                  <span
                    class="eb-error-input text-danger"
                    v-if="errors.first('Password')"
                  >
                   {{ errors.first("Password") }}</span
                  >
              </li>
              <li>
                <div class="custom-control custom-checkbox ">
                  <input type="checkbox" class="custom-control-input" id="customCheck"
                         name="example1">
                  <label class="custom-control-label" for="customCheck">Remember Me</label>
                </div>
              </li>
              <li>
                <input type="submit" style="color: black;font-weight: bold" :class="{ disabled: showLoader }" value="Sign In" @click="login"/>
                <span style="float: right;top: 22px !important;position: absolute;right: 9px;">
                  <b-spinner v-if="showLoader" label="Spinning"></b-spinner>
                </span>
              </li>
            </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import { redirectUrl } from 'src/mixins/redirectUrl'
import { AUTH_ADMIN_LOGIN } from 'src/services/auth'
// import Axios from 'axios'

export default {
  name: 'CPanelLogin',
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      loginInfo: {
        email: '',
        password: ''
      },
      showLoader: false
    }
  },
  methods: {
    login () {
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          try {
            this.$root.$loader(true)
            this.showLoader = true
            const result = await AUTH_ADMIN_LOGIN(this.loginInfo)
            // Axios.defaults.headers.common.authorization = `${result.token}`
            this.$notify({
              group: 'eb-notification',
              title: 'SUCCESS! ',
              text: `Howdy ${result.loginDetails.firstName} ${result.loginDetails.lastName}, Welcome to the Yenna Rascala!`,
              type: 'success',
              duration: 7000
            })
            console.log(result)
            this.$store.dispatch('auth/setUser', result)
            this.$router.push({ name: 'ADMIN_DASHBOARD' })
          } catch (err) {
            this.$notify({
              group: 'eb-notification',
              title: 'Oops',
              text: err?.message?.errors[0]?.message ?? 'Something Went Wrong',
              type: 'error',
              duration: 5000
            })
          } finally {
            this.$root.$loader(false)
            this.showLoader = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
