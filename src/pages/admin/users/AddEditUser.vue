<template>
  <div class="registration_form_container">
    <h2>{{ paramsId ? 'Edit User' :'Add User' }}</h2>
    <div class="reg_form_wrap">
      <div class="row">
        <div class="col-md-12">
          <div class="dash_inut_group_container">
            <div class="row">
              <div class="col-md-6">
                <label :class="{ 'text-danger': errors.first('Title') }"  style="margin-bottom: -0.5rem"
                  >Title</label
                >
                <div class="input_block form-group">
                  <input
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    v-validate="'required'"
                    standout="transparent"
                    hide-bottom-space
                    v-model="loginInfo.title"
                    :dense="true"
                    name="Title"
                    class="form-control"
                    placeholder="Please Enter Your Title"
                  />
                </div>
                <span
                  class="eb-error-input text-danger"
                  v-if="errors.first('Title')"
                >
                  {{ errors.first("Title") }}</span
                >
              </div>
              <div class="col-md-6">
                  <label :class="{ 'text-danger': errors.first('Frist Name') }"  style="margin-bottom: -0.5rem"
                    >First Name</label
                  >
                  <div class="input_block form-group">
                    <input
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      v-validate="'required|max:50|min:2'"
                      standout="transparent"
                      hide-bottom-space
                      v-model="loginInfo.firstName"
                      :dense="true"
                      name="Frist Name"
                      class="form-control"
                      placeholder="Please Enter Your First Name"
                    />
                  </div>
                  <span
                    class="eb-error-input text-danger"
                    v-if="errors.first('Frist Name')"
                  >
                    {{ errors.first("Frist Name") }}</span
                  >
              </div>
            </div>
            <div class="row" style="margin-top: +1.5rem">
              <div class="col-md-6">
                <label :class="{ 'text-danger': errors.first('Middle Name') }"  style="margin-bottom: -0.5rem"
                  >Middle Name</label
                >
                <div class="input_block form-group">
                  <input
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    v-validate="'required|max:50|min:2'"
                    standout="transparent"
                    hide-bottom-space
                    v-model="loginInfo.middleName"
                    :dense="true"
                    name="Middle Name"
                    class="form-control"
                    placeholder="Please Enter Your Middle Name"
                  />
                </div>
                <span
                  class="eb-error-input text-danger"
                  v-if="errors.first('Middle Name')"
                >
                  {{ errors.first("Middle Name") }}</span
                >
              </div>
              <div class="col-md-6">
                  <label :class="{ 'text-danger': errors.first('Last Name') }"  style="margin-bottom: -0.5rem"
                    >Last Name</label
                  >
                  <div class="input_block form-group">
                    <input
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      v-validate="'required|max:50|min:2'"
                      standout="transparent"
                      hide-bottom-space
                      v-model="loginInfo.lastName"
                      :dense="true"
                      name="Last Name"
                      class="form-control"
                      placeholder="Please Enter Your Last Name"
                    />
                  </div>
                  <span
                    class="eb-error-input text-danger"
                    v-if="errors.first('Last Name')"
                  >
                    {{ errors.first("Last Name") }}</span
                  >
              </div>
            </div>
            <div class="row" style="margin-top: +1.5rem">
              <div class="col-md-6">
                  <label :class="{ 'text-danger': errors.first('Email') }" style="margin-bottom: -0.5rem">Email</label>
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
                      name="Email"
                      class="form-control"
                      placeholder="Please Enter Your Email"
                    />
                  </div>
                  <span class="eb-error-input text-danger" v-if="errors.first('Email')">
                      {{ errors.first("Email") }}</span
                    >
              </div>
              <div class="col-md-6">
                  <label :class="{ 'text-danger': errors.first('Phone') }" style="margin-bottom: -0.5rem">Phone</label>
                 <div class="input_block form-group">
                   <input
                     autocorrect="off"
                     autocapitalize="off"
                     spellcheck="false"
                     v-validate="'required|numeric|min:8|max:15'"
                     standout="transparent"
                     hide-bottom-space
                     v-model="loginInfo.phone"
                     :dense="true"
                     name="Phone"
                     class="form-control"
                     placeholder="Please Enter Your Phone"
                   />
                 </div>
                 <span class="eb-error-input text-danger" v-if="errors.first('Phone')">
                     {{ errors.first("Phone") }}</span
                   >
              </div>
            </div>
            <div class="row" style="margin-top: +1.5rem">
              <div class="col-md-12">
                  <label :class="{ 'text-danger': errors.first('Address') }" style="margin-bottom: -0.5rem">Address</label>
                  <div class="input_block form-group">
                    <input
                      autocorrect="off"
                      autocapitalize="off"
                      spellcheck="false"
                      v-validate="'required'"
                      standout="transparent"
                      hide-bottom-space
                      v-model="loginInfo.address"
                      :dense="true"
                      name="Address"
                      type="text"
                      class="form-control"
                      placeholder="Please Enter Your Address"
                    />
                  </div>
                  <span class="eb-error-input text-danger" v-if="errors.first('Address')">
                    {{ errors.first("Address") }}</span
                  >
              </div>
            </div>
            <div class="row" style="margin-top: +1.5rem">
              <div class="col-md-6">
                    <label :class="{ 'text-danger': errors.first('City') }" style="margin-bottom: -0.5rem">City</label>
                    <div class="input_block form-group">
                      <input
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        v-validate="'required'"
                        standout="transparent"
                        hide-bottom-space
                        v-model="loginInfo.city"
                        :dense="true"
                        name="City"
                        type="text"
                        class="form-control"
                        placeholder="Please Enter Your City"
                      />
                    </div>
                    <span class="eb-error-input text-danger" v-if="errors.first('City')">
                      {{ errors.first("City") }}</span
                    >
                  </div>
                  <div class="col-md-6">
                    <label :class="{ 'text-danger': errors.first('State') }" style="margin-bottom: -0.5rem">State</label>
                    <div class="input_block form-group">
                      <input
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        v-validate="'required'"
                        standout="transparent"
                        hide-bottom-space
                        v-model="loginInfo.state"
                        :dense="true"
                        name="State"
                        type="text"
                        class="form-control"
                        placeholder="Please Enter Your State"
                      />
                    </div>
                    <span class="eb-error-input text-danger" v-if="errors.first('State')">
                      {{ errors.first("State") }}</span
                    >
                  </div>
                </div>
            <div class="row" style="margin-top: +1.5rem">
              <div class="col-md-6">
                    <label :class="{ 'text-danger': errors.first('Country') }" style="margin-bottom: -0.5rem">Country</label>
                    <div class="input_block form-group">
                      <input
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        v-validate="'required'"
                        standout="transparent"
                        hide-bottom-space
                        v-model="loginInfo.country"
                        :dense="true"
                        name="Country"
                        type="text"
                        class="form-control"
                        placeholder="Please Enter Your Country"
                      />
                    </div>
                    <span class="eb-error-input text-danger" v-if="errors.first('Country')">
                      {{ errors.first("Country") }}</span
                    >
                  </div>
                  <div class="col-md-6">
                    <label :class="{ 'text-danger': errors.first('Postal Code') }" style="margin-bottom: -0.5rem">Postal Code</label>
                    <div class="input_block form-group">
                      <input
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        v-validate="'required'"
                        standout="transparent"
                        hide-bottom-space
                        v-model="loginInfo.postalCode"
                        :dense="true"
                        name="Postal Code"
                        type="text"
                        class="form-control"
                        placeholder="Please Enter Your Postal Code"
                      />
                    </div>
                    <span class="eb-error-input text-danger" v-if="errors.first('Postal Code')">
                      {{ errors.first("Postal Code") }}</span
                    >
                  </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reg_btn_wrap">
        <button type="button" class="btn btn_right tog_lvl_2" @click="userAddAction">Save Data</button>
        <router-link :to="{name: 'ADMIN_DASHBOARD'}">
          <button type="button" class="btn btn_right tog_lvl_2 mr-2">Back</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { blackObj } from './config'
import {
  ADMIN_SAVE,
  ADMIN_UPDATE,
  ADMIN_FETCH_BY_ID
} from '../../../services/ENDPOINT'
import { mapGetters } from 'vuex'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      loginInfo: {
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        title: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: ''
      },
      showLoader: false,
      paramsId: null
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
    this.paramsId = this.$route.params.id
    if (this.paramsId) {
      this.getPage()
    }
  },
  methods: {
    async getPage () {
      try {
        this.$root.$loader(true)
        const result = await ADMIN_FETCH_BY_ID(this.paramsId)
        this.contentInfo = result.blog[0] ? result.blog[0] : this._.cloneDeep(blackObj)
        console.log(result)
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
    userAddAction () {
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          console.log(this.loginInfo)
          if (this.paramsId) {
            try {
              this.$root.$loader(true)
              this.showLoader = true
              this.loginInfo._id = this.paramsId
              const result = await ADMIN_UPDATE(this.loginInfo)
              console.log(result)
              this.$notify({
                group: 'eb-notification',
                title: 'SUCCESS! ',
                text: 'User Added Successfuly',
                type: 'success',
                duration: 7000
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
          } else {
            try {
              this.$root.$loader(true)
              this.showLoader = true
              alert('hi pm1')
              const result = await ADMIN_SAVE(this.loginInfo)
              console.log(result)
              this.$notify({
                group: 'eb-notification',
                title: 'SUCCESS! ',
                text: 'User Add Successfully',
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
        }
      })
    }
  }
}
</script>
