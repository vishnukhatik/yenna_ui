<template>
  <div class="modal_form_wrap">
    <h2><i class="fas fa-user"></i> Enter OTP</h2>
    <div class="modal_close" @click="$emit('close')"><i class="fas fa-times"></i></div>
      <ul>
        <li>
          <label :class="{ 'text-danger': errors.first('OTP') }">Enter OTP</label>
          <div class="dark_bg">
            <span class="fas fa-phone"></span>
            <input type="number" name="OTP" v-validate="'required'" v-model="otp">
          </div>
          <span
            class="eb-error-input text-danger"
            v-if="errors.first('OTP')"
          >
            {{ errors.first("OTP") }}</span
          >
        </li>
        <li>
          <input type="submit" :class="{ disabled: showLoader }" @click="verifyOTP" value="Submit"><b-spinner v-if="showLoader" label="Spinning"></b-spinner>
        </li>
      </ul>
  </div>
</template>
<script>
const tempHotelSignUpInfo = 'tempHotelSignUpInfo'
import {
  AUTH_SEND_OTP,
  AUTH_LOGIN
  // AUTH_VERIFY_OTP
} from '../../services/ENDPOINT'
// import { redirectUrl } from '../../mixins/redirectUrl'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      hotelSignUpInfo: JSON.parse(localStorage.getItem(tempHotelSignUpInfo)),
      otpSendPayload: {
        phoneNumber: ''
      },
      otp: '',
      showLoader: false,
      loginPatch: {}
    }
  },
  mounted () {
    this.otpSendPayload.phoneNumber = this.hotelSignUpInfo.phone
    // this.sendOtp()
  },
  methods: {
    async login () {
      try {
        this.$root.$loader(true)
        this.showLoader = true
        const result = await AUTH_LOGIN(this.loginPatch)
        console.log(result)
        this.$notify({
          group: 'eb-notification',
          title: 'SUCCESS! ',
          text: `Howdy ${result.loginInfo.loginDetails.firstName} ${result.loginInfo.loginDetails.lastName} ${result.loginInfo.loginDetails.middleName}, Welcome to the Yenna Rascala!`,
          type: 'success',
          duration: 7000
        })
        this.$store.dispatch('auth/setUser', result.loginInfo)
        this.$emit('close')
        // this.$emit('showLoginModal')
        // this.$router.push({ name: redirectUrl(result.loginInfo.loginDetails.type) })
        this.$router.push({ name: 'AGENT_ADD_HOTELS' })
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
    },
    async sendOtp () {
      try {
        this.$root.$loader(true)
        this.showLoader = true
        localStorage.setItem(tempHotelSignUpInfo, null)
        const result = await AUTH_SEND_OTP(this.otpSendPayload)
        console.log(result)
        this.$notify({
          group: 'eb-notification',
          title: 'SUCCESS! ',
          text: 'OTP Send Successfully',
          type: 'success',
          duration: 5000
        })
      } catch (err) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops!',
          text: err.message.text,
          type: 'error',
          duration: 5000
        })
      } finally {
        this.$root.$loader(false)
        this.showLoader = false
      }
    },
    async verifyOTP () {
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          this.showLoader = true
          setTimeout(() => {
            // this.$notify({
            //   group: 'eb-notification',
            //   title: 'SUCCESS! ',
            //   text: 'OTP Verify Successfully',
            //   type: 'success',
            //   duration: 5000
            // })
            this.loginPatch = this.hotelSignUpInfo
            this.login()
          }, 10)
        }
      })
      // try {
      //   this.$root.$loader(true)
      //   this.showLoader = true
      //   localStorage.setItem(tempHotelSignUpInfo, null)
      //   const result = await AUTH_VERIFY_OTP(this.otpSendPayload)
      //   console.log(result)
      //   this.$notify({
      //     group: 'eb-notification',
      //     title: 'SUCCESS! ',
      //     text: 'OTP Send Successfully',
      //     type: 'success',
      //     duration: 5000
      //   })
      // } catch (err) {
      //   this.$notify({
      //     group: 'eb-notification',
      //     title: 'Oops!',
      //     text: err.message.text,
      //     type: 'error',
      //     duration: 5000
      //   })
      // } finally {
      //   this.$root.$loader(false)
      //   this.showLoader = false
      // }
    }
  }
}
</script>
