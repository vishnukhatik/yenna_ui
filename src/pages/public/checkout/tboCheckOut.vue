<template>
  <div class="main_container" id="checkout">
    <div class="main_bg" id="checkout_main_bg"></div>
    <div class="checkout_main_container checkOut container">
      <div class="checkout_info_container">
        <div class="checkout_prop_info_pad_container">
          <div class="s_hotel_container">
            <div class="s_hotel_img_container">
              <q-carousel
                v-if="hotelInfo && hotelInfo.HotelDetails && hotelInfo.HotelDetails.Images"
                arrows
                animated
                v-model="slide"
                height="150px"
              >
                <q-carousel-slide v-for="(item, index) of hotelInfo.HotelDetails.Images" :name="index+1" :key="index" :img-src="item" />
              </q-carousel>

            </div>
            <div class="s_hotel_info_container" v-if="hotelInfo && hotelInfo.HotelDetails && hotelInfo.HotelDetails.StarRating && hotelInfo.HotelDetails.StarRating != 0">
              <div class="tour_review">
                <div class="star_val">
                  <i class="fas fa-star pl-1" v-for="(item, index) in hotelInfo.HotelDetails.StarRating" :key="index" />
                </div>
              </div>
               <!-- <div class="star_rate ml-2 mb-2">
                  <h2>{{ hotelInfo.HotelDetails.StarRating }}</h2>
                </div> -->
              <div class="s_hotel_details_wrap">
                <h3 v-if="hotelInfo && hotelInfo.HotelDetails">{{ hotelInfo.HotelDetails.HotelName }}</h3>
                <p v-if="hotelInfo && hotelInfo.HotelDetails">
                  <i class="fas fa-map-marker-alt"></i>{{ hotelInfo.HotelDetails.Address }}
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="s_hotel_stay_info_container">
            <div class="row">
              <div class="col-3 right_border_light">
                <div class="s_hotel_stay_info_list_item">
                  <h3>Check In</h3>
                  <h4>Sun, 22 Nov 2020</h4>
                  <p>12:00 AM</p>
                </div>
              </div>
              <div class="col-3 right_border_light">
                <div class="s_hotel_stay_info_list_item">
                  <h3>Check Out</h3>
                  <h4>Tue, 24 Nov 2020</h4>
                  <p>12:00 AM</p>
                </div>
              </div>
              <div class="col-6">
                <div class="s_hotel_stay_info_list_item">
                  <h3>Persons</h3>
                  <h4>2 Guests | 1 Room</h4>
                  <p>2 Night</p>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div class="checkout_prop_info_container mt-4">
          <h2 class="">Guest Details</h2>
          <div class="s_hotel_guest_container">
            <div class="reg_form_wrap">
              <div class="row">
                <div class="col-md-12">
                  <div class="dash_inut_group_container">
                    <ul>
                      <li v-for="(guest, index) of guestInfo" :key="index">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="row">
                              <div class="col-md-3">
                                <p>Title</p>
                                <div class="input_block">
                                  <select
                                    v-model="guest.Title"
                                    class="form-control"
                                    name="Title"
                                    placeholder="Title (Mr)."
                                    required
                                  >
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Ms">Ms</option>
                                  </select>
                                </div>
                              </div>
                              <div class="col-md-3">
                                <p>Age*</p>
                                <div class="input_block">
                                  <input
                                    v-validate="'required'"
                                    v-model="guest.Age"
                                    type="text"
                                    class="form-control"
                                    placeholder="Age"
                                    :name="'Age'+index"
                                    required
                                    :minlength="1"
                                    :maxlength="150"
                                  />
                                  <span
                                    class="eb-error-input text-danger"
                                    v-if="errors.first('Age'+index)"
                                  >
                                    {{ errors.first("Age"+index) }}</span
                                  >
                                </div>
                              </div>
                              <div class="col-md-6">
                                <p>First Name*</p>
                                <div class="input_block form-group">
                                  <input
                                    v-validate="'required'"
                                    v-model="guest.FirstName"
                                    type="text"
                                    class="form-control"
                                    placeholder="First Name"
                                    :name="'First Name'+index"
                                    required
                                    min="1"
                                    max="40"
                                  />
                                  <span
                                    class="eb-error-input text-danger"
                                    v-if="errors.first('First Name'+index)"
                                  >
                                    {{ errors.first("First Name"+index) }}</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <p>Last Name*</p>
                            <div class="input_block form-group">
                              <input
                                v-validate="'required'"
                                v-model="guest.LastName"
                                type="text"
                                class="form-control"
                                placeholder="Last Name"
                                required
                                :name="'Last Name'+index"
                                min="1"
                                max="40"
                              />
                              <span
                                class="eb-error-input text-danger"
                                v-if="errors.first('Last Name'+index)"
                              >
                                {{ errors.first("Last Name"+index) }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div class="row pt-2">
                          <div class="col-md-4">
                            <p>Email*</p>
                            <div class="input_block form-group">
                              <input
                                v-validate="'email'"
                                v-model="guest.Email"
                                type="email"
                                class="form-control"
                                placeholder="Email"
                                :name="'Email'+index"
                                min="1"
                                max="80"
                              />
                              <span
                                class="eb-error-input text-danger"
                                v-if="errors.first('Email'+index)"
                              >
                                {{ errors.first("Email"+index) }}</span
                              >
                            </div>
                          </div>
                          <div class="col-md-4">
                            <p>Phone*</p>
                            <div class="input_block form-group">
                              <input
                                v-validate="'numeric'"
                                v-model.number="guest.Phoneno"
                                class="form-control"
                                placeholder="+91 7359564121"
                                required
                                :name="'Phone'+index"
                                :min="8"
                                :max="15"
                              />
                              <span
                                class="eb-error-input text-danger"
                                v-if="errors.first('Phone')"
                              >
                                {{ errors.first("Phone"+index) }}</span
                              >
                            </div>
                          </div>
                          <div class="col-md-4">
                            <p>PAN*</p>
                            <div class="input_block form-group">
                              <input
                                v-validate="{ required: true, regex: /[A-Z]{5}[0-9]{4}[A-Z]{1}/ }"
                                v-model.number="guest.PAN"
                                class="form-control"
                                placeholder="EVBPM2766H"
                                required
                                :name="'PAN'+index"
                                :min="9"
                                :max="9"
                              />
                              <span
                                class="eb-error-input text-danger"
                                v-if="errors.first('PAN'+index)"
                              >
                                {{ errors.first("PAN"+index) }}</span
                              >
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
      </div>
      <div class="checkout_price_container">
        <div class="checkout_price_detail_wrap">
          <h2>Price Summary</h2>
          <div class="checkout_price_split_detail">
            <ul>
              <li>
                <div class="checkout_detail_item_wrap">
                  <p>Room Charges  <br><span style="font-size: 10px;background-color: transparent;">(incl. of all taxes)</span></p>
                  <p>{{ currency(roomCharges, currencyCode) }} </p>
                </div>
                <div class="checkout_detail_item_wrap">
                  <p>Micro Fee</p>
                  <p>{{ currency(microFee, currencyCode) }}</p>
                </div>
                <div class="checkout_detail_item_wrap" v-if="false">
                  <p>
                    Total Discounts <span><b>16%</b> Off</span>
                  </p>
                  <p>-₹2000</p>
                </div>
              </li>
              <li>
                <div class="checkout_detail_item_wrap">
                  <h3>Final Amount</h3>
                  <h3> {{ currency(finalPrice, currencyCode) }} </h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="proceed_btn_container">
        <button class="btn proceed_btn" @click="proceedToPayment">Proceed to Payment Options</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { USER_GET_TRANSACION_ORDER_ID, USER_TRANSACION_PAYMENT_CAPTURE, TBO_YR_SAVE_BOOKING, AUTH_USER_REGISTER, TBO_SAVE_BOOKING, USER_REFUND } from 'src/services/ENDPOINT'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      payload: {},
      hotelInfo: {},
      roomInfo: {},
      slide: 1,
      guestInfo: [],
      yrPaymentInfo: {}
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      checkout: 'checkout/checkoutObj',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    }),
    finalPrice () {
      if (this.roomInfo.Price && this.roomInfo.Price.PublishedPriceRoundedOff) {
        return this.roomInfo.Price.PublishedPriceRoundedOff * this.payload.HotelRoomsDetails.length + this.microFee
      } else {
        return 0
      }
    },
    roomCharges () {
      if (this.roomInfo.Price && this.roomInfo.Price.PublishedPriceRoundedOff) {
        return this.roomInfo.Price.PublishedPriceRoundedOff * this.payload.HotelRoomsDetails.length
      } else {
        return 0
      }
    },
    currencyCode () {
      if (this.roomInfo.Price && this.roomInfo.Price.PublishedPriceRoundedOff) {
        return this.roomInfo.Price.CurrencyCode
      } else {
        return 'INR'
      }
    },
    microFee () {
      return 10
    }
  },
  mounted () {
    const data = JSON.parse(localStorage.getItem('tboCheckoutInfo'))
    const { hotelInfo, room, payload } = data
    if (data) {
      this.hotelInfo = hotelInfo
      this.roomInfo = room
      this.payload = payload
      if (this.payload && this.payload.HotelRoomsDetails.length > 0) {
        for (var i = 0; i < this.payload.HotelRoomsDetails.length; i++) {
          console.log(i)
          this.guestInfo.push({
            Title: 'Mr',
            FirstName: '',
            MiddleName: null,
            LastName: '',
            Phoneno: null,
            Email: null,
            PaxType: 1,
            LeadPassenger: true,
            Age: 18,
            PassportNo: null,
            PassportIssueDate: null,
            PassportExpDate: null,
            PAN: ''
          })
        }
        if (this.loggedIn) {
          // this.guestInfo[0].Email = this.userInfo.email
          // this.guestInfo[0].FirstName = this.userInfo.firstName
          // this.guestInfo[0].LastName = this.userInfo.lastName
          // this.guestInfo[0
          // ].Phoneno = this.userInfo.phone
        }
      }
    } else {
      this.$notify({
        group: 'eb-notification',
        title: 'Oops',
        text: 'Room Not Select',
        type: 'warn',
        duration: 5000
      })
      this.$router.go(-1)
    }
  },
  methods: {
    generatePassword () {
      var length = 10,
        charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        retVal = ''
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
      }
      return retVal
    },
    userRegisterAction () {
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          const payload = {
            email: this.guestInfo[0].Email,
            password: this.generatePassword(),
            firstName: this.guestInfo[0].FirstName,
            middleName: '',
            lastName: this.guestInfo[0].LastName,
            referralId: '',
            phone: this.guestInfo[0].Phoneno,
            type: 'CUSTOMER'
          }
          try {
            this.$root.$loader(true)
            const result = await AUTH_USER_REGISTER(payload)
            this.$notify({
              group: 'eb-notification',
              title: 'SUCCESS! ',
              text: `Howdy ${result.userSignUpInfo.userSignUp.firstName} ${result.userSignUpInfo.userSignUp.middleName} ${result.userSignUpInfo.userSignUp.lastName}, Welcome to the Yenna Rascala!`,
              type: 'success',
              duration: 7000
            })
            const data = {
              token: result.userSignUpInfo.token,
              loginDetails: result.userSignUpInfo.userSignUp
            }
            this.$store.dispatch('auth/setUser', data)
            this.proceedToPayment()
          } catch (err) {
            console.log(err.message.text)
            this.$notify({
              group: 'eb-notification',
              title: 'Oops!',
              text: err?.message?.errors[0]?.message ?? 'Something Went Wrong',
              type: 'error',
              duration: 5000
            })
          } finally {
            this.$root.$loader(false)
          }
        }
      })
    },
    proceedToPayment () {
      this.$validator.validate().then(async (isValid) => {
        if (isValid) {
          if (!this.loggedIn) {
            this.userRegisterAction()
          } else {
            this.$root.$loader(true)
            const payload = {
              amount: this.finalPrice + '00',
              currency: this.currencyCode
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
        }
      })
    },
    razorPayInit (transactionOrder) {
      var options = {
        key: this.$razorpayKey,
        amount: this.finalPrice + '00', // 2000 paise = INR 20
        name: this.guestInfo[0].FirstName + this.guestInfo[0].LastName,
        description: 'Yenna Rascala',
        currency: transactionOrder.currency,
        order_id: transactionOrder.orderId,
        phone: this.guestInfo.Phoneno,
        handler: (response) => {
          this.actionPaymentCapture(response)
        },
        prefill: {
          name: this.guestInfo[0].FirstName,
          email: this.guestInfo[0].Email,
          phone: this.guestInfo[0].Phoneno
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
          razorpay_signature: razorPayResponse.razorpay_signature,
          microFee: this.microFee,
          roomCharges: this.roomCharges,
          finalPrice: this.finalPrice
        }
        this.yrPaymentInfo = this._.cloneDeep(razorPayResponse)
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
        this.$root.$loader(false)
      }
    },
    async saveBooking () {
      const payload = this.payload
      payload.HotelRoomsDetails.filter((h, i) => {
        h.HotelPassenger = [this.guestInfo[i]]
        h.BedTypeCode = null
      })
      try {
        this.$root.$loader(true)
        const result = await TBO_SAVE_BOOKING(payload)
        if (result.BookResult.Error.ErrorCode === 0) {
          this.saveYrDB(result.BookResult, payload)
          this.$swal({
            icon: 'success',
            text: 'Booking Id ' + result.BookResult.BookingId,
            title: 'Hotel Book Successfully'
          })
        } else {
          this.refund()
          this.$notify({
            group: 'eb-notification',
            title: 'Oops!',
            text: result.BookResult.Error.ErrorMessage,
            type: 'warn',
            duration: 5000
          })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
        }
      } catch (e) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops!',
          text: 'Something went wrong please try again',
          type: 'error',
          duration: 5000
        })
        this.$root.$loader(false)
      }
      console.log(this.yrPaymentInfo)
    },
    async saveYrDB (BookResult, hotelInfo) {
      try {
        this.$root.$loader(true)
        this.yrPaymentInfo.finalPrice = this.finalPrice
        this.yrPaymentInfo.microFee = this.microFee
        this.yrPaymentInfo.roomPrice = this.roomCharges
        this.yrPaymentInfo.currency = this.currencyCode
        const payload = {
          razorpayPayment: this.yrPaymentInfo,
          userId: this.userInfo._id,
          bookingInfo: BookResult
        }
        await TBO_YR_SAVE_BOOKING(payload)
        this.$router.push({ name: 'USER_DASHBOARD' })
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
    async refund () {
      try {
        this.$root.$loader(true)
        const payload = {
          amount: Number(this.finalPrice) * 100,
          paymentId: this.yrPaymentInfo.razorpay_payment_id,
          notes: ''
        }
        await USER_REFUND(payload)
        this.$notify({
          group: 'eb-notification',
          title: 'Refund Request',
          text: 'The payment will be refunded in 5-7 days.',
          type: 'success',
          duration: 5000
        })
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
  }
}
</script>
