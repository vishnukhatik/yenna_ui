<template>
  <div>
        <footer class="footer">
        <div class="container main_footer">
            <div class="row">
                <div class="col-md-3">
                    <div class="footer_col" id="need_help">
                        <h4>Need Help?</h4>
                        <div class="footer_inner">
                            <div class="footer_minirow">
                                <h5>Call Us</h5>
                                <span>+91 7680899602</span>
                            </div>
                        </div>
                        <div class="footer_inner">
                            <div class="footer_minirow">
                                <h5>Email</h5>
                                <span><a href="mailto:info@yennarascala.com">info@yennarascala.com</a></span>
                            </div>
                        </div>
                        <div class="footer_inner">
                            <div class="footer_minirow">
                                <h5>Follow Us</h5>
                                <span>
                                    <a href="#"><i class="fab fa-facebook-square"></i></a>
                                    <a href="#"><i class="fab fa-twitter-square"></i></a>
                                    <a href="#"><i class="fab fa-instagram-square"></i></a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3" v-if="false">
                    <div class="footer_col" id="company">
                        <h4>Company</h4>
                        <div class="footer_menu">
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Community Blog</a></li>
                                <li><a href="#">Rewards</a></li>
                                <li><a href="#">Work with Us</a></li>
                                <li><a href="#">Meet the Team</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-md-3" v-if="false">
                    <div class="footer_col" id="Support">
                        <h4>Support</h4>
                        <div class="footer_menu">
                            <ul>
                                <li><a href="#">Account</a></li>
                                <li><a href="#">Legal</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-3" v-if="false">
                    <div class="footer_col" id="setting">
                        <h4>Setting</h4>
                        <div class="footer_form">
                            <label>Currencies</label>
                            <div class="currency_sel">
                                <span class="fas fa-chevron-down"></span>
                                <select>
                                    <option value="inr" selected>Inr</option>
                                    <option value="eur">Eur</option>
                                    <option value="mercedes">Usd</option>
                                    <option value="audi">Aud</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
              <div class="col-md-9">
                <div class="footer_col">
                  <section class="newsletter" style="background-color: #333;">
                      <div class="row">
                        <div class="col-12 col-md-6 col-lg-6">
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
                        <div class="col-md-6 col-lg-6">
                          <div class="subscriber_form">
                            <input v-validate="'required|email'" placeholder="Please Enter Your Email" name="Email" v-model="email" type="email">
                            <span class="eb-error-input text-danger" v-if="errors.first('Email')">
                    {{ errors.first("Email") }}</span
                            >
                            <input type="submit" @click="newsLetterSave" value="subscribe">
                          </div>
                        </div>
                      </div>
                  </section>
                </div>
              </div>
            </div>
        </div>
    </footer>
    <div class="sub_footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <p target="_blank" href="https://www.Yennarascala.com">Copyright © {{ new Date().getFullYear() }} by Yenna Tech Private Limited</p>
                </div>
                <div class="col-sm-6"><img src="~/assets/images/footer_sub.jpg" alt=""></div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { PUBLIC_NEWSLETTER } from '../../services/ENDPOINT'
export default {
  name: 'FooterPublic',
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
