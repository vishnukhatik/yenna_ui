<template>
  <div id="q-app" class="root-class">
    <loader ref="loader"/>
    <confirm-dialog ref="confirm"/>
    <internet-checker/>
    <router-view />
    <notifications group="eb-notification-center" position="top center" />
    <notifications group="eb-notification" position="bottom right" />
  </div>
</template>
<script>
import loader from 'components/common/loader'
import ConfirmDialog from 'components/common/ConfirmDialog'
import InternetChecker from 'components/common/InternetChecker'
import Vue from 'vue'
export default {
  name: 'App',
  components: { loader, ConfirmDialog, InternetChecker },
  data () {
    return {
      razorpayKey: 'rzp_test_IHXL4i2TvniRWT',
      API_BASE_URL_LOCAL_HOST: 'http://localhost:3000/api',
      API_BASE_URL_DEV_SERVER: 'http://52.172.155.30:3000/api',
      API_BASE_URL_QA_SERVER: 'http://52.140.65.109:3000/api',
      API_BASE_URL_LIVE_SERVER: 'http://localhost:3000/api'
    }
  },
  mounted () {
    Vue.prototype.$razorpayKey = this.razorpayKey
    Vue.prototype.$API_BASE_URL = this.API_BASE_URL_LOCAL_HOST
    this.$root.$loader = this.$refs.loader.show
    this.$root.$confirm = this.$refs.confirm.open
    this.setTitle()
  },
  watch: {
    '$route' () {
      this.setTitle()
    }
  },
  methods: {
    setTitle () {
      document.title = `Yenna Rascala ${this.$route?.meta?.title ? '| ' + this.$route?.meta?.title : ''}`
    }
  }
}
</script>
