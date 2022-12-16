<template>
  <div class="main_container" id="checkout">
    <div class="main_bg" id="checkout_main_bg"></div>
    <div class="checkout_main_container">
      <div class="checkout_info_container">
        <div class="payment_prop_info_container" id="accordion">
          <h2 class="payment_info_container_title">Payment Mode</h2>

          <div class="payment_mode_container">
            <div class="payment_mode_title">
              <a class="card-link" v-b-toggle.creditcard_mode>
                <i class="far fa-credit-card"></i> Debit/Credit Card
                <i class="fas fa-chevron-down togl_icon_right"></i>
              </a>
            </div>
            <b-collapse
              id="creditcard_mode"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="payment_mode_info_wrap" id="creditcard_mode">
                  <div class="dash_inut_group_container">
                    <div class="card_img_container">
                      <div class="cards_img"></div>
                    </div>
                    <div class="payment_mode_details_wrap">
                      <div class="row">
                        <div class="col-md-5">
                          <p>Card Number</p>
                          <div class="input_block form-group">
                            <input
                              type="number"
                              class="form-control"
                              placeholder="Card Number"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-md-5">
                          <p>Name on Card</p>
                          <div class="input_block form-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Name"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-md-2">
                          <p>Expiry Date</p>
                          <div class="input_block form-group">
                            <input
                              type="number"
                              class="form-control"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row mt-4">
                        <div class="col-md-3">
                          <p>OTP/CVV</p>
                          <div class="input_block form-group">
                            <input
                              type="number"
                              class="form-control"
                              placeholder="Card Number"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-md-5">
                          <button class="btn paynow_btn">Pay ₹14416</button>
                        </div>
                      </div>
                      <div class="policy_text">
                        By continuing to pay, I understand and agree with the
                        <a href="#">Privacy Policy</a> and the
                        <a href="#">Terms And Conditions</a> of Yennarascala
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </div>

          <div class="payment_mode_container">
            <div class="payment_mode_title">
              <a class="card-link" v-b-toggle.netbanking_mode>
                <i class="fas fa-globe"></i> Netbanking
                <i class="fas fa-chevron-down togl_icon_right"></i>
              </a>
            </div>
            <b-collapse
              id="netbanking_mode"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="payment_mode_info_wrap">
                  <div class="dash_inut_group_container">
                    <div class="payment_mode_details_wrap">
                      <div class="row">
                        <div class="col-md-12">
                          <p>Popular Banks</p>
                          <div class="row">
                            <div class="col-md-3">
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="SBI"
                                    name="selectbank"
                                  />SBI
                                  <div
                                    class="sbi_bank_logo pay_comp_logo"
                                  ></div>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="ICICI"
                                    name="selectbank"
                                  />ICICI
                                  <div
                                    class="icici_bank_logo pay_comp_logo"
                                  ></div>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="HDFC"
                                    name="selectbank"
                                  />HDFC
                                  <div
                                    class="hdfc_bank_logo pay_comp_logo"
                                  ></div>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="AXIS"
                                    name="selectbank"
                                  />AXIS
                                  <div
                                    class="axis_bank_logo pay_comp_logo"
                                  ></div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <p>Other Banks</p>
                          <div class="input_block">
                            <select class="form-control" name="" id="">
                              <option value="0">Select Bank</option>
                              <option value="1">SBI</option>
                              <option value="2">HDFC</option>
                              <option value="3">Bank of Baroda</option>
                              <option value="3">Andhra Bank</option>
                              <option value="4">Indian Bank</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <button class="btn paynow_btn">Pay ₹14416</button>
                        </div>
                      </div>
                      <div class="policy_text">
                        By continuing to pay, I understand and agree with the
                        <a href="#">Privacy Policy</a> and the
                        <a href="#">Terms And Conditions</a> of Yennarascala
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </div>

          <div class="payment_mode_container">
            <div class="payment_mode_title">
              <a class="card-link" v-b-toggle.wallet_mode>
                <i class="fas fa-wallet"></i> Wallets
                <i class="fas fa-chevron-down togl_icon_right"></i>
              </a>
            </div>
            <b-collapse
              id="wallet_mode"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="payment_mode_info_wrap">
                  <div class="dash_inut_group_container">
                    <div class="payment_mode_details_wrap">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-3">
                              <p>Amazon Pay</p>
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="AmazonPay"
                                    name="selectbank"
                                  />
                                  <div
                                    class="amazonpay_logo pay_comp_logo"
                                  ></div>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <p>Airtel Pay</p>
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="PayTM"
                                    name="selectbank"
                                  />
                                  <div
                                    class="airtelpay_logo pay_comp_logo"
                                  ></div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <button class="btn paynow_btn">Pay ₹14416</button>
                        </div>
                      </div>
                      <div class="policy_text">
                        By continuing to pay, I understand and agree with the
                        <a href="#">Privacy Policy</a> and the
                        <a href="#">Terms And Conditions</a> of Yennarascala
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </div>

          <div class="payment_mode_container">
            <div class="payment_mode_title">
              <a class="card-link" v-b-toggle.paypal_mode>
                <i class="fab fa-paypal"></i> PayPal
                <i class="fas fa-chevron-down togl_icon_right"></i>
              </a>
            </div>
            <b-collapse
              id="paypal_mode"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="payment_mode_info_wrap">
                  <div class="dash_inut_group_container">
                    <div class="payment_mode_details_wrap">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="INR"
                                    name="selectbank"
                                  />
                                  INR <span>(Indian Rupee)</span>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="USD"
                                    name="selectbank"
                                  />
                                  USD <span>(United States Dollar)</span>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="EUR"
                                    name="selectbank"
                                  />
                                  EUR
                                  <span>(Euro)</span>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="EUR"
                                    name="selectbank"
                                  />
                                  GBP
                                  <span>(British Pound)</span>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="SGD"
                                    name="selectbank"
                                  />
                                  SGD
                                  <span>(Singapore Dollar)</span>
                                </label>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input
                                    type="radio"
                                    class="form-check-input"
                                    value="HKD"
                                    name="selectbank"
                                  />
                                  HKD
                                  <span>(HongKong Dollar)</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <button class="btn paynow_btn">Pay ₹14416</button>
                        </div>
                      </div>
                      <div class="policy_text">
                        By continuing to pay, I understand and agree with the
                        <a href="#">Privacy Policy</a> and the
                        <a href="#">Terms And Conditions</a> of Yennarascala
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-body>
            </b-collapse>
          </div>
        </div>
      </div>
      <price-summary/>
    </div>
  </div>
</template>
<script>
import PriceSummary from '../components/PriceSummary'
import { mapGetters } from 'vuex'
export default {
  components: { PriceSummary },
  data () {
    return {}
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
      return this.checkout.bookingDetails.map(i => i.numberOfAdults + i.numberOfChild).reduce((a, b) => a + b, 0)
    },
    totalChildren () {
      return this.checkout.bookingDetails.map(i => i.numberOfChild).reduce((a, b) => a + b, 0)
    }
  },
  mounted () {
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
  },
  destroyed () {
    // this.$store.dispatch('checkout/resetCheckoutDetails')
  },
  methods: {

  }
}
</script>
