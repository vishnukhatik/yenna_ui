<template>
  <div class="modal_form_wrap">
    <h2><i class="fas fa-house-user"></i> Sign Up</h2>
    <div class="modal_close" @click="closeModal">
      <i class="fas fa-times"></i>
    </div>
    <ul>
      <li>
        <label :class="{ 'text-danger': errors.first('Frist Name') }"
          >First Name*</label
        >
        <div class="dark_bg">
          <span class="far fa-user"></span>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="Enter First Name"
            v-validate="'required|max:25|min:3'"
            standout="transparent"
            hide-bottom-space
            v-model="loginInfo.firstName"
            :dense="true"
            name="Frist Name"
          />
        </div>
        <span
          class="eb-error-input text-danger"
          v-if="errors.first('Frist Name')"
        >
          {{ errors.first("Frist Name") }}</span
        >
      </li>
      <li>
        <label :class="{ 'text-danger': errors.first('Middle Name') }"
          >Middle Name</label
        >
        <div class="dark_bg">
          <span class="far fa-user"></span>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="Enter Middle Name"
            v-validate="'max:25'"
            standout="transparent"
            hide-bottom-space
            v-model="loginInfo.middleName"
            :dense="true"
            name="Middle Name"
          />
        </div>
        <span
          class="eb-error-input text-danger"
          v-if="errors.first('Middle Name')"
        >
          {{ errors.first("Middle Name") }}</span
        >
      </li>
      <li>
        <label :class="{ 'text-danger': errors.first('Last Name') }"
          >Last Name*</label
        >
        <div class="dark_bg">
          <span class="far fa-user"></span>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            v-validate="'required|max:25|min:3'"
            standout="transparent"
            placeholder="Enter Last Name"
            hide-bottom-space
            v-model="loginInfo.lastName"
            :dense="true"
            name="Last Name"
          />
        </div>
        <span
          class="eb-error-input text-danger"
          v-if="errors.first('Last Name')"
        >
          {{ errors.first("Last Name") }}</span
        >
      </li>
      <li>
        <label :class="{ 'text-danger': errors.first('Email') }">Email*</label>
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
        <label :class="{ 'text-danger': errors.first('Referral Email') }">Referral Email </label>
        <div class="dark_bg">
          <span class="fa fa-smile"></span>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            v-validate="'email'"
            standout="transparent"
            hide-bottom-space
            placeholder="Enter Referral Email"
            v-model="loginInfo.referralId "
            :dense="true"
            name="Referral Email"
          />
        </div>
        <span class="eb-error-input text-danger" v-if="errors.first('Referral Email')">
          {{ errors.first("Referral Email") }}</span
        >
      </li>
      <li>
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="remember"
            name="example1"
          />
          <label class="custom-control-label" for="remember">Remember Me</label>
        </div>
      </li>
      <li>
        <input
          type="submit"
          :class="{ disabled: showLoader }"
          @click="userRegisterAction"
          value="Sign Up"
        /> <b-spinner v-if="showLoader" label="Spinning"></b-spinner>
        <a @click="$emit('show-login')">Login?</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { AUTH_USER_REGISTER } from '../../services/ENDPOINT'
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
        firstName: '',
        middleName: '',
        lastName: '',
        referralId: '',
        type: 'CUSTOMER'
      },
      showLoader: false
    }
  },
  methods: {
    closeModal () {
      this.$router.push({ name: this.$route.name })
      this.$emit('close')
    },
    userRegisterAction () {
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          try {
            this.$root.$loader(true)
            this.showLoader = true
            const result = await AUTH_USER_REGISTER(this.loginInfo)
            this.$notify({
              group: 'eb-notification',
              title: 'SUCCESS! ',
              text: `Howdy ${result.userSignUpInfo.userSignUp.firstName} ${result.userSignUpInfo.userSignUp.middleName} ${result.userSignUpInfo.userSignUp.lastName}, Welcome to the Yenna Rascala!`,
              type: 'success',
              duration: 7000
            })
            const data = {
              token: result.userSignUpInfo.token,
              loginDetails: result.userSignUpInfo.userSignUp
            }
            // Axios.defaults.headers.common.authorization = `${result.userSignUpInfo.token}`
            this.$store.dispatch('auth/setUser', data)
            this.$emit('close')
            // this.$router.push({ name: redirectUrl(result.userSignUpInfo.userSignUp.type) })
          } catch (err) {
            console.log(err.message.text)
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
