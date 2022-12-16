<template>
  <div class="modal_form_wrap" style="min-height: 260px;width: 700px;">
    <h2><i class="fas fa-user"></i>{{ paramsId ? 'Edit User Role' :'Add User Role' }}</h2>
    <div class="modal_close" @click="closeModal">
      <i class="fas fa-times"></i>
    </div>
    <ul>
        <li>
          <div class="row">
            <div class="col-md-6 q-select-div">
              <div>
                <label :class="{ 'text-danger': errors.first('Name') }">Name</label>
                <input
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  v-validate="'required'"
                  standout="transparent"
                  hide-bottom-space
                  v-model="userRoleInfo.name"
                  :dense="true"
                  name="Name"
                  class="form-control"
                  placeholder="Please Enter Your Name"
                  style="background-color: #111; color:  #fff; border:none; padding: 8px;"
                />
                <span class="eb-error-input text-danger" v-if="errors.first('Name')">
              {{ errors.first("Name") }}</span
                >
              </div>
            </div>
            <div class="col-md-6 selected-box-span">
              <label class="typo__label">Select Module </label>
              <q-select
                v-model="selectedRoles"
                :options="modules"
                :dense="true"
                use-input
                use-chips
                multiple
                input-debounce="0"
                filled
                dark
                stack-label
                :options-dense="true"
                :display-value="`Company: ${model ? model.title : '*none*'}`"
              >
                  <template v-slot:selected-item="scope">
                    <dd style="padding-left: 10px;padding-right: 10px;color: white" class="p1">{{ scope.opt.label }}</dd>
                  </template>
                <template v-slot:selected>
                  <dd style="color: black"> {{ scope.opt.label }} </dd>
                </template>
              </q-select>
          </div>
        </div>
        </li>
      <li>
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="remember"
            name="activeDeactive"
            v-model="userRoleInfo.isActive"
          />
          <label class="custom-control-label" for="remember"
            >Active</label
          >
        </div>
      </li>
      <li>
        <div class="row">
          <div class="col-6" />
          <div class="col-6">
            <div class="row">
              <div class="col-6">
                <input type="submit" :class="{ disabled: showLoader }" value="Cancel" @click="closeModal"/> <b-spinner v-if="showLoader" label="Spinning"></b-spinner>
              </div>
              <div class="col-6">
                <input type="submit" :class="{ disabled: showLoader }" value="Save" @click="saveUserRole"/> <b-spinner v-if="showLoader" label="Spinning"></b-spinner>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
// import Multiselect from 'vue-multiselect'
// import 'vue-multiselect/dist/vue-multiselect.min.css'
import { adminChildren } from 'src/router/adminRoute'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  // components: { Multiselect },
  data () {
    return {
      selectedRoles: [{ label: 'Dashboard', value: 'ADMIN_DASHBOARD', path: '/admin/dashboard' }],
      adminChildren,
      userRoleInfo: {
        name: '',
        isActive: false
      },
      showLoader: false,
      paramsId: null
    }
  },
  computed: {
    modules () {
      const finalArr = []
      this.adminChildren.filter(i => {
        const obj = {
          label: i.meta.title,
          value: i.name,
          path: i.path
        }
        finalArr.push(obj)
      })
      return finalArr
    }
  },
  mounted () {
    console.log(adminChildren)
  },
  methods: {
    closeModal () {
      this.$emit('close', null)
    },
    saveUserRole () {
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          console.log(this.userRoleInfo)
        }
      })
    }
  }
}
</script>
<style>
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
