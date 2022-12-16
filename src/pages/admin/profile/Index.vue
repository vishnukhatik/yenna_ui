<template>
  <div class="registration_form_container">
    <h2>My Profile</h2>
    <div class="reg_form_wrap">
      <div class="row">
        <div class="col-md-6">
          <div class="dash_inut_group_container">
            <ul>
              <li>
                <label :class="{ 'text-danger': errors.first('Frist Name') }"
                  >First Name</label
                >
                <div class="input_block form-group">
                  <input
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    v-validate="'required|max:25|min:3'"
                    standout="transparent"
                    hide-bottom-space
                    v-model="loginInfo.firstName"
                    :dense="true"
                    name="Frist Name"
                    class="form-control"
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
                <div class="input_block form-group">
                  <input
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    v-validate="'required|max:25|min:3'"
                    standout="transparent"
                    hide-bottom-space
                    v-model="loginInfo.middleName"
                    :dense="true"
                    name="Middle Name"
                    class="form-control"
                  />
                </div>
                <span
                  class="eb-error-input text-danger"
                  v-if="errors.first('Frist Name')"
                >
                  {{ errors.first("Middle Name") }}</span
                >
              </li>
              <li>
                <label :class="{ 'text-danger': errors.first('Last Name') }"
                  >Last Name</label
                >
                <div class="input_block form-group">
                  <input
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    v-validate="'required|max:25|min:3'"
                    standout="transparent"
                    hide-bottom-space
                    v-model="loginInfo.lastName"
                    :dense="true"
                    name="Last Name"
                    class="form-control"
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
                 <label :class="{ 'text-danger': errors.first('Email') }">Email</label>
                <div class="input_block form-group">
                  <input
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    v-validate="'required|email'"
                    standout="transparent"
                    hide-bottom-space
                    v-model="loginInfo.email"
                    :dense="true"
                    class="form-control"
                  />
                </div>
                <span class="eb-error-input text-danger" v-if="errors.first('Email')">
                    {{ errors.first("Email") }}</span
                  >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="dash_inut_group_container">
            <ul>
              <li>
                <p>Address</p>
                <div class="input_block form-group">
                  <input
                    v-model="loginInfo.address"
                    type="text"
                    class="form-control"
                    placeholder=""
                    required
                  />
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-6">
                    <p>City</p>
                    <div class="input_block form-group">
                      <input
                        v-model="loginInfo.city"
                        type="text"
                        class="form-control"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <p>State</p>
                    <div class="input_block form-group">
                      <input
                        v-model="loginInfo.state"
                        type="text"
                        class="form-control"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-6">
                    <p>Country</p>
                    <div class="input_block form-group">
                      <input
                        v-model="loginInfo.country"
                        type="text"
                        class="form-control"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <p>Postal Code</p>
                    <div class="input_block form-group">
                      <input
                        v-model="loginInfo.postalCode"
                        type="text"
                        class="form-control"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="reg_btn_wrap">
        <button type="button" class="btn btn_right tog_lvl_2">Save Data</button>
        <router-link :to="{name: 'ADMIN_DASHBOARD'}">
          <button type="button" class="btn btn_right tog_lvl_2 mr-2">Back</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { AUTH_USER_REGISTER } from '../../../services/ENDPOINT'
import { mapGetters } from 'vuex'

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
        type: 'CUSTOMER'
      },
      showLoader: false
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
    this.loginInfo = this._.cloneDeep(this.userInfo)
  },
  methods: {
    userRegisterAction () {
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          try {
            this.$root.$loader(true)
            this.showLoader = true
            const result = await AUTH_USER_REGISTER(this.loginInfo)
            console.log(result)
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
              title: 'Oops',
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
