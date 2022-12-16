/* eslint-disable no-const-assign */
<template>
  <div
    class="main_container pt-5"
    style="padding-right: 30px;padding-left: 30px;"
  >
    <div class="main_bg" id="search_results"></div>
    <section class="hotel_search_bar"></section>
    <div class="hotel_indetail_container">
      <div class="container position-relative">
        <div class="content_view_wrap">
          <h1
            class="position-relative"
            style="top:25px"
            v-if="
              hotelInfo &&
                hotelInfo.HotelInfoResult &&
                hotelInfo.HotelInfoResult.HotelDetails.HotelName
            "
          >
            {{ hotelInfo.HotelInfoResult.HotelDetails.HotelName }} Star
          </h1>
          <q-card-section v-if="loader" style="width: 15%;top:25px">
            <q-skeleton :type="'rect'" />
          </q-card-section>
        </div>

        <div class="dash_detailed_container">
          <div class="dash_hotel_info_container">
            <div class="row">
              <div class="col-md-8">
                <div class="dash_hotel_img_info_wrap tbo-hote-details">
                  <div
                    class="dash_hotel_img_wrap"
                    style="min-height: 500px;"
                    v-if="
                      hotelInfo &&
                        hotelInfo.HotelInfoResult &&
                        hotelInfo.HotelInfoResult.HotelDetails &&
                        hotelInfo.HotelInfoResult.HotelDetails.Images
                    "
                  >
                    <q-carousel
                      swipeable
                      animated
                      arrows
                      :ratio="16 / 9"
                      autoplay
                      v-model="slide"
                      :fullscreen.sync="fullscreen"
                      v-if="
                        hotelInfo &&
                          hotelInfo.HotelInfoResult &&
                          hotelInfo.HotelInfoResult.HotelDetails &&
                          hotelInfo.HotelInfoResult.HotelDetails.Images"
                    >
                      <q-carousel-slide
                        :class="{
                          'zoom-in': !fullscreen,
                          'zoom-out': fullscreen
                        }"
                        v-for="item of hotelInfo.HotelInfoResult.HotelDetails
                          .Images"
                        :name="item"
                        :key="item"
                        @click="fullscreen = !fullscreen"
                      ><q-img :src="item" :ratio="16/9" style="height: 140px;height: 488px;"/>
                      </q-carousel-slide>
                      <template v-slot:control>
                        <q-carousel-control>
                          <q-btn
                            push
                            round
                            dense
                            color="white"
                            text-color="primary"
                            :icon="
                              fullscreen ? 'fullscreen_exit' : 'fullscreen'
                            "
                            @click="fullscreen = !fullscreen"
                          />
                        </q-carousel-control>
                      </template>
                    </q-carousel>
                  </div>
                  <q-skeleton v-else height="500px" />
                  <div class="dash_hotel_detail_list_wrap" v-if="false">
                    <div class="row">
                      <div class="col-4 right_border_light">
                        <div class="dash_hotel_detail_list_item">
                          <h3>Check In</h3>
                          <h4>2:00 PM</h4>
                          <q-card-section v-if="loader">
                            <q-skeleton type="QBtn" />
                          </q-card-section>
                        </div>
                      </div>
                      <div class="col-4 right_border_light">
                        <div class="dash_hotel_detail_list_item">
                          <h3>Check Out</h3>
                          <h4>11:00 AM</h4>
                          <q-card-section v-if="loader">
                            <q-skeleton type="QBtn" />
                          </q-card-section>
                        </div>
                      </div>
                      <!-- <div class="col-3 right_border_light">
                        <div class="dash_hotel_detail_list_item">
                          <div class="tour_review">
                            <div class="star_val">
                              <i class="fas fa-star"></i>
                            </div>
                            <div class="star_rate">
                              <h2>4.5</h2>
                              <a href="#">Reviews</a>
                            </div>
                          </div>
                        </div>
                      </div> -->
                      <div class="col-4">
                        <div
                          class="dash_hotel_detail_list_item"
                          v-if="hotelInfo && hotelInfo.HotelInfoResult"
                        >
                          <h3>Hotel Type</h3>
                          <h2 v-if="hotelInfo.HotelInfoResult">
                            {{
                              hotelInfo.HotelInfoResult.HotelDetails.StarRating
                            }}
                            Star
                          </h2>
                          <q-card-section v-if="loader">
                            <q-skeleton type="QBtn" />
                          </q-card-section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="hotel_location_info_wrap tbo-hotel-details-tab">
                  <div class="dash_hotel_map_wrap">
                    <h3>Location</h3>
                    <div
                      class="dash_hotel_map_iframe"
                      v-if="
                        hotelInfo &&
                          hotelInfo.HotelInfoResult &&
                          (hotelInfo.HotelInfoResult.HotelDetails.Latitude ||
                            hotelInfo.HotelInfoResult.HotelDetails.Longitude)
                      "
                    >
                      <GmapMap
                        :center="{
                          lat: Number(
                            hotelInfo.HotelInfoResult.HotelDetails.Latitude
                          ),
                          lng: Number(
                            hotelInfo.HotelInfoResult.HotelDetails.Longitude
                          )
                        }"
                        :zoom="12"
                        style="width: 100%; height: 310px"
                      >
                        <GmapMarker
                          :position="{
                            lat: Number(
                              hotelInfo.HotelInfoResult.HotelDetails.Latitude
                            ),
                            lng: Number(
                              hotelInfo.HotelInfoResult.HotelDetails.Longitude
                            )
                          }"
                          :clickable="false"
                          :draggable="false"
                        />
                      </GmapMap>
                    </div>
                    <q-skeleton v-if="loader" height="300px" />
                  </div>
                  <div class="dash_hotel_address_wrap">
                    <h3>Address</h3>
                    <p
                      v-if="
                        hotelInfo.HotelInfoResult &&
                          hotelInfo.HotelInfoResult.HotelDetails.Address
                      "
                    >
                      {{ hotelInfo.HotelInfoResult.HotelDetails.Address }}
                    </p>
                    <q-card-section v-if="loader" style="width: 100%;">
                      <q-skeleton :type="'text'" />
                    </q-card-section>
                    <p
                      v-if="
                        hotelInfo.HotelInfoResult &&
                          hotelInfo.HotelInfoResult.HotelDetails.HotelContactNo
                      "
                    >
                      <b>Phone:</b>
                      {{
                        hotelInfo.HotelInfoResult.HotelDetails.HotelContactNo
                      }}
                    </p>
                    <q-card-section v-if="loader" style="width: 100%;">
                      <q-skeleton :type="'QBadge'" />
                    </q-card-section>
                    <p
                      v-if="
                        hotelInfo.HotelInfoResult &&
                          hotelInfo.HotelInfoResult.HotelDetails.FaxNumber
                      "
                    >
                      <b>Fax:</b>
                      {{ hotelInfo.HotelInfoResult.HotelDetails.FaxNumber }}
                    </p>
                    <q-card-section v-if="loader" style="width: 100%;">
                      <q-skeleton :type="'QBadge'" />
                    </q-card-section>
                    <p
                      v-if="
                        hotelInfo.HotelInfoResult &&
                          hotelInfo.HotelInfoResult.HotelDetails.Email
                      "
                    >
                      <b>Email:</b
                      >{{ hotelInfo.HotelInfoResult.HotelDetails.Email }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="dash_hotel_detail_container position-sticky">
              <b-tabs card class="dash_hotel_detail_tablist_wrap">
                <b-tab title="Room Details" class="nav nav-tabs" active>
                  <div class="dash_tab_content_wrap tab-content pt-0 pb-0 pl-0 pr-0">
                    <div
                      id="hotel_rooms"
                      class="dash_hotel_room_info_wrap tab-pane active"
                    >
                    <div class="row" v-if="roomArr">
                      <div class="col-md-4" v-for="(room, index) of roomArr" :key="index">
                        <div class="hotel-tbo-detail mb-4">
                          <span class="hotel-tbl-title">Room</span>
                          <div class="mb-2">{{ room.RoomTypeName }}</div>
                            <div class="dash_hotel_room_inclusions_wrap mb-2">
                                <div class="dash_hotel_room_inclusions_list">
                                  <span class="hotel-tbl-title">Inclusions</span>
                                  <ul>
                                    <li style="background: #a293933b; !important" v-for="(amenities, amenitiesIndex) of room.Inclusion" :key="amenitiesIndex">{{amenities}}</li>
                                  </ul>
                                </div>
                            </div>
                            <div class="mb-2">
                              <span class="hotel-tbl-title">Options</span>
                              <div class="hotel-service-tag row">
                                <div class="col-md-5 col-12">
                              <span class="mr-2" v-b-tooltip.html :title="room.RoomDescription">Room Description</span>
                                </div><div class="col-md-5 col-12"><span v-b-tooltip.html :title="room.CancellationPolicy" >Cancellation Policy</span></div>
                              </div>
                            </div>
                              <div class="dash_hotel_room_price_wrap">
                                <div class="dash_hotel_room_price d-flex mt-3">
                                  <p class="mr-2"><sub><i class="fas fa-rupee-sign"></i> 2,560</sub></p>
                                  <h3 class="mr-2">
                                    {{ currency(room.Price.PublishedPriceRoundedOff * NoOfRooms, room.CurrencyCode)}}
                                  </h3>
                                  <span><sub>Per Room/Night</sub></span>
                                </div>
                                <div class="book_room_btn_wrap">
                                  <button type="button" class="btn btn-warning" @click="selectRoom(room, hotelInfo.HotelInfoResult, room.RoomIndex)">
                                    Select Room
                                  </button>
                                </div>
                              </div>
                        </div>
                      </div>
                    </div>
                      <!-- <table class="table">
                        <thead>
                          <tr>
                            <th>Room</th>
                            <th>Room Options</th>
                            <th>Inclusions</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody v-if="roomArr">
                          <tr v-for="(room, index) of roomArr" :key="index">
                            <td>
                              <div class="dash_hotel_room_img_info_wrap">
                                <h4>{{ room.RoomTypeName }}</h4>
                                <div class="dash_hotel_room_img">
                                  <img
                                    src="/assets/images/h5.jpg"
                                    alt=""
                                    class="img-fluid"
                                  />
                                </div>
                                <p><i class="fas fa-home"></i> 248 sq.ft</p>
                              </div>
                            </td>
                            <td>
                              <div class="dash_hotel_room_options_wrap">
                                <div class="dash_hotel_room_advs_wrap">
                                  <ul>
                                    <li>
                                      <div class="dash_hotel_room_advs_item">
                                        <p>
                                          <i class="fas fa-tag"  v-b-tooltip.html :title="room.RoomDescription"></i> Room Description
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div class="dash_hotel_room_policy_list_wrap">
                                  <ul>
                                    <li><a href="#" v-b-tooltip.html :title="room.CancellationPolicy" >Cancellation Policy</a></li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="dash_hotel_room_inclusions_wrap">
                                <div class="dash_hotel_room_inclusions_list">
                                  <ul>
                                    <li v-for="(amenities, amenitiesIndex) of room.Inclusion" :key="amenitiesIndex">{{amenities}}</li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="dash_hotel_room_price_wrap">
                                <div class="dash_hotel_room_price">
                                  <p><i class="fas fa-rupee-sign"></i> 2,560</p>
                                  <h3>
                                    {{ currency(room.Price.PublishedPriceRoundedOff * NoOfRooms, room.CurrencyCode)}}
                                  </h3>
                                  <span>Per Room/Night</span>
                                </div>
                                <div class="book_room_btn_wrap">
                                  <button type="button" class="btn btn-warning" @click="selectRoom(room, hotelInfo.HotelInfoResult, room.RoomIndex)">
                                    Select Room
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table> -->
                    </div>
                  </div>
                </b-tab>
                <b-tab
                  title="Hotel Description & Facilities"
                  class="nav nav-tabs"
                >
                  <br />
                  <h4 class="text-color-chartreuse">Hotel Description</h4>
                  <div
                    class="row"
                    v-if="
                      hotelInfo.HotelInfoResult &&
                        hotelInfo.HotelInfoResult.HotelDetails.Description
                    "
                  >
                    <div
                      style="font-weight: 300"
                      class="pl-3 pr-3"
                      v-html="
                        hotelInfo.HotelInfoResult.HotelDetails.Description
                      "
                    >
                      {{ hotelInfo.HotelInfoResult.HotelDetails.Description }}
                    </div>
                  </div>
                  <br />
                  <h4 class="text-color-chartreuse">Facilities</h4>
                  <!-- <div
                    class="row dash_hotel_room_inclusions_wrap"
                    v-if="
                      hotelInfo.HotelInfoResult &&
                        hotelInfo.HotelInfoResult.HotelDetails.HotelFacilities
                    "
                  >
                    <div
                      class="pl-3 pr-3 dash_hotel_room_inclusions_list"
                      v-for="(item, index) of hotelInfo.HotelInfoResult
                        .HotelDetails.HotelFacilities"
                      :key="index"
                    >
                      <h6
                        class="cursor-pointer hide-show-li"
                        style="background:#99999900"
                      >
                        {{ item }}
                      </h6>
                    </div>
                  </div> -->
                  <div class="dash_hotel_room_inclusions_wrap mb-2" >
                                <div class="dash_hotel_room_inclusions_list"   v-if="
                      hotelInfo.HotelInfoResult &&
                        hotelInfo.HotelInfoResult.HotelDetails.HotelFacilities
                    ">
                                  <ul>
                                    <li v-for="(item, index) of hotelInfo.HotelInfoResult
                        .HotelDetails.HotelFacilities"
                      :key="index">{{item}}</li>
                                  </ul>
                                </div>
                            </div>
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { USER_TBO_HOTEL_DETAILS, USER_TBO_HOTEL_BLOCK } from '../../../services/ENDPOINT'
import { res } from './config'
export default {
  data () {
    return {
      res,
      hotelInfo: {},
      roomInfo: {},
      roomArr: [],
      fullscreen: false,
      slide: 1,
      loader: false,
      NoOfRooms: 0
    }
  },
  mounted () {
    // this.hotelInfo = this.res.hotelInfo
    // this.roomInfo = this.res.roomInfo.GetHotelRoomResult
    // this.roomArr = this.res.roomInfo.GetHotelRoomResult.HotelRoomsDetails
    const { TraceId, ResultIndex, HotelCode, NoOfRooms } = this.$route.query
    if (TraceId && ResultIndex && HotelCode) {
      this.NoOfRooms = NoOfRooms
      this.getHotelInfo({ TraceId, ResultIndex, HotelCode })
    }
  },
  methods: {
    async selectRoom (room, hotelInfo, roomIndex) {
      const { ResultIndex } = this.$route.query
      const payload = {
        ResultIndex: ResultIndex,
        HotelCode: hotelInfo.HotelDetails.HotelCode,
        HotelName: hotelInfo.HotelDetails.HotelName,
        GuestNationality: 'IN',
        NoOfRooms: this.NoOfRooms,
        ClientReferenceNo: 0,
        IsVoucherBooking: true,
        EndUserIp: '123.1.1.1',
        TokenId: 'dbb0bc48-1202-4a01-bd55-4d283981ea80',
        TraceId: hotelInfo.TraceId,
        HotelRoomsDetails: []
      }
      const roomCombinationObj = this.roomInfo.GetHotelRoomResult.RoomCombinations.RoomCombination.find(a => a.RoomIndex[0] === roomIndex)
      this.roomInfo.GetHotelRoomResult.HotelRoomsDetails.filter(a => {
        if (roomCombinationObj.RoomIndex.find(b => b === a.RoomIndex)) {
          payload.HotelRoomsDetails.push({
            RoomIndex: a.RoomIndex,
            RoomTypeCode: a.RoomTypeCode,
            RoomTypeName: a.RoomTypeName,
            RatePlanCode: a.RatePlanCode,
            BedTypeCode: a.BedTypes,
            SmokingPreference: 0,
            Supplements: a.SupplierPrice,
            Price: {
              CurrencyCode: a.Price.CurrencyCode,
              RoomPrice: a.Price.RoomPrice,
              Tax: a.Price.Tax,
              ExtraGuestCharge: a.Price.ExtraGuestCharge,
              ChildCharge: a.Price.ChildCharge,
              OtherCharges: a.Price.OtherCharges,
              Discount: a.Price.Discount,
              PublishedPrice: a.Price.PublishedPrice,
              PublishedPriceRoundedOff: a.Price.PublishedPriceRoundedOff,
              OfferedPrice: a.Price.OfferedPrice,
              OfferedPriceRoundedOff: a.Price.OfferedPriceRoundedOff,
              AgentCommission: a.Price.AgentCommission,
              AgentMarkUp: a.Price.AgentMarkUp,
              ServiceTax: a.Price.ServiceTax,
              TDS: a.Price.TDS
            }
          })
        }
      })
      try {
        this.$root.$loader(true)
        const result = await USER_TBO_HOTEL_BLOCK(payload)
        if (result.BlockRoomResult.Error.ErrorCode === 0) {
          this.$notify({
            group: 'eb-notification',
            title: 'SUCCESS',
            text: 'Your Room Block Successfully',
            type: 'success',
            duration: 5000
          })
          const data = {
            payload: payload,
            room: room,
            hotelInfo: hotelInfo
          }
          localStorage.setItem('tboCheckoutInfo', JSON.stringify(data))
          this.$router.push({ name: 'PUBLIC_TBO_HOTEL_CHECKOUT' })
        } else {
          this.$notify({
            group: 'eb-notification',
            title: 'Oops',
            text: result.BlockRoomResult.Error.ErrorMessage,
            type: 'warn',
            duration: 5000
          })
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
      }
      console.log('payload', payload)
    },
    async saveBooking (payload) {
      console.log(payload)
    },
    async getHotelInfo (data) {
      try {
        this.loader = true
        const result = await USER_TBO_HOTEL_DETAILS(data)
        if (
          result && result.hotelInfo &&
          result.hotelInfo.HotelInfoResult &&
          result.hotelInfo.HotelInfoResult.Error &&
          result.hotelInfo.HotelInfoResult.Error.ErrorCode === 0
        ) {
          this.hotelInfo = result.hotelInfo
          this.roomInfo = JSON.parse(JSON.stringify(result.roomInfo))
          this.roomArr = []
          this.roomInfo.GetHotelRoomResult.RoomCombinations.RoomCombination.filter((a, aIndex) => {
            if (this.roomInfo.GetHotelRoomResult.HotelRoomsDetails.find(b => b.RoomIndex === a.RoomIndex[0])) {
              const data = this.roomInfo.GetHotelRoomResult.HotelRoomsDetails.find(b => b.RoomIndex === a.RoomIndex[0])
              this.roomArr.push(data)
            }
          })
          console.log(this.roomArr)
        } else {
          this.$notify({
            group: 'eb-notification',
            title: 'Oops',
            text: result.hotelInfo.HotelInfoResult.Error.ErrorMessage,
            type: 'warn',
            duration: 5000
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
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
        this.loader = false
      }
    }
  }
}
</script>
<style>
.tbo-hote-details .q-carousel{
  height: 488px;
}
.tbo-hote-details .q-panel > div {
  padding: 0
}
</style>
