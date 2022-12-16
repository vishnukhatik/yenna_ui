<template>
  <div>
    <div class="content_view_wrap">
      <h1>Bookings Overview</h1>
      <div class="overview_blocks_container">
        <div class="row">
          <div class="col-md-4 mb-2">
            <div class="overview_block_wrap violet_bgcolor">
              <div class="bg_icon"><i class="fas fa-globe-americas"></i></div>
              <h4>Total Bookings</h4>
              <h3>{{ totalBooking }}</h3>
            </div>
          </div>
          <div class="col-md-4 mb-2">
            <div class="overview_block_wrap blue_bgcolor">
              <div class="bg_icon"><i class="fas fa-chart-line"></i></div>
              <h4>Net Turnover</h4>
              <h3>₹ 0</h3>
            </div>
          </div>
          <div class="col-md-4 mb-2">
            <div class="overview_block_wrap blgreen_bgcolor">
              <div class="bg_icon"><i class="fas fa-hand-holding-usd"></i></div>
              <h4>Net Profit</h4>
              <h3>₹ 0</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="overview_blocks_container mt-5">
        <div class="row">
          <div class="col-md-3 mb-2">
            <div class="overview_block_wrap lightgreygreen_bgcolor">
              <div class="bg_icon"><i class="fas fa-clipboard-check"></i></div>
              <h4>Total Hotels</h4>
              <h3>{{ totalHotelCount }}</h3>
            </div>
            </div>
          <div class="col-md-3 mb-2">
            <div class="overview_block_wrap greygreen_bgcolor">
              <div class="bg_icon"><i class="fas fa-clipboard-check"></i></div>
              <h4>Completed Earnings</h4>
              <h3>{{ currency(totalBookingEarnings) }}</h3>
            </div>
          </div>
          <div class="col-md-3 mb-2">
            <div class="overview_block_wrap orange_bgcolor">
              <div class="bg_icon"><i class="fas fa-hourglass-half"></i></div>
              <h4>Pending Earnings</h4>
              <h3>{{ currency(pendingBookingEarnings) }}</h3>
            </div>
          </div>
          <div class="col-md-3 mb-2">
            <div class="overview_block_wrap pinkred_bgcolor">
              <div class="bg_icon"><i class="fas fa-coins"></i></div>
              <h4>
                <span style="color: #ffc30d; font-weight: 700">YO</span> Cash
                Balance
              </h4>
              <h3>0</h3>
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
                <apexchart
                  type="bar"
                  height="262"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
            </div>
            <div class="col-md-6">
              <div class="overview_graph_container">
                <h3>Property Monthly Earnings</h3>
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

      <div class="dash_hotel_detail_container">
        <!-- Nav tabs -->
        <div class="dash_tablist_wrap">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                data-toggle="tab"
                >Booking Information</a
              >
            </li>
          </ul>
        </div>
        <div class="dash_tab_content_wrap tab-content">
          <div class="row">
            <div class="col-md-4">
              <div id="hotel_bookings" class="tab-pane active">
                <CountBooking :totalBooking="totalBooking" :countBookingHistory="countBookingHistory" :completedBookingPercentage="completedBookingPercentage" :pendingBookingPercentage="pendingBookingPercentage" :cancelledBookingPercentage="cancelledBookingPercentage" />
              </div>
            </div>
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-6 mt-3">
                  <div class="overview_block_wrap blue_bgcolor">
                    <div class="bg_icon"><i class="fas fa-globe-americas"></i></div>
                    <h4>Today Bookings</h4>
                    <h3>{{ todayBookingCount }}</h3>
                  </div>
                </div>
                <div class="col-md-6 mt-3">
                  <div class="overview_block_wrap greygreen_bgcolor">
                    <div class="bg_icon"><i class="fas fa-clipboard-check"></i></div>
                    <h4>Today Completed Bookings</h4>
                    <h3>{{ todayCompletedBookingCount }}</h3>
                  </div>
                </div>
                <div class="col-md-6 mt-3">
                  <div class="overview_block_wrap orange_bgcolor">
                    <div class="bg_icon"><i class="fas fa-hourglass-half"></i></div>
                    <h4>Today Pending Bookings</h4>
                    <h3>{{ todayPendingBookingCount }}</h3>
                  </div>
                </div>
                <div class="col-md-6 mt-3">
                  <div class="overview_block_wrap rederpink_bgcolor">
                    <div class="bg_icon"><i class="fas fa-file-excel"></i></div>
                    <h4>Today Cancelled Bookings</h4>
                    <h3>{{ todayCancelledBookingCount }}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <b-card-group deck>
            <b-card header-tag="header" style="background-color: #222222!important"  bg-variant="dark" footer-tag="footer">
              <template #header>
                <h6 class="mb-0">List of Customers which are registered by today</h6>
              </template>
              <div class="main_table_wrap">
                <b-table
                  :busy="customerTabelLoader"
                  striped
                  hover
                  show-empty
                  :items="customersList"
                  :fields="userField"
                  responsive
                >
                  <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>Loading...</strong>
                    </div>
                  </template>
                  <template v-slot:cell(name)="row">
                    {{
                      `${row.item.firstName}  ${row.item.middleName}  ${row.item.lastName}`
                    }}
                  </template>
                </b-table>
              </div>
            </b-card>
          </b-card-group>
        </div>
        <div class="col-md-6">
          <b-card-group deck>
            <b-card header-tag="header" bg-variant="dark" style="background-color: #222222!important" footer-tag="footer">
              <template #header>
                <h6 class="mb-0">List of Properties which are registered by today</h6>
              </template>
              <div class="main_table_wrap">
                <b-table
                  :busy="hotelTabelLoader"
                  striped
                  hover
                  show-empty
                  :items="hotelList"
                  :fields="hotelFields"
                  responsive
                >
                  <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong>Loading...</strong>
                    </div>
                  </template>
                  <template v-slot:cell(name)="row">
                    {{
                      `${row.item.firstName}  ${row.item.middleName}  ${row.item.lastName}`
                    }}
                  </template>
                </b-table>
              </div>
            </b-card>
          </b-card-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ApexCharts from 'vue-apexcharts'
import { chartOptions, fields, optionsBar, months, userField, hotelFields } from './config'
import {
  ADMIN_FETCH_BOOKING,
  ADMIN_HOTEL_COUNT,
  ADMIN_FETCH_COMPLETED_BOOKING,
  ADMIN_FETCH_CANCELLED_BOOKING,
  ADMIN_FETCH_PENDING_BOOKING,
  ADMIN_FETCH_HOTEL_COUNT,
  ADMIN_FETCH_CUSTOMERS, ADMIN_FETCH_HOTEL
} from '../../../services/ENDPOINT'
import { mapGetters } from 'vuex'
import CountBooking from '../../../components/common/CountBooking'
export default {
  name: 'Admin Hotel Booking',
  components: {
    apexchart: ApexCharts,
    CountBooking
  },
  data () {
    return {
      currentPage: 0,
      perPage: 10,
      hotelCount: 0,
      tabelLoader: false,
      fields,
      chartOptions,
      optionsBar,
      totalHotelCount: 0,
      bookingHistory: [],
      countBookingHistory: {
        completedBooking: 0,
        cancelledBooking: 0,
        pendingBooking: 0
      },
      series: [
        {
          name: 'Completed',
          data: [35580, 43400, 32623, 36718, 21901, 41125]
        },
        {
          name: 'Pending',
          data: [12960, 14209, 23260, 16290, 15100, 23054]
        }
      ],
      barSeries: [
        {
          name: 'Completed',
          data: [35580, 43400, 32623, 36718, 21901, 41125]
        },
        {
          name: 'Cancelled',
          data: [12960, 14209, 23260, 16290, 15100, 23054]
        }
      ],
      customersList: [],
      userField,
      customerTabelLoader: false,
      hotelTabelLoader: false,
      hotelList: [],
      hotelFields,
      todayBooking: []
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
    completedBookingPercentage () {
      return Math.ceil((100 * this.bookingHistory.reduce((pre, cur) => (cur.status === 'Completed') ? ++pre : pre, 0)) / this.bookingHistory.length)
    },
    pendingBookingPercentage () {
      return Math.ceil((100 * this.bookingHistory.reduce((pre, cur) => (cur.status === 'Upcoming') ? ++pre : pre, 0)) / this.bookingHistory.length)
    },
    cancelledBookingPercentage () {
      return Math.ceil((100 * this.bookingHistory.reduce((pre, cur) => (cur.status === 'Cancelled') ? ++pre : pre, 0)) / this.bookingHistory.length)
    },
    todayBookingCount () {
      return this.todayBooking.length
    },
    todayCompletedBookingCount () {
      return this.todayBooking.reduce((pre, cur) => (cur.status === 'Completed') ? ++pre : pre, 0)
    },
    todayPendingBookingCount () {
      return this.todayBooking.reduce((pre, cur) => (cur.status === 'Upcoming') ? ++pre : pre, 0)
    },
    todayCancelledBookingCount () {
      return this.todayBooking.reduce((pre, cur) => (cur.status === 'Cancelled') ? ++pre : pre, 0)
    },
    totalBookingEarnings () {
      return this.getArraySum(this.bookingHistory.filter(i => i.status === 'Completed').map(p => p.transactionAmount))
    },
    pendingBookingEarnings () {
      return this.getArraySum(this.bookingHistory.filter(i => i.status === 'Upcoming').map(p => p.transactionAmount))
    }
  },
  mounted () {
    this.getBookingHistory()
    this.getCompletedBooking()
    this.getCancelledBooking()
    this.getPendingBooking()
    this.getTotalHotelCount()
    this.getCoustomer()
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
    isTodayDate (date) {
      return this.$moment(date).format('L') === this.$moment().format('L')
    },
    chartDataSet () {
      this.bookingHistory.filter(i => {
        i.months = months[new Date(i.createdAt).getMonth()]
      })
      const finalArr = []
      const data = this._.chain(this.bookingHistory)
        .groupBy('months')
        .map((value, key) => ({ months: key, data: value }))
        .value()
      data.filter(i => {
        const statusGroup = this._.chain(i.data)
          .groupBy('status')
          .map((value, key) => ({ status: key, data: value }))
          .value()

        statusGroup.filter(s => {
          console.log(s.status, s.data.length)
        })
        finalArr.push({ name: i.months })
        console.log(i.months, statusGroup)
      })
    },
    async fetchHotelCount () {
      try {
        this.$root.$loader(true)
        const result = await ADMIN_HOTEL_COUNT()
        this.hotelCount = result.bookedHotelsCount.reduce((acc, curr) => {
          return acc + curr.count
        }, 0)
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
    async getBookingHistory () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await ADMIN_FETCH_BOOKING()
        this.bookingHistory = JSON.parse(JSON.stringify(result.booking))
        this.todayBooking = result.booking.filter(i => this.isTodayDate(i.createdAt))
        // this.chartDataSet()
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
        this.tabelLoader = false
      }
    },
    async getCompletedBooking () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
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
        this.tabelLoader = false
      }
    },
    async getCancelledBooking () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const payload = 'Cancelled'
        const result = await ADMIN_FETCH_CANCELLED_BOOKING(payload)
        this.countBookingHistory.cancelledBooking = result.Bookings
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
    async getPendingBooking () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const payload = 'Upcoming'
        const result = await ADMIN_FETCH_PENDING_BOOKING(payload)
        this.countBookingHistory.pendingBooking = result.Bookings
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
    async getTotalHotelCount () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await ADMIN_FETCH_HOTEL_COUNT()
        this.totalHotelCount = result.hotelCounts
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
    async getCoustomer () {
      try {
        this.customerTabelLoader = true
        const result = await ADMIN_FETCH_CUSTOMERS()
        this.customersList = result.userSignUps.filter(i => this.isTodayDate(i.createdAt))
      } catch (err) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops',
          text: 'Something Went Wrong Please Try Again',
          type: 'error',
          duration: 5000
        })
      } finally {
        this.customerTabelLoader = false
      }
    },
    async getHotels () {
      try {
        this.hotelTabelLoader = true
        const result = await ADMIN_FETCH_HOTEL()
        this.hotelList = result.hotelData.filter(i => this.isTodayDate(i.createdAt))
      } catch (err) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops',
          text: 'Something Went Wrong Please Try Again',
          type: 'error',
          duration: 5000
        })
      } finally {
        this.hotelTabelLoader = false
      }
    }
  }
}
</script>
<style>
.card-header {
  border-bottom: 1px solid rgb(255 255 255 / 13%) !important
}
</style>
