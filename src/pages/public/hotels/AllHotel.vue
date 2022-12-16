<template>
  <div class="main_container">
    <div class="main_bg" id="search_results"></div>
    <section class="hotel_offers_container pt-5">
      <v-infinite-scroll
        :loading="loader"
        @bottom="nextPage"
        :offset="20"
        style="max-height: 750px; overflow-y: scroll;"
      >
        <div class="container position-relative">
          <br /><br /><br /><br />
          <h2>Recommended for you</h2>
          <transition name="slide-fade" appear>
            <div class="row mt-3" v-if="popularHotels.length > 0">
              <div
                class="col-md-6 col-lg-3 mb-md-4 mb-3"
                v-for="(item, inx) of popularHotels"
                :key="inx"
              >
                <div class="activity_wrap">
                  <div class="activity_select">
                    <div
                      class="acivity_img"
                      :style="{
                        'background-image':
                          'url(' + item.attachments.images[0].url + ')' + ''
                      }"
                      @click="$router.push('/hotels/' + item.propertyId)"
                    ></div>
                    <div
                      class="hotel_bookmark"
                      v-if="loggedIn && loggedInUserType === 'CUSTOMER'"
                    >
                      <i
                        @click="addBookMark(item)"
                        title="Add Book Mark"
                        v-if="!item.isBookmark"
                        class="far fa-bookmark cursor-pointer"
                      ></i>
                      <i
                        @click="removeBookMark(item)"
                        title="Remove Book Mark"
                        v-else
                        style="color: #ffc30e"
                        class="fa fa-bookmark cursor-pointer"
                      ></i>
                    </div>
                    <div
                      class="s_recom_hotel_price cursor-pointer"
                      style="float: left;left: 18px;"
                    >
                      <p title="Starting Per Night">
                        {{
                          currency(
                            hotelStartingPriceLowest(
                              item.propertyRooms,
                              item.currency
                            )
                          )
                        }}
                      </p>
                    </div>
                    <span class="fas fa-check"></span>
                    <h3>{{ item.propertyName }}</h3>
                  </div>
                  <div class="activity_info">
                    <div class="activity_time">
                      <div class="activity_desc">
                        <p>
                          <b>City</b><br />
                          <span>{{ item.propertyCity }}</span>
                        </p>
                      </div>
                      <br />
                      <p>
                        <b>Time</b><br />
                        Check In Time: {{ item.checkInTime }}<br />
                        Check Out Time: {{ item.checkOutTime }}
                      </p>
                    </div>
                    <!-- <div class="activity_desc">
                      <p>
                        <b>Description</b><br />
                        <span v-html="item.hotelDescription">{{
                          item.hotelDescription
                        }}</span>
                      </p>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-if="!loader && popularHotels.length == 0">
              <br /><br /><br /><br /><br />
              <div class="col-md-12 text-center">
                <h1>All Recommended Not Found</h1>
              </div>
            </div>
          </transition>
          <div class="row" v-if="loader && popularHotels.length == 0">
            <div class="col-md-3 pl-3 pt-5" v-for="item in 20" :key="item">
              <div class="activity_wrap">
                <q-card
                  flat
                  style="max-width: 280px;border-radius: 23px;background-color: #d3d9dc;"
                >
                  <q-skeleton height="140px" square />
                </q-card>
                <q-card-section style="position: relative;bottom: 62px;">
                  <q-skeleton
                    animation="pulse"
                    type="text"
                    height="25px"
                    width="70%"
                    class="text-subtitle1"
                  />
                </q-card-section>
                <q-card-section style="position: relative;bottom: 190px;">
                  <q-skeleton
                    animation="wave"
                    type="text"
                    height="35px"
                    width="20%"
                    class="text-subtitle1"
                  />
                </q-card-section>
              </div>
            </div>
          </div>
          <div v-else-if="loader" class="d-flex justify-content-center mb-3">
            <b-spinner
              style="width: 6rem; height: 6rem;"
              variant="warning"
              type="grow"
            ></b-spinner>
          </div>
          <div v-if="loader && popularHotels.length > 0">
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br /><br />
          </div>
        </div>
      </v-infinite-scroll>
    </section>
  </div>
</template>
<script>
import { FETCH_SECIFIT_HOTEL_WITH_PAGINATION } from '../../../services/ENDPOINT'
import { mapGetters } from 'vuex'
import bookmark from 'src/mixins/bookmark'
export default {
  name: 'AllHotels',
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
      pagination: {
        perRowPage: 20,
        currentPage: 1
      },
      stopPagination: false
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
    nextPage () {
      this.pagination.currentPage = Number(this.pagination.currentPage) + 1
      if (!this.stopPagination) {
        this.getPopularHotels()
      }
    },
    setBookMark () {
      const popularHotels = JSON.parse(JSON.stringify(this.popularHotels))
      popularHotels.filter(i => {
        i.isBookmark = this.bookmarkArr.some(
          p => p.propertyId === i.propertyId
        )
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
      if (idx !== -1) {
        bookmarkArr.splice(idx, 1)
      }
      this.saveBookmark(bookmarkArr, false)
    },
    async saveBookmark (bookmarkArr, isAdded) {
      this.actionBookmark(this.userInfo._id, bookmarkArr, isAdded)
    },
    hotelStartingPriceLowest (arr) {
      return Math.min(...arr.map(item => item.price))
    },
    async getPopularHotels () {
      try {
        this.loader = true
        this.$root.$loader(true)
        const result = await FETCH_SECIFIT_HOTEL_WITH_PAGINATION(
          this.pagination
        )
        this.popularHotels.push(...result.hotels)
        if (result.hotels.length === 0) {
          this.stopPagination = true
        }
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
    actionSearch () {
      this.$router.push(
        `/hotels-search?destination=${this.destination}&rooms=${this.rooms}&numberOfGuest=${this.numberOfGuest}&date=${this.date}`
      )
      // this.$router.push({ name: 'USER_HOTEL_SEARCH', query: { destination: this.destination, rooms: this.rooms, numberOfGuest: this.numberOfGuest, date: this.date } })
    }
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
