<template>
  <div class="booking_modal_details_container">
    <div class="booking_modal_details_title_wrap">
      <h3><a href="#">{{ bookingInfo.booking.HotelName }}</a></h3>
      <div class="star_val"><i v-for="(star, index) in bookingInfo.booking.StarRating" :key="index" class="fas fa-star pl-1"></i> </div>
    </div>
    <div class="booking_modal_gen_details_wrap">
      <div class="booking_modal_hotel_address_wrap">
          <i class="fas fa-map-marker-alt"></i>{{ bookingInfo.booking.AddressLine1 }}
          <br>
          {{ bookingInfo.booking.AddressLine2 }}
      </div>
      <div class="booking_modal_com_info_wrap">
          <h3>Booking Details</h3>
          <div v-for="(room, roomIndex) of bookingInfo.booking.HotelRoomsDetails" :key="roomIndex" :class="{'row': true, 'dash_hotel_detail_list_wrap': roomIndex != bookingInfo.booking.HotelRoomsDetails.length }">
              <div class="col-md-3 booking_modal_com_item"><strong>Hotel ID:</strong> {{ room.RoomId }}</div>
              <div class="col-md-9 booking_modal_com_item"><strong>Room:</strong> {{ room.RoomTypeName }}</div>
              <div class="col-md-3 booking_modal_com_item"><strong>No. of persons:</strong> {{ room.HotelPassenger.length }}</div>
              <div class="col-md-9 booking_modal_com_item" v-for="(guest, guestIndex) of room.HotelPassenger" :key="guestIndex"><strong>Guest name({{ guestIndex+1 }}):</strong> {{guest.FirstName + ' ' + guest.LastName}} </div>
          </div>
      </div>
      <div class="booking_modal_com_info_wrap">
        <h3>Payment Details</h3>
        <div class="row" v-if="bookingInfo.payment">
          <div class="col-md-6 booking_modal_com_item"><strong>Order Id:</strong> {{ bookingInfo.payment.razorpay_order_id }}
          </div>
          <div class="col-md-6 booking_modal_com_item"><strong>Room Charges:</strong> {{ currency(bookingInfo.payment.roomPrice, bookingInfo.payment.currency) }}</div>
          <div class="col-md-6 booking_modal_com_item"><strong>Payment Id:</strong> {{ bookingInfo.payment.razorpay_payment_id }}</div>
          <div class="col-md-6 booking_modal_com_item"><strong>Micro Fees:</strong> {{ currency(bookingInfo.payment.microFee, bookingInfo.payment.currency) }}</div>
          <div class="col-md-6 booking_modal_com_item"><strong>Payment Gateway:</strong> {{ bookingInfo.payment.org_name }}</div>
          <div class="col-md-6 booking_modal_com_item prime_col"><strong>Amount Paid:</strong> {{ currency(bookingInfo.payment.finalPrice, bookingInfo.payment.currency) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bookingInfo: {
      type: Object
    }
  }
}
</script>
