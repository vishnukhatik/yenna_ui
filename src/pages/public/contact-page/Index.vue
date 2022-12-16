<template>
  <div class="main_container contact_info_container">
    <div class="main_bg" id="contact_bg"></div>
    <div class="container">
    <h1 class="contact_pg_title">Get In Touch</h1>
    <p class="contact_pg_desc"></p>
    <div class="contact_details_container">
      <div class="contact_form_container">
        <h6>Do you have any question or comments? We are here to help</h6>
          <ul>
            <li>
              <p>First Name*</p>
              <div class="input_block form-group">
                <input type="text" class="form-control"
                 placeholder="Please Enter Your First Name"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  v-validate="'required|min:2|max:50'"
                  standout="transparent"
                  hide-bottom-space
                  :dense="true"
                  v-model="contactInfo.firstName"
                  name="First Name">
                  <span
                    class="eb-error-input text-danger"
                    v-if="errors.first('First Name')"
                  >
                    {{ errors.first("First Name") }}</span
                  >
              </div>
            </li>
            <li>
              <p>Last Name*</p>
              <div class="input_block form-group">
                <input type="text" class="form-control"
                 placeholder="Please Enter Your Last Name"
                 autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  v-validate="'required|min:2|max:50'"
                  standout="transparent"
                  hide-bottom-space
                  :dense="true"
                  v-model="contactInfo.lastName"
                  name="Last Name">
                  <span
                    class="eb-error-input text-danger"
                    v-if="errors.first('Last Name')"
                  >
                    {{ errors.first("Last Name") }}</span
                  >
              </div>
            </li>
            <li>
              <p>Email*</p>
              <div class="input_block form-group">
                <input type="email" class="form-control"
                 placeholder="Please Enter Your Email"
                 autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  v-validate="'required|email'"
                  standout="transparent"
                  hide-bottom-space
                  :dense="true"
                  v-model="contactInfo.email"
                  name="Email">
                  <span
                    class="eb-error-input text-danger"
                    v-if="errors.first('Email')"
                  >
                    {{ errors.first("Email") }}</span
                  >
              </div>
            </li>
            <li>
              <p>Phone Number</p>
              <div class="input_block form-group contactInfo-phone">
                <vue-phone-number-input
                  id="checkOutPhone"
                  v-validate="'required'"
                  @update="updatePhone"
                  :dark="true"
                  v-model="phone"
                  placeholder="Please Enter Your Phone Number"
                  name="Phone Number"
                  default-country-code="IN"
                  :class="{
                      'is-invalid': errors.first('Phone Number'),
                    }"
                />
                  <span
                    class="eb-error-input text-danger"
                    v-if="errors.first('Phone Number')"
                  >
                    {{ errors.first("Phone Number") }}</span
                  >
                  <span v-else-if="phone && !phoneNumberValid" class="eb-error-input text-danger">
                    {{ 'Phone Number Is Not Valid' }}
                  </span>
              </div>
            </li>
            <li>
              <p>Message*</p>
              <div class="input_block form-group">
                <textarea name="Message" class="form-control"
                  placeholder="Please Enter Messages"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  v-validate="'required|max:650'"
                  standout="transparent"
                  hide-bottom-space
                  :dense="true"
                  v-model="contactInfo.message"
                  ></textarea>
                  <span
                    class="eb-error-input text-danger"
                    v-if="errors.first('Message')"
                  >
                    {{ errors.first("Message") }}</span
                  >
              </div>
            </li>
            <li>
              <button type="submit" class="btn contact_form_sbmt { disabled: showLoader }" @click="contactSubmit">Submit</button>
              <span style="position:relative;right:32px;top:13px;"><b-spinner v-if="showLoader" label="Spinning" style="color: #333;"></b-spinner></span>
            </li>
          </ul>
      </div>
      <div class="contact_address_container">
        <h2>Contact Information</h2>
        <ul>
          <li>
            <i class="fas fa-map-marker-alt"></i>
            <p>{{ contactAddress.address }}</p>
          </li>
          <li>
            <i class="fas fa-envelope"></i>
            <p>{{ contactAddress.email }}</p>
          </li>
          <li>
            <i class="fas fa-mobile-alt"></i>
            <p>{{ contactAddress.mobile }}</p>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { PUBLIC_SAVE_INVESTER_FORM } from '../../../services/ENDPOINT'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'Contact-Page',
  data () {
    return {
      contactAddress: {
        mobile: '+91 7680899602',
        email: 'info@yennarascala.com',
        address: '5TH FLOOR, TECHNO RESIDENCY, PHASE 2, HITEC CITY, HYDERABAD, TELANGANA 500081'
      },
      phone: '',
      contactInfo: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        messages: ''
      },
      showLoader: false,
      phoneNumberValid: false
    }
  },
  methods: {
    updatePhone (v) {
      if (v.formatInternational) {
        this.phoneNumberValid = v.isValid
        this.contactInfo.phoneNumber = v.formatInternational
      }
    },
    contactSubmit () {
      this.$validator.validate().then(async (valid) => {
        if (valid && this.phoneNumberValid) {
          try {
            this.$root.$loader(true)
            this.showLoader = true
            await PUBLIC_SAVE_INVESTER_FORM(this.contactInfo)
            this.$swal({
              title: 'Success',
              text: 'Successfully Added Your Information - Yenna Rascala',
              icon: 'success'
            }).then((result) => {
              $('html, body').animate({ scrollTop: 0 }, 'slow')
            })
            this.contactInfo = this._.cloneDeep({
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              messages: ''
            })
            this.phone = ''
            this.$validator.reset()
          } catch (err) {
            this.$swal({
              title: 'Warning',
              text: ' Sorry Something Wrong. - Yenna Rascala',
              icon: 'warning'
            }).then((result) => {
              $('html, body').animate({ scrollTop: 0 }, 'slow')
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
.contactInfo-phone .country-selector__country-flag .iti-flag-small{
  left: 0 !important
}
.contactInfo-phone input{
padding-top: 0 !important;
}
</style>
