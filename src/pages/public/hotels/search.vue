<template>
  <div>
    <div class="main_hotel_search">
      <div class="row">
        <!-- <q-date v-model="model" range /> -->
        <div class="col-md-5">
          <div class="search_bar_input_container">
            <google-autocomplete
              v-if="false"
              placeholder="Destination"
              ref="search"
              inputClass="form-control"
              @input="getAddressData"
              v-model="search.propertyCity"
            />
            <div class="remove-row">
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
                @tag="addTag"
                @search-change="filterFn"
                tag-placeholder="Press Enter To Create Destination"
                style="color:black"
              >
                <template slot="tag" slot-scope="{ option }"><span class="custom__tag"><span style="color:black">{{ option }}</span></span></template>
                <template slot="singleLabel" slot-scope="props"><span class="option__desc"><span class="option__title" style="color:black">{{ props.option.DESTINATION }}</span></span></template>
                <template slot="option" slot-scope="props">
                  <div class="option__desc"><span class="option__title" style="color:black;font-weight: 400">{{ props.option.DESTINATION }} <span style="color:black" v-if="props.option.COUNTRY">({{ props.option.COUNTRY }})</span></span></div>
                </template>
                <template><span slot="noResult" style="color:black">Oops! No elements found.</span></template>
              </multiselect>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="search_bar_input_container">
            <div class="picked_date">
              <input type="text" placeholder="From" readonly @click="show" :value="dateFormate" class="" id="reservationDate">
              <div class="input_icon">
                <i class="fas fa-calendar-alt"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3" v-if="false">
          <div class="row">
            <div class="col-md-6">
              <div class="search_bar_input_container">
                <div class="tour_guests">
                  <div
                    class="tour_bg"
                    @click="numberGuestShow = !numberGuestShow"
                  >
                    <span class="fas fa-chevron-down"></span>
                    <input
                      type="number"
                      @click="numberGuestShow = !numberGuestShow"
                      id="total_guests"
                      :value="numberOfGuest"
                    />
                    <div class="input_icon">
                      <i class="fas fa-user-friends"></i>
                    </div>
                    <div class="guests_toggle"></div>
                  </div>
                  <transition name="fade">
                    <div class="numbr_guests" v-if="numberGuestShow">
                      <ul>
                        <li>
                          <label>Adults</label>
                          <div class="field_box" id="adult_counter">
                            <i
                              :class="{
                                'fas fa-minus-square negate_one': true,
                                disabled: numberOfAdults === 1,
                              }"
                              @click="numberOfAdults--"
                            ></i>
                            <input
                              type="number"
                              id="num_adults"
                              :value="numberOfAdults"
                              :min="1"
                            />
                            <i
                              class="fas fa-plus-square add_one"
                              @click="numberOfAdults++"
                            ></i>
                          </div>
                        </li>
                        <li>
                          <label>Children to 12 years</label>
                          <div class="field_box" id="child_counter">
                            <i
                              :class="{
                                'fas fa-minus-square negate_one': true,
                                disabled: numberOfChild == 0,
                              }"
                              @click="numberOfChild--"
                            ></i>
                            <input
                              type="number"
                              id="num_children"
                              :min="0"
                              :value="numberOfChild"
                            />
                            <i
                              class="fas fa-plus-square add_one"
                              @click="numberOfChild++"
                            ></i>
                          </div>
                        </li>
                        <li v-if="false">
                          <label>Infants to 2 years</label>
                          <div class="field_box" id="infant_counter">
                            <i
                              :class="{
                                'fas fa-minus-square negate_one': true,
                                disabled: numberOfInfants == 0,
                              }"
                              @click="numberOfInfants--"
                            ></i>
                            <input
                              type="number"
                              id="num_infants"
                              :min="0"
                              :value="numberOfInfants"
                            />
                            <i
                              class="fas fa-plus-square add_one"
                              @click="numberOfInfants++"
                            ></i>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="search_bar_input_container">
                <input type="number"  readonly disabled v-model.number="search.noOfRooms" placeholder="Rooms" />
                <div class="input_icon">
                  <i class="fas fa-bed"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="search_bar_input_container">
            <div class="submit_query" @click="actionSearch">
              <!-- <router-link :to="{ name: 'USER_HOTEL_SEARCH' }"> -->
              <input readonly style="cursor: pointer" :value="buttonLabel" />
              <!-- </router-link> -->
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
            landscape range dark square >
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="OK" color="primary"  flat v-close-popup />
            </div>
          </q-date>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script>

import addressLocationMixin from '../../../mixins/addressLocation'
import googleAutocomplete from '../../../components/common/googleAutocomplete'
const dateFormate = 'DD-MM-YYYY'
import { USER_SEARCH_CITIES } from '../../../services/ENDPOINT'
import Multiselect from 'vue-multiselect'
export default {
  components: { googleAutocomplete, Multiselect },
  mixins: [addressLocationMixin],
  $_veeValidate: {
    validator: 'new'
  },
  props: {
    buttonLabel: {
      defualt: 'Search'
    },
    redirect: {
      defualt: true
    }
  },
  data () {
    return {
      search: {
        propertyCity: '',
        noOfRooms: 1,
        numberOfGuest: 1,
        fromDate: '',
        toDate: ''
      },
      numberGuestShow: false,
      numberOfAdults: 1,
      numberOfChild: 0,
      numberOfInfants: 0,
      selectedDate: { from: this.$moment().format(dateFormate), to: this.$moment().add(1, 'days').format(dateFormate) },
      selectDestination: null,
      citiesArr: [],
      searchCitiesLoader: false
    }
  },
  computed: {
    numberOfGuest () {
      return this.numberOfAdults + this.numberOfChild + this.numberOfInfants
    },
    dateFormate () {
      return `${this.selectedDate.from ?? this.$moment().format(dateFormate)} - ${this.selectedDate.to ?? this.$moment().add(1, 'days').format(dateFormate)}`
    }
  },
  methods: {
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
    selectCity (v) {
      console.log(v)
    },
    optionsFn (date) {
      if (this.$moment(date, 'YYYY/MM/DD').isSame(this.$moment(), 'day')) return true
      else return this.$moment(date, 'YYYY/MM/DD').isAfter(this.$moment(), 'day')
    },
    checkDate (date) {
      return this.$moment().format(dateFormate) <= this.$moment(new Date()).format(dateFormate)
    },
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    async getAddressData (addressData) {
      console.log(addressData)
    },
    actionSearch () {
      if (this.redirect) {
        if (this.selectDestination && this.selectDestination.DESTINATION) {
          this.$router.push({
            path: '/hotels-search',
            query: {
              destination: this.search.propertyCity,
              noOfRooms: this.search.noOfRooms,
              noOfPerson: this.numberOfGuest,
              toDate: this.$moment(this.selectedDate.from, 'DD-MM-YYYY').format('YYYY-MM-DD'),
              fromDate: this.$moment(this.selectedDate.to, 'DD-MM-YYYY').format('YYYY-MM-DD'),
              numberOfAdults: this.numberOfAdults,
              numberOfChild: this.numberOfChild,
              numberOfInfants: this.numberOfInfants,
              CITYID: this.selectDestination.CITYID,
              DESTINATION: this.selectDestination.DESTINATION,
              COUNTRY: this.selectDestination.COUNTRY,
              COUNTRYCODE: this.selectDestination.COUNTRYCODE,
              STATEPROVINCE: this.selectDestination.STATEPROVINCE,
              STATEPROVINCECODE: this.selectDestination.STATEPROVINCECODE
            }
          })
        } else {
          this.$notify({
            group: 'eb-notification-center',
            text: 'Please select a destination from the list',
            duration: 5000
          })
        }
      } else {
        if (this.search.propertyCity) {
          this.search.numberOfGuest = this.numberOfGuest
          this.search.fromDate = this.$moment(this.selectedDate?.from ?? this.$moment().format(dateFormate), 'DD-MM-YYYY').format('YYYY-MM-DD')
          this.search.toDate = this.$moment(this.selectedDate?.to ?? this.$moment().add(1, 'days').format(dateFormate), 'DD-MM-YYYY').format('YYYY-MM-DD')
          this.$emit('searchObj', this.search)
        } else {
          this.$notify({
            group: 'eb-notification-center',
            text: 'Please select a destination from the list',
            duration: 5000
          })
        }
      }
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
