<template>
  <div class="bk_room_info_wrap">
      <div class="row">
        <div class="col-md-3">
          <div class="bk_room_info_title">
            <a>Standard {{ allInfo.roomType }} X {{ allInfo.totalSelectedRoom }}</a><br>
            <!-- <span style="font-size: 13px;"><span style="color: white;font-weight: 400">Room Charges:  ₹</span>{{ allInfo.cost }}</span><br> -->
<!--            <p style="color: #ffc30e;font-size: 13px;">Final Amount: ₹{{ allInfo.cost }}</p>-->
          </div>
        </div>
        <div class="col-md-5">
          <div class="bk_room_policy_wrap pl-2" v-if="!isCompleted">
            <a href="javascript:void(0);" style="color: chartreuse;" v-b-tooltip.html :title="allInfo.cancelPolicyDetails">Cancellation Policy</a>
          </div>
        </div>
        <div class="col-md-4">
          <div class="bk_action_btn_wrap">
            <span> Booking ID {{ extraDetails.bookingId }} </span><br>
          </div>
        </div>
      </div>

      <div class="bk_room_date_wrap">
        <div class="row">
          <div class="col-md-2">
            <div class="bk_room_date_list">
              <h4>Check In</h4>
              <h5>{{ $moment(extraDetails.bookingStartDate).format('DD-MM-YYYY') }}</h5>
              <p>{{ hotelInfo.checkInTime }}</p>
            </div>
          </div>
          <div class="col-md-2">
            <div class="bk_room_date_list">
              <h4>Check Out</h4>
              <h5>{{ $moment(extraDetails.bookingEndDate).format('DD-MM-YYYY') }}</h5>
              <p>{{ hotelInfo.checkOutTime }}</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="bk_room_date_list">
              <h4>Persons</h4>
              <h5>{{ totalGuests }} Guests | {{ allInfo.totalSelectedRoom }} Room</h5>
              <p>Adults: <span class="color--yellow">{{ allInfo.numberOfAdults }}</span></p>
              <p v-if="allInfo.numberOfChild != 0">Children to 12 years: <span class="color--yellow">{{ allInfo.numberOfChild  }}</span></p>
              <p v-if="allInfo.numberOfInfants != 0">Infants to 2 years: <span class="color--yellow">{{ allInfo.numberOfInfants  }}</span></p>
            </div>
          </div>
          <div class="col-md-5">
            <div class="bk_room_date_list">
              <h4>Room</h4>
              <h5>Total {{ currency(allInfo.cost) }}</h5>
              <p> Price: <span class="color--yellow">{{ currency(allInfo.price) }}</span> | Rooms: <span class="color--yellow">{{ allInfo.totalSelectedRoom }}</span> | Night: <span class="color--yellow">{{ stayNight }}</span> | Total: <span class="color--yellow">{{ currency(allInfo.cost) }}</span></p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    isCompleted: {
      type: Boolean
    },
    hotelInfo: {
      type: Object
    },
    bookingInfo: {
      type: Object
    },
    extraDetails: {
      type: Object
    },
    allInfo: {
      type: Object
    }
  },
  computed: {
    totalGuests () {
      return Number(this.allInfo.numberOfAdults) + Number(this.allInfo.numberOfChild) + Number(this.allInfo.numberOfInfants)
    },
    stayNight () {
      const startDate = this.$moment(this.extraDetails.bookingStartDate, 'YYYY-MM-DD')
      const endDate = this.$moment(this.extraDetails.bookingEndDate, 'YYYY-MM-DD')
      return endDate.diff(startDate, 'days')
    }
  }
}
</script>
<style>
.color--yellow {
  color: #ffc30e
}
</style>
