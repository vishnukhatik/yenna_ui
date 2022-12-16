
export default {
  methods: {
    placechange (event) {
      if (event.geometry) {
        const locationObj = {
          address: '',
          data: {},
          Lat: '',
          Lng: '',
          event: event,
          locality: {}
        }
        var componentForm = {
          street_number: 'short_name',
          route: 'long_name',
          locality: 'long_name',
          administrative_area_level_1: 'long_name',
          country: 'long_name',
          postal_code: 'short_name'
        }
        if (event.formatted_address) {
          locationObj.address = event.formatted_address
        }
        if (event.geometry.location) {
          locationObj.Lat = event.geometry.location.lat()
          locationObj.Lng = event.geometry.location.lng()
        }
        const data = {}
        for (var i = 0; i < event.address_components.length; i++) {
          var addressType = event.address_components[i].types[0]
          if (componentForm[addressType]) {
            data[addressType] =
                            event.address_components[i][componentForm[addressType]]
          }
        }
        if (data) {
          if (data.locality) {
            locationObj.data.City = data.locality
          }
          if (data.country) {
            locationObj.data.Country = data.country
          }
          if (data.administrative_area_level_1) {
            locationObj.data.State = data.administrative_area_level_1
          }
        }
        return locationObj
      }
    }
  }

}
