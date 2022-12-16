<template>
  <div class="row">
    <div class="col-md-6">
      <b-card-group deck>
        <b-card header-tag="header" style="background-color: #222222!important"  bg-variant="dark" footer-tag="footer">
          <template #header>
            <h6 class="mb-0">Profile Overview</h6>
          </template>
          <div class="reg_form_wrap">
        <div class="row">
          <div class="col-md-12">
            <div class="dash_inut_group_container">
              <ul>
                <li>
                  <label :class="{ 'text-danger': errors.first('Contact Name') }"
                  >Contact Name</label
                  >
                  <div class="input_block form-group">
                    <input
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      v-validate="'required|max:25|min:3'"
                      standout="transparent"
                      hide-bottom-space
                      v-model="loginInfo.contactName"
                      :dense="true"
                      name="Contact Name"
                      class="form-control"
                      placeholder="Enter Contact Name"
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
                  <label :class="{ 'text-danger': errors.first('Hotel Name') }"
                  >Hotel Name</label
                  >
                  <div class="input_block form-group">
                    <input
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      v-validate="'required|max:25|min:3'"
                      standout="transparent"
                      hide-bottom-space
                      v-model="loginInfo.hotelName"
                      :dense="true"
                      name="Hotel Name"
                      placeholder="Enter Hotel Name"
                      class="form-control"
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
                  <label :class="{ 'text-danger': errors.first('Email') }">Email</label>
                  <div class="input_block form-group">
                    <input
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      v-validate="'required|email'"
                      standout="transparent"
                      hide-bottom-space
                      :value="loginInfo.email"
                      :dense="true"
                      class="form-control disabled"
                      disabled
                      name="Email"
                      readonly
                    />
                  </div>
                  <span class="eb-error-input text-danger" v-if="errors.first('Email')">
                      {{ errors.first("Email") }}</span
                  >
                </li>
                <li>
                  <label :class="{ 'text-danger': errors.first('Phone') }">Phone</label>
                  <div class="input_block form-group">
                    <vue-phone-number-input
                      id="checkOutPhone"
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
              </ul>
            </div>
          </div>
        </div>
        <div class="reg_btn_wrap">
          <button type="button" class="btn btn_right tog_lvl_2" @click="userUpdateAction">Save Data</button>
          <router-link :to="{name: 'USER_DASHBOARD'}">
            <button type="button" class="btn btn_right tog_lvl_2 mr-2">Back</button>
          </router-link>
        </div>
      </div>
        </b-card>
      </b-card-group>
    </div>
    <div class="col-md-6">
      <b-card-group deck>
        <b-card header-tag="header" style="background-color: #222222!important"  bg-variant="dark" footer-tag="footer">
          <template #header>
            <h6 class="mb-0">Change Password</h6>
          </template>
          <div class="reg_form_wrap">
            <div class="dash_inut_group_container">
                <ul>
                  <li>
                    <label :class="{ 'text-danger': errors.first('Old Password') }"
                    >Old Password*</label
                    >
                    <div class="input_block form-group">
                      <input
                        type="password"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        v-validate="'required|strong_password'"
                        standout="transparent"
                        placeholder="Enter New Old Password"
                        hide-bottom-space
                        v-model="oldPassword"
                        :dense="true"
                        name="Old Password"
                        class="form-control"
                      />
                    </div>
                    <span
                      class="eb-error-input text-danger"
                      v-if="errors.first('Old Password')"
                    >
                    {{ errors.first("Old Password") }}</span
                    >
                  </li>
                  <li>
                    <label :class="{ 'text-danger': errors.first('password') }"
                    >New Password*</label
                    >
                    <div class="input_block form-group">
                      <input
                        ref="password"
                        type="password"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        v-validate="'required|strong_password'"
                        standout="transparent"
                        placeholder="Enter password"
                        hide-bottom-space
                        v-model="newPassword"
                        :dense="true"
                        name="password"
                        class="form-control"
                      />
                    </div>
                    <span
                      class="eb-error-input text-danger"
                      v-if="errors.first('password')"
                    >
                    {{ errors.first("password") }}</span
                    >
                  </li>
                  <li>
                    <label :class="{ 'text-danger': errors.first('Confirm Password') }"
                    >Confirm Password*</label
                    >
                    <div class="input_block form-group">
                      <input
                        type="password"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        v-validate="'required|confirmed:password'"
                        standout="transparent"
                        placeholder="Enter Confirm Password"
                        hide-bottom-space
                        v-model="cfmPassword"
                        :dense="true"
                        name="Confirm Password"
                        class="form-control"
                      />
                    </div>
                    <span
                      class="eb-error-input text-danger"
                      v-if="errors.first('Confirm Password')"
                    >
                    {{ errors.first("Confirm Password") }}</span
                    >
                  </li>
                </ul>
              </div>
          </div>
          <div class="reg_btn_wrap">
            <button type="button" class="btn btn_right tog_lvl_2" @click="updatePassword">Change Password</button>
          </div>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>
<script>
import { AUTH_HOTEL_UPDATE, ADMIN_FETCH_HOTEL_USER, AUTH_HOTEL_CHANGE_PASSWORD } from '../../../services/ENDPOINT'
import { mapMutations, mapGetters } from 'vuex'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      phone: '',
      loginInfo: {
        email: '',
        contactName: '',
        hotelName: '',
        phone: '',
        type: 'HOTEL'
      },
      newPassword: '',
      oldPassword: '',
      cfmPassword: '',
      showLoader: false,
      phoneNumberValid: false
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
    this.getUser()
    this.loginInfo = this._.cloneDeep(this.userInfo)
    this.phone = this.loginInfo.phone
  },
  methods: {
    updatePhone (v) {
      if (v.formatInternational) {
        this.phoneNumberValid = v.isValid
        this.loginInfo.phone = v.formatInternational
      }
    },
    updatePassword () {
      this.$validator.validateAll(['Old Password', 'password', 'Confirm Password']).then(async (isValid) => {
        if (isValid) {
          const title = 'Confirmation!'
          const msg = 'Are you sure, you want to Change Password?'
          this.$root.$confirm(title, msg).then(async confirmed => {
            const data = {
              email: this.userInfo.email,
              password: this.newPassword,
              oldPassword: this.oldPassword,
              cfmPassword: this.cfmPassword
            }
            try {
              this.$root.$loader(true)
              this.showLoader = true
              await AUTH_HOTEL_CHANGE_PASSWORD(data)
              this.$notify({
                group: 'eb-notification',
                title: 'SUCCESS! ',
                text: 'Passoword Change Successfully',
                type: 'success',
                duration: 5000
              })
            } catch (err) {
              console.log(err)
            } finally {
              this.$root.$loader(false)
              this.showLoader = false
            }
          })
        }
      })
    },
    async getUser () {
      try {
        this.$root.$loader(true)
        const result = await ADMIN_FETCH_HOTEL_USER()
        const user = result.hotelSignUps.find(i => i.email === this.userInfo.email)
        console.log(user)
        this.SET_LOGGEDIN_USER(user)
      } catch (err) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops',
          text: 'Something Went Wrong Please Try Again',
          type: 'error',
          duration: 5000
        })
      } finally {
        this.$root.$loader(false)
      }
    },
    ...mapMutations('auth', ['SET_LOGGEDIN_USER']),
    userUpdateAction () {
      this.$validator.validateAll(['Contact Name', 'Hotel Name', 'Phone', 'Email']).then(async (valid) => {
        if (valid && this.phoneNumberValid) {
          const payload = {
            contactName: this.loginInfo.contactName,
            hotelName: this.loginInfo.hotelName,
            phone: this.loginInfo.phone,
            id: this.loginInfo._id
          }
          try {
            this.$root.$loader(true)
            this.showLoader = true
            await AUTH_HOTEL_UPDATE(payload)
            this.getUser()
            this.$notify({
              group: 'eb-notification',
              title: 'SUCCESS! ',
              text: 'Profile Update Successfully',
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
        }
      })
    }
  }
}
</script>
