<template>
<div class="user_trip_detail_container">
  <div class="user_upcoming_bk_info_container" v-for="(book, index) of tboBookingArr" :key="index">
    <div class="bk_info_title_wrap">
      <h3><a href="#">{{book.booking.HotelName}}</a></h3>
      <div class="star_val">
        <i class="fas fa-star pl-1" v-for="(star, starIndex) in book.booking.StarRating" :key="starIndex"></i>
      </div>
    </div>
    <div class="bk_info_content_wrap">
      <div class="bk_info_content" style="width: 100%;" >
        <div class="row">
          <div class="col-md-8">
            <div class="bk_info_address">
              <i class="fas fa-map-marker-alt"></i> {{book.booking.AddressLine1}}<br>
              <span v-html="book.booking.AddressLine2"> {{book.booking.AddressLine2}} </span>
            </div><br>
            <div class="bk_info_address" v-if="book && book.payment && book.payment.roomPrice">
              Room Changes <span style="color: #ffc30e">{{ currency(book.payment.roomPrice)}}</span><br>
            </div>
            <div class="bk_info_address" v-if="book && book.payment && book.payment.finalPrice">
              Final Price <span style="color: #ffc30e">{{ currency(book.payment.finalPrice)}}</span><br>
            </div>
          </div>
          <div class="col-md-4">
            <div class="bk_action_btn_wrap">
              <button class="btn btn-danger bk_room_cancel_btn">
                Cancel Room
              </button><br>
              <div class="bk_action_btn_wrap ml-0 mr-0">
                Booking ID: {{ book.booking.BookingId }}
              </div>
            </div>

          </div>
        </div>

        <div class="bk_room_info_wrap" v-for="(room, roomIndex) of book.booking.HotelRoomsDetails" :key="roomIndex">
          <div class="bk_room_info_title">
            <a href="#">{{ room.RoomTypeName }}</a>
          </div>
          <div class="bk_room_policy_wrap">
            <a href="javascript:void(0);" style="color: chartreuse;" v-b-tooltip.html :title="book.booking.HotelPolicyDetail">Cancellation Policy</a>
          </div>
          <div class="bk_room_date_wrap">
            <div class="row">
              <div class="col-md-3">
                <div class="bk_room_date_list">
                  <h4>Check In</h4>
                  <h5>{{ $moment(book.booking.CheckInDate).format('DD-MM-YYYY')}}</h5>
                </div>
              </div>
              <div class="col-md-3">
                <div class="bk_room_date_list">
                  <h4>Check Out</h4>
                  <h5>{{ $moment( book.booking.CheckOutDate ).format('DD-MM-YYYY')}}</h5>
                </div>
              </div>
              <div class="col-md-3">
                <div class="bk_room_date_list">
                  <h4>Persons</h4>
                  <h5>{{ room.AdultCount }} Guests | 1 Room</h5>
                  <p>{{ stayNight(book.booking.CheckInDate, book.booking.CheckOutDate) }} Night Stay</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="bk_room_date_list">
                  <h4>Room</h4>
                  <h5>Total {{ currency(room.Price.PublishedPriceRoundedOff, room.Price.CurrencyCode) }}</h5>
                  <p>{{ stayNight(book.booking.CheckInDate, book.booking.CheckOutDate) }} Night Stay</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bk_send_info_btn_container">
        <button class="btn"><i class="far fa-envelope"></i> Send Email</button>
        <button class="btn"><i class="fas fa-print"></i> Print Booking</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    tboBookingArr: {
      type: Array
    }
  },
  methods: {
    stayNight (bookingStartDate, bookingEndDate) {
      const startDate = this.$moment(bookingStartDate, 'YYYY-MM-DD')
      const endDate = this.$moment(bookingEndDate, 'YYYY-MM-DD')
      return endDate.diff(startDate, 'days')
    }
  }
}
</script>
