<template>
  <div>
    <div class="row">
      <div class="col-md-10">
        <h5 class="pt-4">Yenna Rascala Booking Overview</h5>
      </div>
      <div class="col-md-2">
        <div class="form_input_wrap pb-3">
          <h4>Select Status</h4>
          <div class="input_block">
            <select name="" id="" class="form-control" v-model="selectStatus">
              <option value="All">All</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="content_view_wrap" v-if="items.length == 0 && !tabelLoader">
      <div class="user_trip_detail_container">
        <h2>{{ selectStatus === 'All' ? 'Booking Overview' : selectStatus }}</h2>
        <div class="user_empty_trip_wrap">
          <EmptyTrip/>
        </div>
      </div>
    </div>
    <div class="content_view_wrap" v-for="(item, index) in items" :key="index">
      <div class="user_trip_detail_container">
        <h2>{{ item.status }}</h2>
        <div class="user_upcoming_bk_info_container" v-for="(room, idx) in item.data" :key="idx">
          <hotel-name-star v-if="room.Hotel && room.Hotel.length > 0" :hotelInfo="room.Hotel[0]"/>
          <div class="bk_info_content_wrap" v-if="room.allInfo && room.allInfo.bookingDetails">
            <HotelImage :extraDetails="room" :totalRoomCost="totalRoomCost(room)" v-if="room.Hotel && room.Hotel.length > 0 && room.Hotel[0].attachments && room.Hotel[0].attachments.images.length > 0" :imgPath="room.Hotel[0].attachments.images[0].url"/>
            <HotelImage :extraDetails="room" :totalRoomCost="totalRoomCost(room)" v-else imgPath="https://yr-dev.s3.ap-south-1.amazonaws.com/hotels/c10d3c40-11f2-11eb-9f44-9792787e30c2.jpeg"/>
            <div class="bk_info_content" v-if="room.Hotel && room.Hotel.length > 0 && room.bookingDetails">
              <div class="row">
                <div class="col-md-7">
                  <Address v-if="room.Hotel && room.Hotel.length > 0" :address="room.Hotel[0].propertyAddress"/>
                </div>
                <div class="col-md-5 text-right" v-if="item.status === 'Upcoming'">
                  <div class="bk_action_btn_wrap">
                    <button class="btn btn-danger bk_room_cancel_btn mb-3" @click="dataSetCancelModal(room)">Cancel Room</button><br>
                    <span style="font-size: 16px" v-if="room.bookingSecretCode && item.status === 'Upcoming'">
                        Booking Secret Code:
                      <span style="color: #ffc30e;font-weight: 600">
                        {{ room.bookingSecretCode }}
                      </span>
                    </span>
                    <br>
                  </div>
                </div>
              </div>
              <content-trip
                v-for="(booking, i) in room.bookingDetails"
                :key="i"
                :isCompleted="item.status !== 'Upcoming'"
                :hotelInfo="room.Hotel[0]"
                :bookingInfo="booking"
                :extraDetails="room"
                :allInfo="room.allInfo.bookingDetails[i]"
              />
            </div>
          <div class="bk_send_info_btn_container" v-if="item.status == 'Completed'">
            <button class="btn" @click="addViewShowModal(room)"><i class="far fa-star"></i> Add Review</button>
          </div>
          <div class="bk_send_info_btn_container" v-if="item.status == 'Upcoming'">
            <button class="btn" @click="sendEmail(room)"><i class="far fa-envelope"></i> Send Email</button>
            <button class="btn"><i class="fas fa-print"></i> Print Booking</button>
          </div>
          </div>
        </div>
        </div>
    </div>
    <div>
    <div v-if="tabelLoader" style="top: 50%;position: fixed;left: 50%;" class="d-flex justify-content-center mb-3">
        <b-spinner
          style="width: 6rem; height: 6rem;"
          variant="warning"
        ></b-spinner>
      </div>
    </div>
    <b-modal v-model="showBookingCancel" @change="changeCancelModal" id="showBookingCancel" hide-footer hide-header no-fade>
      <div class="modal_container" v-if="bookingObj && bookingObj.allInfo">
        <div class="modal_overlay"></div>
        <CancellationPopup
          :bookingObj="bookingObj"
          @close="showBookingCancel = false"
          @refresh="getBookingHistory"
        />
      </div>
    </b-modal>
    <b-modal v-model="isShowReviewModal" id="isShowReviewModal" hide-footer hide-header no-fade>
      <div class="modal_container">
        <div class="modal_overlay"></div>
        <div class="modal_form_wrap">
          <h2><i class="fas fa-user"></i> Add Review</h2>
          <div class="modal_close" @click="isShowReviewModal = false"><i class="fas fa-times"></i></div>
            <ul>
              <li>
                <div class="ratingModel">
                  <q-rating
                    v-model="ratingModel"
                    size="2em"
                    :max="5"
                    color="yellow"
                  />
                  <p class="mb-0">Note</p>
                  <div class="input_block form-group">
                    <textarea
                      name="Policies"
                      :class="{
                        wysiwyg_edt: true,
                        'form-control': true
                      }"
                      class="wysiwyg_edt"
                    ></textarea>
                  </div>
                </div>
              </li>
              <li>
                <input type="submit" style="width: 100%;" :class="{ disabled: showLoader }" value="Submit"><b-spinner v-if="showLoader" label="Spinning"></b-spinner>
              </li>
            </ul>
        </div>
      </div>
    </b-modal>
    <div class="row pt-3 pb-3" v-if="tboBookingArr.length > 0">
      <div class="col-md-10">
        <h5>Other Booking Overview</h5>
      </div>
    </div>
    <TboBooking
      :tboBookingArr="tboBookingArr"
    />
  </div>
</template>
<script>
import { fields } from './config'
import { USER_MY_BOOKING_LIMITED, USER_SEND_MAIL_BOOKING, USER_FETCH_TBO_BOOKING } from '../../../services/ENDPOINT'
import { mapGetters } from 'vuex'
import EmptyTrip from './components/EmptyTrip'
import ContentTrip from './components/ContentTrip'
import hotelNameStar from './components/hotelNameStar'
import Address from './components/Address'
import HotelImage from './components/HotelImage'
import TboBooking from './components/TboBooking'
import _ from 'lodash'
import CancellationPopup from 'components/common/CancellationPopup'
export default {
  name: 'UserDashboard',
  components: { EmptyTrip, ContentTrip, hotelNameStar, Address, HotelImage, CancellationPopup, TboBooking },
  data () {
    return {
      tabelLoader: false,
      fields,
      bookingHistory: [],
      bookingObj: null,
      showBookingCancel: false,
      showLoader: false,
      selectStatus: 'All',
      isShowReviewModal: false,
      ratingModel: 5,
      tboBookingArr: []
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    }),
    completedBookings () {
      return this.bookingHistory.length
    },
    items () {
      let arr = []
      if (this.selectStatus === 'All') arr = this.bookingHistory
      else arr = this.bookingHistory.filter(i => i.status === this.selectStatus)
      return arr
    }
  },
  mounted () {
    this.getTboBookingHistory()
    this.getBookingHistory()
  },
  methods: {
    addViewShowModal () {
      this.isShowReviewModal = true
    },
    async sendEmail (item) {
      const data = this._.cloneDeep(item)
      delete data.others
      delete data.Hotel
      try {
        this.$root.$loader(true)
        const payload = {
          email: item.email,
          name: item.allInfo?.userInfo?.firstName,
          bookingDetails: JSON.stringify(data),
          subject: 'Your Booking'
        }
        await USER_SEND_MAIL_BOOKING(payload)
        this.$notify({
          group: 'eb-notification',
          title: 'Success',
          text: 'Please Check Your MailBox',
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
        this.showBookingCancel = false
        this.$root.$loader(false)
      }
    },
    totalRoomCost (item) {
      if (item.allInfo && item.allInfo.bookingDetails) return item.allInfo.bookingDetails.map(i => i.cost).reduce((a, b) => a + b, 0)
      else return 0
    },
    changeCancelModal (v) {
      if (!v) this.bookingObj = null
    },
    dataSetCancelModal (item) {
      const title = 'Confirmation!'
      const msg = 'Are you sure, you want to Cancel This Booking?'
      this.$root.$confirm(title, msg).then(async confirmed => {
        this.bookingObj = this._.cloneDeep(item)
        this.bookingObj.bookingDay = this.$moment().diff(this.$moment(this.bookingObj.createdAt), 'days') + 1
        if (this.bookingObj && this.bookingObj.allInfo && this.bookingObj.allInfo.bookingDetails) {
          this.bookingObj.allInfo.bookingDetails.map(i => {
            const charge = i.policys.find(p => Number(p.duration) === this.bookingObj.bookingDay)
            if (charge) i.currentCancelPolicyPercentage = Number(charge.charges)
            else i.currentCancelPolicyPercentage = Number(i.cancelPolicy)
            i.refundAmount = this.refundCalucation((i.cost), Number(i.currentCancelPolicyPercentage))
          })
        }
        this.bookingObj.totalRoomRefunt = this.bookingObj.allInfo.bookingDetails.map(i => i.refundAmount).reduce((a, b) => a + b, 0)
        this.showBookingCancel = true
      })
    },
    refundCalucation (cost, percentage) {
      const amount = Math.ceil((Number(percentage) / 100) * Number(cost))
      return cost - amount
    },
    async getTboBookingHistory () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const pagination = {
          currentPage: 1,
          perRowPage: 5,
          userId: this.userInfo._id
        }
        const result = await USER_FETCH_TBO_BOOKING(pagination)
        console.log(result)
        this.tboBookingArr = result.booking
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
        this.tabelLoader = false
      }
    },
    async getBookingHistory () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await USER_MY_BOOKING_LIMITED(this.userInfo.email)
        await Promise.all(result.userBookings.filter(i => {
          i.allInfo = this.IsJsonString(i.others) ? JSON.parse(i.others) : {}
        }))
        const finalResult = _.chain(result.userBookings)
          .groupBy('status')
          .map((value, key) => ({ status: key, data: value }))
          .value()
        this.bookingHistory = finalResult
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
        this.tabelLoader = false
      }
    }
  }
}
</script>
<style>
.ratingModel .row {
  margin-right: 0;
  margin-left: 0;
}
</style>
