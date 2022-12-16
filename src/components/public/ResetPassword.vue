<template>
  <div class="modal_form_wrap">
    <h2><i class="fas fa-key"></i> Reset password</h2>
    <div class="modal_close" @click="closeModal">
      <i class="fas fa-times"></i>
    </div>
    <ul>
      <li>
        <label :class="{ 'text-danger': errors.first('Password') }"
          >Enter new password</label
        >
        <div class="dark_bg">
          <span class="fas fa-key"></span>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            v-validate="'required'"
            type="password"
            standout="transparent"
            hide-bottom-space
            v-model="passwordInfo.password"
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
        <label :class="{ 'text-danger': errors.first('New Password') }"
          >Enter new password again</label
        >
        <div class="dark_bg">
          <span class="fas fa-key"></span>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            v-validate="'required'"
            type="password"
            standout="transparent"
            hide-bottom-space
            v-model="passwordInfo.cfmPassword"
            :dense="true"
            name="New Password"
          />
        </div>
         <span
          class="eb-error-input text-danger"
          v-if="errors.first('New Password')"
        >
          {{ errors.first("New Password") }}</span
        >
      </li>
      <li>
        <input type="submit" :class="{ disabled: showLoader }" value="Sign In" @click="changePassword"/> <b-spinner v-if="showLoader" label="Spinning"></b-spinner>
      </li>
    </ul>
  </div>
</template>
<script>
import { AUTH_RESET_PASSWORD } from '../../services/ENDPOINT'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      passwordInfo: {
        password: '',
        cfmPassword: ''
      },
      showLoader: false
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    changePassword () {
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          try {
            this.$root.$loader(true)
            this.showLoader = true
            const result = await AUTH_RESET_PASSWORD(this.passwordInfo)
            console.log(result)
            this.$notify({
              group: 'eb-notification',
              title: 'SUCCESS! ',
              text: 'Password Change Successfully',
              type: 'success',
              duration: 7000
            })
            this.closeModal()
            this.$emit('showLoginPopup')
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
