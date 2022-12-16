<template>
  <div class="content_view_wrap">
    <div class="overview_main_content_container">
      <div class="overview_main_table_container">
        <div class="table_search_form_container">
          <form>
            <div class="row">
              <div class="col-md-7 mt-2">
                <h4 style="color: #ffc30d;">Yenna Rascala Hotels Booking History</h4>
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
            :busy="tabelLoader"
            :per-page="perPage"
            :current-page="currentPage"
            striped
            hover
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
              <div class="dash_view_btn">
                <a class="btn btn-info"  @click="viewDataAction(row.item)">View</a>
                <div
                  class="dash_view_btn pl-2"
                  title="Cancel This Booking"
                  v-if="row.item.status === 'Upcoming'"
                  @click="cancelBookings(row.item)"
                >
                  <a class="btn btn-danger">Cancel</a>
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
    </div>
  <TboBooking />
    <b-modal v-model="isShowbookingViewModal" centered  size="lg" no-close-on-backdrop id="bookingViewModal" hide-footer hide-header no-fade>
      <div class="modal_container">
        <div class="modal_overlay"></div>
        <booking-view-modal
          @close="$bvModal.hide('bookingViewModal')"
          :bookingView="bookingView"
        />
      </div>
    </b-modal>
    <b-modal v-model="showBookingCancel" @change="changeCancelModal" id="showBookingCancel" scrollable  hide-footer hide-header no-fade>
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
<script >
import { fields } from './config'
import { USER_MY_BOOKING } from 'src/services/user'
import { mapGetters } from 'vuex'
import bookingViewModal from '../../../components/common/bookingViewModal'
import CancellationPopup from 'components/common/CancellationPopup'
import TboBooking from './TboBooking'
export default {
  name: 'UserHotelBooking',
  components: {
    bookingViewModal,
    CancellationPopup,
    TboBooking
  },
  data () {
    return {
      fields: fields,
      bookingHistory: [],
      currentPage: 0,
      perPage: 5,
      tabelLoader: false,
      searchUserName: '',
      selectStatus: 'All',
      bookingView: null,
      isShowbookingViewModal: false,
      showBookingCancel: false,
      bookingObj: null
    }
  },
  events: {

  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    }),
    items () {
      let arr = []
      if (this.selectStatus === 'All') arr = this.bookingHistory
      else arr = this.bookingHistory.filter(i => i.status === this.selectStatus)
      return arr
    }
  },
  mounted () {
    this.getBookingHistory()
  },
  methods: {
    changeCancelModal (v) {
      if (!v) this.bookingObj = null
    },
    dataSetCancelModal (item) {
      const title = 'Confirmation!'
      const msg = 'Are you sure, you want to Cancel This Booking?'
      this.$root.$confirm(title, msg).then(async confirmed => {
        this.bookingObj = this._.cloneDeep(item)
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
    async getBookingHistory () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await USER_MY_BOOKING(this.userInfo.email)
        this.bookingHistory = result.userBookings
        this.bookingHistory.filter(i => {
          i.bookingStartDate = this.$moment(i.bookingStartDate).format('DD-MM-YYYY')
          i.bookingEndDate = this.$moment(i.bookingEndDate).format('DD-MM-YYYY')
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
        this.tabelLoader = false
      }
    },
    returnEmailPhone (item, field) {
      const data = JSON.parse(item.others)
      if (data.userInfo) {
        return data.userInfo[field]
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
    refundCalucation (cost, percentage) {
      const amount = Math.ceil((Number(percentage) / 100) * Number(cost))
      return cost - amount
    },
    viewDataAction (roomItem) {
      this.bookingView = this._.cloneDeep(roomItem)
      this.bookingView.allData = JSON.parse(this.bookingView.others)
      this.isShowbookingViewModal = true
    }
  }
}
</script>
