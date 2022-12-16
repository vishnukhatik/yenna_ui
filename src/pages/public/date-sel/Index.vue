<template>
  <div class="main_container">
    <section id="dataSel" class="duration_wrap">
      <div class="stay_form_container">
        <div class="stay_form">
          <h1>Duration of Your Stay</h1>
          <form action="search-results.html">
            <ul>
              <li>
                <label>From</label>
                <b-form-datepicker
                  style="background-color: #272727;border: none;color:white"
                  id="reservationDate"
                  v-model="date"
                  :hide-header="true"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short',
                  }"
                  :show-decade-nav="false"
                  no-highlight-today
                  class="mb-2"
                  right
                  calendar-width="100%"
                ></b-form-datepicker>
                <span class="fas fa-calendar-alt eb-date-icons"></span>
              </li>
              <li>
                <label>Number of Days</label>
                <div class="dark_bg">
                  <span class="fas fa-door-closed"></span>
                  <input type="number" id="" />
                </div>
              </li>
              <li>
                <label>Guests</label>
                <div class="dark_bg" @click="numberGuestShow = !numberGuestShow">
                  <span class="fas fa-chevron-down"></span>
                  <input
                    type="number"
                    @click="numberGuestShow = !numberGuestShow"
                    id="total_guests"
                    :value="numberOfGuest"
                  />
                  <div class="guests_toggle"></div>
                </div>
                <div class="numbr_guests" v-if="numberGuestShow">
                  <ul>
                    <li>
                      <label>Adults</label>
                      <div class="field_box" id="adult_counter">
                        <i
                          :class="{
                            'fas fa-minus-square negate_one': true,
                            disabled: numberOfAdults == 0,
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
                    <li>
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
              </li>
              <li>
                <router-link :to="{name:'PUBLIC_HOTEL_INDETAILS'}">
                  <input type="submit" value="Submit" />
                </router-link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      numberGuestShow: false,
      numberOfAdults: 1,
      numberOfChild: 0,
      numberOfInfants: 0,
      date: '2020-09-08'
    }
  },
  computed: {
    numberOfGuest () {
      return this.numberOfAdults + this.numberOfChild + this.numberOfInfants
    }
  },
  methods: {
    updateGuests () {
      this.numberOfGuest++
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
#reservationDate__value_ {
  color: white
}
#reservationDate__outer_ button svg {
  display: none;
}
.eb-date-icons{
  position: absolute;
  right: 0px;
  top: 25px;
  font-size: 21px;
  background-color: #ffc30e;
  padding: 10px;
  color: black;
  border-radius: 3px;
}

</style>
