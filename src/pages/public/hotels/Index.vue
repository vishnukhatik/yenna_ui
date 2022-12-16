<template>
  <div class="main_container">
    <div class="main_bg" id="search_results"></div>
    <section class="hotel_search_bar">
      <div class="search_bar_container container">
        <h1 style="color: #e8bb2e;">Search Hotels, Resorts and Your Budget Stays</h1>
        <search buttonLabel="Search" :redirect="true" />
      </div>
    </section>

    <section class="hotel_offers_container position-relative" >
      <div class="container pt-0">
        <h5 v-if="popularHotels.length > 0">Popular Destinations</h5>
        <div class="row mt-3">
          <div class="col-md-6 col-lg-3 mb-md-4 mb-3" v-for="(item, inx) of popularDestinations" :key="inx">
            <div class="hotel_offer_item_wrap">
              <div class="hotel_offer_img" @click="actionSearchTest(item.city)">
                <div class="hotel_img" :id="item.images"></div>
                <div class="hotel_info">
                  <h4>{{ item.city }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <h5 v-if="popularHotels.length > 0">Popular Hotels</h5>
        <div class="row mt-3" v-if="popularHotels.length > 0">
          <div class="col-md-6 col-lg-3 mb-md-4 mb-3" v-for="(item, inx) of popularHotels" :key="inx">
            <div class="hotel_offer_item_wrap">
              <div class="hotel_offer_img">
                <div class="hotel_img" v-if="item.attachments && item.attachments.images.length > 0" :style="{'background-image': 'url('+ item.attachments.images[0].url +')' +''}" @click="$router.push('/hotels/'+item.propertyId)"></div>
                <div class="hotel_bookmark" v-if="loggedIn && loggedInUserType === 'CUSTOMER'">
                  <i @click="addBookMark(item)" title="Add Book Mark" v-if="!item.isBookmark" class="far fa-bookmark cursor-pointer"></i>
                  <i @click="removeBookMark(item)" title="Remove Book Mark" v-else style="color: #ffc30e" class="fa fa-bookmark cursor-pointer"></i>
                </div>
                <div class="s_recom_hotel_price cursor-pointer" style="float: left;left: 18px;">
                  <p title="Starting Per Night">{{ currency(hotelStartingPriceLowest(item.propertyRooms, item.currency)) }}</p>
                  <span>Starting</span>
                </div>
                <div class="hotel_info">
                  <h3>{{ item.propertyName }}</h3>
                  <h4>{{ item.propertyCity }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row text-center" v-else-if="!loader">
          <div class="col-md-12 text-center">
            <h2>Popular Hotels Not Found</h2>
          </div>
        </div>
        <div v-if="loader" class="d-flex justify-content-center mb-3">
          <b-spinner
            style="width: 4rem; height: 4rem;"
            variant="warning"
            type="grow"
          ></b-spinner>
        </div>
      </div>

    </section>
  </div>
</template>
<script>
import search from './search'
import { USER_POPULAR_HOTELS } from '../../../services/ENDPOINT'
import { mapGetters } from 'vuex'
import bookmark from 'src/mixins/bookmark'
export default {
  components: { search },
  mixins: [bookmark],
  data () {
    return {
      numberGuestShow: false,
      numberOfAdults: 1,
      numberOfChild: 0,
      numberOfInfants: 0,
      date: '15-08-2020',
      destination: '',
      rooms: '',
      popularHotels: [],
      loader: false,
      popularDestinations: [
        {
          city: 'Ahmedabad, Gujarat, India',
          images: 'ahmedabad'
        },
        {
          city: 'Hyderabad, Telangana, India',
          images: 'hyderabad'
        },
        {
          city: 'Pune, Maharashtra, India',
          images: 'pune'
        },
        {
          city: 'Bengaluru, Karnataka, India',
          images: 'bangalore'
        }
      ]
    }
  },
  computed: {
    numberOfGuest () {
      return this.numberOfAdults + this.numberOfChild + this.numberOfInfants
    },
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType',
      bookmarkArr: 'user/getBookMark'
    })
  },
  watch: {
    bookmarkArr (v) {
      if (this.loggedIn && this.loggedInUserType === 'CUSTOMER') {
        this.setBookMark()
      }
    },
    loggedIn (v) {
      if (v) {
        if (this.loggedIn && this.loggedInUserType === 'CUSTOMER') {
          this.getBookMark()
        }
      }
    }
  },
  mounted () {
    if (this.loggedIn && this.loggedInUserType === 'CUSTOMER') {
      this.getBookMark()
    }
    this.getPopularHotels()
  },
  methods: {
    hotelStartingPriceLowest (arr) {
      return Math.min(...arr.map(item => item.price))
    },
    setBookMark () {
      const popularHotels = JSON.parse(JSON.stringify(this.popularHotels))
      popularHotels.filter(i => {
        i.isBookmark = this.bookmarkArr.some(p => p.propertyId === i.propertyId)
      })
      this.popularHotels = popularHotels
    },
    addBookMark (item) {
      const data = {
        propertyId: item.propertyId,
        propertyName: item.propertyName,
        propertyAddress: item.propertyAddress,
        propertyCity: item.propertyCity,
        propertyCountry: item.propertyCountry,
        propertyPostalCode: item.propertyPostalCode,
        checkInTime: item.checkInTime,
        checkOutTime: item.checkOutTime,
        contactPersonPhone: item.contactPersonPhone,
        createdAt: new Date()
      }
      const bookmarkArr = this.bookmarkArr
      bookmarkArr.push(data)
      this.saveBookmark(bookmarkArr, true)
    },
    async removeBookMark (item) {
      const bookmarkArr = this.bookmarkArr
      const idx = bookmarkArr.findIndex(i => i.propertyId === item.propertyId)
      if (idx !== -1) { bookmarkArr.splice(idx, 1) }
      this.saveBookmark(bookmarkArr, false)
    },
    async saveBookmark (bookmarkArr, isAdded) {
      this.actionBookmark(this.userInfo._id, bookmarkArr, isAdded)
    },
    async getPopularHotels () {
      try {
        this.loader = true
        this.$root.$loader(true)
        const result = await USER_POPULAR_HOTELS()
        this.popularHotels = result.popularHotels
        if (this.loggedIn && this.loggedInUserType === 'CUSTOMER') {
          this.setBookMark()
        }
      } catch (err) {
        // this.$notify({
        //   group: 'eb-notification',
        //   title: 'Oops',
        //   text: 'Something Went Wrong Please Try Again',
        //   type: 'error',
        //   duration: 5000
        // })
      } finally {
        this.loader = false
        this.$root.$loader(false)
      }
    },
    actionSearchTest (city) {
      this.$router.push(`/hotels-search?destination=${city}&rooms=${this.rooms}&numberOfGuest=${this.numberOfGuest}&date=${this.date}`)
    },
    actionSearch () {
      this.$router.push(`/hotels-search?destination=${this.destination}&rooms=${this.rooms}&numberOfGuest=${this.numberOfGuest}&date=${this.date}`)
      // this.$router.push({ name: 'USER_HOTEL_SEARCH', query: { destination: this.destination, rooms: this.rooms, numberOfGuest: this.numberOfGuest, date: this.date } })
    }
  }
}
</script>
<style>
.numbr_guests {
  display: block !important;
}
.text-truncate, .b-calendar-grid-weekdays, .b-calendar-grid-caption {
  color:#001420
}
.b-calendar-nav {
  background: #001420 !important;
}

</style>
