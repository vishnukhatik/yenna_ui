<template>
  <div class="modal_form_wrap">
    <h2><i class="fas fa-password"></i>Forgot  Password</h2>
    <div class="modal_close" @click="$emit('close')">
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
            placeholder="Enter Email"
            hide-bottom-space
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
        <label :class="{ 'text-danger': errors.first('Name') }">Name</label>
        <div class="dark_bg">
          <span class="far fa-user"></span>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            v-validate="'required'"
            standout="transparent"
            placeholder="Enter Name"
            hide-bottom-space
            v-model="loginInfo.name"
            :dense="true"
            name="Name"
          />
        </div>
        <span class="eb-error-input text-danger" v-if="errors.first('Name')">
          {{ errors.first("Name") }}</span
        >
      </li>
      <li>
        <div class="dark_bg">
          <div class="row">
            <div class="col-md-2">
              <span class="fas fa-users pl-4"></span>
            </div>
            <div class="col-md-10" style="margin-left: -20px !important;">
              <select class="form-control login-select" v-model="type">
                <option v-for="(item, inx) of [{label:'User', 'id':'CUSTOMER'}, {label:'Hotel', id:'HOTEL'}]" :key="inx" :value="item.id">{{item.label}}</option>
              </select>
            </div>
          </div>
          <!-- <span class="fas fa-key"></span> -->
        </div>
      </li>
      <li>
        <input type="submit" @click="actionSumbit" value="Submit" />
      </li>
    </ul>
  </div>
</template>
<script>
import { AUTH_USER_FORGOT_PASSWORD, AUTH_HOTEL_FORGOT_PASSWORD } from 'src/services/auth'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      type: 'CUSTOMER',
      loginInfo: {
        email: null
      }
    }
  },
  methods: {
    actionSumbit () {
      console.log('test')
      this.$validator.validateAll(['Name', 'Email']).then(async (isValid) => {
        if (isValid) {
          const data = {
            email: this.loginInfo.email,
            name: this.loginInfo.name
          }
          try {
            this.$root.$loader(true)
            this.showLoader = true
            if (this.type === 'HOTEL') {
              await AUTH_HOTEL_FORGOT_PASSWORD(data)
            } else {
              await AUTH_USER_FORGOT_PASSWORD(data)
            }
            this.$notify({
              group: 'eb-notification',
              title: 'SUCCESS! ',
              text: 'Please Check Your Mail Box',
              type: 'success',
              duration: 5000
            })
            this.$emit('close')
          } catch (err) {
            console.log(err)
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
