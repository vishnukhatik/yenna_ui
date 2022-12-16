<template>
  <div class="modal_form_wrap">
    <h2><i class="fas fa-user"></i> Sign Up</h2>
    <div class="modal_close" @click="$emit('close')">
      <i class="fas fa-times"></i>
    </div>
    <ul>
      <li>
        <label :class="{ 'text-danger': errors.first('Hotel Name') }"
          >Hotel Name*</label
        >
        <div class="dark_bg">
          <span class="fas fa-hotel"></span>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="Enter Hotel Name"
            v-validate="'required|max:25|min:3'"
            standout="transparent"
            hide-bottom-space
            v-model="hotelInfo.hotelName"
            :dense="true"
            name="Hotel Name"
          />
        </div>
        <span
          class="eb-error-input text-danger"
          v-if="errors.first('Hotel Name')"
        >
          {{ errors.first("Hotel Name") }}</span
        >
      </li>
      <li>
        <label :class="{ 'text-danger': errors.first('Contact Name') }"
          >Contact Name*</label
        >
        <div class="dark_bg">
          <span class="far fa-user"></span>
          <q-input
           v-validate="'required|max:25|min:3'"
            autocorrect="off"
            autocapitalize="off"
            placeholder="Enter Contact Name"
            spellcheck="false"
            standout="transparent"
            hide-bottom-space
            v-model="hotelInfo.contactName"
            :dense="true"
            name="Contact Name"
          />
        </div>
        <span
          class="eb-error-input text-danger"
          v-if="errors.first('Contact Name')"
        >
          {{ errors.first("Contact Name") }}</span
        >
      </li>
      <li>
        <!-- <label :class="{ 'text-danger': errors.first('Phone') }">Phone*</label>
        <div class="dark_bg">
          <span class="fa fa-phone"></span>
          <q-input
            v-validate="'required|max:15|min:10'"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            standout="transparent"
            placeholder="Enter Phone"
            hide-bottom-space
            v-model="hotelInfo.phone"
            :dense="true"
            name="Phone"
          />
        </div>
        <span
          class="eb-error-input text-danger"
          v-if="errors.first('Phone')"
        >
          {{ errors.first("Phone") }}</span
        > -->
        <!-- <label :class="{ 'text-danger': errors.first('Phone') }">Phone</label> -->
        <label :class="{ 'text-danger': errors.first('Phone') }">Phone*</label>
        <div>
          <vue-phone-number-input
            id="hotelRegisterPhoneId"
            v-validate="'required'"
            @update="updatePhone"
            :dark="true"
            v-model="phone"
            placeholder="Please Enter Your Phone Number"
            name="Phone"
            default-country-code="IN"
            :class="{
              'is-invalid': errors.first('Phone'),
            }"
          />
        </div>
        <span class="eb-error-input text-danger" v-if="errors.first('Phone')">
          {{ errors.first("Phone") }}</span
        >
        <span v-else-if="phone && !phoneNumberValid" class="eb-error-input text-danger">
          {{ 'Phone Number Is Not Valid' }}
        </span>
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
            placeholder="Enter Email"
            hide-bottom-space
            v-model="hotelInfo.email"
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
            v-model="hotelInfo.password"
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
            v-model="hotelInfo.referralId "
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
        <input type="submit" value="Sign Up" :class="{ disabled: showLoader }" @click="hotelRegisterAction" /> <b-spinner v-if="showLoader" label="Spinning"></b-spinner>
        <a @click="$emit('show-login')">Login?</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { AUTH_HOTEL_REGISTER } from '../../services/ENDPOINT'
const tempHotelSignUpInfo = 'tempHotelSignUpInfo'
// import Axios from 'axios'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      hotelInfo: {
        email: '',
        password: '',
        type: 'HOTEL',
        contactName: '',
        hotelName: '',
        phone: '',
        referralId: ''
      },
      phone: '',
      showLoader: false,
      phoneNumberValid: false
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    updatePhone (v) {
      if (v.formatInternational) {
        this.phoneNumberValid = v.isValid
        this.hotelInfo.phone = v.formatInternational
      }
    },
    hotelRegisterAction () {
      this.$validator.validate().then(async (valid) => {
        if (valid && this.phoneNumberValid) {
          try {
            this.$root.$loader(true)
            this.showLoader = true
            localStorage.setItem(tempHotelSignUpInfo, null)
            const result = await AUTH_HOTEL_REGISTER(this.hotelInfo)
            // Axios.defaults.headers.common.authorization = `${result.hotelSignUpInfo.token}`
            console.log(result.hotelSignUpInfo.token)
            // this.$notify({
            //   group: 'eb-notification',
            //   title: 'SUCCESS! ',
            //   text: 'Hotel Register Successfully',
            //   type: 'success',
            //   duration: 5000
            // })
            this.closeModal()
            this.$router.push({ name: 'AGENT_ADD_HOTELS' })
            // this.$emit('showOtpPopup', result.hotelSignUpInfo)
            localStorage.setItem(tempHotelSignUpInfo, JSON.stringify(this.hotelInfo))
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
<style>
#hotelRegisterPhoneId input  {
  color: #8b8b8b !important;
  background-color: #101010 !important;
  border: solid!important;
  border-width: 0px!important;
  border-color: #fff!important;
  padding: 0!important;
  box-shadow: none !important;
}
#hotelRegisterPhoneId ::placeholder {
  color: #8b8b8b !important;
}
#hotelRegisterPhoneId .country-selector__label {
  color: #8b8b8b!important;
}
#hotelRegisterPhoneId .country-selector input {
  padding-left: 13px !important;
  padding-top: 5px !important;
}
</style>
