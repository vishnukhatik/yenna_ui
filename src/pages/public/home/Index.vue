<template>
  <div>
    <div class="main_container">
      <section class="map_wrap">
        <div class="map_container">
          <img src="~/assets/images/yellow_world.png" alt="" class="world_img img-fluid">

          <!---------- Pointers with info containers ------------>
          <div class="pointers_contianer">
            <div class="map_pointer" id="indian_tours">
              <div class="pointer_wrap"><span class="tour_name">India</span><i
                class="fas fa-map-marker-alt tour_mark"></i></div>
                <router-link :to="{name: 'PUBLIC_DATA_SEL'}">
                  <div class="map_info_wrap"
                    id="indiaBackImg">
                    <div class="row">
                      <div class="col-6">
                        <h4>India</h4>
                      </div>
                      <div class="col-6">
                        <div class="fav_tour">
                          <span>156</span>
                          <i class="fas fa-heart"></i>
                        </div>
                      </div>
                    </div>
                    <div class="num_info">
                      <div class="num_tours">26 Tours</div>
                      <div class="num_activities">18 Activities</div>
                    </div>
                  </div>
                </router-link>
              </div>

            <div class="map_pointer" id="china_tours">
              <div class="pointer_wrap"><span class="tour_name">China</span><i
                  class="fas fa-map-marker-alt tour_mark"></i></div>
              <router-link :to="{name: 'PUBLIC_DATA_SEL'}">
                <div class="map_info_wrap" id="chinaBackImg">
                  <div class="row">
                    <div class="col-6">
                      <h4>China</h4>
                    </div>
                    <div class="col-6">
                      <div class="fav_tour">
                        <span>156</span>
                        <i class="fas fa-heart"></i>
                      </div>
                    </div>
                  </div>
                  <div class="num_info">
                    <div class="num_tours">26 Tours</div>
                    <div class="num_activities">18 Activities</div>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="map_pointer" id="australia_tours">
              <div class="pointer_wrap"><span class="tour_name">Australia</span><i
                  class="fas fa-map-marker-alt tour_mark"></i></div>
              <router-link :to="{name: 'PUBLIC_DATA_SEL'}">
                <div class="map_info_wrap"
                  id="australiaBackImg">
                  <div class="row">
                    <div class="col-6">
                      <h4>Australia</h4>
                    </div>
                    <div class="col-6">
                      <div class="fav_tour">
                        <span>156</span>
                        <i class="fas fa-heart"></i>
                      </div>
                    </div>
                  </div>
                  <div class="num_info">
                    <div class="num_tours">26 Tours</div>
                    <div class="num_activities">18 Activities</div>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="map_pointer" id="italy_tours">
              <div class="pointer_wrap"><span class="tour_name">Italy</span><i
                  class="fas fa-map-marker-alt tour_mark"></i></div>
              <router-link :to="{name: 'PUBLIC_DATA_SEL'}">
                <div class="map_info_wrap"
                  id="italyBackImg">
                  <div class="row">
                    <div class="col-6">
                      <h4>Italy</h4>
                    </div>
                    <div class="col-6">
                      <div class="fav_tour">
                        <span>156</span>
                        <i class="fas fa-heart"></i>
                      </div>
                    </div>
                  </div>
                  <div class="num_info">
                    <div class="num_tours">26 Tours</div>
                    <div class="num_activities">18 Activities</div>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="map_pointer" id="newyork_tours">
              <div class="pointer_wrap"><span class="tour_name">New York</span><i
                  class="fas fa-map-marker-alt tour_mark"></i></div>
              <router-link :to="{name: 'USER_DATA_SEL'}">
                <div class="map_info_wrap" id="newYorkBackImg">
                  <div class="row">
                    <div class="col-6">
                      <h4>New York</h4>
                    </div>
                    <div class="col-6">
                      <div class="fav_tour">
                        <span>156</span>
                        <i class="fas fa-heart"></i>
                      </div>
                    </div>
                  </div>
                  <div class="num_info">
                    <div class="num_tours">26 Tours</div>
                    <div class="num_activities">18 Activities</div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <!----------- pointer container end ------------>
        </div>
      </section>

      <section class="tour_offers">
        <div class="iso-grid">
          <div class="row">
            <div class="col-md-4">
              <div class="offer_wrap doubl_height" id="indonesiaBackImg">
                <h3>Indonesia</h3>
                <div class="offer_details">
                  <h4 v-if="false">20% Off</h4>
                  <p>Ease of booking, fantastic products and competitive pricing makes the booking experience amazing
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-12">
                  <div class="offer_wrap" id="AustraliaBackImg">
                    <h3>Australia</h3>
                    <div class="offer_details">
                      <h4 v-if="false">Upto 36,000 Off</h4>
                      <p>Ease of booking, fantastic products and competitive pricing makes the booking experience
                        amazing</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="offer_wrap" id="SkylineBackImg">
                    <h3>Skyline City</h3>
                    <div class="offer_details">
                      <h4 v-if="false">15% Off</h4>
                      <p>Ease of booking, fantastic products and competitive pricing makes the booking experience
                        amazing</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="offer_wrap" id="SingaporeBackImg">
                    <h3>Singapore</h3>
                    <div class="offer_details">
                      <h4 v-if="false">10% Off</h4>
                      <p>Ease of booking, fantastic products and competitive pricing makes the booking experience
                        amazing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="newsletter">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <div class="subscribe_label">
                <div class="label_img">
                  <img src="~/assets/images/ico_email_subscribe.svg" alt="">
                </div>
                <div class="label_text">
                  <h4>Get Updates & More</h4>
                  <p>Thoughtful thoughts to your inbox</p>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="subscriber_form">
                <input v-validate="'required|email'" placeholder="Please Enter Your Email" name="Email" v-model="email" type="email">
                <span class="eb-error-input text-danger" v-if="errors.first('Email')">
                    {{ errors.first("Email") }}</span
                  >
                <input type="submit" @click="newsLetterSave" value="subscribe">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { PUBLIC_NEWSLETTER } from '../../../services/ENDPOINT'
export default {
  name: 'HomePage',
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      email: ''
    }
  },
  mounted () {
    $('.map_pointer').click(function () {
      // var selId = $(this).attr('id')
      // $('.map_info_wrap').hide()
      // $('#' + selId + ' .map_info_wrap').show()
    })
  },
  methods: {
    newsLetterSave () {
      this.$validator.validate().then(async isValid => {
        if (isValid) {
          try {
            await PUBLIC_NEWSLETTER({ emailId: this.email })
            this.$swal({
              title: 'Success',
              text: 'You have successfully subscribed to the newsletter - Yenna Rascala',
              icon: 'success'
            }).then((result) => {
              $('html, body').animate({ scrollTop: 0 }, 'slow')
            })
            this.email = ''
            this.$validator.reset()
          } catch (err) {
            this.$swal({
              title: 'Warning',
              text: ' The email has already been taken. - Yenna Rascala',
              icon: 'warning'
            }).then((result) => {
              $('html, body').animate({ scrollTop: 0 }, 'slow')
            })
          }
        }
      })
    }
  }
}
</script>
