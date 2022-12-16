<template>
  <div class="yr_token_container">
    <div class="yr_token_sm_view_wrap">
      <ul>
        <li class="fixd">
          <p><span>YR</span> 0</p>
          <i class="fas fa-lock"></i>
        </li>
        <li class="util">
          <p><span>YR</span> 0</p>
          <i class="fas fa-coins"></i>
        </li>
      </ul>
    </div>

    <div class="yr_token_lg_view_wrap">
      <ul>
        <li>
          <div class="yr_lockd_coin">
            <h4>Security Tokens</h4>
            <p><span>YO</span> 0</p>
            <i class="fas fa-lock mt-2"></i>
            <!-- <a href="btn">Buy Tokens</a> -->
          </div>
        </li>
        <li>
          <div class="yr_transac_coin">
            <h4>Transaction Tokens</h4>
            <p><span>YO</span> 0</p>
            <i class="fas fa-exchange-alt mt-2"></i>
            <a @click="tokenTransfer" class="mr-1 mdi-bolt">Transfer</a>
            <a @click="tokenRedeem" class="mr-1 mdi-bolt">Redeem</a>
            <a class="mr-1 mdi-bolt" @click="$bvModal.show('addNewTokenModal')">Add Tokens</a>
          </div>
        </li>
        <li>
          <div class="yr_invest_coin">
            <h4>Investment Tokens</h4>
            <p><span>YO</span> 0</p>
            <i class="fas fa-coins mt-2"></i>
            <a class="mdi-bolt" @click="showModal">Add Tokens</a>
          </div>
        </li>
      </ul>
    </div>
    <b-modal id="addNewTokenModal" v-model="isShowModal" hide-footer hide-header no-fade>
      <div class="modal_container">
        <div class="modal_overlay"></div>
          <div class="modal_form_wrap" style="width: 450px">
            <h2><i class="fas fa-user"></i> Add Investment Tokens</h2>
            <div class="modal_close" @click="closeModal"><i class="fas fa-times"></i></div>
            <ul>
              <li>
                <div class="row">
                  <div class="col-md-6">
                    <label>Token to INR (₹1 = {{ TOKENRATE }} token)</label>
                    <div class="dark_bg">
                      <span class="fa fa-money-bill-alt"></span>
                      <input
                        v-model.number="inventmentMoney"
                        v-validate="`numeric|min_value:${minimumInvetMoney}|max_value:${99999}`"
                        name="INR"
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label :class="{ 'text-danger': errors.first('Add Investment Tokens') }">Add Token</label>
                    <div class="dark_bg">
                      <span class="fas fa-coins"></span>
                      <input type="number" readonly disabled class="disabled" v-model="tokenToMoney" name="Add Investment Tokens">
                    </div>
                  </div>
                </div>
                <span
                  class="eb-error-input text-danger"
                  style="font-size: 13px !important;"
                  v-if="errors.first('INR')"
                >
                  {{ errors.first("INR") }}</span
                >
              </li>
              <li>
                <div class="row">
                  <div class="col-md-12">
                    <input type="submit" style="width: 100%" @click="addToken" value="Add Investment Tokens">
                  </div>
                </div>
              </li>
            </ul>
          </div>
      </div>
    </b-modal>

  </div>
</template>
<script>
const minimumInvetMoney = 10
const TOKENRATE = 20// ₹1 == 20 token
import { mapGetters } from 'vuex'

export default {
  name: 'YoToken',
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      isShowModal: false,
      minimumInvetMoney,
      TOKENRATE,
      investmentTokens: 50,
      inventmentMoney: minimumInvetMoney
    }
  },
  mounted () {
    console.log(this.$razorpayKey)
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      checkout: 'checkout/checkoutObj',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    }),
    tokenToMoney () {
      return (this.inventmentMoney * TOKENRATE)
    }
  },
  watch: {
    isShowModal (v) {
      if (!v) this.$router.push(`${this.$route.path}`)
      else this.$router.push(`${this.$route.path}?addtoken=${true}`)
    },
    $route (v) {
      if (v.query && v.query.addtoken) {
        this.$bvModal.show('addNewTokenModal')
      } else {
        this.$bvModal.hide('addNewTokenModal')
      }
    }
  },
  methods: {
    showModal () {
      this.isShowModal = true
    },
    async razorInit () {
      var options = {
        key: this.$razorpayKey,
        amount: this.minimumInvetMoney + '00', // 2000 paise = INR 20
        name: this.userInfo.firstName,
        description: 'Add Investment Tokens',
        handler: (response) => {
          this.$swal({
            type: 'warning',
            animation: true,
            title: 'Under Development',
            text: '',
            timer: 2000
          })
        },
        prefill: {
          name: this.userInfo.firstName,
          email: this.email
        },
        notes: {
          address: ''
        },
        theme: {
          color: '#F37254'
        }
      }
      // eslint-disable-next-line no-undef
      this.rzp1 = await new Razorpay(options)
      this.rzp1.open()
    },
    tokenTransfer () {
      this.$swal({
        type: 'warning',
        animation: true,
        title: 'Under Development',
        timer: 2000
      })
    },
    tokenRedeem () {
      this.$swal({
        type: 'warning',
        animation: true,
        title: 'Under Development',
        timer: 2000
      })
    },
    addToken () {
      this.$validator.validate().then(async (valid) => {
        if (valid) {
          this.razorInit()
        }
      })
    },
    closeModal () {
      this.inventmentMoney = 10
      this.isShowModal = false
    }
  }
}
</script>
