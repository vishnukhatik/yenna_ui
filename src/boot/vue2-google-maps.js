// https://developer.aliyun.com/mirror/npm/package/vue2-google-maps2
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAMRA7ZCZ9hUFFrd6jX2fDfNfIdcY5wMKw',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})
