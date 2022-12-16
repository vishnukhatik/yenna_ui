<template>
  <div class="main_container">
    <div
      v-if="!routes.includes($route.name)"
      class="main_bg"
      id="search_results"
    ></div>
    <div v-if="!routes.includes($route.name)">
      <br /><br /><br /><br /><br />
    </div>
    <div
      class="container position-relative"
      v-if="!tabelLoader"
      :class="{
        'pa-35': routes.includes($route.name),
        hotel_indetail_container: !routes.includes($route.name)
      }"
    >
      <div class="">
        <div class="content_view_wrap">
          <!-- <h1>{{ hotelObj.propertyName }} ( {{ hotelObj.propertyType }})</h1> -->
          <h1>{{ hotelObj.propertyName }}</h1>
        </div>

        <div class="dash_detailed_container">
          <div class="dash_hotel_info_container">
            <div class="row">
              <div class="col-md-8 col-12">
                <div class="dash_hotel_img_info_wrap">
                  <div class="dash_hotel_img_wrap">
                    <div
                      v-if="
                        hotelObj.attachments &&
                          hotelObj.attachments.images.length > 0"
                    >
                      <VueSlickCarousel v-bind="settings" v-if="false">
                        <div
                          v-for="(item, inx) of hotelObj.attachments.images"
                          :key="inx"
                        >
                          <img v-if="item.url" :src="item.url" width="100%" />
                        </div>
                      </VueSlickCarousel>
                      <q-carousel
                        v-else
                        swipeable
                        animated
                        arrows
                        :ratio="16/9"
                        autoplay
                        v-model="slide"
                        :fullscreen.sync="fullscreen"
                      >
                        <q-carousel-slide :class="{'zoom-in': !fullscreen, 'zoom-out': fullscreen }" v-for="(item, inx) of hotelObj.attachments.images" :name="inx+1" :key="inx" @click="fullscreen = !fullscreen" :img-src="item.url" />
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
                  </div>
                  <div class="dash_hotel_detail_list_wrap">
                    <div class="row">
                      <div
                        class="col-6 col-md-3 col-lg-3 col-xl-3 mb-3 right_border_light"
                      >
                        <div class="dash_hotel_detail_list_item">
                          <h3>Check In</h3>
                          <h4>{{ hotelObj.checkInTime }}</h4>
                        </div>
                      </div>
                      <div
                        class="col-6 col-md-3 col-lg-3 col-xl-3 mb-3 right_border_light"
                      >
                        <div class="dash_hotel_detail_list_item">
                          <h3>Check Out</h3>
                          <h4>{{ hotelObj.checkOutTime }}</h4>
                        </div>
                      </div>
                      <div
                        class="col-6 col-md-3 col-lg-3 col-xl-3 mb-3 right_border_light"
                      >
                        <div class="dash_hotel_detail_list_item">
                          <div class="tour_review">
                            <div class="star_val">
                              <i class="fas fa-star"></i>
                            </div>
                            <div class="star_rate">
                              <h2>0.0</h2>
                              <a href="#">No Reviews</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-6 col-md-3 col-lg-3 col-xl-3 mb-3">
                        <div class="dash_hotel_detail_list_item">
                          <h3>Hotel Type</h3>
                          <h2>
                            {{ hotelObj.starRating }} Star
                            <span style="font-size: 16px;color: #ffc30e;"
                              >( {{ hotelObj.propertyType }} )</span
                            >
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-12">
                <div class="hotel_location_info_wrap">
                  <div class="dash_hotel_map_wrap">
                    <h3>Location</h3>
                    <div
                      class="dash_hotel_map_iframe"
                      v-if="
                        hotelObj.locationId &&
                          hotelObj.locationId.lat &&
                          hotelObj.locationId.lng
                      "
                    >
                      <leaflet-map
                        v-if="false"
                        id="add-hotel"
                        :latlng="[
                          hotelObj.locationId.lat,
                          hotelObj.locationId.lng
                        ]"
                        height="height: 280px;z-index: 1;"
                      />
                      <GmapMap
                        :center="{
                          lat: Number(hotelObj.locationId.lat),
                          lng: Number(hotelObj.locationId.lng)
                        }"
                        :zoom="12"
                        style="width: 500px; height: 310px"
                      >
                        <GmapMarker
                          :position="{
                            lat: Number(hotelObj.locationId.lat),
                            lng: Number(hotelObj.locationId.lng)
                          }"
                          :clickable="false"
                          :draggable="false"
                        />
                      </GmapMap>
                    </div>
                  </div>
                  <div class="dash_hotel_address_wrap">
                    <h3>Address</h3>
                    <p>
                      {{ hotelObj.propertyAddress }}, <br />
                      {{ hotelObj.propertyCity + ", " + hotelObj.propertyState
                      }}<br />
                    </p>
                    <p><b>Phone:</b> {{ hotelObj.contactPersonPhone }}</p>
                    <p><b>Email:</b> {{ hotelObj.contactPersonEmail }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="dash_hotel_detail_container">
              <b-tabs card class="dash_hotel_detail_tablist_wrap">
                <b-tab title="Room Details" class="nav nav-tabs" active>
                  <div class="tab-pane">
                    <div
                      class="search_bar_input_container mb-4 w-sm-100"
                      v-if="loggedInUserType === 'CUSTOMER' || !loggedIn"
                    >
                      <div class="picked_date">
                        <input
                          type="text"
                          placeholder="From"
                          readonly
                          class="form-control text-black"
                          @click="show"
                          :value="dateFormate"
                          id="reservationDate"
                        />
                        <div class="input_icon">
                          <i class="fas fa-calendar-alt"></i>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane">
                      <!-- <table class="table table-responsive hotel-table-detail">
                        <thead>
                          <tr>
                            <th
                              v-if="
                                $route.name !== 'ADMIN_PROPERTIES_DETILAS' &&
                                  (loggedInUserType == 'CUSTOMER' || !loggedIn)
                              "
                            ></th>
                            <th>Room</th>
                            <th>Room Options</th>
                            <th>Inclusions</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(room, inx) of hotelObj.propertyRooms"
                            :key="inx"
                          >
                            <td
                              v-if="
                                $route.name !== 'ADMIN_PROPERTIES_DETILAS' &&
                                  (loggedInUserType === 'CUSTOMER' || !loggedIn)
                              "
                            >
                              <div class="custom-control custom-checkbox" style="padding-left: 2rem !important;text-align: end;">
                                <input
                                  v-model="room.isSelect"
                                  type="checkbox"
                                  class="custom-control-input cursor-pointer"
                                  :id="'selectHotel' + inx"
                                  :name="'selectHotel' + inx"
                                  @click="changeCheckBox(room, inx)"
                                />
                                <label
                                  class="custom-control-label"
                                  :for="'selectHotel' + inx"
                                />
                              </div>
                            </td>
                            <td>
                              <div class="dash_hotel_room_img_info_wrap">
                                <h4>Standard {{ room.roomType }} room</h4>
                                <div class="dash_hotel_room_img">
                                  <q-img
                                    v-if="
                                      room.imageFiles &&
                                        room.imageFiles.length > 0 &&
                                        room.imageFiles[0].url
                                    "
                                    :src="room.imageFiles[0].url"
                                    alt=""
                                    class="img-fluid zoom-in"
                                    style="height: 150px;width: 170px;"
                                    @click="actionRoomImages(room.imageFiles)"
                                  />
                                </div>
                                <p>
                                  <span
                                    v-b-tooltip.hover
                                    title="Number Of Rooms"
                                    ><i class="fas fa-home"></i>
                                    {{ room.totalRoom }}</span
                                  >
                                  <span
                                    v-b-tooltip.hover
                                    title="Number Of Beds"
                                    class="pl-3"
                                    ><i class="fas fa-bed"></i>
                                    {{ room.numberOfBeds }}</span
                                  >
                                  <span class="pl-3"
                                    ><i class="fas fa-building"></i
                                    >{{ room.roomSize }}
                                    {{ room.measureType }}</span
                                  >
                                </p>
                                <p></p>
                              </div>
                            </td>
                            <td>
                              <div class="dash_hotel_room_options_wrap">
                                <div class="dash_hotel_room_advs_wrap">
                                  <ul>
                                    <li>
                                      <div class="dash_hotel_room_advs_item">
                                        <p>
                                          <i class="fas fa-tag"></i>
                                          Cancellation Policy
                                          <i
                                            v-b-tooltip.html
                                            class="fa fa-info-circle"
                                            :title="room.cancelPolicyDetails"
                                          />
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div class="dash_hotel_room_policy_list_wrap">
                                  <ul>
                                    <li>
                                      <div class="dash_hotel_room_advs_item">
                                        <p style="color: #ffc30e;">
                                          <i
                                            style="color: #ffc30e;"
                                            class="fas fa-hotel"
                                          ></i>
                                          Room Description
                                          <i
                                            v-b-tooltip.html
                                            class="fa fa-info-circle"
                                            style="color: #ffc30e;"
                                            :title="room.roomDescription"
                                          />
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                  <ul>
                                    <li
                                      v-if="
                                        loggedInUserType === 'CUSTOMER' ||
                                          !loggedIn
                                      "
                                    >
                                      <div
                                        class="row"
                                        v-for="(roomDetails,
                                        roomDetailsIndex) in roomDeatils"
                                        :key="roomDetailsIndex"
                                      >
                                        <div class="col-md-6 col-12">
                                          <label>{{ roomDetails.label }}</label>
                                        </div>
                                        <div class="col-md-1 text-center col-2">
                                          <i
                                            :class="{
                                              'fas fa-minus-square negate_one cursor-pointer': true,
                                              disabled:
                                                room[roomDetails.key] ===
                                                roomDetails.defulatValue
                                            }"
                                            @click="
                                              recordIncrementsDecrement(
                                                room,
                                                inx,
                                                roomDetails.key,
                                                Number(room[roomDetails.key]) -
                                                  1,
                                                false
                                              )
                                            "
                                          ></i>
                                        </div>
                                        <div class="col-md-3 col-8">
                                          <input
                                            type="number"
                                            id="num_children"
                                            :min="0"
                                            class="disabled select-room-count"
                                            style="
                                              color: black;
                                              opacity: 1 !important;
                                            "
                                            :value="room[roomDetails.key]"
                                          />
                                        </div>
                                        <div class="col-md-1 col-2 text-center">
                                          <i
                                            :class="{
                                              'fas fa-plus-square add_one cursor-pointer': true,
                                              disabled:
                                                roomDetails.key ===
                                                  'totalSelectedRoom' &&
                                                room[roomDetails.key] >=
                                                  room.totalRoom,
                                              'new-disabled':
                                                roomDetails.key !=
                                                  'totalSelectedRoom' &&
                                                room.numberOfAllowPeople <=
                                                  totalGuest(room)
                                            }"
                                            @click="
                                              recordIncrementsDecrement(
                                                room,
                                                inx,
                                                roomDetails.key,
                                                Number(room[roomDetails.key]) +
                                                  1,
                                                true
                                              )
                                            "
                                          ></i>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="dash_hotel_room_inclusions_wrap">
                                <div class="dash_hotel_room_inclusions_list">
                                  <ul>
                                    <li
                                      v-for="(item,
                                      index) of room.roomAmentiies"
                                      :key="index"
                                      v-show="index < showRoomAnities"
                                    >
                                      {{ item }}
                                    </li>
                                    <li
                                      class="cursor-pointer hide-show-li"
                                      @click="showRoomAnities = 800"
                                      v-if="
                                        room.roomAmentiies.length > 8 &&
                                          showRoomAnities === 8
                                      "
                                    >
                                      See More...
                                    </li>
                                    <li
                                      class="cursor-pointer hide-show-li"
                                      @click="showRoomAnities = 8"
                                      v-if="
                                        room.roomAmentiies.length > 8 &&
                                          showRoomAnities === 800
                                      "
                                    >
                                      Hide...
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="dash_hotel_room_price_wrap">
                                <div class="dash_hotel_room_price">
                                  <h3 style="font-size: 22px">
                                    {{
                                      currency(
                                        Number(room.totalSelectedRoom) *
                                          Number(room.price),
                                        room.currency
                                      )
                                    }}
                                  </h3>
                                  <span>Per Room/Night</span>

                                  <span
                                    v-if="
                                      $route.name !==
                                        'ADMIN_PROPERTIES_DETILAS' &&
                                        (loggedInUserType == 'CUSTOMER' ||
                                          !loggedIn)
                                    "
                                    >{{ hotelObj.stayNight }} Night</span
                                  >
                                </div>
                                <div
                                  :class="{
                                    book_room_btn_wrap: true,
                                    disabled: room.isSelect
                                  }"
                                  v-if="
                                    loggedInUserType === 'CUSTOMER' || !loggedIn
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-warning"
                                    @click="bookNow(room)"
                                    v-if="loggedIn"
                                  >
                                    Booking Now
                                  </button>
                                  <button
                                    type="button"
                                    @click="redirectLogin"
                                    class="btn btn-warning"
                                    v-if="!loggedIn"
                                  >
                                    Booking Now
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table> -->
                      <!-- <div class="row p-3">
                        <div class="col-12 col-md-1">
                          <div class="mb-3" v-if="
                                $route.name !== 'ADMIN_PROPERTIES_DETILAS' &&
                                  (loggedInUserType == 'CUSTOMER' || !loggedIn)
                              "></div>
                              <div v-if=" $route.name !== 'ADMIN_PROPERTIES_DETILAS' &&
                                  (loggedInUserType === 'CUSTOMER' || !loggedIn)
                              ">
                                <div v-for="(room, inx) of hotelObj.propertyRooms"
                            :key="inx" class="custom-control custom-checkbox" style="padding: 2rem !important;min-height: 205px;">
                                <input
                                  v-model="room.isSelect"
                                  type="checkbox"
                                  class="custom-control-input cursor-pointer"
                                  :id="'selectHotel' + inx"
                                  :name="'selectHotel' + inx"
                                  @click="changeCheckBox(room, inx)"
                                />
                                <label
                                  class="custom-control-label"
                                  :for="'selectHotel' + inx"
                                />
                              </div>
                              </div>
                        </div>
                        <div class="col-12 col-md-3">
                          <div class="hotel-room--detail-header">Room</div>
                             <div v-for="(room, inx) of hotelObj.propertyRooms"
                            :key="inx" class="dash_hotel_room_img_info_wrap" style="min-height: 205px;">
                                <h4>Standard {{ room.roomType }} room</h4>
                                <div class="dash_hotel_room_img">
                                  <q-img
                                    v-if="
                                      room.imageFiles &&
                                        room.imageFiles.length > 0 &&
                                        room.imageFiles[0].url
                                    "
                                    :src="room.imageFiles[0].url"
                                    alt=""
                                    class="img-fluid zoom-in"
                                    style="height: 150px;width: 170px;"
                                    @click="actionRoomImages(room.imageFiles)"
                                  />
                                </div>
                                <p>
                                  <span
                                    v-b-tooltip.hover
                                    title="Number Of Rooms"
                                    ><i class="fas fa-home"></i>
                                    {{ room.totalRoom }}</span
                                  >
                                  <span
                                    v-b-tooltip.hover
                                    title="Number Of Beds"
                                    class="pl-3"
                                    ><i class="fas fa-bed pr-1"></i>
                                    {{ room.numberOfBeds }}</span
                                  >
                                  <span class="pl-3"
                                    ><i class="fas fa-building pr-1"></i
                                    >{{ room.roomSize }}
                                    {{ room.measureType }}</span
                                  >
                                </p>
                              </div>
                        </div>
                        <div class="col-12 col-md-4">
                          <div class="hotel-room--detail-header" >Room Options</div>
                          <div  v-for="(room, inx) of hotelObj.propertyRooms"
                            :key="inx">
                                <div class="dash_hotel_room_options_wrap" style="min-height: 205px;" >
                                <div class="dash_hotel_room_advs_wrap">
                                  <ul>
                                    <li>
                                      <div class="dash_hotel_room_advs_item">
                                        <p>
                                          <i class="fas fa-tag"></i>
                                          Cancellation Policy
                                          <i
                                            v-b-tooltip.html
                                            class="fa fa-info-circle"
                                            :title="room.cancelPolicyDetails"
                                          />
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div class="dash_hotel_room_policy_list_wrap">
                                  <ul>
                                    <li>
                                      <div class="dash_hotel_room_advs_item">
                                        <p style="color: #ffc30e;">
                                          <i
                                            style="color: #ffc30e;"
                                            class="fas fa-hotel"
                                          ></i>
                                          Room Description
                                          <i
                                            v-b-tooltip.html
                                            class="fa fa-info-circle"
                                            style="color: #ffc30e;"
                                            :title="room.roomDescription"
                                          />
                                        </p>
                                      </div>
                                    </li>
                                  </ul>
                                  <ul>
                                    <li
                                      v-if="
                                        loggedInUserType === 'CUSTOMER' ||
                                          !loggedIn
                                      "
                                    >
                                      <div
                                        class="row"
                                        v-for="(roomDetails,
                                        roomDetailsIndex) in roomDeatils"
                                        :key="roomDetailsIndex"
                                      >
                                        <div class="col-md-6 col-12">
                                          <label>{{ roomDetails.label }}</label>
                                        </div>
                                        <div class="col-md-1 text-center col-2">
                                          <i
                                            :class="{
                                              'fas fa-minus-square negate_one cursor-pointer': true,
                                              disabled:
                                                room[roomDetails.key] ===
                                                roomDetails.defulatValue
                                            }"
                                            @click="
                                              recordIncrementsDecrement(
                                                room,
                                                inx,
                                                roomDetails.key,
                                                Number(room[roomDetails.key]) -
                                                  1,
                                                false
                                              )
                                            "
                                          ></i>
                                        </div>
                                        <div class="col-md-3 col-8">
                                          <input
                                            type="number"
                                            id="num_children"
                                            :min="0"
                                            class="disabled select-room-count"
                                            style="
                                              color: black;
                                              opacity: 1 !important;
                                            "
                                            :value="room[roomDetails.key]"
                                          />
                                        </div>
                                        <div class="col-md-1 col-2 text-center">
                                          <i
                                            :class="{
                                              'fas fa-plus-square add_one cursor-pointer': true,
                                              disabled:
                                                roomDetails.key ===
                                                  'totalSelectedRoom' &&
                                                room[roomDetails.key] >=
                                                  room.totalRoom,
                                              'new-disabled':
                                                roomDetails.key !=
                                                  'totalSelectedRoom' &&
                                                room.numberOfAllowPeople <=
                                                  totalGuest(room)
                                            }"
                                            @click="
                                              recordIncrementsDecrement(
                                                room,
                                                inx,
                                                roomDetails.key,
                                                Number(room[roomDetails.key]) +
                                                  1,
                                                true
                                              )
                                            "
                                          ></i>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                          </div>
                        </div>
                        <div class="col-12 col-md-2">
                          <div class="hotel-room--detail-header" >Inclusions</div>
                          <div v-for="(room, inx) of hotelObj.propertyRooms"
                            :key="inx">
                                <div class="dash_hotel_room_inclusions_wrap" style="min-height: 205px;">
                                <div class="dash_hotel_room_inclusions_list">
                                  <ul>
                                    <li
                                      v-for="(item,
                                      index) of room.roomAmentiies"
                                      :key="index"
                                      v-show="index < showRoomAnities"
                                    >
                                      {{ item }}
                                    </li>
                                    <li
                                      class="cursor-pointer hide-show-li"
                                      @click="showRoomAnities = 800"
                                      v-if="
                                        room.roomAmentiies.length > 8 &&
                                          showRoomAnities === 8
                                      "
                                    >
                                      See More...
                                    </li>
                                    <li
                                      class="cursor-pointer hide-show-li"
                                      @click="showRoomAnities = 8"
                                      v-if="
                                        room.roomAmentiies.length > 8 &&
                                          showRoomAnities === 800
                                      "
                                    >
                                      Hide...
                                    </li>
                                  </ul>
                                </div>
                              </div>
                          </div>
                        </div>
                        <div class="col-12 col-md-2">
                          <div class="hotel-room--detail-header" >Price</div>
                          <div v-for="(room, inx) of hotelObj.propertyRooms"
                            :key="inx" >
                            <div class="dash_hotel_room_price_wrap" style="min-height: 205px;">
                                <div class="dash_hotel_room_price">
                                  <h3 style="font-size: 22px">
                                    {{
                                      currency(
                                        Number(room.totalSelectedRoom) *
                                          Number(room.price),
                                        room.currency
                                      )
                                    }}
                                  </h3>
                                  <span>Per Room/Night</span>

                                  <span
                                    v-if="
                                      $route.name !==
                                        'ADMIN_PROPERTIES_DETILAS' &&
                                        (loggedInUserType == 'CUSTOMER' ||
                                          !loggedIn)
                                    "
                                    >{{ hotelObj.stayNight }} Night</span
                                  >
                                </div>
                                <div
                                  :class="{
                                    book_room_btn_wrap: true,
                                    disabled: room.isSelect
                                  }"
                                  v-if="
                                    loggedInUserType === 'CUSTOMER' || !loggedIn
                                  "
                                >
                                  <button
                                    type="button"
                                    class="btn btn-warning"
                                    @click="bookNow(room)"
                                    v-if="loggedIn"
                                  >
                                    Booking Now
                                  </button>
                                  <button
                                    type="button"
                                    @click="redirectLogin"
                                    class="btn btn-warning"
                                    v-if="!loggedIn"
                                  >
                                    Booking Now
                                  </button>
                                </div>
                              </div>
                          </div>
                        </div>
                      </div> -->
                      <div
                        class="dash_hotel_room_info_wrap s_hotel_container"
                        v-for="(room, inx) of hotelObj.propertyRooms"
                        :key="inx"
                      >
                        <div class="s_hotel_img_container">
                          <div class="s_recom_hotel_img">
                            <div class="hotel_bookmark" style="top: 8px;right: 0px;"  v-if=" $route.name !== 'ADMIN_PROPERTIES_DETILAS' &&
                                  (loggedInUserType === 'CUSTOMER' || !loggedIn) && room.totalRoom != 0">
                            <div
                              class="custom-control custom-checkbox"
                              style="padding-left: 2rem !important;"
                            >
                              <input
                                v-model="room.isSelect"
                                type="checkbox"
                                class="custom-control-input cursor-pointer"
                                :id="'selectHotel' + inx"
                                :name="'selectHotel' + inx"
                                @click="changeCheckBox(room, inx)"
                              />
                              <label
                                class="custom-control-label"
                                :for="'selectHotel' + inx"
                              />
                            </div>
                          </div>
                            <div
                              class="s_hotel_img cursor-pointer"
                              :style="{
                                'background-image':
                                  'url(' + room.imageFiles[0].url + ')' + ''
                              }"
                            ></div>
                          </div>
                        </div>
                        <div class="s_hotel_info_container">
                          <div class="s_hotel_details_wrap cursor-pointer">
                            <span class="d-md-flex align-items-center">
                            <h4 class="mr-2" style="margin-bottom: 0;">Standard {{ room.roomType }} room</h4>
                            <span class="text-color-chartreuse" style="font-size:12px">
                              ( Cancellation Policy
                                        <i
                                          v-b-tooltip.html
                                          class="fa fa-info-circle text-color-chartreuse"
                                          :title="room.cancelPolicyDetails"
                                        /> &nbsp;&nbsp;
                                        Room Description
                                        <i
                                          v-b-tooltip.html
                                          class="fa fa-info-circle text-color-chartreuse"
                                          :title="room.roomDescription"
                                        /> )
                                        </span>
                            </span>
                            <div class="s_hotel_amenities_wrap">
                            <span v-b-tooltip.hover style="color: #8f8f8f;" title="Number Of Rooms"
                              ><i class="fas fa-home" style="color: #8f8f8f;"></i>
                              {{ room.totalRoom }}</span
                            >
                            <span
                              v-b-tooltip.hover
                              title="Number Of Beds"
                              class="pl-3"
                              style="color: #8f8f8f;"
                              ><i class="fas fa-bed pr-1" style="color: #8f8f8f;"></i>
                              {{ room.numberOfBeds }}</span
                            >
                            <span class="pl-3"
                            style="color: #8f8f8f;"
                              ><i class="fas fa-building pr-1" style="color: #8f8f8f;"></i
                              >{{ room.roomSize }} {{ room.measureType }}</span
                            >
                          </div>
                            <div class="dash_hotel_room_options_wrap">
                              <div class="dash_hotel_room_policy_list_wrap">
                                <div class="row mt-3">
                                <div class="col-md-6 col-12" v-if="
                                      loggedInUserType === 'CUSTOMER' ||
                                        !loggedIn
                                    ">
                                    <div
                                      class="row"
                                      v-for="(roomDetails,
                                      roomDetailsIndex) in roomDeatils"
                                      :key="roomDetailsIndex"
                                    >
                                      <div class="col-md-7 col-12">
                                        <label>{{ roomDetails.label }}</label>
                                      </div>
                                      <div class="col-md-5 col-12 d-flex align-items-center">
                                        <i
                                          :class="{
                                            'fas fa-minus-square negate_one cursor-pointer px-1': true,
                                            disabled:
                                              room[roomDetails.key] ===
                                              roomDetails.defulatValue
                                          }"
                                          @click="
                                            recordIncrementsDecrement(
                                              room,
                                              inx,
                                              roomDetails.key,
                                              Number(room[roomDetails.key]) - 1,
                                              false
                                            )
                                          "
                                        ></i>
                                         <input
                                          type="number"
                                          id="num_children"
                                          :min="0"
                                          class="disabled select-room-count px-1"
                                          style="
                                              color: black;
                                              opacity: 1 !important;
                                            "
                                          :value="room[roomDetails.key]"
                                        />
                                          <i
                                          :class="{
                                            'fas fa-plus-square add_one cursor-pointer px-1': true,
                                            disabled:
                                              roomDetails.key ===
                                                'totalSelectedRoom' &&
                                              room[roomDetails.key] >=
                                                room.totalRoom,
                                            'new-disabled':
                                              roomDetails.key !=
                                                'totalSelectedRoom' &&
                                              room.numberOfAllowPeople <=
                                                totalGuest(room)
                                          }"
                                          @click="
                                            recordIncrementsDecrement(
                                              room,
                                              inx,
                                              roomDetails.key,
                                              Number(room[roomDetails.key]) + 1,
                                              true
                                            )
                                          "
                                        ></i>
                                      </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-12">
                                 <div class="dash_hotel_room_inclusions_wrap">
                                <div class="dash_hotel_room_inclusions_list">
                                  <ul>
                                    <li
                                      v-for="(item,
                                      index) of room.roomAmentiies"
                                      :key="index"
                                      v-show="index < showRoomAnities"
                                    >
                                      {{ item }}
                                    </li>
                                    <li
                                      class="cursor-pointer hide-show-li"
                                      style="background:#99999900"
                                      @click="showRoomAnities = 800"
                                      v-if="
                                        room.roomAmentiies.length > 8 &&
                                          showRoomAnities === 8
                                      "
                                    >
                                      See More...
                                    </li>
                                    <li
                                      class="cursor-pointer hide-show-li"
                                      style="background:#99999900"
                                      @click="showRoomAnities = 8"
                                      v-if="
                                        room.roomAmentiies.length > 8 &&
                                          showRoomAnities === 800
                                      "
                                    >
                                      Hide...
                                    </li>
                                  </ul>
                                </div>
                                    </div>
                                </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="dash_hotel_room_price_wrap d-sm-flex d-xs-flex align-content-between flex-wrap justify-content-end" style="width: 13%;">
                          <div class="dash_hotel_room_price">
                            <h3 style="font-size: 22px">
                              {{
                                currency(
                                  Number(room.totalSelectedRoom) *
                                    Number(room.price),
                                  room.currency
                                )
                              }}
                            </h3>
                            <span>Per Room/Night</span>

                            <span
                              v-if="
                                $route.name !== 'ADMIN_PROPERTIES_DETILAS' && (loggedInUserType == 'CUSTOMER' || !loggedIn)"
                              >{{ hotelObj.stayNight }} Night</span
                            >
                          </div>
                          <p style="font-size: 15px;color: #ffc30e;" v-if="room.totalRoom == 0">Room Not Available</p>
                          <div
                            :class="{
                              book_room_btn_wrap: true,
                              disabled: room.isSelect
                            }"
                            v-if="loggedInUserType === 'CUSTOMER' || !loggedIn"
                          >
                            <button
                              type="button"
                              class="btn btn-warning"
                              @click="bookNow(room)"
                              v-if="loggedIn && room.totalRoom != 0"
                            >
                              Booking Now
                            </button>
                            <button
                              type="button"
                              @click="redirectLogin"
                              class="btn btn-warning"
                              v-if="!loggedIn && room.totalRoom != 0"
                            >
                              Booking Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row"
                    v-if="
                      isMultipleBookingShow &&
                        (loggedInUserType === 'CUSTOMER' || !loggedIn)
                    "
                  >
                    <div class="col-md-12 pt-3">
                      <button
                        type="button"
                        class="btn btn-warning float-right"
                        @click="multipleBooking"
                        v-if="loggedIn"
                      >
                        Booking Now
                      </button>
                      <button
                        type="button"
                        @click="redirectLogin"
                        class="btn btn-warning float-right"
                        v-if="!loggedIn"
                      >
                        Booking Now
                      </button>
                    </div>
                  </div>
                </b-tab>
                <b-tab title="Hotel Description & Amenities">
                  <br />
                  <h4 class="text-color-chartreuse">Hotel Description</h4>
                  <div class="row">
                    <div
                      style="font-weight: 300"
                      class="pl-3 pr-3"
                      v-html="hotelObj.hotelDescription"
                    >
                      {{ hotelObj.hotelDescription }}
                    </div>
                  </div>
                  <br />
                  <h4 class="text-color-chartreuse">Amenities</h4>
                  <div
                    class="row"
                    v-if="
                      hotelObj.hotelAmenitie &&
                        hotelObj.hotelAmenities.length > 0
                    "
                  >
                    <div
                      class="pl-3 pr-3"
                      v-for="(item, index) of hotelObj.hotelAmenities"
                      :key="index"
                    >
                      <h6 style="font-weight: 300">
                        <i v-if="findIcon(item)" :class="findIcon(item).icon" />
                        {{ item }}
                      </h6>
                    </div>
                  </div>
                  <br />
                  <h4 class="text-color-chartreuse">Languages</h4>
                  <div
                    class="row"
                    v-if="hotelObj.language && hotelObj.language.length > 0"
                  >
                    <div
                      style="font-weight: 300"
                      class="pl-3 pr-3"
                      v-for="(item, index) of hotelObj.language"
                      :key="index"
                    >
                      {{ item }}
                    </div>
                  </div>
                </b-tab>
                <b-tab title="Reviews">
                  <br />
                  <h3 class="text-center">Review Not Found</h3>
                </b-tab>
                <b-tab title="Policies">
                  <br />
                  <h3 class="text-color-chartreuse">Policies</h3>
                  <span v-html="hotelObj.policies">{{
                    hotelObj.policies
                  }}</span>
                </b-tab>
                <!-- <b-tab title="Images" v-if="loggedInUserType === 'ADMIN' ||loggedInUserType === 'HOTEL' || $route.name === 'ADMIN_PROPERTIES_DETILAS'">
                  <div class="row" v-if="hotelObj && hotelObj.attachments && hotelObj.attachments.images">
                    <div class="col-md-2 pt-2" v-for="(item, index) of hotelObj.attachments.images" :key="index">
                      <div class="hote-details-room-remove-img-main-div">
                        <i class="fas fa-times" style="color: #FFC30D" @click="deleteImages(item, index)"></i>
                      </div>
                      <q-img :src="item.url" style="height: 160px; max-width: 173px" />
                    </div>
                  </div>
                </b-tab> -->
                <b-tab
                  title="Documents"
                  v-if="
                    loggedInUserType === 'ADMIN' ||
                      loggedInUserType === 'HOTEL' ||
                      $route.name === 'ADMIN_PROPERTIES_DETILAS'
                  "
                >
                  <h5>Hotel Documents</h5>
                  <div
                    class="row"
                    v-if="
                      hotelObj.attachments &&
                        hotelObj.attachments.officailDocs.length > 0
                    "
                  >
                    <div
                      class="col-md-2 text-center"
                      v-for="(item, index) in hotelObj.attachments.officailDocs"
                      :key="index"
                    >
                      <q-avatar square size="160px">
                        <img :src="item.url" :href="item.url" download />
                      </q-avatar>
                    </div>
                    <div class="col-md-4">
                      <h3>Bank Details</h3>
                      <ul>
                        <li
                          v-for="(item, index) of hotelObj.accountDetails"
                          :key="index + 'bank' + new Date().valueOf()"
                        >
                          <span
                            v-if="
                              index !== '_id' &&
                                index !== '__v' &&
                                index !== 'createdAt' &&
                                index !== 'updatedAt' &&
                                index !== 'propertyId'
                            "
                            ><span style="font-weight: 200">
                              {{ index }} : </span
                            >{{ item }}</span
                          >
                        </li>

                        <li
                          v-for="(item, index) of hotelObj.commercialDetails"
                          :key="index + 'bankDetails' + new Date().valueOf()"
                        >
                          <span
                            v-if="
                              index !== '_id' &&
                                index !== '__v' &&
                                index !== 'createdAt' &&
                                index !== 'updatedAt' &&
                                index !== 'propertyId'
                            "
                            ><span style="font-weight: 200">
                              {{ index }} : </span
                            >{{ item }}</span
                          >
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-4">
                      <h3>Investment Details</h3>
                      <ul>
                        <li
                          v-for="(item, index) of hotelObj.investmentDetails"
                          :key="
                            index + 'investmentDetails' + new Date().valueOf()
                          "
                        >
                          <span
                            v-if="
                              index !== '_id' &&
                                index !== '__v' &&
                                index !== 'createdAt' &&
                                index !== 'updatedAt' &&
                                index !== 'propertyId'
                            "
                            ><span style="font-weight: 200">
                              {{ index }} : </span
                            >{{ item }}</span
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
            <div class="dash_hotel_edit_btn_container">
              <ul>
                <li
                  v-if="
                    loggedInUserType === 'ADMIN' || loggedInUserType === 'HOTEL'
                  "
                >
                  <b-button
                    size="md"
                    @click="$router.go(-1)"
                    variant="secondary"
                    >Back</b-button
                  >
                </li>
                <li
                  @click="changeStatus('accepted')"
                  v-if="
                    loggedInUserType === 'ADMIN' &&
                      (hotelObj.status === 'rejected' ||
                        hotelObj.status === 'new' ||
                        hotelObj.status === 'New')
                  "
                >
                  <a class="btn btn-success">Approve</a>
                </li>
                <li
                  @click="changeStatus('rejected')"
                  v-if="
                    loggedInUserType === 'ADMIN' &&
                      (hotelObj.status === 'accepted' ||
                        hotelObj.status === 'new' ||
                        hotelObj.status === 'New')
                  "
                >
                  <a class="btn btn-danger">Disapprove</a>
                </li>
                <li v-if="loggedInUserType === 'ADMIN'">
                  <a
                    @click="
                      $router.push(
                        `/admin/properties-edit/${hotelObj.propertyId}`
                      )
                    "
                    class="btn btn-info"
                    >Edit</a
                  >
                </li>
                <li v-if="loggedInUserType === 'HOTEL'">
                  <a
                    @click="
                      $router.push(
                        `/agent/properties-edit/${hotelObj.propertyId}`
                      )
                    "
                    class="btn btn-info"
                    >Edit</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <q-dialog ref="dialog">
        <q-card style="height: 350px;width: 100%;">
          <q-date
            style="height: 350px;width: 100%;"
            class="eb-search"
            mask="DD-MM-YYYY"
            v-model="selectedDate"
            :options="optionsFn"
            @input="changeDate"
            landscape
            range
            dark
            square
          >
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="OK" color="primary" @click="getHotelsById" flat v-close-popup />
            </div>
          </q-date>
        </q-card>
      </q-dialog>
    </div>
    <div class="text-center" v-if="tabelLoader">
      <br /><br /><br /><br /><br /><br /><br />
      <b-spinner
        class="text-center"
        style="width: 6rem; height: 6rem;"
        variant="warning"
      ></b-spinner>
      <br /><br /><br /><br /><br /><br /><br />
    </div>
    <b-modal v-model="showRoomImages" hide-footer hide-header no-fade>
      <div class="modal_container">
        <div class="modal_overlay"></div>
        <div class="modal_close" @click="showRoomImages = false">
          <i class="fas fa-times"></i>
        </div>
        <div
          class="modal_form_wrap"
          style="width: 628px;background-color: transparent"
        >
          <div class="q-pa-md">
            <q-carousel
              swipeable
              animated
              v-model="slide"
              thumbnails
              infinite
              :autoplay="3500"
            >
              <q-carousel-slide
                v-for="(item, index) of roomSlideImages"
                :key="index"
                :name="index"
                :img-src="item"
              />
              <template v-slot:control>
                <div
                  class="modal_close"
                  style="background: white;"
                  @click="showRoomImages = false"
                >
                  <i class="fas fa-times"></i>
                </div>
              </template>
            </q-carousel>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import {
  ADMIN_FETCH_HOTEL_BY_ID,
  ADMIN_HOTEL_APPROVE,
  USER_UPDATE_HOTEL
} from '../../../services/ENDPOINT'
const dateFormate = 'DD-MM-YYYY'
import LeafletMap from './../../../components/common/LeafletMap'
import { amenitiesArr } from '../../../db/common/amenitiesWithIcon'
import { mapGetters } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: { LeafletMap, VueSlickCarousel },
  data () {
    return {
      showRoomImages: false,
      amenitiesArr,
      routes: ['ADMIN_PROPERTIES_DETILAS', 'AGENT_PROPERTIES_DETAILS'],
      paramsId: '',
      hotelObj: {
        propertyRooms: []
      },
      slide: 1,
      fullscreen: false,
      noOfRooms: 0,
      tabelLoader: false,
      roomSlideImages: [],
      roomDeatils: [
        {
          mixValue: 1,
          defulatValue: 1,
          label: 'Booking Room',
          key: 'totalSelectedRoom'
        },
        {
          mixValue: 50,
          defulatValue: 1,
          label: 'Adults',
          key: 'numberOfAdults'
        },
        {
          mixValue: 50,
          defulatValue: 0,
          label: 'Children to 12 years',
          key: 'numberOfChild'
        },
        {
          mixValue: 50,
          defulatValue: 0,
          label: 'Infants to 2 years',
          key: 'numberOfInfants'
        }
      ],
      showRoomAnities: 8,
      selectedDate: {
        from: this.$moment().format(dateFormate),
        to: this.$moment()
          .add(1, 'days')
          .format(dateFormate)
      },
      setting: {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    }),
    isMultipleBookingShow () {
      const idx = this.hotelObj.propertyRooms.find(i => i.isSelect === true)
      if (idx && idx !== -1) {
        return true
      } else {
        return false
      }
    },
    dateFormate () {
      return `${this.selectedDate.from ??
        this.$moment().format(dateFormate)} - ${this.selectedDate.to ??
        this.$moment()
          .add(1, 'days')
          .format(dateFormate)}`
    },
    stayNight () {
      const startDate = this.$moment(
        this.$moment(this.selectedDate.from, dateFormate).format('YYYY-MM-DD'),
        'YYYY-MM-DD'
      )
      const endDate = this.$moment(
        this.$moment(this.selectedDate.to, dateFormate).format('YYYY-MM-DD'),
        'YYYY-MM-DD'
      )
      return endDate.diff(startDate, 'days')
    }
  },
  mounted () {
    this.paramsId = this.$route.params.id
    if (this.paramsId) {
      this.getHotelsById()
    }
    if (this.$route.query && this.$route.query.to && this.$route.query.from) {
      this.selectedDate = {
        from: this.$moment(this.$route.query.to, 'YYYY-MM-DD').format(
          dateFormate
        ),
        to: this.$moment(this.$route.query.from, 'YYYY-MM-DD').format(
          dateFormate
        )
      }
    }
  },
  methods: {
    findIcon (label) {
      const icons = this.amenitiesArr.find(i => i.label === label)
      if (icons && icons.icon) {
        return icons
      } else {
        return { icon: 'fa fa-check-circle' }
      }
    },
    changeDate () {
      // this.getHotelsById()
      this.$set(this.hotelObj, 'stayNight', this.stayNight)
    },
    optionsFn (date) {
      if (this.$moment(date, 'YYYY/MM/DD').isSame(this.$moment(), 'day')) {
        return true
      } else {
        return this.$moment(date, 'YYYY/MM/DD').isAfter(this.$moment(), 'day')
      }
    },
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    recordIncrementsDecrement (item, index, field, value, isIncrements) {
      const newObj = item
      if (field === 'totalSelectedRoom') {
        newObj[field] = value
        newObj.selectTotalGuest =
          Number(newObj.numberOfBeds) * Number(newObj.totalSelectedRoom)
        this.$set(this.hotelObj.propertyRooms, index, newObj)
      } else {
        newObj[field] = value
        this.$set(this.hotelObj.propertyRooms, index, newObj)
      }
      if (this.totalGuest(item) > newObj.selectTotalGuest && !isIncrements) {
        newObj.numberOfAdults =
          Number(newObj.numberOfBeds) * Number(newObj.totalSelectedRoom)
        newObj.numberOfChild = 0
        newObj.numberOfInfants = 0
        this.$set(this.hotelObj.propertyRooms, index, newObj)
      }
      if (
        field !== 'totalSelectedRoom' &&
        item.selectTotalGuest <= this.totalGuest(item)
      ) {
        newObj.totalSelectedRoom =
          newObj.totalRoom > Number(newObj.totalSelectedRoom) + 1
            ? Number(newObj.totalSelectedRoom) + 1
            : newObj.totalRoom
        newObj.selectTotalGuest =
          Number(newObj.numberOfBeds) * Number(newObj[field])
        this.$set(this.hotelObj.propertyRooms, index, newObj)
      }
      newObj.selectTotalGuest =
        Number(newObj.numberOfBeds) * Number(newObj.totalSelectedRoom)
      this.$set(this.hotelObj.propertyRooms, index, newObj)
    },
    totalGuest (item) {
      return (
        Number(item.numberOfAdults) +
        Number(item.numberOfChild) +
        Number(item.numberOfInfants)
      )
    },
    changeStatus (status) {
      const title = 'Confirmation!'
      const msg = `Are you sure, you want to Change Status ${'this'} Hotel?`
      this.$root.$confirm(title, msg).then(async confirmed => {
        try {
          this.$root.$loader(true)
          const payload = {
            status,
            propertyId: String(this.paramsId)
          }
          const result = await ADMIN_HOTEL_APPROVE(payload)
          this.$notify({
            group: 'eb-notification',
            title: 'Success!',
            text: result.message,
            type: 'success',
            duration: 5000
          })
          this.getHotelsById()
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
      })
    },
    redirectLogin () {
      if (this.$route.query.to) {
        this.$router.push(this.$route.fullPath + '&login=true')
      } else this.$router.push(this.$route.fullPath + '?login=true')
    },
    changeCheckBox (obj, index) {
      const data = Object.assign({}, obj)
      if (data.totalRoom !== '0' || data.totalRoom !== 0) {
        data.isSelect = !data.isSelect
      }
      this.$set(this.hotelObj.propertyRooms, index, data)
    },
    deleteImages (item, index) {
      const title = 'Confirmation!'
      const msg = 'Are you sure, you want to Delete This Image?'
      this.$root.$confirm(title, msg).then(async confirmed => {
        this.hotelObj.attachments.images.splice(index, 1)
        const payload = {
          propertyId: this.paramsId,
          id: this.hotelObj._id,
          attachments: {
            images: this.hotelObj.attachments.images
          }
        }
        try {
          await USER_UPDATE_HOTEL(payload)
        } catch (e) {
          console.log(e)
        } finally {
        }
      })
    },
    bookNow (i) {
      const bookingDetails = [
        {
          _id: i._id,
          policys: i.policys.filter(i => delete i._id),
          image: i.imageFiles?.[0]?.url,
          roomAmentiies: i.roomAmentiies,
          cancelPolicy: i.cancelPolicy,
          cancelPolicyDetails: i.cancelPolicyDetails,
          userComments: 'N/A',
          noOfRooms: i.totalRoom,
          totalSelectedRoom: i.totalSelectedRoom,
          numberOfAdults: i.numberOfAdults,
          numberOfChild: i.numberOfChild,
          numberOfInfants: i.numberOfInfants,
          roomType: i.roomType,
          cost:
            Number(i.totalSelectedRoom) *
            Number(i.price) *
            Number(this.stayNight),
          discount: 0,
          reviewRating: '0',
          price: Number(i.price)
        }
      ]
      this.hotelBook(bookingDetails)
    },
    multipleBooking () {
      const bookingDetails = []
      this.hotelObj.propertyRooms.filter(i => {
        if (i.isSelect) {
          const payload = {
            _id: i._id,
            policys: i.policys.filter(i => delete i._id),
            image: i.imageFiles?.[0]?.url,
            roomAmentiies: i.roomAmentiies,
            cancelPolicy: i.cancelPolicy,
            cancelPolicyDetails: i.cancelPolicyDetails,
            userComments: 'N/A',
            noOfRooms: i.totalRoom,
            totalSelectedRoom: i.totalSelectedRoom,
            numberOfAdults: i.numberOfAdults,
            numberOfChild: i.numberOfChild,
            numberOfInfants: i.numberOfInfants,
            roomType: i.roomType,
            cost:
              Number(i.totalSelectedRoom) *
              Number(i.price) *
              Number(this.stayNight),
            discount: 0,
            reviewRating: '0',
            price: Number(i.price)
          }
          bookingDetails.push(payload)
        }
      })
      this.hotelBook(bookingDetails)
    },
    async hotelBook (bookingDetails) {
      try {
        this.$root.$loader(true)
        const payload = {
          payment: {},
          bookingId: new Date().valueOf(),
          userId: this.userInfo._id,
          userEmailId: this.userInfo.email,
          hotelId: this.hotelObj.propertyId,
          propertyId: this.hotelObj.propertyId,
          transactionAmount: '',
          currency: 'INR',
          contact: {
            phone: '',
            email: '',
            guest: []
          },
          paymentDetails: {
            transactionNo: 'string',
            gateway: 'string',
            refundDetails: 'string'
          },
          bookingDetails: bookingDetails,
          bookingStartDate: this.$moment(
            this.selectedDate.from,
            dateFormate
          ).format('YYYY-MM-DD'),
          bookingEndDate: this.$moment(
            this.selectedDate.to,
            dateFormate
          ).format('YYYY-MM-DD'),
          referralBonus: '',
          status: 'Upcoming',
          bookingType: 'Hotel',
          others: '',
          tokensAvailed: '0',
          propertyName: this.hotelObj.propertyName,
          city: this.hotelObj.propertyCity,
          state: this.hotelObj.propertyState,
          country: this.hotelObj.propertyCountry,
          bookingEmail: this.hotelObj.contactPersonEmail,
          bookingPhone: this.hotelObj.contactPersonPhone,
          destination: this.hotelObj.propertyCity,
          propertyImage: this.hotelObj.attachments.images[0].url,
          checkInTime: this.hotelObj.checkInTime,
          checkOutTime: this.hotelObj.checkOutTime,
          address: this.hotelObj.propertyAddress,
          review: '0.0',
          reviewStar: 0,
          bookingSecretCode: this._.random(10000, 99999)
        }
        this.$store.dispatch('checkout/setCheckoutDetails', payload)
        this.$router.push({ name: 'PUBLIC_CHECHOUT' })
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
    async getHotelsById () {
      try {
        this.tabelLoader = true
        this.$root.$loader(true)
        const payload = {
          propertyId: this.paramsId,
          toDate: this.selectedDate ? this.$moment(this.selectedDate.to, 'DD-MM-YYYY').format('YYYY-MM-DD') : '',
          fromDate: this.selectedDate ? this.$moment(this.selectedDate.from, 'DD-MM-YYYY').format('YYYY-MM-DD') : ''
        }
        const result = await ADMIN_FETCH_HOTEL_BY_ID(payload)
        if (result.hotelData) {
          const data = result.hotelData.hotel
          data.accountDetails =
            result.hotelData.accountDetails.length > 0
              ? result.hotelData.accountDetails[0]
              : {}
          data.commercialDetails =
            result.hotelData.commercialDetails.length > 0
              ? result.hotelData.commercialDetails[0]
              : {}
          data.investmentDetails =
            result.hotelData.investmentDetails.length > 0
              ? result.hotelData.investmentDetails[0]
              : {}
          this.hotelObj = this._.cloneDeep(data)
          this.hotelObj.propertyRooms.filter(iterator => {
            // eslint-disable-next-line no-return-assign
            this.roomDeatils.forEach(room => {
              iterator[room.key] = room.defulatValue
            })
            iterator.isSelect = false
            iterator.noOfPerson = 0
            iterator.selectTotalGuest =
              Number(iterator.numberOfBeds) * Number(1)
            iterator.numberOfAllowPeople =
              Number(iterator.numberOfBeds) * Number(iterator.totalRoom)
            iterator.selectedDate = {
              from: this.$moment().format(dateFormate),
              to: this.$moment()
                .add(1, 'days')
                .format(dateFormate)
            }
          })

          const lowPrice = Math.min(
            ...this.hotelObj.propertyRooms.map(item => item.price)
          )
          const lowPriceRoomIndex = this.hotelObj.propertyRooms.findIndex(
            i => Number(i.price) === lowPrice
          )
          const seletedLowestPropertyRooms = this.hotelObj.propertyRooms[
            lowPriceRoomIndex
          ]

          if (this.$route.query && this.$route.query.numberOfAdults) {
            const noOfRooms = this.$route.query.numberOfAdults
              ? Number(this.$route.query.numberOfAdults)
              : 1
            this.recordIncrementsDecrement(
              seletedLowestPropertyRooms,
              lowPriceRoomIndex,
              'numberOfAdults',
              noOfRooms
            )
          }
          if (this.$route.query && this.$route.query.numberOfChild) {
            const noOfRooms = this.$route.query.numberOfChild
              ? Number(this.$route.query.numberOfChild)
              : 0
            this.recordIncrementsDecrement(
              seletedLowestPropertyRooms,
              lowPriceRoomIndex,
              'numberOfChild',
              noOfRooms
            )
          }
          if (this.$route.query && this.$route.query.numberOfInfants) {
            const noOfRooms = this.$route.query.numberOfInfants
              ? Number(this.$route.query.numberOfInfants)
              : 0
            this.recordIncrementsDecrement(
              seletedLowestPropertyRooms,
              lowPriceRoomIndex,
              'numberOfInfants',
              noOfRooms
            )
          }
          if (this.$route.query && this.$route.query.noOfRooms) {
            const noOfRooms = this.$route.query.noOfRooms
              ? Number(this.$route.query.noOfRooms)
              : 1
            this.recordIncrementsDecrement(
              seletedLowestPropertyRooms,
              lowPriceRoomIndex,
              'totalSelectedRoom',
              noOfRooms
            )
          }
          // extra room select
          if (
            Number(seletedLowestPropertyRooms.totalRoom) <
            seletedLowestPropertyRooms.totalSelectedRoom
          ) {
            // seletedLowestPropertyRooms.numberOfAdults = seletedLowestPropertyRooms.numberOfAllowPeople
            // seletedLowestPropertyRooms.numberOfChild = 0
            // seletedLowestPropertyRooms.numberOfInfants = 0
            // this.recordIncrementsDecrement(seletedLowestPropertyRooms, lowPriceRoomIndex, 'totalSelectedRoom', Number(seletedLowestPropertyRooms.totalRoom))
          }
          const {
            noOfPerson,
            noOfRooms,
            numberOfChild,
            numberOfInfants,
            numberOfAdults
          } = this.$route.query
          if (Number(noOfPerson) === Number(noOfRooms)) {
            seletedLowestPropertyRooms.numberOfAdults = Number(numberOfAdults)
            seletedLowestPropertyRooms.numberOfChild = Number(numberOfChild)
            seletedLowestPropertyRooms.numberOfInfants = Number(
              numberOfInfants
            )
            seletedLowestPropertyRooms.totalSelectedRoom = Number(noOfRooms)
            seletedLowestPropertyRooms.noOfPerson = Number(noOfPerson)
            this.$set(
              this.hotelObj.propertyRooms,
              lowPriceRoomIndex,
              seletedLowestPropertyRooms
            )
          }
          if (Number(noOfPerson) < Number(noOfRooms)) {
            const allowGuest = Math.ceil(
              Number(
                seletedLowestPropertyRooms.totalRoom *
                  Number(seletedLowestPropertyRooms.numberOfBeds)
              )
            )

            if (noOfPerson > allowGuest) {
              seletedLowestPropertyRooms.numberOfAdults = allowGuest
              seletedLowestPropertyRooms.numberOfChild = 0
              seletedLowestPropertyRooms.numberOfInfants = 0
              seletedLowestPropertyRooms.totalSelectedRoom = Number(
                seletedLowestPropertyRooms.totalRoom
              )
              this.$set(
                this.hotelObj.propertyRooms,
                lowPriceRoomIndex,
                seletedLowestPropertyRooms
              )
            } else {
              console.log(
                Number(noOfPerson) > seletedLowestPropertyRooms.totalRoom
              )
              seletedLowestPropertyRooms.numberOfAdults = Number(
                numberOfAdults
              )
              seletedLowestPropertyRooms.numberOfChild = Number(numberOfChild)
              seletedLowestPropertyRooms.numberOfInfants = Number(
                numberOfInfants
              )
              seletedLowestPropertyRooms.totalSelectedRoom =
                Number(noOfRooms) > seletedLowestPropertyRooms.totalRoom
                  ? seletedLowestPropertyRooms.totalRoom
                  : Number(noOfRooms)
              seletedLowestPropertyRooms.noOfPerson = Number(noOfPerson)
              this.$set(
                this.hotelObj.propertyRooms,
                lowPriceRoomIndex,
                seletedLowestPropertyRooms
              )
            }
          }
          if (Number(noOfPerson) > Number(noOfRooms)) {
            const allowGuest = Math.ceil(
              Number(
                seletedLowestPropertyRooms.totalRoom *
                  Number(seletedLowestPropertyRooms.numberOfBeds)
              )
            )

            if (noOfPerson >= allowGuest) {
              seletedLowestPropertyRooms.numberOfAdults = allowGuest
              seletedLowestPropertyRooms.numberOfChild = 0
              seletedLowestPropertyRooms.numberOfInfants = 0
              seletedLowestPropertyRooms.totalSelectedRoom = Number(
                seletedLowestPropertyRooms.totalRoom
              )
              this.$set(
                this.hotelObj.propertyRooms,
                lowPriceRoomIndex,
                seletedLowestPropertyRooms
              )
            } else {
              const room = Math.ceil(
                Number(
                  noOfPerson / Number(seletedLowestPropertyRooms.numberOfBeds)
                )
              )
              seletedLowestPropertyRooms.numberOfAdults = Number(
                numberOfAdults
              )
              seletedLowestPropertyRooms.numberOfChild = Number(numberOfChild)
              seletedLowestPropertyRooms.numberOfInfants = Number(
                numberOfInfants
              )
              seletedLowestPropertyRooms.totalSelectedRoom =
                room > Number(noOfRooms) ? room : Number(noOfRooms)
              seletedLowestPropertyRooms.noOfPerson = Number(noOfPerson)
              this.$set(
                this.hotelObj.propertyRooms,
                lowPriceRoomIndex,
                seletedLowestPropertyRooms
              )
            }
          }
          // automic select Room
          this.changeCheckBox(seletedLowestPropertyRooms, lowPriceRoomIndex)
          this.changeDate()
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
        this.tabelLoader = false
        this.$root.$loader(false)
      }
    },
    actionRoomImages (v) {
      this.roomSlideImages = v.map(i => i.url)
      this.showRoomImages = true
    }
  }
}
</script>
<style>
.pa-35 {
  padding: 35px;
}
.numbr_guests {
  display: block !important;
}
.text-truncate,
.b-calendar-grid-weekdays,
.b-calendar-grid-caption {
  color: #001420;
}
.b-calendar-nav {
  background: #001420 !important;
}
.q-dialog__backdrop .q-date__view {
  background-color: #ffc30d !important;
  opacity: 0.8;
}
.q-date__view .row,
.eb-search .row {
  margin-right: 0px !important;
  margin-left: -2px !important;
}
.hide-show-li {
  list-style: none !important;
  font-weight: 700 !important;
}
.dash_hotel_map_iframe .vue-map-container {
  width: 100% !important;
  height: 310px !important;
}
</style>
