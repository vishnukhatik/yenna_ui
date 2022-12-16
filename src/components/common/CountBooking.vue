<template>
  <div>
  <div class="overview_block_wrap blue_bgcolor">
    <div class="bg_icon"><i class="fas fa-hotel"></i></div>
    <h4>Total Bookings</h4>
    <h3>{{ totalBooking }}</h3>
  </div>
  <div class="overview_percent_block_wrap mt-3">
    <div class="overview_percent_block">
      <h4>Completed Bookings</h4>
      <h3>{{ countBookingHistory.completedBooking }}</h3>
      <span :class="{
        'rederpink_bgcolor': completedBookingPercentage < 20,
        'orange_bgcolor': completedBookingPercentage > 20 || completedBookingPercentage < 50,
        'greygreen_bgcolor' : completedBookingPercentage > 50
        }
      ">{{completedBookingPercentage}}%</span>
    </div>
    <div class="overview_percent_block">
      <h4>Pending Bookings</h4>
      <h3>{{ countBookingHistory.pendingBooking }}</h3>
      <span :class="{
        'rederpink_bgcolor': pendingBookingPercentage < 20,
        'orange_bgcolor': pendingBookingPercentage > 20 || pendingBookingPercentage < 50,
        'greygreen_bgcolor' : pendingBookingPercentage > 50
        }">{{pendingBookingPercentage}}%</span>
    </div>
    <div class="overview_percent_block">
      <h4>Cancelled Bookings</h4>
      <h3>{{ countBookingHistory.cancelledBooking }}</h3>
      <span :class="{
        'rederpink_bgcolor': cancelledBookingPercentage < 20,
        'orange_bgcolor': cancelledBookingPercentage > 20 || cancelledBookingPercentage < 50,
        'greygreen_bgcolor' : cancelledBookingPercentage > 50
        }">{{cancelledBookingPercentage}}%</span>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['totalBooking', 'countBookingHistory', 'completedBookingPercentage', 'pendingBookingPercentage', 'cancelledBookingPercentage']
}
</script>
