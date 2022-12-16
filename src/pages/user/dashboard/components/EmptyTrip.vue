<template>
  <div class="user_empty_trip_wrap">
    <div class="user_empty_trip_img">
      <img src="~/assets/images/baggage.png" alt="" class="img-fluid" />
    </div>
    <div class="user_empty_trip_info_wrap">
      <div class="user_empty_trip_info">
        <h3>{{title}}</h3>
        <p>
          You will see your booking information here when you book a
          hotel.
        </p>
        <router-link :to="{ name: 'PUBLIC_HOTEL' }">
          <a class="btn y_btn_small">Book a Hotel</a>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>
