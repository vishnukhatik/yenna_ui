<template>
  <div class="main_container">
    <div class="main_bg" id="search_results"></div>
    <div class="searchbar-box-container position-relative container">
      <div class="mb-3 d-block d-lg-none d-xl-none" @click="sidebarHotelSearch =! sidebarHotelSearch">
        <svg xmlns="http://www.w3.org/2000/svg"  v-if="!sidebarHotelSearch" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu "><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        <svg viewBox="0 0 24 24" width="24" v-else height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
      <div class="search_bar_mod" v-show="sidebarHotelSearch">
        <h1>Hotel Search</h1>
        <div class="search_input_container">
          <ul>
            <li>
              <p>Destination</p>
              <div class="s_search_input_container s_side_input">
                <google-autocomplete
                  v-if="false"
                  name="Destination"
                  ref="searchHotelSideBar"
                  placeholder="Hong Kong"
                  v-model="search.destination"
                >
                </google-autocomplete>
                <div class="search-hotel-maindiv-multiselect">
                  <multiselect
                    label="DESTINATION"
                    placeholder="Type to search"
                    return-obj
                    v-model="selectDestination"
                    :options="citiesArr"
                    :loading="searchCitiesLoader"
                    :searchable="true"
                    :internal-search="true"
                    :close-on-select="true"
                    :show-no-results="true"
                    :hide-selected="false"
                    :allowEmpty="true"
                    :taggable="true"
                    :option-height="104"
                    @tag="addTag"
                    @search-change="filterFn"
                    tag-placeholder="Press Enter To Create Destination"
                    style="border-radius: 50px;"
                  >
                    <template slot="option" slot-scope="props">
                      <div class="option__desc"><span class="option__title" style="color:black;font-weight: 400">{{ props.option.DESTINATION }} <span v-if="props.option.COUNTRYCODE" style="color:black;font-weight: 400">({{props.option.COUNTRYCODE }}) </span> </span></div>
                    </template>
                    <template><span slot="noResult" style="color:black">Oops! No elements found.</span></template>
                  </multiselect>
                </div>
              </div>
            </li>
            <li>
              <p>Arrive & Depart</p>
              <div class="s_search_input_container s_side_input">
                <div class="row">
                  <div class="col-6 pl-0 pr-0">
                    <input
                      type="date"
                      class="search_input_half"
                      v-model="selectedDate[0]"
                      @input="changeDate"
                      placeholder=" "
                      :min="this.$moment().format('YYYY-MM-DD')"
                      style="width: 100%;font-size: 14px;position: relative;left: 14px;"
                    />
                  </div>
                  <div class="col-6 pl-0 pr-0">
                    <input
                      type="date"
                      class="search_input_half"
                      style="width: 100%;font-size: 14px"
                      v-model="selectedDate[1]"
                      placeholder=" "
                      :min="$moment(selectedDate[0], 'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD')"
                    />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <p>Hotel Type</p>
              <div class="search-hotel-maindiv-multiselect">
                <multiselect
                  placeholder="Type to search"
                  return-obj
                  v-model="selectedPropertyType"
                  :options="hotelTypeArr"
                  :searchable="false"
                  :internal-search="false"
                  :close-on-select="true"
                  :show-no-results="true"
                  :hide-selected="false"
                  :allowEmpty="true"
                  multiple
                  style="border-radius: 50px;"
                >
                  <template slot="option" slot-scope="props">
                    <div class="option__desc"><span class="option__title" style="color:black;font-weight: 400">{{ props.option }} </span></div>
                  </template>
                  <template><span slot="noResult" style="color:black">Oops! No elements found.</span></template>
                </multiselect>
              </div>
            </li>
            <li>
              <div class="row pb-3" v-for="(guest, index) in roomGuests" :key="index">
                <div class="col-4">
                  <p>No Of Room</p>
                  <div class="s_search_input_container s_side_input">
                    <input
                      v-validate="'required'"
                      name="Rooms"
                      type="number"
                      readonly
                      disabled
                      v-model.number="guest.NoOfRooms"
                      placeholder="Rooms"
                    />
                  </div>
                  <p class="eb-p-validation" v-if="errors.first('Rooms')">
                    {{ errors.first('Rooms') }}
                  </p>
                  <transition name="fade">
                    <div class="numbr_guests" v-if="guest.numberGuestShow" style="display: block;">
                      <ul>
                        <li class="mb-2">
                          <label>Adults</label>
                          <div class="field_box" id="adult_counter">
                            <i
                              :class="{
                                'fas fa-minus-square negate_one': true,
                                disabled: guest.NoOfAdults === 1,
                              }"
                              @click="guest.NoOfAdults--"
                            ></i>
                            <input
                              type="number"
                              id="num_adults"
                              :value="guest.NoOfAdults"
                              :min="1"
                            />
                            <i
                              class="fas fa-plus-square add_one"
                              @click="guest.NoOfAdults++"
                            ></i>
                          </div>
                        </li>
                        <li class="mb-2">
                          <label>Children to 12 years</label>
                          <div class="field_box" id="child_counter">
                            <i
                              :class="{
                                'fas fa-minus-square negate_one': true,
                                disabled: guest.NoOfChild == 0,
                              }"
                              @click="guest.NoOfChild--"
                            ></i>
                            <input
                              type="number"
                              id="num_children"
                              :min="0"
                              :value="guest.NoOfChild"
                            />
                            <i
                              class="fas fa-plus-square add_one"
                              @click="guest.NoOfChild++"
                            ></i>
                          </div>
                        </li>
                        <li class="mb-2" v-if="false">
                          <label>Infants to 2 years</label>
                          <div class="field_box" id="infant_counter">
                            <i
                              :class="{
                                'fas fa-minus-square negate_one': true,
                                disabled: search.numberOfInfants == 0,
                              }"
                              @click="search.numberOfInfants--"
                            ></i>
                            <input
                              type="number"
                              id="num_infants"
                              :min="0"
                              :value="search.numberOfInfants"
                            />
                            <i
                              class="fas fa-plus-square add_one"
                              @click="search.numberOfInfants++"
                            ></i>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </transition>
                </div>
                <div class="col-5">
                  <p>No Of Person</p>
                  <div class="s_search_input_container s_side_input cursor-pointer" @click="numberGuestShowChanges(index, !guest.numberGuestShow)">
                    <input
                      type="number"
                      v-validate="'required'"
                      name="People"
                      placeholder="People"
                      :value="guest.NoOfAdults + guest.NoOfChild"
                      class="disabled cursor-pointer"
                    />
                  </div>
                    <p class="eb-p-validation" v-if="errors.first('People')">
                    {{ errors.first('People') }}
                  </p>
                </div>
                <div class="col-md-3 pl-0 pr-0 pt-4">
                  <button v-if="index == 0" @click="addRoomGuests" style="color: black;border-radius: 5px;" class="s_search_submit">Add</button>
                  <button v-else @click="removeRoomGuests(index)" style="color: black;border-radius: 5px;" class="s_search_submit">Remove</button>
                </div>
              </div>
            </li>
            <li>
              <p>Star Rating</p>
              <div class="star_checkbox_container">
                <div class="tour_amenities_wrap">
                  <div class="tour_amenitiy_checkbox_wrap">
                    <div class="package_box" id="star_one_checkbox_wrap" v-for="(item, inx) of rating" :key="inx" @click="rating[inx].selected = !item.selected">
                      <input type="checkbox" id="star_one_checkbox" />
                      <span :class="{'tour_checkbox_sel':true, 'selected':item.selected}">{{item.value}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <p class="pb-4">Room Price Per Day</p>
              <div class="search_price_bar_wrap">
                <vue-slider v-model="search.priceRange"  :tooltip-formatter="v => `Rs ${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`" class="s_price_range" :min="1000" :max="15000" :tooltip="'always'" :tooltip-placement="['top', 'top']"></vue-slider>
              </div>
            </li>
            <li>
              <button @click="searchActionButtonClick();searchClick();" style="color: black" class="s_search_submit">Search</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="search_hotel_results_container">
        <div class="search_results_list_wrap" v-if="searchResponseArr.length > 0" >
          <v-infinite-scroll :loading="loader" @top="prevPage" @bottom="nextPage" :offset='20' style="max-height: 750px; overflow-y: scroll;">
            <div class="s_hotel_container" v-for="(item, inx) of searchResponseArr" :key="inx">
              <div class="s_hotel_img_container">
                <div class="hotel_bookmark" style="left: 245px;z-index: 1;" v-if="loggedIn && loggedInUserType == 'CUSTOMER' && !item.isTbo">
                  <i @click="addBookMarkSearchHotel(item)" title="Add Book Mark" v-if="!item.isBookmark" class="far fa-bookmark cursor-pointer"></i>
                  <i @click="removeBookMarkSearchHotel(item)" title="Remove Book Mark" v-else style="color: #ffc30e" class="fa fa-bookmark cursor-pointer"></i>
                </div>
                <div class="s_recom_hotel_img">
                <div
                  @click="hotelDetails(item.propertyId, item)"
                  v-if="item.attachments && item.attachments.images[0]"
                  class="s_hotel_img cursor-pointer"
                  :style="{'background-image': 'url('+ item.attachments.images[0].url +')' +''}"
                >
                </div>
                </div>
              </div>
              <div class="s_hotel_info_container mt-3 mt-md-0">
                <div class="tour_review" v-if="item.starRating && item.starRating != 0">
                  <div class="star_val" v-for="(item, index) in item.starRating" :key="index" ><i class="fas fa-star"></i></div>
                  <div class="star_rate" style="background-color: transparent;" v-if="false">
                    <h2 v-if="item.starRating && item.starRating != 0">{{ item.starRating }}</h2>
                    &nbsp;
                    <!-- <a href="#">(148)</a> -->
                  </div>
                </div>
                  <div class="s_hotel_details_wrap cursor-pointer" @click="hotelDetails(item.propertyId, item)"
                  >
                    <h3>{{ item.propertyName }}</h3>
                    <p>{{ item.propertyAddress }}</p>
                  </div>
                <div class="s_hotel_amenities_wrap">
                  <div class="amenities_item" v-if="hotelLowestPriceRoom(item.propertyRooms, 'totalRoom')">
                    <i class="fas fa-home"></i> {{ hotelLowestPriceRoom(item.propertyRooms, 'totalRoom') }} Rooms
                  </div>
                  <div class="amenities_item" v-if="hotelLowestPriceRoom(item.propertyRooms, 'numberOfBeds')">
                    <i class="fas fa-user-friends"></i> {{ hotelLowestPriceRoom(item.propertyRooms, 'numberOfBeds') }} Guests
                  </div>
                  <div class="amenities_item" v-if="hotelLowestPriceRoom(item.propertyRooms, 'roomSize')">
                    <i class="fas fa-home"></i> {{ hotelLowestPriceRoom(item.propertyRooms, 'roomSize') }} {{ hotelLowestPriceRoom(item.propertyRooms, 'measureType') }}
                  </div>
                </div>
              </div>
              <div class="s_hotel_price_container cursor-pointer" @click="hotelDetails(item.propertyId, item)">
                <div class="s_hotel_price pr-3" v-if="hotelStartingPriceLowest(item.propertyRooms)">
                 {{ currency(hotelStartingPriceLowest(item.propertyRooms), item.currency) }} <span class="s_hotel_price_desc">starting</span>
                </div>
                <div @click="hotelDetails(item.propertyId, item)" class="s_hotel_price_desc pr-3">per night</div>
                  <a class="s_hotel_booking_btn">Select Now</a>
              </div>
            </div>
            <div v-if="loader" class="justify-content-center text-center">
              <b-spinner
                style="width: 6rem; height: 6rem;"
                variant="warning"
                type="grow"
              ></b-spinner>
            </div>
          </v-infinite-scroll>
        </div>
        <div class="row" v-else-if="!loader">
          <div class="col-md-12 text-center">
            <h2 class="text-center">Hotel's Not Found</h2>
          </div>
        </div>
        <div v-if="loader && searchResponseArr.length === 0" style="top: 40%;position: fixed;left: 50%;" class="d-flex justify-content-center mb-3">
          <b-spinner
            style="width: 6rem; height: 6rem;"
            variant="warning"
          ></b-spinner>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="position-relative container" style="padding: 18px 18px 60px;">
      <h6>Recommended for you</h6>
      <div class="row mt-3">
        <div class="s_recom_hotel_wrap col-md-3 pl-2 pr-2 mb-md-4 mb-3" v-for="(item, index ) in recommendedHotels" :key="index">
            <div class="s_recom_hotel_img" v-if="item.attachments.images.length > 0">
              <div
                class="s_hotel_img"
                :style="{'background-image': 'url('+ item.attachments.images[0].url +')' +''}"
              ></div>
            </div>
          <div class="s_recom_hotel_img" v-else>
            <div
              class="s_hotel_img"
              style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('assets/images/abstract.jpg');"
            ></div>
          </div>
          <div class="s_recom_hotel_info">
            <div class="hotel_bookmark" style="left: 14px;" v-if="loggedIn && loggedInUserType == 'CUSTOMER'">
              <i @click="addBookMark(item)" title="Add Book Mark" v-if="!item.isBookmark" class="far fa-bookmark cursor-pointer"></i>
              <i @click="removeBookMark(item)" title="Remove Book Mark" v-else style="color: #ffc30e" class="fa fa-bookmark cursor-pointer"></i>
            </div>
            <div class="s_recom_hotel_price cursor-pointer" @click="hotelDetails(item.propertyId, item)" v-if="hotelStartingPriceLowest(item.propertyRooms)">
              <p>{{ currency(hotelStartingPriceLowest(item.propertyRooms), item.currency) }}</p>
              <span v-if="hotelStartingPriceLowest(item.propertyRooms)">per night</span>
            </div>
            <div class="s_recom_hotel_details cursor-pointer" @click="hotelDetails(item.propertyId, item)">
              <h4>{{ item.propertyName }}</h4>
              <p>{{ item.propertyAddress }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GoogleAutocomplete from '../../../components/common/googleAutocomplete'

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { USER_HOTEL_SEARCH, USER_RECOMMEND_HOTELS, USER_SEARCH_CITIES } from '../../../services/ENDPOINT'
import { mapGetters } from 'vuex'
import bookmark from 'src/mixins/bookmark'
import { propertyTypeArr } from 'pages/agent/register/config'
import Multiselect from 'vue-multiselect'

export default {
  mixins: [bookmark],
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    VueSlider,
    GoogleAutocomplete,
    Multiselect
  },
  data () {
    return {
      rating: [
        { value: 0, selected: true },
        { value: 1, selected: true },
        { value: 2, selected: true },
        { value: 3, selected: true },
        { value: 4, selected: true },
        { value: 5, selected: true }
      ],
      selectedPropertyType: propertyTypeArr,
      hotelTypeArr: propertyTypeArr,
      ratingRange: [2, 4],
      selectedDate: [this.$moment().format('YYYY-MM-DD'), this.$moment().add(1, 'days').format('YYYY-MM-DD')],
      search: {
        destination: 'Hyderabad',
        noOfRooms: 1,
        noOfPerson: 1,
        numberOfAdults: 1,
        numberOfChild: 0,
        numberOfInfants: 0,
        fromDate: '',
        toDate: '',
        priceRange: [1000, 5000],
        rating: [],
        propertyType: [],
        RoomGuests: []
      },
      searchResponseArr: [],
      recommendedHotels: [],
      loader: false,
      page: 1,
      stopPagination: false,
      numberGuestShow: false,
      sidebarHotelSearch: false,
      selectDestination: {},
      citiesArr: [],
      searchCitiesLoader: false,
      roomGuests: []
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: 'auth/loggedIn',
      userInfo: 'auth/loggedInUser',
      loggedInUserType: 'auth/loggedInUserType',
      bookmarkArr: 'user/getBookMark'
    }),
    totalSelectGuest () {
      const totalGuest = this.roomGuests.map(i => Number(i.NoOfAdults) + Number(i.NoOfChild))
      return this.sum(totalGuest)
    },
    stayNight () {
      const startDate = this.$moment(this.selectedDate[0], 'YYYY-MM-DD')
      const endDate = this.$moment(this.selectedDate[1], 'YYYY-MM-DD')
      return endDate.diff(startDate, 'days')
    }
  },
  watch: {
    bookmarkArr () {
      if (this.loggedIn && this.loggedInUserType === 'CUSTOMER') {
        this.setBookMarkRecommendedHotels()
        this.setBookMarkSearchHotel()
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
    this.addRoomGuests()
    if (this.$route.query) {
      const { DESTINATION, noOfPerson, noOfRooms, toDate, fromDate, numberOfAdults, numberOfChild, numberOfInfants, CITYID, COUNTRY, COUNTRYCODE, STATEPROVINCE, STATEPROVINCECODE } = this.$route.query
      this.search.fromDate = fromDate ? this.$moment(fromDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : this.$moment().add(1, 'days').format('YYYY-MM-DD')
      this.search.toDate = toDate ? this.$moment(toDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : this.$moment().format('YYYY-MM-DD')
      this.search.destination = DESTINATION || ''
      this.search.noOfRooms = noOfRooms || 1
      this.search.noOfPerson = noOfPerson || 1
      this.search.numberOfAdults = numberOfAdults || 1
      this.search.numberOfChild = numberOfChild || 0
      this.search.numberOfInfants = numberOfInfants || 0
      this.selectedDate = [this.search.toDate, this.search.fromDate]

      const data = {}

      data.CITYID = CITYID || null
      data.DESTINATION = DESTINATION || null
      data.COUNTRY = COUNTRY || null
      data.STATEPROVINCE = STATEPROVINCE || null
      data.COUNTRYCODE = COUNTRYCODE || null
      data.STATEPROVINCECODE = STATEPROVINCECODE || null

      this.citiesArr.push(data)
      this.selectDestination = data
      this.actionSearch()
    }
    console.log(this.$route.query)
    if (this.loggedIn && this.loggedInUserType === 'CUSTOMER') {
      this.getBookMark()
    }
    this.getRecommendedHotels()
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    sum (arr) {
      const reducer = (sum, val) => sum + val
      const initialValue = 0
      return arr.reduce(reducer, initialValue)
    },
    numberGuestShowChanges (index, value) {
      const data = this.roomGuests[index]
      data.numberGuestShow = value
      this.$set(this.roomGuests, index, data)
    },
    totalSelectGuestCalculation (index) {
      return (this.roomGuests[index].NoOfAdults + this.roomGuests[index].NoOfChild)
    },
    addRoomGuests () {
      this.roomGuests.filter((i, index) => this.numberGuestShowChanges(index, false))
      this.roomGuests.push({
        NoOfRooms: 1,
        total: 1,
        NoOfAdults: 1,
        NoOfChild: 0,
        ChildAge: null,
        numberGuestShow: false
      })
    },
    removeRoomGuests (index) {
      this.roomGuests.filter((i, index) => this.numberGuestShowChanges(index, false))
      this.roomGuests.splice(index, 1)
    },
    filterFn (val) {
      if (val) {
        const timer = this.filterFn.timer
        if (timer) {
          clearTimeout(timer)
        }
        this.filterFn.timer = setTimeout(async () => {
          try {
            this.searchCitiesLoader = true
            const result = await USER_SEARCH_CITIES(val)
            this.citiesArr = result.data
          } catch (err) {
            this.$notify({
              group: 'eb-notification',
              title: 'Oops!',
              text: 'Something Went Wrong Please Try Again',
              type: 'error',
              duration: 5000
            })
          } finally {
            this.searchCitiesLoader = false
          }
        }, 200)
      }
    },
    addTag (newTag) {
      const tag = {
        CITYID: null,
        COUNTRY: null,
        COUNTRYCODE: null,
        DESTINATION: newTag,
        STATEPROVINCE: null,
        STATEPROVINCECODE: null
      }
      this.citiesArr.unshift(tag)
      this.selectDestination = tag
    },
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.sidebarHotelSearch = false
      } else {
        this.sidebarHotelSearch = true
      }
    },
    searchActionButtonClick () {
      this.search.numberOfAdults = this.sum(this.roomGuests.map(i => Number(i.NoOfAdults)))
      this.search.numberOfChild = this.sum(this.roomGuests.map(i => Number(i.NoOfChild)))
      this.numberGuestShow = false
      this.$router.push({
        path: '/hotels-search',
        query: {
          destination: this.search.destination,
          noOfRooms: this.roomGuests.length,
          noOfPerson: this.totalSelectGuest,
          toDate: this.selectedDate[0],
          fromDate: this.selectedDate[1],
          numberOfAdults: this.search.numberOfAdults,
          numberOfChild: this.search.numberOfChild,
          numberOfInfants: this.search.numberOfInfants,
          CITYID: this.selectDestination.CITYID,
          DESTINATION: this.selectDestination.DESTINATION,
          COUNTRY: this.selectDestination.COUNTRY,
          COUNTRYCODE: this.selectDestination.COUNTRYCODE,
          STATEPROVINCE: this.selectDestination.STATEPROVINCE,
          STATEPROVINCECODE: this.selectDestination.STATEPROVINCECODE
        }
      })
      this.actionSearch()
    },
    searchClick () {
      this.page = 1
      this.stopPagination = false
      this.searchResponseArr = []
    },
    prevPage () {
      if (this.page === 1) return
      --this.page
      console.log('prevPage', this.page)
    },
    nextPage () {
      ++this.page
      if (!this.stopPagination) {
        this.actionSearch()
      }
    },
    hotelStartingPriceLowest (arr) {
      if (arr && arr.length > 0) {
        return Math.min(...arr.map(item => item.price))
      } else {
        return ''
      }
    },
    hotelLowestPriceRoom (arr, type) {
      if (arr && arr.length > 0) {
        const lowPrice = Math.min(...arr.map(item => item.price))
        const obj = arr.find(i => Number(i.price) === lowPrice)
        return obj[type]
      } else {
        return ''
      }
    },
    hotelDetails (propertyId, item) {
      console.log(item)
      if (item.isTbo) {
        this.$router.push({
          name: 'PUBLIC_TBO_HOTEL_DETAILS',
          query: {
            TraceId: item.TraceId,
            ResultIndex: item.ResultIndex,
            HotelCode: propertyId,
            NoOfRooms: this.roomGuests.length
          }
        })
      } else {
        this.search.numberOfAdults = this.sum(this.roomGuests.map(i => Number(i.NoOfAdults)))
        this.search.numberOfChild = this.sum(this.roomGuests.map(i => Number(i.NoOfChild)))
        const { noOfPerson, toDate, fromDate, numberOfInfants } = this.$route.query
        this.$router.push({
          path: `/hotels/${propertyId}`,
          query: {
            to: toDate,
            from: fromDate,
            noOfRooms: this.roomGuests.length,
            noOfPerson: noOfPerson,
            numberOfAdults: this.search.numberOfAdults,
            numberOfChild: this.search.numberOfChild,
            numberOfInfants: numberOfInfants
          }
        })
      }
    },
    setBookMarkRecommendedHotels () {
      const recommendedHotels = JSON.parse(JSON.stringify(this.recommendedHotels))
      recommendedHotels.filter(i => {
        i.isBookmark = this.bookmarkArr.some(p => p.propertyId === i.propertyId)
      })
      this.recommendedHotels = recommendedHotels
    },
    setBookMarkSearchHotel () {
      const searchResponseArr = JSON.parse(JSON.stringify(this.searchResponseArr))
      searchResponseArr.filter(i => {
        i.isBookmark = this.bookmarkArr.some(p => p.propertyId === i.propertyId)
      })
      this.searchResponseArr = searchResponseArr
    },
    addBookMark (item) {
      const bookmarkArr = this.bookmarkArr
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
        createAt: new Date()
      }
      bookmarkArr.push(data)
      this.saveBookmark(bookmarkArr, true)
    },
    async removeBookMark (item) {
      const bookmarkArr = this.bookmarkArr
      const idx = bookmarkArr.findIndex(i => i.propertyId === item.propertyId)
      if (idx !== -1) { bookmarkArr.splice(idx, 1) }
      this.saveBookmark(bookmarkArr, false)
    },
    addBookMarkSearchHotel (item) {
      const bookmarkArr = this.bookmarkArr
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
        createAt: new Date()
      }
      bookmarkArr.push(data)
      this.saveBookmark(bookmarkArr, true)
    },
    async removeBookMarkSearchHotel (item) {
      const bookmarkArr = this.bookmarkArr
      const idx = bookmarkArr.findIndex(i => i.propertyId === item.propertyId)
      if (idx !== -1) { bookmarkArr.splice(idx, 1) }
      this.saveBookmark(bookmarkArr, false)
    },
    async saveBookmark (bookmarkArr, isAdded) {
      this.actionBookmark(this.userInfo._id, bookmarkArr, isAdded)
    },
    async getRecommendedHotels () {
      try {
        this.$root.$loader(true)
        const result = await USER_RECOMMEND_HOTELS()
        this.recommendedHotels = result.recommendedHotels
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
    actionSearch () {
      this.roomGuests.filter((i, index) => this.numberGuestShowChanges(index, false))
      this.search.numberOfAdults = this.sum(this.roomGuests.map(i => Number(i.NoOfAdults)))
      this.search.numberOfChild = this.sum(this.roomGuests.map(i => Number(i.NoOfChild)))
      this.$validator.validate().then(async (valid) => {
        if (valid && this.selectDestination && this.selectDestination.DESTINATION) {
          this.search.noOfPerson = this.totalSelectGuest
          this.search.fromDate = this.selectedDate[1]
          this.search.toDate = this.selectedDate[0]
          this.search.propertyType = this.selectedPropertyType
          this.search.destination = this.selectDestination.DESTINATION
          this.search.countryCode = this.selectDestination.COUNTRYCODE
          this.search.cityId = this.selectDestination.CITYID
          this.search.noOfRooms = this.roomGuests.length
          this.search.noOfNights = this.stayNight
          this.search.totalSelectGuest = this.totalSelectGuest
          this.search.RoomGuests = []
          const tempArrRating = []
          this.rating.filter(e => {
            if (e.selected) {
              tempArrRating.push(e.value)
            }
          })
          this.roomGuests.forEach(i => {
            this.search.RoomGuests.push({
              NoOfAdults: i.NoOfAdults,
              NoOfChild: i.NoOfChild,
              ChildAge: null
            })
          })
          this.search.maxRating = tempArrRating[0]
          this.search.minRating = tempArrRating[tempArrRating.length - 1]
          const payload = {
            search: this.search,
            pageInitionDetails: {
              pageSize: 8,
              currentPage: this.page
            }
          }
          try {
            this.loader = true
            this.$root.$loader(true)
            const result = await USER_HOTEL_SEARCH(payload)
            if (result.hotel.length === 0) {
              this.stopPagination = true
            }
            this.searchResponseArr.push(...result.hotel)
            this.setBookMarkRecommendedHotels()
            this.setBookMarkSearchHotel()
          } catch (err) {
            this.$notify({
              group: 'eb-notification',
              title: 'Oops',
              text: 'Something Went Wrong Please Try Again',
              type: 'error',
              duration: 5000
            })
          } finally {
            this.loader = false
            this.$root.$loader(false)
          }
        }
      })
    },
    changeDate (e) {
      this.selectedDate[1] = this.$moment(this.$moment(this.selectedDate[0], 'YYYY-MM-DD')).add(1, 'days').format('YYYY-MM-DD')
    }
  }
}
</script>
<style>
.vue-slider-dot-tooltip-inner-top {
  color: white;
  font-size: 10px;
  line-height: 1.333;
  text-shadow: none;
  padding: 1px 5px;
  background-color: transparent;
  border-radius: 4px;
}
.vue-slider-dot-tooltip-inner{
  border-color: transparent;
}
.vue-slider-dot-handle {
  background-color: #222;
  border-radius: 50px;
  width: 18px;
  height: 18px;
  border: 5px solid #ffc30e;
  top: 0px;
}
.vue-slider-process {
  height: 4px;
  background-color: #ffc30e;
}
.s_search_input_container {
}
.q-item--active .q-item__label{
  color: #ffc30e!important;
}
.q-item__label  {
  padding-left: 10px;
}
.q-menu {
overflow-x: hidden;
}
.q-virtual-scroll__content .row{
  margin-right: 0px;
  margin-left: 0px;
}
.q-item__label, .multiselect__input {
  color: black
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
