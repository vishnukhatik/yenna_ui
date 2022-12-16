<template>
  <div class="">
    <div class="content_view_wrap">
      <h1>Bookings Overview</h1>
      <div class="overview_blocks_container">
        <div class="row">
          <div class="col-md-3 mb-2">
            <div class="overview_block_wrap blue_bgcolor">
              <div class="bg_icon"><i class="fas fa-globe-americas"></i></div>
              <h4>Total Bookings</h4>
              <h3>{{ totalBooking }}</h3>
            </div>
          </div>
          <div class="col-md-3 mb-2">
            <div class="overview_block_wrap greygreen_bgcolor">
              <div class="bg_icon">
                <i class="fas fa-clipboard-check"></i>
              </div>
              <h4>Completed Bookings</h4>
              <h3>{{ completedBookingCount }}</h3>
            </div>
          </div>
          <div class="col-md-3 mb-2">
            <div class="overview_block_wrap orange_bgcolor">
              <div class="bg_icon"><i class="fas fa-hourglass-half"></i></div>
              <h4>Pending Bookings</h4>
              <h3>{{ pendingBookingCount }}</h3>
            </div>
          </div>
          <div class="col-md-3 mb-2">
            <div class="overview_block_wrap rederpink_bgcolor">
              <div class="bg_icon"><i class="fas fa-file-excel"></i></div>
              <h4>Cancelled Bookings</h4>
              <h3>{{ cancelledBookingCount }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="dash_hotel_detail_container" v-if="false">
        <!-- Nav tabs -->
        <div class="dash_tablist_wrap">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="tab">Hotels</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab">Tours</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="tab">Flights</a>
            </li>
          </ul>
        </div>

        <!-- Tab panes -->
        <div class="dash_tab_content_wrap tab-content" v-if="false">
          <div id="hotel_bookings" class="tab-pane active">
            <div class="row">
              <div class="col-md-4">
                <CountBooking
                  :totalBooking="totalBooking"
                  :countBookingHistory="countBookingHistory"
                  :completedBookingPercentage="completedBookingPercentage"
                  :pendingBookingPercentage="pendingBookingPercentage"
                  :cancelledBookingPercentage="cancelledBookingPercentage" />
              </div>
              <div class="col-md-8">
                <div class="overview_graph_container">
                  <h3>Hotel Bookings</h3>
                  <apexchart
                    type="line"
                    height="262"
                    :options="chartOptions"
                    :series="series"
                  ></apexchart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="overview_main_content_container">
        <dataTable
          :bookingHistory="bookingHistory"
          :tabelLoader="tabelLoader"
          @refresh="getBookingHistory"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ApexCharts from 'vue-apexcharts'
import { chartOptions } from './config'
import {
  ADMIN_FETCH_BOOKING,
  ADMIN_FETCH_COMPLETED_BOOKING,
  ADMIN_FETCH_CANCELLED_BOOKING,
  ADMIN_FETCH_PENDING_BOOKING,
  AGENT_FETCH_BOOKING
} from '../../../services/ENDPOINT'
import CountBooking from '../../../components/common/CountBooking'
import { mapGetters } from 'vuex'
import dataTable from './data-tabel'
export default {
  name: 'Common-Booking-History',
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    apexchart: ApexCharts,
    CountBooking,
    dataTable
  },
  data () {
    return {
      chartOptions,
      tabelLoader: false,
      series: [
        {
          name: 'Completed',
          data: [580, 400, 623, 718, 901, 125]
        },
        {
          name: 'Pending',
          data: [60, 209, 60, 90, 100, 54]
        }
      ],
      countBookingHistory: {
        completedBooking: 0,
        cancelledBooking: 0,
        pendingBooking: 0
      },
      showLoader: false,
      bookingHistory: []
    }
  },
  mounted () {
    this.getBookingHistory()
    // this.getCompletedBooking()
    // this.getCancelledBooking()
    // this.getPendingBooking()
  },
  computed: {
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
  methods: {
    async getBookingHistory () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        var result = null
        if (this.loggedInUserType === 'ADMIN') {
          result = await ADMIN_FETCH_BOOKING()
          this.bookingHistory = result.booking
        } else {
          result = await AGENT_FETCH_BOOKING(this.userInfo.email)
          this.bookingHistory = result.hotelsBooking
        }
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
    async getCompletedBooking () {
      try {
        this.$root.$loader(true)
        const payload = 'Completed'
        const result = await ADMIN_FETCH_COMPLETED_BOOKING(payload)
        this.countBookingHistory.completedBooking = result.Bookings
      } catch (err) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops!',
          text: 'Something Went Wrong Please Try Again',
          type: 'error',
          duration: 5000
        })
      } finally {
        this.$root.$loader(false)
      }
    },
    async getCancelledBooking () {
      try {
        this.$root.$loader(true)
        const payload = 'Cancelled'
        const result = await ADMIN_FETCH_CANCELLED_BOOKING(payload)
        this.countBookingHistory.cancelledBooking = result.Bookings
      } catch (err) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops!',
          text: 'Something Went Wrong Please Try Again',
          type: 'error',
          duration: 5000
        })
      } finally {
        this.$root.$loader(false)
      }
    },
    async getPendingBooking () {
      try {
        this.$root.$loader(true)
        const payload = 'Upcoming'
        const result = await ADMIN_FETCH_PENDING_BOOKING(payload)
        this.countBookingHistory.pendingBooking = result.Bookings
      } catch (err) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops!',
          text: 'Something Went Wrong Please Try Again',
          type: 'error',
          duration: 5000
        })
      } finally {
        this.$root.$loader(false)
      }
    }
  }
}
</script>
