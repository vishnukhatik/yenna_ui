<template>
  <div class="main_container" id="checkout">
    <div class="main_bg" id="checkout_main_bg"></div>
    <div class="checkout_main_container checkOut container">
      <div class="row">
      <div class="col-12 col-md-8">
        <div class="checkout_prop_info_pad_container">
          <div class="s_hotel_container">
            <div class="s_hotel_img_container">
              <q-img style="height: 154px;width: 100%;" :src="checkout.propertyImage" v-if="checkout.propertyImage" alt="" class="img-fluid" />
            </div>
            <div class="s_hotel_info_container">
              <div class="tour_review">
                <div class="star_val" v-if="checkout.reviewStar !== 0">
                  <i class="fas fa-star" v-for="(start, index) in checkout.reviewStar" :key="index"></i>
                </div>
                <!-- <span style="color: #FFC30D" v-if="checkout.reviewStar !== 0">No Review</span> -->
                <div class="star_rate" v-if="checkout.reviewStar !== 0">
                  <h2>{{ checkout.review }}</h2>
                </div>
              </div>
              <div class="s_hotel_details_wrap">
                <h3>{{ checkout.propertyName }}</h3>
                <p>
                  <i class="fas fa-map-marker-alt"></i> {{ checkout.address }}
                </p>
              </div>
            </div>
          </div>
          <div class="s_hotel_stay_info_container">
            <div class="row">
              <div class="col-12 col-md-3 right_border_light">
                <div class="s_hotel_stay_info_list_item">
                  <h3>Check In</h3>
                  <h4>{{ dateformate(checkout.bookingStartDate) }}</h4>
                  <p>{{ checkout.checkInTime }}</p>
                </div>
              </div>
              <div class="col-12 col-md-3 right_border_light">
                <div class="s_hotel_stay_info_list_item">
                  <h3>Check Out</h3>
                  <h4>{{ dateformate(checkout.bookingEndDate) }}</h4>
                  <p>{{ checkout.checkOutTime }}</p>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="s_hotel_stay_info_list_item">
                  <h3>Persons</h3>
                  <h4>{{ totalGuest }} Guests | {{ totalRooms }} Room</h4>
                  <p>{{ stayNight }} Night</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="checkout_prop_info_container mt-4">
          <h2>Room Details</h2>
          <div class="s_hotel_room_container" v-for="(room ,index) in checkout.bookingDetails" :key="index">
            <div class="s_hotel_room_wrap">
              <h3 class="checkout_info_container_title">
                {{ room.totalSelectedRoom }} x Standard {{ room.roomType }} Room
              </h3>
              <div class="s_hotel_room_img_container">
                <img style="height: 122px;width: 97%;" v-if="room.image" :src="room.image" alt="" class="img-fluid" />
              </div>
              <div class="s_hotel_room_info_container">
                <div class="row">
                  <div class="col-md-5">
                    <div class="s_hotel_room_inclusions">
                      <h3>Inclusions</h3>
                      <p v-for="roomAmentiies in room.roomAmentiies" :key="roomAmentiies">{{
                          roomAmentiies
                        }}</p>
                    </div>
                    <div class="s_hotel_room_cancellation">
                      <a href="javascript:void(0);" style="color: chartreuse;" v-b-tooltip.html :title="room.cancelPolicyDetails">Booking and Cancellation Policy</a>
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="s_hotel_stay_info_list_item">
                        <h3 style="color: #ccc;font-size: 13px">Adults: <span class="color--yellow">{{ room.numberOfAdults }}</span></h3>
                        <h3 style="color: #ccc;font-size: 13px" v-if="room.numberOfChild != 0">Children to 12 years: <span class="color--yellow">{{ room.numberOfChild }}</span></h3>
                        <h3 style="color: #ccc;font-size: 13px" v-if="room.numberOfChild != 0">Infants to 2 years: <span class="color--yellow">{{ room.numberOfInfants }}</span></h3>
                        <h3 style="color: #ccc;font-size: 13px">Price: <span class="color--yellow">{{ currency(room.price, checkout.currency) }}</span></h3>
                        <h3 style="color: #ccc;font-size: 13px"> Rooms: <span class="color--yellow">{{ room.totalSelectedRoom }}</span> | Night: <span class="color--yellow">{{ stayNight }}</span> | Total Cost: <span class="color--yellow">{{ currency(room.cost) }}</span></h3>
                    </div>
                  </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="checkout_prop_info_container mt-4">
          <h2 class="">Guest Details</h2>
          <div class="s_hotel_guest_container">
            <div class="reg_form_wrap">
              <div class="row">
                <div class="col-md-12">
                  <div class="dash_inut_group_container">
                    <ul v-if="guestInfoArr.length > 0">
                     <li v-for="(guest, idx) in guestInfoArr" :key="idx">
                        <div class="row">
                          <div class="col-md-8">
                            <div class="row">
                              <div class="col-md-3">
                                <div class="input_block">
                                  <p>Age*</p>
                                  <div class="input_block form-group">
                                    <input
                                      v-model="guest.age"
                                      type="text"
                                      class="form-control"
                                      v-validate="'required|numeric'"
                                      :name="'Age' + idx"
                                      placeholder="Please Enter Age"
                                    />
                                    <span
                                      class="eb-error-input text-danger"
                                      v-if="errors.first('Age' + idx)"
                                    >
                                {{ errors.first("Age" + idx) }}</span
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-9">
                                <p>Name*</p>
                                <div class="input_block form-group">
                                  <input
                                    v-model="guest.name"
                                    type="text"
                                    class="form-control"
                                    v-validate="'required|max:60'"
                                    placeholder="Please Enter Name"
                                    :name="'Name' + idx"
                                  />
                                  <span
                                    class="eb-error-input text-danger"
                                    v-if="errors.first('Name' + idx)"
                                  >
                                    {{ errors.first("Name" + idx) }}</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-if="idx !== 0" class="col-md-4 d-flex align-items-end">
                            <a @click="removeGuest(idx)" class="add-guest">Remove</a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <a href="javascript:void(0)" class="add-guest" @click="addGuest"
                          ><i class="fas fa-user-plus"></i> Add Guest</a
                        >
                      </li>
                      <li>
                        <div class="row">
                          <div class="col-md-6">
                            <p>Email*</p>
                            <div class="input_block form-group">
                              <input
                                type="email"
                                class="form-control"
                                v-validate="'required|email'"
                                placeholder="Please Enter Email"
                                name="Email"
                                required
                                v-model="email"
                              />
                              <span
                                class="eb-error-input text-danger"
                                v-if="errors.first('Email')"
                              >
                                {{ errors.first("Email") }}</span
                              >
                            </div>
                          </div>
                          <div class="col-md-6">
                            <p>Phone*</p>
                            <div class="input_block form-group">
                              <vue-phone-number-input
                                id="checkOutPhone"
                                v-validate="'required'"
                                @update="updatePhone"
                                :dark="true"
                                v-model="dummyPhone"
                                placeholder="Please Enter Phone"
                                name="Phone"
                                default-country-code="IN"
                                :class="{
                                  'is-invalid': errors.first('Phone'),
                                }"
                              />
                              <span
                                class="eb-error-input text-danger"
                                v-if="errors.first('Phone')"
                              >
                                {{ errors.first("Phone") }}</span
                              >
                              <span v-else-if="dummyPhone && !phoneNumberValid" class="eb-error-input text-danger">
                                {{ 'Phone Number Is Not Valid' }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="checkout_prop_info_container mt-4"  v-if="false">
          <h2 class="">Payment Options</h2>
          <div class="payment_option_container">
            <div class="payment_option_wrap">
              <div class="form-check">
                <label class="form-check-label yo_tok">
                  <input
                    type="radio"
                    class="form-check-input"
                    value="INR"
                    name="payment_option"
                    checked
                  />
                  YO Tokens
                  <span class="active" v-if="!loggedIn"
                    >(
                    <div class="login_txt user_signin_togl" @click="redirectLogin">Sign In</div>
                    or
                    <div class="login_txt user_signup_togl" @click="redirectRegister">Sign Up</div>
                    to access your YO Tokens )</span
                  >
                </label>
                <div class="yo_token_info_container active" v-if="loggedIn">
                  <div class="checkout_price_detail_wrap">
                    <h2>Yo Token Summary</h2>
                    <div class="checkout_price_split_detail">
                      <ul>
                        <li>
                          <div class="checkout_detail_item_wrap">
                            <p>Room Charges (2 room x 2 nights)</p>
                            <p><b>YO</b> 120</p>
                          </div>
                          <div class="checkout_detail_item_wrap">
                            <p>YO Transaction Tokens You Have</p>
                            <p>- <b>YO</b> 130</p>
                          </div>
                        </li>
                        <li>
                          <div class="checkout_detail_item_wrap">
                            <p>Remaining Tokens</p>
                            <p><b>YO</b> 10</p>
                          </div>
                        </li>
                        <li>
                          <div
                            class="checkout_detail_item_wrap yo_tok_final_status"
                          >
                            <h4 class="active" v-if="addToken">
                              <i class="fas fa-check"></i> Success
                            </h4>
                            <div class="add_yo_trans_token btn active" @click="addInvestmentTokens" v-if="!addToken">
                              <i class="fas fa-plus"></i> Add Token
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="payment_option_wrap">
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    type="radio"
                    class="form-check-input"
                    value="INR"
                    name="payment_option"
                  />
                  Other Payment Modes
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <price-summary
        :finalPrice="finalPrice"
        :totalRooms="totalRooms"
        :roomWithNightCost="roomWithNightCost"
        :totalRoomCost="totalRoomCost"
        :bookingDetails="checkout.bookingDetails"
        :applicationCharges="applicationCharges"
        :taxesAndFees="taxesAndFees"
        :totalGuest="totalGuest"
        :microjobFee="microjobFee"
      />
      </div>
      <div class="proceed_btn_container mt-3">
        <button class="btn proceed_btn" @click="proceedToPayment">Proceed to Payment Options</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PriceSummary from '../components/PriceSummary'
import { USER_ROOM_BOOK, USER_GET_TRANSACION_ORDER_ID, USER_TRANSACION_PAYMENT_CAPTURE } from 'src/services/ENDPOINT'
import priceInWords from '../../../mixins/currency'
const GST_TAX = 18 // percentage
const APP_FEE = 3 // percentage
const MICRO_FEE = 18
const guestInfo = {
  age: '18',
  name: ''
}
export default {
  mixins: [priceInWords],
  components: { PriceSummary },
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      guestInfoArr: [],
      rzp1: null,
      email: '',
      phone: '',
      dummyPhone: '',
      phoneNumberValid: false,
      allInfo: {
        payment: {},
        userInfo: {}
      }, // others
      GST_TAX,
      APP_FEE,
      MICRO_FEE
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      checkout: 'checkout/checkoutObj',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    }),
    addToken () {
      return false
    },
    stayNight () {
      const startDate = this.$moment(this.checkout.bookingStartDate, 'YYYY-MM-DD')
      const endDate = this.$moment(this.checkout.bookingEndDate, 'YYYY-MM-DD')
      return endDate.diff(startDate, 'days')
    },
    totalGuest () {
      return this.checkout.bookingDetails.map(i => Number(i.numberOfAdults) + Number(i.numberOfChild) + Number(i.numberOfInfants)).reduce((a, b) => a + b, 0)
    },
    numberOfAdults () {
      return this.checkout.bookingDetails.map(i => i.numberOfAdults).reduce((a, b) => a + b, 0)
    },
    totalChildren () {
      return this.checkout.bookingDetails.map(i => i.numberOfChild).reduce((a, b) => a + b, 0)
    },
    numberOfInfants () {
      return this.checkout.bookingDetails.map(i => i.numberOfInfants).reduce((a, b) => a + b, 0)
    },
    totalRooms () {
      return this.checkout.bookingDetails.map(i => i.totalSelectedRoom).reduce((a, b) => a + b, 0)
    },
    totalRoomCost () {
      return this.checkout.bookingDetails.map(i => i.cost).reduce((a, b) => a + b, 0)
    },
    roomWithNightCost () {
      return this.checkout.bookingDetails.map(i => i.cost).reduce((a, b) => a + b, 0)
    },
    applicationCharges () {
      return Number(Math.ceil((this.APP_FEE / 100) * this.roomWithNightCost) + 10)
    },
    taxesAndFees () {
      return Math.ceil((this.GST_TAX / 100) * Number(this.roomWithNightCost + this.applicationCharges))
    },
    microjobFee () {
      return 0
    },
    finalPrice () {
      return (this.roomWithNightCost + this.applicationCharges + this.taxesAndFees + this.microjobFee)
    }
  },
  mounted () {
    const userInfo = {
      age: '18',
      name: this.userInfo.firstName + ' ' + this.userInfo.middleName + ' ' + this.userInfo.lastName
    }
    this.guestInfoArr.push(this._.cloneDeep(userInfo))
    this.email = this.userInfo.email
    this.phone = this.userInfo.phone
    if (!this.checkout) {
      this.$router.push({ name: 'PUBLIC_HOTEL' })
      this.$notify({
        group: 'eb-notification',
        title: 'Oops',
        text: 'Room Not Select',
        type: 'warn',
        duration: 5000
      })
      this.$root.$loader(false)
    }
    // this.allInfo = this._.cloneDeep(this.checkout)
  },
  destroyed () {
    this.$store.dispatch('checkout/resetCheckoutDetails')
  },
  methods: {
    getTransactionOrderId () {

    },
    addInvestmentTokens () {
      this.$router.push(`${this.$route.path}?addtoken=${true}`).then().catch()
    },
    dateformate (date) {
      return this.$moment(date, 'YYYY-MM-DD').format('LL')
    },
    redirectLogin () {
      if (this.$route.query.login !== 'true') {
        this.$router.push(this.$route.fullPath + '?login=true')
      }
    },
    redirectRegister () {
      if (this.$route.query.login !== 'true') {
        this.$router.push(this.$route.fullPath + '?register=true')
      }
    },
    addGuest () {
      this.guestInfoArr.push(this._.cloneDeep(guestInfo))
    },
    removeGuest (idx) {
      this.guestInfoArr.splice(idx, 1)
    },
    proceedToPayment () {
      this.$validator.validate().then(async (isValid) => {
        if (isValid && this.phoneNumberValid) {
          this.$root.$loader(true)
          const payload = {
            amount: this.finalPrice + '00',
            currency: this.checkout.currency
          }
          try {
            const result = await USER_GET_TRANSACION_ORDER_ID(payload)
            this.razorPayInit(result.orderResponse)
            this.rzp1.open()
          } catch {
            this.$notify({
              group: 'eb-notification',
              title: 'Oops!',
              text: 'Payment Capture Request Failed',
              type: 'error',
              duration: 5000
            })
          } finally {
            this.$root.$loader(false)
          }
        }
      })
    },
    razorPayInit (transactionOrder) {
      var options = {
        key: this.$razorpayKey,
        amount: this.finalPrice + '00', // 2000 paise = INR 20
        name: this.userInfo.firstName + this.userInfo.lastName + this.userInfo.middleName,
        description: 'Yenna Rascala',
        currency: transactionOrder.currency,
        order_id: transactionOrder.orderId,
        phone: this.phone,
        handler: (response) => {
          this.actionPaymentCapture(response)
        },
        prefill: {
          name: this.userInfo.firstName,
          email: this.email,
          phone: this.phone
        },
        notes: {
          address: '5TH FLOOR, TECHNO RESIDENCY, PHASE 2, HITEC CITY, HYDERABAD, TELANGANA 500081'
        },
        theme: {
          color: '#ffc30e'
        }
      }
      // eslint-disable-next-line no-undef
      this.rzp1 = new Razorpay(options)
    },
    async actionPaymentCapture (razorPayResponse) {
      try {
        this.$root.$loader(true)
        const payload = {
          order_id: razorPayResponse.razorpay_order_id,
          razorpay_payment_id: razorPayResponse.razorpay_payment_id,
          razorpay_signature: razorPayResponse.razorpay_signature
        }
        this.allInfo.payment = this._.cloneDeep(razorPayResponse)
        await USER_TRANSACION_PAYMENT_CAPTURE(payload)
        this.saveBooking()
      } catch (e) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops!',
          text: 'Something went wrong please try again',
          type: 'error',
          duration: 5000
        })
      } finally {
        this.$root.$loader(false)
      }
    },
    async saveBooking () {
      this.$validator.validate().then(async (isValid) => {
        if (isValid && this.phoneNumberValid) {
          this.$root.$loader(true)
          this.allInfo.contact = this._.cloneDeep({
            phone: this.phone,
            email: this.email,
            guest: this.guestInfoArr
          })
          this.allInfo.userInfo = {
            email: this.userInfo.email,
            firstName: this.userInfo.firstName,
            lastName: this.userInfo.lastName,
            middleName: this.userInfo.middleName,
            phone: this.userInfo.phone,
            type: this.userInfo.type
          }
          this.allInfo.bookingDetails = this.checkout.bookingDetails
          this.allInfo.bookingDetails.filter(i => {
            delete i.image
            delete i.roomAmentiies
          })
          try {
            const payload = {
              bookingId: String(new Date().valueOf()),
              transactionType: 'string',
              userEmailId: this.userInfo.email,
              hotelId: this.checkout.propertyId,
              propertyName: this.checkout.propertyName,
              transactionAmount: Number(this.finalPrice),
              currency: this.checkout.currency,
              city: this.checkout.city,
              state: this.checkout.state,
              country: this.checkout.country,
              numberOfAdults: Number(this.numberOfAdults),
              numberOfChild: Number(this.totalChildren),
              numberOfInfants: Number(this.numberOfInfants),
              noOfGuests: Number(this.totalGuest),
              noOfRooms: Number(this.totalRooms),
              contact: this.allInfo.contact,
              paymentDetails: {
                transactionNo: String(new Date().valueOf()),
                paymentGateway: 'Razorpay',
                refundAmount: '0'
              },
              bookingDetails: [],
              userComments: 'string',
              bookingAmount: Number(this.finalPrice),
              roomDetails: [],
              bookingStartDate: this.checkout.bookingStartDate,
              bookingEndDate: this.checkout.bookingEndDate,
              referralId: this.userInfo.referralId || '',
              status: 'Upcoming',
              bookingType: 'Hotel',
              // others: '',
              others: JSON.stringify(this.allInfo),
              tokensAvailed: '0',
              tokensAmount: '0',
              totalAmount: Number(this.finalPrice),
              otherFeesDetails: {
                microjobFee: this.microjobFee,
                referralFee: '0',
                GST: Number(this.taxesAndFees),
                transactionFee: Number(this.applicationCharges)
              },

              bookingSecretCode: this.checkout.bookingSecretCode,
              stayNight: this.stayNight,
              bookingEmail: this.checkout.bookingEmail,
              email: this.checkout.bookingEmail,
              bookingPhone: this.checkout.bookingPhone,
              destination: this.checkout.destination,
              propertyImage: this.checkout.propertyImage,
              checkInTime: this.checkout.checkInTime,
              checkOutTime: this.checkout.checkOutTime,
              address: this.checkout.address,
              roomWithNightCost: this.roomWithNightCost,
              cancelPolicy: this.checkout.cancelPolicy,
              cancelPolicyDetails: this.checkout.cancelPolicy,
              allRoomInfo: this.allInfo.bookingDetails
              // other's
            }
            const bookingDetails = []
            const roomDetails = []
            this.checkout.bookingDetails.filter(i => {
              const booking = {
                roomType: String(i.roomType),
                cost: String(i.cost),
                discount: '0',
                reviewRating: ''
              }
              bookingDetails.push(booking)

              const room = {
                id: i._id,
                type: i.roomType,
                price: String(i.price),
                noOfRooms: String(i.totalSelectedRoom)
              }
              roomDetails.push(room)
            })
            payload.bookingDetails = bookingDetails
            payload.roomDetails = roomDetails
            const result = await USER_ROOM_BOOK(payload)
            this.$swal({
              icon: 'success',
              text: 'Booking Id ' + result.booking.bookingId,
              title: 'Hotel Book Successfully'
            })
            if (this.loggedInUserType === 'ADMIN') {
              this.$router.push({ name: 'ADMIN_BOOKING_HISTORY' })
            } else if (this.loggedInUserType === 'HOTEL') {
              this.$router.push({ name: 'AGENT_HOTEL_BOOKING_HISTORY' })
            } else if (this.loggedInUserType === 'CUSTOMER') {
              this.$router.push({ name: 'USER_DASHBOARD' })
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
        }
      })
    },
    updatePhone (v) {
      if (v.formatInternational) {
        this.phoneNumberValid = v.isValid
        this.phone = v.formatInternational
      }
    }
  }
}
</script>
<style>
.checkOut .country-selector__list__item .dots-text {
  font-weight: 500;
}
.checkOut .country-selector__country-flag .iti-flag-small{
  position: relative;
  left: 29px;
  bottom: 3px;
}
.checkOut .input-tel__label {
  display: none;
}
</style>
