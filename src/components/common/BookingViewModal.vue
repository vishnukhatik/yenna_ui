<template>
      <div class="modal_booking_wrap">
          <h2 style="margin-bottom: 0px;"><i class="fas fa-book"></i> Booking Details</h2>
          <div class="modal_close" @click="closeModal"><i class="fas fa-times"></i></div>
          <div class="booking_modal_details_container" style="overflow-y: scroll;max-height: 500px;">
              <div class="booking_modal_details_title_wrap">
                  <h3><a>{{ bookingView.propertyName }}</a></h3>
                  <div class="star_val"><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i></div>
              </div>
              <div class="booking_modal_gen_details_wrap">
                <div class="row">
                  <div class="col-md-6">
                    <div class="booking_modal_hotel_address_wrap">
                      <i class="fas fa-map-marker-alt"></i> {{ bookingView.destination }}
                    </div>
                  </div>
                  <div class="col-md-6" v-if="loggedInUserType == 'CUSTOMER'">
                      <span style="font-size: 16px">
                        Booking Secret Code:
                      <span style="color: #ffc30e;font-weight: 600" >
                        {{ bookingView.bookingSecretCode }}
                      </span>
                    </span>
                  </div>
                  <div class="col-md-6 booking_modal_com_item"><strong>Check In Time:</strong> {{ bookingView.bookingStartDate }} ({{ bookingView.checkInTime }})</div>
                  <div class="col-md-6 booking_modal_com_item"><strong>Check Out Time:</strong>{{ bookingView.bookingEndDate }} ({{ bookingView.checkOutTime }})</div>
                </div>
                  <div class="booking_modal_com_info_wrap">
                      <h3>Booking Details</h3>
                      <div class="row">
                        <div class="col-md-6 booking_modal_com_item"><strong>Hotel ID:</strong>{{ bookingView.hotelId}}</div>
                        <div class="col-md-6 booking_modal_com_item" v-if="bookingView.allData"><strong>Room:</strong>
                          {{ bookingView.allData.bookingDetails.length }} x {{ bookingView.allData.bookingType }} Room</div>
                        <div class="col-md-6 booking_modal_com_item"><strong>Booking Date:</strong>{{$moment(bookingView.createdAt).format('DD-MM-YYYY')}}</div>
                        <div class="col-md-6 booking_modal_com_item" v-if="bookingView && bookingView.allData && bookingView.allData.stayNight"><strong>Booking Days:</strong> {{ bookingView.allData.stayNight }} Days</div>
                        <div class="col-md-6 booking_modal_com_item"><strong>Total No. of persons:</strong> {{ totalGuest }}</div>
                      </div>
                  </div>
                <div class="booking_modal_com_info_wrap " v-if="bookingView && bookingView.allData && bookingView.allData.bookingDetails">
                  <h3>Room Details</h3>
                  <div v-for="(room, roomIndex) of bookingView.allData.bookingDetails" :key="roomIndex" :class="{'row': true, 'boder-bottom-line pb-2':roomIndex !== bookingView.allData.bookingDetails.length - 1}">
                    <div class="col-md-6 booking_modal_com_item" v-if="bookingView.allData"><strong>Room:</strong>
                      {{ room.totalSelectedRoom }} x {{ room.roomType }} Room</div>
                    <div class="col-md-6 booking_modal_com_item"><strong>Room Price </strong>{{ currency(room.price, bookingView.currency) }}</div>
                    <div class="col-md-6 booking_modal_com_item"><strong>Total Room Cost:</strong> Nights: {{ bookingView.allData.stayNight }} | Rooms: {{ room.totalSelectedRoom }} | Cost {{ currency(room.cost, bookingView.currency) }}</div>
                    <div class="col-md-6 booking_modal_com_item"><strong>No. of persons:</strong> {{ room.numberOfAdults + room.numberOfChild + room.numberOfInfants }}</div>
                    <div class="col-md-6 booking_modal_com_item"><strong>Number Of Adults:</strong> {{ room.numberOfAdults }}</div>
                    <div class="col-md-6 booking_modal_com_item"><strong>Number Of Child:</strong> {{ room.numberOfChild }}</div>
                    <div class="col-md-6 booking_modal_com_item"><strong>number Of Infants:</strong> {{ room.numberOfInfants }}</div>
                  </div>
                </div>
                  <div class="booking_modal_com_info_wrap">
                      <h3>User Details</h3>
                      <div class="row" v-if="bookingView.allData && bookingView.allData.userInfo">
                        <div class="col-md-6 booking_modal_com_item"><strong>User name:</strong> Mr {{ bookingView.allData.userInfo.firstName + ' ' + bookingView.allData.userInfo.middleName + '  '  + bookingView.allData.userInfo.lastName }}</div>
                        <div class="col-md-6 booking_modal_com_item"><strong>Email:</strong> {{ bookingView.allData.userInfo.email }}</div>
                        <div class="col-md-6 booking_modal_com_item" v-if="bookingView && bookingView.contact && bookingView.contact.phone"><strong>Phone:</strong> {{ bookingView.contact.phone }}</div>
                        <div class="col-md-6 booking_modal_com_item" v-if="bookingView && bookingView.referralId"><strong>Referral Email:</strong> {{ bookingView.referralId }}</div>
                        <div class="col-md-6 booking_modal_com_item" v-for="(guest, index) in bookingView.contact.guest" :key="index"><strong>Guest name({{ index + 1 }}):</strong>
                          {{ `Age (${guest.age}) ${guest.name}` }} </div>
                      </div>
                  </div>
                  <div class="booking_modal_com_info_wrap">
                      <h3>Payment Details</h3>
                      <div class="row">
                          <div class="col-md-6 booking_modal_com_item" v-if="bookingView.allData && bookingView.allData.payment && bookingView.allData.payment.razorpay_order_id"><strong>Payment Order ID:</strong>{{bookingView.allData.payment.razorpay_order_id}}</div>
                          <div class="col-md-6 booking_modal_com_item" v-if="bookingView.otherFeesDetails"><strong>Taxes & Fees:</strong> {{ currency(bookingView.otherFeesDetails.GST, bookingView.currency) }}</div>

                          <div class="col-md-6 booking_modal_com_item" v-if="bookingView.otherFeesDetail"><strong>Booking No:</strong>{{bookingView.bookingId}}</div>
                          <div class="col-md-6 booking_modal_com_item" v-if="bookingView.allData && bookingView.allData.payment && bookingView.allData.payment.razorpay_payment_id"><strong>Payment ID:</strong>{{bookingView.allData.payment.razorpay_payment_id}}</div>

                          <div class="col-md-6 booking_modal_com_item" v-if="bookingView.otherFeesDetails"><strong>Application Charges:</strong> {{ currency(bookingView.otherFeesDetails.transactionFee, bookingView.currency) }}</div>
                          <div class="col-md-6 booking_modal_com_item prime_col"><strong>Amount Paid:</strong> {{currency(bookingView.transactionAmount, bookingView.currency)}}</div>

                          <div class="col-md-6 booking_modal_com_item" v-if="bookingView.otherFeesDetail"><strong>Micro Fees:</strong> {{ currency(bookingView.otherFeesDetails.microjobFee, bookingView.currency) }}</div>
                          <div class="col-md-6 booking_modal_com_item" v-if="bookingView.allData"><strong>Room Charges:</strong> {{ currency(bookingView.roomWithNightCost, bookingView.currency) }}</div>
                      </div>
                  </div>
              </div>
          </div>
        <b-modal v-model="isShowbookingViewModal" id="bookingViewModal" hide-footer hide-header no-fade>
          <div class="modal_container">
            <div class="modal_overlay"></div>
            <booking-view-modal
              @close="$bvModal.hide('bookingViewModal')"
              :bookingView="bookingView"
            />
          </div>
        </b-modal>
      </div>
</template>
<script>
import bookingViewModal from '../../components/common/bookingViewModal'
import { mapGetters } from 'vuex'

export default {
  components: { bookingViewModal },
  props: {
    bookingView: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.bookingView)
  },
  computed: {
    ...mapGetters({
      loggedInUserType: 'auth/loggedInUserType'
    }),
    totalGuest () {
      return this.bookingView.allData.bookingDetails.map(i => i.numberOfAdults + i.numberOfChild + i.numberOfInfants).reduce((a, b) => a + b, 0)
    },
    stayNight () {
      const startDate = this.$moment(this.bookingView.bookingStartDate, 'YYYY-MM-DD')
      const endDate = this.$moment(this.bookingView.bookingEndDate, 'YYYY-MM-DD')
      return endDate.diff(startDate, 'days')
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
