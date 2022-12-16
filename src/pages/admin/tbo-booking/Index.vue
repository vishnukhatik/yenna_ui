<template>
  <div class="content_view_wrap">
    <div class="overview_main_content_container">
      <div class="overview_main_table_container">
        <div class="table_search_form_container">
          <form>
            <div class="row">
              <div class="col-md-8 mt-2">
                <h4>TBO Hotels Booking History</h4>
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
                <div class="col-md-1">
                  <span style="margin-left: 7px">Entries</span>
                  <select
                    style="
                    background: rgb(34, 34, 34);
                    border-color: white;
                    border: solid;
                    border-width: 1px;
                    background: #222222"
                    v-model="pagination.perRowPage"
                    @change="changePerRowPage"
                  >
                  <option style="background: #fff;" :value="5">5</option>
                  <option style="background: #fff;" :value="15">15</option>
                  <option style="background: #fff;" :value="40">40</option>
                  <option style="background: #fff;" :value="100">100</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="main_table_wrap">
          <b-table
            :items="items"
            :fields="fields"
            :busy="tabelLoader"
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
            <template v-slot:cell(CheckInDate)="row">
              <span>
                {{ $moment(row.item.booking.CheckInDate).format('DD-MM-YYYY') }}
              </span>
            </template>
            <template v-slot:cell(CheckOutDate)="row">
              <span>
                {{ $moment(row.item.booking.CheckOutDate).format('DD-MM-YYYY') }}
              </span>
            </template>
            <template v-slot:cell(createdAt)="row">
              <span>
                {{ $moment(row.item.booking.createdAt).format('DD-MM-YYYY') }}
              </span>
            </template>
            <template v-slot:cell(finalPrice)="row">
              <span v-if="row.item.payment && row.item.payment.finalPrice">
                {{ currency(row.item.payment.finalPrice, row.item.payment.currency) }}
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
              <p style="display: inline-block">
                <i
                  class="fa fa-list"
                  style="margin-right: 10px; color: #cecece"
                ></i
                >Showing <strong>{{ pagination.currentPage }}</strong> to
                <strong
                  >{{ pagination.currentPage * pagination.perRowPage }}
                </strong>
                of {{ pagination.totalItems }} Entries
              </p>
            </div>
            <div class="col-md-6">
              <b-pagination
                v-model="pagination.currentPage"
                :per-page="pagination.perRowPage"
                :total-rows="pagination.totalItems"
                @change="changePage"
                class="float-right"
              ></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="isShowbookingViewModal" id="bookingViewModal" hide-footer hide-header no-fade>
      <div class="modal_container">
        <div class="modal_overlay"></div>
        <div class="modal_booking_wrap">
          <h2><i class="fas fa-book"></i> Booking Details</h2>
          <div class="modal_close" @click="isShowbookingViewModal = false"><i class="fas fa-times"></i></div>
          <BookingViewModalTBO v-if="isShowbookingViewModal" :bookingInfo="bookingInfo"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import { tboFields } from './config'
import { USER_FETCH_TBO_BOOKING } from '../../../services/ENDPOINT'
import BookingViewModalTBO from '../../../components/common/BookingViewModalTBO'
export default {
  components: {
    BookingViewModalTBO
  },
  data () {
    return {
      pagination: {
        currentPage: 1,
        perRowPage: 5
      },
      tabelLoader: false,
      fields: tboFields,
      searchUserName: '',
      items: [],
      isShowbookingViewModal: false,
      bookingInfo: null
    }
  },
  mounted () {
    this.getTboBookingHistory()
  },
  methods: {
    changePerRowPage () {
      this.pagination.currentPage = 1
      this.getTboBookingHistory()
    },
    changePage (currentPage) {
      this.pagination.currentPage = currentPage
      this.getTboBookingHistory()
    },
    viewDataAction (v) {
      this.isShowbookingViewModal = true
      this.bookingInfo = JSON.parse(JSON.stringify(v))
    },
    async getTboBookingHistory () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        this.pagination.userId = ''
        const result = await USER_FETCH_TBO_BOOKING(this.pagination)
        this.items = result.booking
        this.pagination = result.pagination
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
