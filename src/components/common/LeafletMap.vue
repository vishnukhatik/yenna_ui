<template>
  <div
    :id="id"
    :style="height"
    class="map admin-map"
  />
</template>

<script>

export default {
  props: {
    latlng: {
      type: Array,
      required: false,
      default: () => [23.0208241, 72.50863950000002]
    },
    height: {
      default: 'height: 400px;',
      type: String,
      required: false
    },
    id: {
      type: String,
      default: ''
    },
    zoom: {
      type: Number,
      default: 15
    },
    mapClass: {
      default: 'map admin-map'
    }

  },
  data () {
    return {
      map: null,
      tileLayer: null,
      address: {},
      latitudeLongitude: this.latlng
    }
  },

  mounted () {
    this.initMap()
  },
  methods: {
    getCurrentlatlng () {
      var vm = this
      navigator.geolocation.getCurrentPosition(function (location) {
        vm.latlng = [location.coords.latitude, location.coords.longitude]
        vm.getAddress(location.coords.latitude, location.coords.longitude)
      })
    },
    getAddress (lat, lng) {
      const timer = this.getAddress.timer
      if (timer) {
        clearTimeout(timer)
      }
      this.getAddress.timer = setTimeout(() => {
        /* eslint-disable no-undef */
        var M = L
        var vm = this
        const latlng = [lat, lng]
        var geocodeService = M.esri.Geocoding.geocodeService()
        geocodeService.reverse().latlng(latlng).run(function (error, result) {
          if (error) {
            return
          }
          vm.$emit('changeAddress', result)
          vm.address = result.address
        })
      }, 800)
    },
    initMap (lat, lng) {
      var vm = this
      var options = {
        center: vm.latitudeLongitude,
        zoom: vm.zoom
      }
      var M = L
      var map = M.map(vm.id, options)

      M.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: 'Yenna Rascala' })
        .addTo(map)

      M.control.scale().addTo(map)

      var myMarker = M.marker(vm.latitudeLongitude, { title: '', alt: '', draggable: true })
        .on('dragend', function () {
          vm.getAddress(myMarker.getLatLng().lat, myMarker.getLatLng().lng)
        }).addTo(map)

      map.on('move', function () {
        myMarker.setLatLng(map.getCenter())
        vm.getAddress(map.getCenter().lat, map.getCenter().lng)
      })

      var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider()

      L.esri.Geocoding.geosearch({
        providers: [
          arcgisOnline,
          L.esri.Geocoding.mapServiceProvider({
            label: 'States and Counties',
            url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
            layers: [2, 3],
            searchFields: ['NAME', 'STATE_NAME']
          })
        ]
      }).addTo(map)
    }
  }
}
</script>
