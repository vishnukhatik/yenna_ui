<template>
  <div class="content_view_wrap">
    <h1>Dashboard</h1>
    <div class="overview_blocks_container">
      <div class="row">
        <div class="col-md-4 mb-2">
          <div class="overview_block_wrap blue_bgcolor">
            <div class="bg_icon">
              <i class="fas fa-globe-americas"></i>
            </div>
            <h4>Hotels</h4>
            <h3>{{ hotelCount }}</h3>
          </div>
        </div>
        <div class="col-md-4 mb-2">
          <div class="overview_block_wrap lightgreygreen_bgcolor">
            <div class="bg_icon">
              <i class="fas fa-globe-americas"></i>
            </div>
            <h4>Total Turnover</h4>
            <h3>{{ currency(totalTunover) }}</h3>
          </div>
        </div>
        <div class="col-md-4 mb-2">
          <div class="overview_block_wrap rederpink_bgcolor">
            <div class="bg_icon">
              <i class="fas fa-clipboard-check"></i>
            </div>
            <h4>Pending Earnings</h4>
            <h3>{{ currency(pendingTunover) }}</h3>
          </div>
        </div>
        <div class="col-md-4 mb-2" v-if="false">
          <div class="overview_block_wrap blue_bgcolor">
            <div class="bg_icon">
              <i class="fas fa-hourglass-half"></i>
            </div>
            <h4>YR Token Earnings</h4>
            <h3>YR 0</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="overview_blocks_container mt-5">
      <div class="row">
        <div class="col-md-3 mb-2">
          <div class="overview_block_wrap blue_bgcolor">
            <div class="bg_icon">
              <i class="fas fa-globe-americas"></i>
            </div>
            <h4>Total Bookings</h4>
            <h3>{{totalBooking}}</h3>
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
            <div class="bg_icon">
              <i class="fas fa-hourglass-half"></i>
            </div>
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

    <div class="dash_hotel_detail_container mt-5" v-if="false">
      <div class="dash_hotel_graph_container">
        <div class="row">
          <div class="col-md-6">
            <div class="overview_graph_container">
              <h3>Property Monthly Bookings</h3>
              <apexchart type="bar" height="262" :options="chartOptions" :series="series"></apexchart>
            </div>
          </div>
          <div class="col-md-6">
            <div class="overview_graph_container">
              <h3>Property Monthly Earnings</h3>
              <apexchart type="line" height="262" :options="chartOptions" :series="series"></apexchart>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dash_hotel_detail_container">
      <div class="dash_tablist_wrap">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              data-toggle="tab"
              href="#hotel_bookings"
            >Today Booking</a
            >
          </li>
        </ul>
      </div>
      <div class="dash_tab_content_wrap">
        <dataTable
          :bookingHistory="todayBookingHistory"
          :tabelLoader="tabelLoader"
          @refresh="fetchHotelCount()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ApexCharts from 'vue-apexcharts'
import { chartOptions } from './config'
import { AGENT_FETCH_BOOKING, HOTEL_FETCH_HOTEL_BY_EMAIL } from '../../../services/ENDPOINT'
import { mapGetters } from 'vuex'
import dataTable from '../../common-modules/booking-history/data-tabel'
export default {
  name: 'AgentDashboard',
  components: {
    apexchart: ApexCharts,
    dataTable
  },
  data () {
    return {
      hotelCount: 0,
      tabelLoader: false,
      chartOptions,
      bookingHistory: [],
      series: [{
        name: 'Completed',
        data: [35580, 43400, 32623, 36718, 21901, 41125]
      },
      {
        name: 'Pending',
        data: [12960, 14209, 23260, 16290, 15100, 23054]
      }]
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    }),
    totalBooking () {
      return this.bookingHistory.length
    },
    completedBookingCount () {
      return this.bookingHistory.reduce((pre, cur) => (cur.status === 'Completed') ? ++pre : pre, 0)
    },
    cancelledBookingCount () {
      return this.bookingHistory.reduce((pre, cur) => (cur.status === 'Cancelled') ? ++pre : pre, 0)
    },
    pendingBookingCount () {
      return this.bookingHistory.reduce((pre, cur) => (cur.status === 'Upcoming') ? ++pre : pre, 0)
    },
    totalTunover () {
      return this.getArraySum(this.bookingHistory.filter(i => i.status === 'Completed').map(p => p.transactionAmount))
    },
    pendingTunover () {
      return this.getArraySum(this.bookingHistory.filter(i => i.status === 'Upcoming').map(p => p.transactionAmount))
    },
    todayBookingHistory () {
      return this.bookingHistory.filter(i => this.$moment(i.createdAt).isSameOrAfter(this.$moment(), 'day'))
    }
  },
  mounted () {
    this.fetchHotelCount()
    this.getHotels()
  },
  methods: {
    currency (money) {
      return (money).toLocaleString('en-ZA', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })
    },
    getArraySum (a) {
      const arr = []
      a.filter(i => {
        if (isNaN(i) === false) {
          arr.push(Number(i))
        }
      })
      return this._.sum(arr)
    },
    async getHotels () {
      try {
        this.$root.$loader(true)
        const result = await HOTEL_FETCH_HOTEL_BY_EMAIL(this.userInfo.email)
        this.hotelCount = result.hotels.length
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
    },
    async fetchHotelCount () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await AGENT_FETCH_BOOKING(this.userInfo.email)
        this.bookingHistory = result.hotelsBooking.reverse()
      } catch (err) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops!',
          text: 'Something Went Wrong Please Try Again',
          type: 'error',
          duration: 5000
        })
      } finally {
        this.tabelLoader = false
        this.$root.$loader(false)
      }
    }
  }
}
</script>
