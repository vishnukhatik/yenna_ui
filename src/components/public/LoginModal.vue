<template>
  <div class="modal_form_wrap">
    <h2><i class="fas fa-user"></i> Sign In to your Account</h2>
    <div class="modal_close" @click="closeModal">
      <i class="fas fa-times"></i>
    </div>
    <ul>
       <li>
        <label :class="{ 'text-danger': errors.first('Email') }">Email</label>
        <div class="dark_bg">
          <span class="far fa-envelope"></span>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            v-validate="'required|email'"
            standout="transparent"
            hide-bottom-space
            placeholder="Enter Email"
            v-model="loginInfo.email"
            :dense="true"
            name="Email"
          />
        </div>
        <span class="eb-error-input text-danger" v-if="errors.first('Email')">
          {{ errors.first("Email") }}</span
        >
      </li>
      <li>
        <label :class="{ 'text-danger': errors.first('Password') }"
          >Password</label
        >
        <div class="dark_bg">
          <span class="fas fa-key"></span>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            v-validate="'required|strong_password'"
            type="password"
            standout="transparent"
            placeholder="Enter Password"
            hide-bottom-space
            v-model="loginInfo.password"
            :dense="true"
            name="Password"
          />
        </div>
        <span
          class="eb-error-input text-danger"
          v-if="errors.first('Password')"
        >
          {{ errors.first("Password") }}</span
        >
      </li>
      <li>
        <div class="dark_bg">
          <div class="row">
            <div class="col-md-2">
              <span class="fas fa-users pl-4"></span>
            </div>
            <div class="col-md-10" style="margin-left: -20px !important;">
              <select class="form-control login-select" v-model="loginInfo.type">
                <option v-for="(item, inx) of [{label:'User', 'id':'CUSTOMER'}, {label:'Hotel', id:'HOTEL'}]" :key="inx" :value="item.id">{{item.label}}</option>
              </select>
            </div>
          </div>
          <!-- <span class="fas fa-key"></span> -->
        </div>
      </li>
      <li>
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="remember"
            name="example1"
          />
          <label class="custom-control-label" for="remember"
            >Remember Me</label
          >
        </div>
      </li>
      <li>
        <input type="submit" :class="{ disabled: showLoader }" value="Sign In" @click="login"/> <b-spinner v-if="showLoader" label="Spinning"></b-spinner>
        <a @click="$emit('showforgotpasswordmodal')">Forgot Password?</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { AUTH_LOGIN } from '../../services/ENDPOINT'
// import { redirectUrl } from '../../mixins/redirectUrl'
// import Axios from 'axios'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      loginInfo: {
        email: '',
        password: '',
        type: 'CUSTOMER'
      },
      showLoader: false
    }
  },
  mounted () {
    // if (this.$route.query.login === 'true') {
    //   this.$router.push({ name: this.$route.name })
    // }
  },
  methods: {
    closeModal () {
      this.$router.push({ name: this.$route.name })
      this.$emit('close')
    },
    login () {
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          try {
            this.$root.$loader(true)
            this.showLoader = true
            const result = await AUTH_LOGIN(this.loginInfo)
            if (this.loginInfo.type === 'CUSTOMER') {
              this.$notify({
                group: 'eb-notification',
                title: 'SUCCESS! ',
                text: `Howdy ${result.loginInfo.loginDetails.firstName} ${result.loginInfo.loginDetails.lastName} ${result.loginInfo.loginDetails.middleName}, Welcome to Yenna Rascala!`,
                type: 'success',
                duration: 7000
              })
            } else {
              this.$notify({
                group: 'eb-notification',
                title: 'SUCCESS! ',
                text: `Howdy ${result.loginInfo.loginDetails.contactName}, Welcome to Yenna Rascala!`,
                type: 'success',
                duration: 7000
              })
            }
            console.log(result.loginInfo)
            this.$store.dispatch('auth/setUser', result.loginInfo)
            // Axios.defaults.headers.common.authorization = `${result.loginInfo.token}`
            this.$emit('close')
            this.$router.push({ name: this.$route.name })
            // if (this.$route.query.login === 'true') {
            // } else {
            //   // this.$router.push({ name: redirectUrl(result.loginInfo.loginDetails.type) })
            // }
            // this.closeModal()
          } catch (err) {
            this.$notify({
              group: 'eb-notification',
              title: 'Oops!',
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
.login-select {
  background-color: #101010;
  border: none;
  color: white;
  /* margin-left: 22px; */
}
.login-select option {
  background-color: white;
  /* margin-right: 22px; */
}
.login-select:active, .login-select:focus, .login-select:focus-within, .login-select:visited  {
  border: none;
  border-color: transparent;
}
</style>
