<template>
  <div class="">
    <div class="overview_main_table_container">
      <div class="table_search_form_container">
        <form>
          <div class="row">
            <div class="col-md-7 mt-2">
              <h3>Booking History</h3>
            </div>
            <div class="col-md-3">
              <div class="form_input_wrap">
                <h4>Search</h4>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="searchUserName"
                    placeholder="Search by keyword(s)."
                  />
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form_input_wrap">
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
        </form>
      </div>
      <div class="main_table_wrap">
        <b-table
          :items="items"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          :busy="tabelLoader"
          striped
          hover
          fixed
          show-empty
          :filter="searchUserName"
          ref="bookingHistory"
          responsive
        >
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
          <template v-slot:cell(userName)="row">
            <span v-if="row.item">
              {{ returnUserName(row.item) }}
            </span>
          </template>
          <template v-slot:cell(email)="row">
            <span v-if="row.item">
              {{ returnEmailPhone(row.item, 'email') }}
            </span>
          </template>
          <template v-slot:cell(phone)="row">
            <span v-if="row.item && row.item.contact">
              {{row.item.contact.phone }}
            </span>
          </template>
          <template v-slot:cell(actions)="row">
            <div class="dash_view_btn pl-2 pt-2">
              <a class="btn btn-info"  @click="viewDataAction(row.item)">View</a>
              <!-- @click="verifySecretCode('Cancelled', row.item.bookingId, row.item)"-->
              <div
                class="dash_view_btn pl-2 pt-2"
                title="Cancelled This Booking"
                v-if="row.item.status === 'Upcoming'"
                @click="cancelBookings(row.item, )"
              >
                <a class="btn btn-danger">Cancel</a>
              </div>
              <div
                class="dash_view_btn pl-2 pt-2"
                title="Cancelled This Booking"
                v-if="row.item.status !== 'Confirmed'"
                @click="confirmBookings(row.item)"
              >
                <a class="btn btn-primary">Confirm</a>
              </div>
              <div
                class="dash_view_btn pl-2 pt-2"
                title="Completed This Booking"
                v-if="row.item.status === 'Upcoming' || row.item.status === 'Confirmed'"
                @click="verifySecretCode('Completed', row.item.bookingId, row.item)"
              >
                <a class="btn btn-success">Complete</a>
              </div>
            </div>
          </template>
          <template v-slot:cell(transactionAmount)="row">
            ₹ {{row.item.transactionAmount }}
          </template>
        </b-table>
        <div class="row pt-3 pb-3 pl-3 pr-3">
          <div class="col-md-6">
            <p style="display: inline-block;">
              <i
                class="fa fa-list"
                style="margin-right: 10px; color: #cecece;"
              ></i
              >Showing <strong>{{ currentPage }}</strong> to
              <strong>{{ currentPage * perPage }} </strong>
              of {{ items.length }} Entries
            </p>
          </div>
          <div class="col-md-6">
            <b-pagination
              v-model="currentPage"
              :per-page="perPage"
              :total-rows="items.length"
              class="float-right"
            ></b-pagination>
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
    <b-modal v-model="verifySecretCodeModal" hide-footer hide-header no-fade>
      <div class="modal_container">
        <div class="modal_overlay"></div>
        <div class="modal_form_wrap" style="width: 345px">
          <h2><i class="fas fa-user"></i> Two Factor Verification</h2>
          <div class="modal_close" @click="verifySecretCodeModal = false"><i class="fas fa-times"></i></div>
          <ul>
            <li>
              <label :class="{ 'text-danger': errors.first('Booking Secret Code') }">Enter Customer Booking Secret Code</label>
              <div class="dark_bg">
                <span class="fas fa-key"></span>
                <input type="number" placeholder="Please Enter Booking Secret Code" name="Booking Secret Code" v-validate="'required'" v-model="bookingSecretCode">
              </div>
              <span
                class="eb-error-input text-danger"
                v-if="errors.first('Booking Secret Code')"
              >

            {{ errors.first("Booking Secret Code") }}</span
              >
            </li>
            <li>
              <input type="submit" :class="{ disabled: showLoader, 'w-100': true }" @click="changeStatus" value="Submit"><b-spinner v-if="showLoader" label="Spinning"></b-spinner>
            </li>
          </ul>
        </div>
      </div>
    </b-modal>
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
  </div>
</template>
<script>
import bookingViewModal from '../../../components/common/bookingViewModal'
import { fields } from './config'
import {
  ADMIN_BOOKING_APPROVE
} from '../../../services/ENDPOINT'
import { mapGetters } from 'vuex'
import CancellationPopup from 'components/common/CancellationPopup'

export default {
  name: 'Booking-History-Table',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    bookingViewModal,
    CancellationPopup
  },
  props: {
    bookingHistory: {
      type: Array
    },
    tabelLoader: {
      type: Boolean,
      defualt: false
    }
  },
  data () {
    return {
      currentPage: 1,
      perPage: 10,
      fields: fields,
      bookingView: null,
      isShowbookingViewModal: false,
      selectStatus: 'All',
      searchUserName: '',
      changeStatusModalObj: null,
      verifySecretCodeModal: false,
      bookingSecretCode: null,
      changeStatusPayload: {},
      showLoader: false,
      showBookingCancel: false,
      bookingObj: null,
      loader: false
    }
  },
  computed: {
    items () {
      let arr = []
      if (this.selectStatus === 'All') arr = this.bookingHistory
      else arr = this.bookingHistory.filter(i => i.status === this.selectStatus)
      return arr
    },
    totalBooking () {
      return this.bookingHistory.length
    },
    completedBookingCount () {
      return this.bookingHistory.reduce((pre, cur) => (cur.status === 'Completed') ? ++pre : pre, 0)
    },
    completedBookingPercentage () {
      return Math.ceil((100 * this.bookingHistory.reduce((pre, cur) => (cur.status === 'Completed') ? ++pre : pre, 0)) / this.bookingHistory.length)
    },
    pendingBookingCount () {
      return this.bookingHistory.reduce((pre, cur) => (cur.status === 'Upcoming') ? ++pre : pre, 0)
    },
    pendingBookingPercentage () {
      return Math.ceil((100 * this.bookingHistory.reduce((pre, cur) => (cur.status === 'Upcoming') ? ++pre : pre, 0)) / this.bookingHistory.length)
    },
    cancelledBookingCount () {
      return this.bookingHistory.reduce((pre, cur) => (cur.status === 'Cancelled') ? ++pre : pre, 0)
    },
    cancelledBookingPercentage () {
      return Math.ceil((100 * this.bookingHistory.reduce((pre, cur) => (cur.status === 'Cancelled') ? ++pre : pre, 0)) / this.bookingHistory.length)
    },
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    })
  },
  watch: {
    bookingHistory () {
      this.dataSet()
    },
    tabelLoader (v) {
      console.log('test', v)
    }
  },
  methods: {
    confirmBookings (item) {
      const title = 'Confirmation!'
      const msg = 'Are you sure, you want to Confirm This Booking?'
      this.$root.$confirm(title, msg).then(async confirmed => {
        try {
          const payload = {
            bookingId: item.bookingId,
            status: 'Confirmed'
          }
          await ADMIN_BOOKING_APPROVE(payload)
          this.$emit('refresh')
        } catch (err) {
          this.$notify({
            group: 'eb-notification',
            title: 'Oops',
            text: 'Something Went Wrong Please Try Again',
            type: 'error',
            duration: 5000
          })
        }
      })
    },
    changeCancelModal (v) {
      if (!v) this.bookingObj = null
    },
    getBookingHistory () {
      this.$emit('refresh')
    },
    refundCalucation (cost, percentage) {
      const amount = Math.ceil((Number(percentage) / 100) * Number(cost))
      return cost - amount
    },
    returnUserName (item) {
      if (item.others && item.others !== 'string') {
        const data = JSON.parse(item.others)
        if (data.userInfo) {
          return data.userInfo.firstName + ' ' + data.userInfo.middleName + ' ' + data.userInfo.lastName
        }
      }
    },
    returnEmailPhone (item, field) {
      if (item.others && item.others !== 'string') {
        const data = JSON.parse(item.others)
        if (data.userInfo) {
          return data.userInfo[field]
        }
      }
    },
    async cancelBookings (item) {
      const title = 'Confirmation!'
      const msg = 'Are you sure, you want to Cancel This Booking?'
      this.$root.$confirm(title, msg).then(async confirmed => {
        this.bookingObj = this._.cloneDeep(item)
        this.bookingObj.allInfo = JSON.parse(this.bookingObj.others)
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
    changeStatus () {
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          if (this.bookingSecretCode === this.changeStatusModalObj.bookingSecretCode) {
            this.verifySecretCodeModal = false
            try {
              this.$root.$loader(true)
              const result = await ADMIN_BOOKING_APPROVE(this.changeStatusPayload)
              this.$notify({
                group: 'eb-notification',
                title: 'Success!',
                text: result.message,
                type: 'success',
                duration: 5000
              })
              this.changeStatusPayload = {}
              this.bookingSecretCode = null
              this.$validator.reset()
              this.$emit('refresh')
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
            }
          } else {
            this.$notify({
              group: 'eb-notification',
              title: 'Oops',
              text: 'Booking Secret Code Does Not Match',
              type: 'warn',
              duration: 5000
            })
          }
        }
      })
    },
    verifySecretCode (status, bookingId, item) {
      const title = 'Confirmation!'
      const msg = `Are you sure, you want to Change Status ${'this'} Hotel?`
      this.$root.$confirm(title, msg).then(async confirmed => {
        this.changeStatusModalObj = item
        this.verifySecretCodeModal = true
        this.changeStatusPayload = { status, bookingId }
      })
    },
    dataSet () {
      this.bookingHistory.filter(i => {
        i.bookingStartDate = this.$moment(i.bookingStartDate).format('DD-MM-YYYY')
        i.bookingEndDate = this.$moment(i.bookingEndDate).format('DD-MM-YYYY')
      })
    },
    viewDataAction (roomItem) {
      this.bookingView = this._.cloneDeep(roomItem)
      this.bookingView.allData = JSON.parse(this.bookingView.others)
      this.isShowbookingViewModal = true
    }
  }
}
</script>
