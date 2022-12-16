<template>
  <div class="checkout_price_container col-12 col-md-4">
    <div class="checkout_price_detail_wrap">
      <h2>Price Summary</h2>
      <div class="checkout_price_split_detail">
        <ul>
          <li>
            <div class="checkout_detail_item_wrap" v-for="(room, index) in bookingDetails" :key="index">
              <p style="font-size: 13px;" class="mb-2 mt-0">Standard {{ room.roomType }} Room X {{ room.totalSelectedRoom }}  </p>
              <p style="font-size: 13px;" class="mb-2 mt-0">₹{{ room.cost }}</p>
            </div>
            <!-- <p class="mb-2 mt-0"  v-for="(item, index) of bookingDetails" :key="index">{{ item.roomType }} ({{ item.totalSelectedRoom }}X)</p> -->
          </li>
          <li v-if="checkout.bookingDetails">
           <!-- <div class="checkout_detail_item_wrap" v-for="(room, index) in bookingDetails" :key="index">
             <p>{{ room.roomType }} Room X {{ room.totalSelectedRoom }}  </p>
             <p>₹{{ room.cost }}</p>
           </div> -->
           <!-- <div class="checkout_detail_item_wrap" v-if="bookingDetails.length > 1">
            <p>Room Cost X {{ stayNight }} Night </p>
             <p> ₹{{ totalRoomCost }} </p>
           </div> -->
            <!-- <div class="checkout_detail_item_wrap" v-if="stayNight > 1">
              <p> Total Room Cost ({{ stayNight }} Night  X ₹{{ totalRoomCost }} )</p>
              <p>₹{{ roomWithNightCost }}</p>
            </div> -->
            <div class="checkout_detail_item_wrap">
              <p style="font-size: 13px;">Room Cost</p>
              <p>₹{{ roomWithNightCost }}</p>
            </div>
          </li>
          <li v-if="false">
            <div class="checkout_detail_item_wrap">
              <p>
                Total Discounts <span v-if="false"><b>16%</b> Off</span>
              </p>
              <p> <span v-if="false">-</span>0</p>
            </div>
          </li>
          <li>
            <div class="checkout_detail_item_wrap">
              <p>Your savings</p>
              <p>₹0</p>
            </div>
            <!-- <div class="checkout_detail_item_wrap">
              <p>Micro Fees</p>
              <p>₹{{ microjobFee }}</p>
            </div> -->
            <div class="checkout_detail_item_wrap">
              <p>Application Charges</p>
              <p>₹{{ applicationCharges }}</p>
            </div>
            <div class="checkout_detail_item_wrap">
              <p>Taxes & Fees (GST)</p>
              <p>₹{{ taxesAndFees }}</p>
            </div>
          </li>
          <li>
            <div class="checkout_detail_item_wrap">
              <h3>Total Payable <br><span style="font-size: 10px">(incl. of all taxes)</span> </h3>
              <h3>₹{{ finalPrice }}</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    finalPrice: {

    },
    totalRooms: {
      type: Number
    },
    roomWithNightCost: {
      type: Number
    },
    totalRoomCost: {
      type: Number
    },
    bookingDetails: {
      type: Array
    },
    applicationCharges: {

    },
    taxesAndFees: {},
    microjobFee: {},
    totalGuest: {}
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      checkout: 'checkout/checkoutObj'
    }),
    stayNight () {
      const startDate = this.$moment(this.checkout.bookingStartDate, 'YYYY-MM-DD')
      const endDate = this.$moment(this.checkout.bookingEndDate, 'YYYY-MM-DD')
      return endDate.diff(startDate, 'days')
    }
  },
  mounted () {
    console.log(this.checkout)
  }
}
</script>
