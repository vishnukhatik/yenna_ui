<template>
  <div class="modal_booking_wrap">
    <h2 style="margin-bottom: 0px;"><i class="fas fa-book"></i> Cancellation Details</h2>
    <div class="modal_close" @click="$emit('close')"><i class="fas fa-times"></i></div>
    <div class="booking_modal_details_container" style="overflow-y: scroll;max-height: 500px;">
      <div class="booking_modal_details_title_wrap" v-if="false">
        <h3><a>{{ bookingObj.propertyName }}</a></h3>
        <div class="star_val"><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i
          class="fas fa-star"></i> <i class="fas fa-star"></i></div>
      </div>
      <div class="booking_modal_gen_details_wrap">
        <div class="booking_modal_hotel_address_wrap" v-if="false">
          <i class="fas fa-map-marker-alt"></i> {{ bookingObj.allInfo.address }}
        </div>
        <div class="booking_modal_com_info_wrap">
          <h3>Payment Details</h3>
          <div class="row">
            <div class="col-md-6 booking_modal_com_item"><strong>Total Room Charges:</strong> {{ currency(totalRoomCost(bookingObj), bookingObj.currency) }}</div>
            <div class="col-md-6 booking_modal_com_item"><strong>taxes & Fees (GST):</strong> {{ currency(bookingObj.otherFeesDetails.GST, bookingObj.currency) }}</div>
            <div class="col-md-6 booking_modal_com_item"><strong>Application Charges:</strong> {{ currency(bookingObj.otherFeesDetails.transactionFee, bookingObj.currency) }}</div>
            <div v-if="false" class="col-md-6 booking_modal_com_item"><strong>Micro Fees:</strong> {{ currency(bookingObj.otherFeesDetails.microjobFee, bookingObj.currency) }}</div>
            <div class="col-md-6 booking_modal_com_item"><strong> {{ bookingObj.stayNight }} Night</strong></div>
            <div class="col-md-6 booking_modal_com_item"><strong>Total: </strong> {{ currency(bookingObj.totalAmount, bookingObj.currency) }}</div>
          </div>
        </div>
        <div class="booking_modal_com_info_wrap">
          <h3>Room Details</h3>
          <div v-for="(item, index) of bookingObj.allInfo.bookingDetails" :key="index" :class="{'row': true, 'boder-bottom-line pb-2 pt-2':index !== bookingObj.allInfo.bookingDetails.length - 1}">
            <div class="col-md-6 booking_modal_com_item"><strong>Room:</strong> 1 x Standard {{ item.roomType }} Room</div>
            <div class="col-md-6 booking_modal_com_item"><strong>Room Price:</strong> {{ currency(item.price, item.currency)}}</div>
            <div class="col-md-6 booking_modal_com_item"><strong>Total Room Cost:</strong> {{ bookingObj.stayNight }}  Nights | {{ item.totalSelectedRoom }} Rooms |  {{ currency(item.cost, bookingObj.currency) }}</div>
            <div class="col-md-6 booking_modal_com_item"><strong>Cancellation Charges </strong> {{ bookingObj.allInfo.bookingDetails[index].currentCancelPolicyPercentage }}%</div>
<!--            bookingObj.allInfo.bookingDetails[index].cancelPolicy-->
            <div v-if="false" class="col-md-6 booking_modal_com_item"><strong>Cancellation Amount</strong> {{ currency(percentage(item.cost, bookingObj.allInfo.bookingDetails[index].currentCancelPolicyPercentage ), item.currency) }}</div>

            <!-- <div class="col-md-6 booking_modal_com_item"><strong>Policy:</strong> <span v-html="bookingObj.allInfo.bookingDetails[index].cancelPolicyDetails"> {{ bookingObj.allInfo.bookingDetails[index].cancelPolicyDetails }} </span></div> -->
            <div class="col-md-6 booking_modal_com_item"><strong>Refund Amount </strong> {{currency(refundCalucation(item.cost, bookingObj.allInfo.bookingDetails[index].currentCancelPolicyPercentage), item.currency) }}</div>

          </div>
        </div>
        <div class="booking_modal_com_info_wrap">
          <div class="row">
            <div class="col-md-12">
              <div class=" form-group">
                <label :class="{ 'text-danger': errors.first('Cancellation Reasons'), 'mb-1': true }"
                  >Cancellation Reasons </label>
                <input
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  v-validate="'required|max:150'"
                  standout="transparent"
                  hide-bottom-space
                  v-model="notes"
                  :dense="true"
                  name="Cancellation Reasons"
                  class="form-control"
                  placeholder="Enter Cancellation Reasons"
                />
                <span
                  class="eb-error-input text-danger"
                  v-if="errors.first('Cancellation Reasons')"
                >
                    {{ errors.first("Cancellation Reasons") }}</span
                >
              </div>
            </div>
            <div class="col-md-6 booking_modal_com_item"><strong>Total Refund:</strong>{{ currency(bookingObj.totalRoomRefunt, bookingObj.currency) }} </div>
            <div class="col-md-6 text-right">
              <a type="button" @click="cancelBookings()" :class="{ disabled: showLoader, 'btn btn-danger ml-0': true }">Cancel</a><b-spinner v-if="showLoader" label="Spinning"></b-spinner>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { USER_REFUND, USER_ROOM_CANCEL } from 'src/services/user'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'CancellationPopup',
  props: {
    bookingObj: {
      Object
    }
  },
  data () {
    return {
      showLoader: false,
      notes: ''
    }
  },
  methods: {
    refundCalucation (cost, percentage) {
      const amount = Math.ceil((Number(percentage) / 100) * Number(cost))
      return cost - amount
    },
    percentage (cost, percentage) {
      return Math.ceil((Number(percentage) / 100) * Number(cost))
    },
    totalRoomCost (item) {
      return item.allInfo.bookingDetails.map(i => i.cost).reduce((a, b) => a + b, 0)
    },
    async cancelBookings () {
      this.$validator.validateAll(['Cancellation Reasons']).then(async (isValid) => {
        if (isValid) {
          try {
            this.$root.$loader(true)
            this.showLoader = true
            const payload = {
              bookingId: this.bookingObj.bookingId,
              status: 'Cancelled'
            }
            await USER_ROOM_CANCEL(payload)
            this.refund()
            this.$notify({
              group: 'eb-notification',
              title: 'Success!',
              text: 'Your Booking Cancel Successfully',
              type: 'success',
              duration: 5000
            })
          } catch (err) {
            this.$notify({
              group: 'eb-notification',
              title: 'Oops',
              text: 'Something Went Wrong Please Try Again',
              type: 'error',
              duration: 5000
            })
          } finally {
            this.$root.$loader(false)
            this.showLoader = false
          }
        }
      })
    },
    async refund () {
      try {
        this.$root.$loader(true)
        const payload = {
          amount: Number(this.bookingObj.totalRoomRefunt) * 100,
          paymentId: this.bookingObj.allInfo.payment.razorpay_payment_id,
          notes: this.notes
        }
        await USER_REFUND(payload)
        this.$notify({
          group: 'eb-notification',
          title: 'Refund Request',
          text: 'The payment will be refunded in 5-7 days.',
          type: 'success',
          duration: 5000
        })
      } catch (err) {
        // this.$notify({
        //   group: 'eb-notification',
        //   title: 'Oops',
        //   text: 'Something Went Wrong Please Try Again',
        //   type: 'error',
        //   duration: 5000
        // })
      } finally {
        this.$emit('refresh')
        this.$emit('close')
        this.$root.$loader(false)
      }
    }
  }
}
</script>

<style>
.boder-bottom-line {
  border-bottom: 1px solid #555;
}
</style>
