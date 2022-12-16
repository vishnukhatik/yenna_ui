<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <h4 v-if="$route.name !== 'AGENT_ADD_HOTELS'">Properties</h4>
      </div>
      <div class="col-md-8 text-right pb-2" v-if="$route.name === 'AGENT_PROPERTIES_ADD' || $route.name === 'AGENT_PROPERTIES_EDIT' || $route.name === 'ADMIN_PROPERTIES_ADD' || $route.name === 'ADMIN_PROPERTIES_EDIT'">
        <b-button size="md" @click="$router.go(-1)" variant="secondary" >Back</b-button>
      </div>
    </div>
    <div class="main_container">
      <!-- <div class="dash_btn_container">
          <a href="add-property.html" class="blue_bgcolor"><i class="fas fa-plus"></i> Add Property</a>
      </div> -->
      <div v-if="$route.name == 'AGENT_ADD_HOTELS'" class="main_bg" id="search_results"></div>
      <div :class="{'hotel_reg_conainer':true, 'padding67': $route.name !== 'AGENT_ADD_HOTELS'}" id="hotel-register">
        <div class="reg_progressbar_container">
          <div class="progressbar_wrap">
            <div class="progress">
              <div class="progress-bar" :style="activeProgressBar"></div>
            </div>
          </div>
          <div class="progress_level_wrap">
            <div
              :class="{
                'progress_level level_1': true,
                active: activeTab >= 1,
              }"
            >
              <div class="progress_bubble">1</div>
              <div class="progress_title">Basic Details</div>
            </div>
            <div
              :class="{
                'progress_level level_2': true,
                active: activeTab >= 2,
              }"
            >
              <div class="progress_bubble">2</div>
              <div class="progress_title">Proof Information</div>
            </div>
            <div
              :class="{
                'progress_level level_3': true,
                active: activeTab >= 3,
              }"
            >
              <div class="progress_bubble">3</div>
              <div class="progress_title">Room Details</div>
            </div>
            <div
              :class="{
                'progress_level level_4': true,
                active: activeTab >= 4,
              }"
            >
              <div class="progress_bubble">4</div>
              <div class="progress_title">Finalise!</div>
            </div>
          </div>
        </div>

        <div :class="{'registration_form_container': true,'d-none': activeTab !== 1}">
          <h2>Property Details</h2>
          <div class="reg_form_wrap">
            <div class="row">
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Contact Person Role'),
                        }"
                      >
                        Contact Person Role*
                      </p>
                      <div class="input_block">
                        <select
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Contact Person Role'),
                          }"
                          v-model="hotelInfo.contactPersonRole"
                          required
                          v-validate="'required|min:2|max:30'"
                          name="Contact Person Role"
                        >
                          <option
                            v-for="(item, inx) of contactPersonRoleArr"
                            :key="inx"
                            :value="item"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Contact Person Role')"
                      >
                        {{ errors.first("Contact Person Role") }}</span
                      >
                    </li>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Property Type'),
                        }"
                      >
                        Property Type*
                      </p>
                      <div class="input_block">
                        <select
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Property Type'),
                          }"
                          v-model="hotelInfo.propertyType"
                          required
                          v-validate="'required|min:2|max:30'"
                          name="Property Type"
                        >
                          <option
                            v-for="(item, inx) of propertyTypeArr"
                            :key="inx"
                            :value="item"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Property Type')"
                      >
                        {{ errors.first("Property Type") }}</span
                      >
                    </li>
                    <li>
                      <p
                        :class="{ 'text-danger': errors.first('Star Rating') }"
                      >
                        Star Rating*
                      </p>
                      <div class="input_block">
                        <select
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Star Rating'),
                          }"
                          v-model="hotelInfo.starRating"
                          required
                          v-validate="'required'"
                          name="Star Rating"
                        >
                          <option
                            v-for="(item, inx) of starRatingArr"
                            :key="inx"
                            :value="item"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Star Rating')"
                      >
                        {{ errors.first("Star Rating") }}</span
                      >
                    </li>
                    <li v-if="loggedInUserType == 'ADMIN'">
                      <p
                        :class="{
                          'text-danger': errors.first('Booking Email'),
                        }"
                      >
                        Select Contact Person Email*
                      </p>
                      <div class="input_block form-group">
                        <select
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Select Contact Person Email'),
                          }"
                          v-model="hotelInfo.contactPersonEmail"
                          required
                          v-validate="'required'"
                          name="Select Contact Person Emaile"
                          placeholder="Select Contact Person Email"
                          @change="changeContactPersonEmail"
                        >
                          <option
                            v-for="(item, inx) of hotelerList"
                            :key="inx"
                            :value="item.email"
                          >
                            {{ item.hotelName }} ( {{ item.email }} )
                          </option>
                        </select>
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Select Contact Person Email')"
                      >
                        {{ errors.first("Select Contact Person Email") }}</span
                      >
                    </li>
                    <li v-else>
                      <p
                        :class="{
                          'text-danger': errors.first('Booking Email'),
                        }"
                      >
                        Booking Email*
                      </p>
                      <div class="input_block form-group">
                        <input
                          v-validate="'required|email'"
                          type="email"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Booking Email'),
                          }"
                          placeholder="Please Enter Booking Email"
                          required
                          name="Booking Email"
                          v-model="hotelInfo.bookingEmail"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Booking Email')"
                      >
                        {{ errors.first("Booking Email") }}</span
                      >
                    </li>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Booking Phone'),
                        }"
                      >
                        Booking Phone*
                      </p>
                      <div class="input_block form-group bookingPhone">
                        <vue-phone-number-input
                          v-validate="'required'"
                          id="checkOutPhone"
                          :dark="true"
                          @update="updateContactPersonPhone"
                          v-model="contactPersonPhone"
                          placeholder="Please Enter Booking Phone"
                          name="Booking Phone"
                          default-country-code="IN"
                          :class="{
                            'is-invalid': errors.first('Booking Phone'),
                          }"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Booking Phone')"
                      >
                        {{ errors.first("Booking Phone") }}</span
                      >
                      <span v-else-if="contactPersonPhone && !phoneNumberValid" class="eb-error-input text-danger">
                      {{ 'Phone Number Is Not Valid' }}
                    </span>
                    </li>
                    <li>
                      <p :class="{ 'text-danger': errors.first('Landline') }">
                        Landline
                      </p>
                      <div class="input_block form-group">
                        <input
                          v-validate="'numeric|min:6|max:15'"
                          type="number"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Landline'),
                          }"
                          placeholder="Please Enter Landline"
                          name="Landline"
                          v-model="hotelInfo.Landline"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Landline')"
                      >
                        {{ errors.first("Landline") }}</span
                      >
                    </li>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Number of Rooms'),
                        }"
                      >
                        Number of Rooms*
                      </p>
                      <div class="input_block form-group">
                        <input
                          v-validate="'required|numeric|max:1500'"
                          type="number"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Number of Rooms'),
                          }"
                          placeholder="Please Enter Number of Rooms"
                          required
                          name="Number of Rooms"
                          v-model="hotelInfo.noOfRooms"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Number of Rooms')"
                      >
                        {{ errors.first("Number of Rooms") }}</span
                      >
                    </li>
                    <li>
                      <p
                        :class="{ 'text-danger': errors.first('Website URL') }"
                      >
                        Website URL
                      </p>
                      <div class="input_block form-group">
                        <input
                          type="url"
                          v-validate="'url|min:6|max:50'"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Website URL'),
                          }"
                          name="Website URL"
                          v-model="hotelInfo.website"
                          placeholder="Please Enter Website URL"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Website URL')"
                      >
                        {{ errors.first("Website URL") }}</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Hotel Name'),
                        }"
                      >
                        Hotel Name*
                      </p>
                      <div class="input_block form-group">
                        <input
                          v-validate="'required|min:2|max:40'"
                          type="text"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Hotel Name'),
                          }"
                          placeholder="Please Enter Hotel Name"
                          required
                          name="Hotel Name"
                          v-model="hotelInfo.propertyName"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Hotel Name')"
                      >
                        {{ errors.first("Hotel Name") }}</span
                      >
                    </li>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Locate on Map'),
                        }"
                      >
                        Locate on Map
                      </p>
                      <div class="input_block">
                      <leaflet-map
                        id="add-hotel"
                        :latlng="latlng"
                        height="height: 310px;z-index: 1;"
                        @changeAddress="changeAddress"
                      />
                      </div>
                    </li>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Hotel Address'),
                        }"
                      >
                        Hotel Address*
                      </p>
                      <div class="input_block form-group">
                        <input
                          v-validate="'required|min:5|max:650'"
                          type="text"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Hotel Address'),
                          }"
                          placeholder="Please Enter Hotel Address"
                          required
                          name="Hotel Address"
                          v-model="hotelInfo.propertyAddress"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Hotel Address')"
                      >
                        {{ errors.first("Hotel Address") }}</span
                      >
                    </li>
                    <li>
                      <div class="row">
                        <div class="col-md-12">
                          <p :class="{ 'text-danger': errors.first('City') }">
                            City*
                          </p>
                          <!-- <address-input
                            ref="propertyCity"
                            v-validate="'required|min:2|max:40'"
                            type="text"
                            placeholder="Please Enter City"
                            style="color:black"
                            name="City"
                            v-model="hotelInfo.propertyCity"
                            :inputClass="{
                              'form-control': true,
                              'is-invalid': errors.first('City'),
                            }"/> -->
                            <div class="remove-row remove-margin-bottom">
                              <multiselect
                                v-validate="'required'"
                                name="City"
                                label="DESTINATION"
                                placeholder="Type to search"
                                return-obj
                                v-model="hotelInfo.cityInfo"
                                :options="citiesArr"
                                :loading="searchCitiesLoader"
                                :searchable="true"
                                :internal-search="true"
                                :close-on-select="true"
                                :show-no-results="true"
                                :hide-selected="false"
                                :allowEmpty="true"
                                :taggable="false"
                                @search-change="filterFn"
                                @input="changeCity"
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
                          <span
                            class="eb-error-input text-danger"
                            v-if="errors.first('City')"
                          >
                            {{ errors.first("City") }}</span
                          >
                        </div>
                        <div class="col-md-12 pt-4 disabled">
                          <p
                            :class="{ 'text-danger': errors.first('Country') }"
                          >
                            Country*
                          </p>
                          <div class="input_block form-group">
                            <input
                              v-validate="'required|min:2|max:40'"
                              type="text"
                              readonly
                              disabled
                              :class="{
                                'form-control': true,
                                'is-invalid': errors.first('Country'),
                              }"
                              placeholder="Please Enter Country"
                              required
                              name="Country"
                              v-model="hotelInfo.propertyCountry"
                            />
                          </div>
                          <span
                            class="eb-error-input text-danger"
                            v-if="errors.first('Country')"
                          >
                            {{ errors.first("Country") }}</span
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-12">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-md-6">
                              <p
                                :class="{
                                  'text-danger': errors.first('Checking Time'),
                                }"
                              >
                                Checking Time
                              </p>
                              <div class="input_block form-group">
                                <select
                                  :class="{
                                    'form-control': true,
                                    'is-invalid': errors.first('Checking Time'),
                                  }"
                                  v-model="hotelInfo.checkInTime"
                                  required
                                  v-validate="'required'"
                                  name="Checking Time"
                                >
                                  <option
                                    v-for="(item, inx) of hoursArr"
                                    :key="inx"
                                    :value="item"
                                  >
                                    {{ item }}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <p
                                :class="{
                                  'text-danger': errors.first('CheckOut Time'),
                                }"
                              >
                                CheckOut Time
                              </p>
                              <div class="input_block form-group">
                                <select
                                  :class="{
                                    'form-control': true,
                                    'is-invalid': errors.first('CheckOut Time'),
                                  }"
                                  v-model="hotelInfo.checkOutTime"
                                  required
                                  v-validate="'required'"
                                  name="CheckOut Time"
                                >
                                  <option
                                    v-for="(item, inx) of hoursArr"
                                    :key="inx"
                                    :value="item"
                                  >
                                    {{ item }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <p
                            :class="{
                              'text-danger': errors.first('Postal Code'),
                            }"
                          >
                            Postal Code*
                          </p>
                          <div class="input_block form-group">
                            <input
                              v-validate="'required|min:4|max:9'"
                              type="text"
                              :class="{
                                'form-control': true,
                                'is-invalid': errors.first('Postal Code'),
                              }"
                              placeholder="Please Enter Postal Code"
                              required
                              name="Postal Code"
                              v-model="hotelInfo.propertyPostalCode"
                            />
                          </div>
                          <span
                            class="eb-error-input text-danger"
                            v-if="errors.first('Postal Code')"
                          >
                            {{ errors.first("Postal Code") }}</span
                          >
                        </div>
                        <div class="col-md-3">
                          <p :class="{ 'text-danger': errors.first('State') }">
                            State*
                          </p>
                          <div class="input_block form-group">
                            <input
                              v-validate="'required|min:2|max:40'"
                              type="text"
                              :class="{
                                'form-control': true,
                                'is-invalid': errors.first('State'),
                              }"
                              placeholder="Please Enter State"
                              required
                              name="State"
                              v-model="hotelInfo.propertyState"
                            />
                          </div>
                          <span
                            class="eb-error-input text-danger"
                            v-if="errors.first('State')"
                          >
                            {{ errors.first("State") }}</span
                          >
                        </div>
<!--                        <div class="col-md-6">-->
<!--                          <p-->
<!--                            :class="{-->
<!--                              'text-danger': errors.first('Hotel Stating Price'),-->
<!--                            }"-->
<!--                          >-->
<!--                            Hotel Stating Price-->
<!--                          </p>-->
<!--                          <div class="input_block form-group">-->
<!--                            <input-->
<!--                              v-validate="'numeric'"-->
<!--                              type="number"-->
<!--                              :class="{-->
<!--                                'form-control': true,-->
<!--                                'is-invalid': errors.first('Hotel Stating Price'),-->
<!--                              }"-->
<!--                              placeholder="Please Enter Hotel Stating Price"-->
<!--                              name="Hotel Stating Price"-->
<!--                              v-model="hotelInfo.hotelStartingPrice"-->
<!--                            />-->
<!--                          </div>-->
<!--                          <span-->
<!--                            class="eb-error-input text-danger"-->
<!--                            v-if="errors.first('Hotel Stating Price')"-->
<!--                          >-->
<!--                            {{ errors.first("Hotel Stating Price") }}</span-->
<!--                          >-->
<!--                        </div>-->
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Checking Time')"
                      >
                        {{ errors.first("Checking Time") }}</span
                      >
                    </li>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Hotel Description'),
                        }"
                      >
                        Hotel Description*
                      </p>
                      <div class="input_block form-group">
                        <textarea
                          name="Hotel Description"
                          v-validate="'required|min:500'"
                          rows="3"
                           :class="{
                            wysiwyg_edt: true,
                            'is-invalid': errors.first('Hotel Description'),
                          }"
                          placeholder="Please Enter Hotel Description"
                          v-model="hotelInfo.hotelDescription"
                          class="wysiwyg_edt"
                        ></textarea>
                        <!-- <q-editor
                          v-validate="'required|min:500'"
                          toolbar-bg="primary"
                          toolbar-toggle-color="yellow-8"
                          :content-style="{ backgroundColor: '#C0C0C0',color:'#111' }"
                          placeholder="Please Enter Hotel Description"
                          v-model="hotelInfo.hotelDescription"
                          name="Hotel Description"
                          :class="{
                            wysiwyg_edt: true,
                            'is-invalid': errors.first('Hotel Description'),
                          }" min-height="5rem" /> -->
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Hotel Description')"
                      >
                        {{ errors.first("Hotel Description") }}</span
                      >
                    </li>

                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Upload Hotel Images'),
                        }"
                      >
                        Upload Hotel Images*
                      </p>
                      <div class="input_block form-group upload_img_wrap">
                        <input
                          v-if="paramsId"
                          type="file"
                          name="Upload Hotel Images"
                          v-validate="'image'"
                          @change="hotelImgInput"
                          multiple
                        />
                        <input
                          v-else
                          type="file"
                          name="Upload Hotel Images"
                          v-validate="'required|image'"
                          @change="hotelImgInput"
                          multiple
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Upload Hotel Images')"
                      >
                        {{ errors.first("Upload Hotel Images") }}</span
                      >
                    </li>
                    <li>
                      <div class="row" v-if="paramsId && hotelInfo && hotelInfo.attachments && hotelInfo.attachments.images">
                        <div class="col-md-2 pt-2" v-for="(item, index) of hotelInfo.attachments.images" :key="index">
                          <div class="add-hote-room-remove-img-main-div">
                            <i class="fas fa-times" style="color: #FFC30D" @click="deleteImages(item, index)"></i>
                          </div>
                          <q-img :src="item.url" style="height: 160px; max-width: 173px" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="reg_btn_wrap">
              <button
                @click="step1NextClick"
                type="button"
                class="btn btn_right tog_lvl_2"
              >
                Next<i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Proof Details -->
        <div :class="{'registration_form_container': true,'d-none': activeTab !== 2}">
          <h2>Business Proof & Other Information</h2>
          <div class="reg_form_wrap">
            <div class="row">
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p :class="{ 'text-danger': errors.first('GST Number') }">
                        GST Number*
                      </p>
                      <div class="input_block form-group">
                        <input
                          v-model="hotelInfo.commercialDetails.gstNumber"
                          type="text"
                          name="GST Number"
                          v-validate="'required|min:16|max:16'"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('GST Number'),
                          }"
                          placeholder="GST001290348FG"
                          required
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('GST Number')"
                      >
                        {{ errors.first("GST Number") }}</span
                      >
                    </li>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Address Proof Type'),
                        }"
                      >
                        Address Proof Type*
                      </p>
                      <div class="input_block">
                        <select
                          name="Address Proof Type"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Address Proof Type'),
                          }"
                          v-model="hotelInfo.commercialDetails.addressProof"
                        >
                          <option
                            v-for="(item, inx) of addressProofTypeArr"
                            :key="inx"
                            :value="item"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Address Proof Type')"
                      >
                        {{ errors.first("Address Proof Type") }}</span
                      >
                    </li>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first(
                            'Address Proof Scan Copy'
                          ),
                        }"
                      >
                        Address Proof Scan Copy*
                      </p>
                      <a :href="hotelInfo.attachments.officailDocs[0].url"
                         v-if="paramsId && hotelInfo.attachments && hotelInfo.attachments.officailDocs.length > 0 && hotelInfo.attachments.officailDocs[0]"
                         target="_blank">
                        <q-img
                          style="height: 160px; max-width: 173px"
                          height="100"
                          class="pb-3"
                          :src="hotelInfo.attachments.officailDocs[0].url"
                          v-if="paramsId && hotelInfo.attachments && hotelInfo.attachments.officailDocs.length > 0 && hotelInfo.attachments.officailDocs[0]"
                        />
                      </a>
                      <div class="input_block form-group upload_img_wrap">
                        <input
                          v-if="paramsId"
                          v-validate="'image'"
                          type="file"
                          @change="addressProof"
                          name="Address Proof Scan Copy"
                        />
                        <input
                          v-if="!paramsId"
                          v-validate="'required|image'"
                          type="file"
                          @change="addressProof"
                          name="Address Proof Scan Copy"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Address Proof Scan Copy')"
                      >
                        {{ errors.first("Address Proof Scan Copy") }}</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p :class="{ 'text-danger': errors.first('PAN Number') }">
                        PAN Number*
                      </p>
                      <div class="input_block form-group">
                        <input
                          v-model="hotelInfo.commercialDetails.panNumber"
                          type="text"
                          name="PAN Number"
                          v-validate="'required|min:9|max:10'"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('PAN Number'),
                          }"
                          placeholder="EVBPK7799M"
                          required
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('PAN Number')"
                      >
                        {{ errors.first("PAN Number") }}</span
                      >
                    </li>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('PAN Holder Name'),
                        }"
                      >
                        PAN Holder Name*
                      </p>
                      <div class="input_block form-group">
                        <input
                          name="PAN Holder Name"
                          v-model="hotelInfo.commercialDetails.panHolderName"
                          v-validate="'required|min:6|max:40'"
                          type="text"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('PAN Holder Name'),
                          }"
                          placeholder="John Deo Petrink"
                          required
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('PAN Holder Name')"
                      >
                        {{ errors.first("PAN Holder Name") }}</span
                      >
                    </li>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('PAN Card Scan Copy'),
                        }"
                      >
                        PAN Card Scan Copy*
                      </p>
                      <a :href="hotelInfo.attachments.officailDocs[1].url"
                         v-if="paramsId && hotelInfo.attachments && hotelInfo.attachments.officailDocs.length > 1 && hotelInfo.attachments.officailDocs[1]"
                         target="_blank">
                        <q-img
                          style="height: 160px; max-width: 173px"
                          height="100"
                          class="pb-3"
                          :src="hotelInfo.attachments.officailDocs[1].url"
                          v-if="paramsId && hotelInfo.attachments && hotelInfo.attachments.officailDocs.length > 1 && hotelInfo.attachments.officailDocs[1]"
                        />
                      </a>
                      <div class="input_block form-group upload_img_wrap">
                        <input
                          v-if="!paramsId"
                          v-validate="'required|image'"
                          name="PAN Card Scan Copy"
                          type="file"
                          @change="panCardProof"
                        />
                        <input
                          v-if="paramsId"
                          v-validate="'image'"
                          name="PAN Card Scan Copy"
                          type="file"
                          @change="panCardProof"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('PAN Card Scan Copy')"
                      >
                        {{ errors.first("PAN Card Scan Copy") }}</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Select Hotel Amenities'),
                        }"
                      >
                        Select Hotel Amenities*
                      </p>
                      <div class="dash_mul_checkbox_wrap sep_grp_bg_grey">
                        <div class="row">
                          <div
                            class="col-md-3"
                            v-for="(item, HotelAmenitiesIndex) in amenitiesArr"
                            :key="HotelAmenitiesIndex"
                          >
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  v-model="hotelInfo.hotelAmenities"
                                  type="checkbox"
                                  v-validate="'required'"
                                  class="form-check-input"
                                  :name="'Hotel Amenities'"
                                  :value="item.label"
                                />{{ item.label }}
                              </label>
                            </div>
                          </div>
                          <span
                            class="eb-error-input text-danger pl-3 pt-2"
                            style="bottom: 12px!important;"
                            v-if="errors.first('Hotel Amenities')"
                          >
                            {{ errors.first('Hotel Amenities') }}</span
                          >
                          <div class="col-md-12">
                            <div class="input_block form-group">
                              <p :class="{ 'text-danger': errors.first('Amenitie') }">Amenitie</p>
                                <b-input-group class="mb-3" style="width: 50%" size="sm">
                                  <b-form-input
                                    :name="'Amenitie'"
                                    v-validate="'required'"
                                    v-model="addNewHotelAmenitieValue"
                                    type="text"
                                    :class="{
                                      'form-control': true,
                                      'is-invalid': errors.first('Amenitie') ,
                                    }"
                                  placeholder="Please Enter Amenitie"
                                  ></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="info"  @click="addNewHotelAmenities">Add More</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                            <span
                              class="eb-error-input text-danger"
                              style="bottom: 12px!important;"
                              v-if="errors.first('Amenitie')"
                            >
                              {{ errors.first('Amenitie') }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <p
                        :class="{
                          'text-danger': errors.first('Select Hotel Language'),
                        }"
                      >
                        Select Hotel Language
                      </p>
                      <div class="dash_mul_checkbox_wrap sep_grp_bg_grey">
                        <div class="row">
                          <div
                            class="col-md-2"
                            v-for="(item, index) of languageArr"
                            :key="index"
                          >
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  v-model="hotelInfo.language"
                                  type="checkbox"
                                  class="form-check-input"
                                  :value="item"
                                />{{ item }}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <p :class="{ 'text-danger': errors.first('Policies') }">
                        Policies*
                      </p>
                      <div class="input_block form-group">
                        <textarea
                          name="Policies"
                          v-validate="'required|min:500'"
                          placeholder="Please Enter Hotel Policies"
                          rows="3"
                          :class="{
                            wysiwyg_edt: true,
                            'is-invalid': errors.first('Policies'),
                          }"
                          v-model="hotelInfo.policies"
                          class="wysiwyg_edt"
                        ></textarea>
                        <!-- <q-editor
                          v-validate="'required|min:500'"
                          toolbar-bg="primary"
                          toolbar-toggle-color="yellow-8"
                          :content-style="{ backgroundColor: '#C0C0C0',color:'#111' }"
                          placeholder="Please Enter Hotel Policies"
                          v-model="hotelInfo.policies"
                          name="Policies"
                          :class="{
                            wysiwyg_edt: true,
                            'is-invalid': errors.first('Policies'),
                          }" min-height="5rem" /> -->
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Policies')"
                      >
                        {{ errors.first("Policies") }}</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="reg_btn_wrap">
              <button
                @click="changeStep(1)"
                type="button"
                class="btn btn_left tog_lvl_back_1"
              >
                <i class="fas fa-chevron-left"></i>Back
              </button>
              <button
                @click="step2NextClick"
                type="button"
                class="btn btn_right tog_lvl_3"
              >
                Next<i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Room Details -->
        <div :class="{'registration_form_container': true,'d-none': activeTab !== 3}">
          <h2>Room Details</h2>
          <div class="reg_form_wrap">
            <div
              class="row"
              v-for="(room, index) of hotelInfo.propertyRooms"
              :key="index"
            >
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p :class="{ 'text-danger': errors.first('Room Type' + index) }">Room Type*</p>
                      <div class="input_block">
                        <select v-validate="'required'" :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Room Type' + index),
                          }" :name="'Room Type' + index" v-model="room.roomType">
                          <option
                            v-for="(item, inx) of roomTypeArr"
                            :key="inx"
                            :value="item"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Room Type' + index)"
                      >
                        {{ errors.first('Room Type' + index) }}</span
                      >
                    </li>
                    <li>
                      <div class="row">
                        <div class="col-md-8">
                          <p :class="{ 'text-danger': errors.first('Room Size' + index) }">Room Size*</p>
                          <div class="input_block form-group">
                            <input
                              :name="'Room Size' + index"
                              v-validate="'required'"
                              v-model="room.roomSize"
                              type="text"
                              :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Room Size' + index),
                          }"
                              placeholder="Please Enter Room Size"
                            />
                          </div>
                          <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Room Size' + index)"
                      >
                        {{ errors.first('Room Size' + index) }}</span
                      >
                        </div>
                        <div class="col-md-4">
                          <p>Measure Type</p>
                          <div class="input_block">
                            <select
                              v-validate="'required'"
                              :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Measure Type' + index),
                          }"
                              v-model="room.measureType"
                              :name="'Measure Type' + index"
                            >
                              <option
                                v-for="(item, inx) of measureTypeArr"
                                :key="inx"
                                :value="item"
                              >
                                {{ item }}
                              </option>
                            </select>
                          </div>
                          <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Measure Type' + index)"
                      >
                        {{ errors.first('Measure Type' + index) }}</span
                      >
                        </div>
                      </div>
                    </li>
                    <li>
                      <p :class="{ 'text-danger': errors.first('Max Number of Guests' + index) }">Max Number of Guests*</p>
                      <div class="input_block">
                        <select
                          v-validate="'required'"
                          :name="'Max Number of Guests' + index"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Max Number of Guests' + index),
                          }"
                          v-model="room.numberOfBeds"
                        >
                          <option
                            v-for="(item, inx) of [1, 2, 3, 4, 5, 6]"
                            :key="inx"
                            :value="item"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Max Number of Guests' + index)"
                      >
                        {{ errors.first('Max Number of Guests' + index) }}</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p :class="{ 'text-danger': errors.first('Bed Type' + index) }">Bed Type*</p>
                      <div class="input_block">
                        <select :name="'Bed Type' + index" v-validate="'required'" :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Bed Type' + index),
                          }" v-model="room.bedType">
                          <option
                            v-for="(item, inx) of bedTypeArr"
                            :key="inx"
                            :value="item"
                          >
                            {{ item }}
                          </option>
                        </select>
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Bed Type' + index)"
                      >
                        {{ errors.first('Bed Type' + index) }}</span
                      >
                    </li>
                    <li>
                      <div class="row">
                        <div class="col-md-6">
                          <p :class="{ 'text-danger': errors.first('Price per Night' + index) }">Price per Night*</p>
                          <div class="input_block form-group">
                            <input
                              v-validate="'required|numeric'"
                              :name="'Price per Night' + index"
                              :class="{
                                'form-control': true,
                                'is-invalid': errors.first('Price per Night' + index),
                              }"
                              placeholder="Enter Price per Night"
                              v-model="room.price"
                            />
                          </div>
                          <span
                            class="eb-error-input text-danger"
                            v-if="errors.first('Price per Night' + index)"
                          >
                            {{ errors.first('Price per Night' + index) }}</span
                          >
                        </div>
                        <div class="col-md-6">
                          <p :class="{ 'text-danger': errors.first('Currency' + index) }">Currency*</p>
                            <div class="input_block">
                              <select :name="'Bed Type' + index" v-validate="'required'" :class="{
                                  'form-control': true,
                                  'is-invalid': errors.first('Bed Type' + index),
                                }" v-model="room.currency">
                                <option
                                  v-for="(item, inx) of currencyArr"
                                  :key="inx"
                                  :value="item"
                                >
                                  {{ item }}
                                </option>
                              </select>
                            </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Bed Type' + index)"
                      >
                        {{ errors.first('Bed Type' + index) }}</span
                      >
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="row">
                        <div class="col-md-6">
                          <p :class="{ 'text-danger': errors.first('Number of same rooms' + index) }">Number of same kind rooms*</p>
                          <div class="input_block form-group">
                            <input
                              v-validate="'required|max:6'"
                              :name="'Number of same rooms' + index"
                              type="number"
                              :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Number of same rooms' + index),
                          }"
                              placeholder="Number of same rooms"
                              v-model="room.totalRoom"
                            />
                          </div>
                          <span
                            class="eb-error-input text-danger"
                            v-if="errors.first('Number of same rooms' + index)"
                          >
                        {{ errors.first('Number of same rooms' + index) }}</span
                          >
                        </div>
                        <div class="col-md-6">
                          <p :class="{ 'text-danger': errors.first('Inclusions' + index) }">Inclusions*</p>
                          <div class="input_block">
                            <select :name="'Inclusions' + index" v-validate="'required'" :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Inclusions' + index),
                          }" class="form-control" v-model="room.inclusions">
                              <option
                                v-for="(item, inx) of inclusionsArr"
                                :key="inx"
                                :value="item"
                              >
                                {{ item }}
                              </option>
                            </select>
                          </div>
                          <span
                            class="eb-error-input text-danger"
                            v-if="errors.first('Inclusions' + index)"
                          >
                        {{ errors.first('Inclusions' + index) }}</span
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-12">
                <ul>
                  <li>
<!--                    <div class="col-md-12">-->
<!--                      <p>Cancellation Policy</p>-->
<!--                    </div>-->
                    <div class="row">
                      <div class="col-md-8">
                        <p :class="{ 'text-danger': errors.first('Default Cancellation Charges' + index), 'mb-1': true }">Default Cancellation Charges (%)*</p>
                        <div class="input_block">
                          <input
                            v-validate="'required|numeric|max_value:100'"
                            :name="'Default Cancellation Charges' + index"
                            type="number"
                            :class="{
                                'form-control': true,
                                'is-invalid': errors.first('Default Cancellation Charges' + index),
                              }"
                            placeholder="Default Cancellation Charges"
                            v-model="room.cancelPolicy"
                          />
                        </div>
                        <span
                          class="eb-error-input text-danger"
                          v-if="errors.first('Default Cancellation Charges' + index)"
                        >
                          {{ errors.first('Default Cancellation Charges' + index) }}</span
                        >
                      </div>
                      <div class="col-md-4 mt-4">
                        <button
                          type="button"
                          @click="addCancellationPolicy(index)"
                          class="btn add_room_type"
                        >
                          <i class="fas fa-plus"></i> Add Cancellation Policy
                        </button>
                      </div>
                    </div>
                    <div class="row pt-3" v-for="(policy, policyIndex) of room.policys" :key="policyIndex">
                      <div class="col-md-5">
                        <div class="input_block">
                          <p :class="{ 'text-danger': errors.first('Day' + policyIndex), 'mb-1': true }">Duration*</p>
                          <b-input-group size="md" append="Day">
                            <b-form-input
                              v-validate="'required|numeric|max_value:200'"
                              :name="'Duration' + policyIndex"
                              type="number"
                              :class="{
                                'form-control': true,
                                'is-invalid': errors.first('Duration' + policyIndex),
                              }"
                              placeholder="Duration"
                              v-model="policy.duration"
                            />
                          </b-input-group>
                            <span
                              class="eb-error-input text-danger"
                              v-if="errors.first('Duration' + policyIndex)"
                            >
                            {{ errors.first('Duration' + policyIndex) }}</span
                            >
                          </div>
                      </div>
                      <div class="col-md-4">
                        <div class="input_block">
                          <p :class="{ 'text-danger': errors.first('Charges' + policyIndex), 'mb-1': true }">Charges (%)*</p>
                          <input
                            v-validate="'required|numeric|max_value:100'"
                            :name="'Charges' + policyIndex"
                            type="number"
                            :class="{
                                'form-control': true,
                                'is-invalid': errors.first('Charges' + policyIndex),
                              }"
                            placeholder="Charges"
                            v-model="policy.charges"
                          />
                          <span
                            class="eb-error-input text-danger"
                            v-if="errors.first('Charges' + policyIndex)"
                          >
                            {{ errors.first('Charges' + policyIndex) }}</span
                          >
                        </div>
                      </div>
                      <div class="col-md-2 text-center mt-4">
                        <button
                          type="button"
                          @click="removeCancellationPolicy(index, policyIndex)"
                          class="btn add_room_type"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="col-sm-12">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p :class="{ 'text-danger': errors.first('Select Room Amenities') }">Select Room Amenities*</p>
                      <div class="dash_mul_checkbox_wrap sep_grp_bg_grey">
                        <div class="row">
                          <div
                            class="col-md-3"
                            v-for="(item, inx) of roomAmenitiesArr"
                            :key="inx"
                          >
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  v-model="room.roomAmentiies"
                                  type="checkbox"
                                  class="form-check-input"
                                  :value="item"
                                />{{ item }}
                              </label>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="input_block form-group">
                              <p :class="{ 'text-danger': errors.first('Room Amenitie'+ index) }">Amenitie</p>
                                <b-input-group class="mb-3" style="width: 50%" size="sm">
                                  <b-form-input
                                    :name="'Room Amenitie'+ index"
                                    v-validate="'required'"
                                    v-model="addNewRoomAmenitieValue"
                                    type="text"
                                    :class="{
                                      'form-control': true,
                                      'is-invalid': errors.first('Room Amenitie'+ index) ,
                                    }"
                                  placeholder="Please Enter Amenitie"
                                  ></b-form-input>
                                  <b-input-group-append>
                                    <b-button variant="info"  @click="addNewRoomAmenities(index)">Add More</b-button>
                                  </b-input-group-append>
                                </b-input-group>
                              </div>
                              <span
                            class="eb-error-input text-danger"
                            style="bottom: 12px!important;"
                            v-if="errors.first('Room Amenitie'+ index)"
                          >
                            {{ errors.first('Room Amenitie'+ index) }}</span
                          >
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p :class="{ 'text-danger': errors.first('Cancellation Policy Details' + index) }">Cancellation Policy Details*</p>
                      <div class="input_block form-group">
                        <textarea
                          :name="'Cancellation Policy Details' + index"
                          v-validate="'required|min:500'"
                          placeholder="Please Enter Cancellation Policy Details"
                          rows="3"
                          :class="{
                            'wysiwyg_edt': true,
                            'is-invalid': errors.first('Cancellation Policy Details' + index),
                          }"
                          v-model="room.cancelPolicyDetails"
                          class="wysiwyg_edt"
                        ></textarea>
                        <!-- <q-editor
                          v-validate="'required'"
                          toolbar-bg="primary"
                          toolbar-toggle-color="yellow-8"
                          :content-style="{ backgroundColor: '#C0C0C0',color:'#111' }"
                          placeholder="Please Enter Cancellation Policy Details"
                          v-model="room.cancelPolicyDetails"
                          :name="'Cancellation Policy Details' + index"
                          :class="{
                            'wysiwyg_edt': true,
                            'is-invalid': errors.first('Cancellation Policy Details' + index),
                          }" min-height="5rem" /> -->
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Cancellation Policy Details' + index)"
                      >
                        {{ errors.first('Cancellation Policy Details' + index) }}</span
                      >
                    </li>
                    <li>
                      <p :class="{ 'text-danger': errors.first('Room Description' + index) }">Room Description*</p>
                      <div class="input_block form-group">
                        <textarea
                          :name="'Room Description' + index"
                          v-validate="'required|min:250'"
                          placeholder="Please Enter Room Description"
                          rows="3"
                           :class="{
                            'wysiwyg_edt': true,
                            'is-invalid': errors.first('Room Description' + index),
                          }"
                          v-model="room.roomDescription"
                          class="wysiwyg_edt"
                        ></textarea>
                        <!-- <q-editor
                          v-validate="'required|min:250'"
                          toolbar-bg="primary"
                          toolbar-toggle-color="yellow-8"
                          :content-style="{ backgroundColor: '#C0C0C0',color:'#111' }"
                          placeholder="Please Enter Room Description"
                          v-model="room.roomDescription"
                          :name="'Room Description' + index"
                          :class="{
                            'wysiwyg_edt': true,
                            'is-invalid': errors.first('Room Description' + index),
                          }" min-height="5rem" /> -->
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Room Description' + index)"
                      >
                        {{ errors.first('Room Description' + index) }}</span
                      >
                    </li>
                    <li>
                      <p :class="{ 'text-danger': errors.first('Upload Room Images' + index) }">Upload Room Images*</p>
                      <div class="input_block form-group upload_img_wrap">
                        <input
                          v-if="paramsId"
                          type="file"
                          multiple
                          v-validate="'image'"
                          :name="'Upload Room Images' + index"
                          @change="actionHotelImage($event, index)"
                        />
                        <input
                          v-if="!paramsId"
                          type="file"
                          multiple
                          v-validate="'required|image'"
                          :name="'Upload Room Images' + index"
                          @change="actionHotelImage($event, index)"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Upload Room Images' + index)"
                      >
                        {{ errors.first('Upload Room Images' + index) }}</span
                      >
                    </li>
                    <li>
                      <div class="row" v-if="paramsId && room.imageFiles">
                        <div class="col-md-2 pt-2" v-for="(imgObj, imgIndex) of room.imageFiles" :key="imgIndex">
                          <div class="add-hote-room-remove-img-main-div">
                            <i class="fas fa-times" style="color: #FFC30D" @click="deleteRoomImages(imgIndex, index)"></i>
                          </div>
                          <q-img :src="imgObj.url" style="height: 160px; max-width: 173px" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="col-sm-12"
                v-if="index != hotelInfo.propertyRooms.length - 1"
              >
                <div class="newline-hotel-register" />
                <i
                  class="fa fa-trash mb-2 float-right cursor-pointer"
                  @click="deleteRoom(index + 1)"
                  title="Delete This Room"
                />
              </div>
            </div>
            <div class="add_room_type_container">
              <button
                type="button"
                @click="addMoreRoom"
                class="btn add_room_type"
              >
                <i class="fas fa-plus"></i> Add Room Type
              </button>
            </div>
            <div class="reg_btn_wrap">
              <button
                type="button"
                @click="changeStep(2)"
                class="btn btn_left tog_lvl_back_2"
              >
                <i class="fas fa-chevron-left"></i>Back
              </button>
              <button
                @click="step3NextClick"
                type="button"
                class="btn btn_right tog_lvl_4"
              >
                Next<i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Finalize Bank Details -->
        <div :class="{'registration_form_container': true,'d-none': activeTab !== 4}">
          <h2>Bank Account Details</h2>
          <div class="reg_form_wrap">
            <div class="row">
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p  :class="{ 'text-danger': errors.first('Account Holder Name') }">Account Holder Name*</p>
                      <div class="input_block form-group">
                        <input
                          v-model="hotelInfo.accountDetails.bankAccountOwner"
                          v-validate="'required|min:6|max:50'"
                          type="text"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Account Holder Name'),
                          }"
                          placeholder="Please Enter Account Holder Name"
                          required
                          name="Account Holder Name"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Account Holder Name')"
                      >
                        {{ errors.first("Account Holder Name") }}</span
                      >
                    </li>
                    <li>
                      <p  :class="{ 'text-danger': errors.first('Bank Name') }">Bank Name*</p>
                      <div class="input_block form-group">
                        <input
                          v-model="hotelInfo.accountDetails.bankName"
                          type="text"
                          v-validate="'required|min:3|max:20'"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Bank Name'),
                          }"
                          placeholder="Please Enter Bank Name"
                          required
                          name="Bank Name"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Bank Name')"
                      >
                        {{ errors.first("Bank Name") }}</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-6">
                <div class="dash_inut_group_container">
                  <ul>
                    <li>
                      <p  :class="{ 'text-danger': errors.first('Bank Account Number') }">Bank Account Number*</p>
                      <div class="input_block form-group">
                        <input
                         v-validate="'required|min:6|max:40'"
                          v-model="hotelInfo.accountDetails.bankAccountNumber"
                          type="text"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('Bank Account Number'),
                          }"
                          placeholder="Please Enter Bank Account Number"
                          required
                          name="Bank Account Number"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('Bank Account Number')"
                      >
                        {{ errors.first("Bank Account Number") }}</span
                      >
                    </li>
                    <li>
                      <p  :class="{ 'text-danger': errors.first('IFSC Number') }">IFSC Number*</p>
                      <div class="input_block form-group">
                        <input
                          v-validate="'required|min:6|max:25'"
                          v-model="hotelInfo.accountDetails.IFSCNumber"
                          type="text"
                          :class="{
                            'form-control': true,
                            'is-invalid': errors.first('IFSC Number'),
                          }"
                          placeholder="Please Enter IFSC Number"
                          required
                          name="IFSC Number"
                        />
                      </div>
                      <span
                        class="eb-error-input text-danger"
                        v-if="errors.first('IFSC Number')"
                      >
                        {{ errors.first("IFSC Number") }}</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="reg_btn_wrap">
              <button
                @click="changeStep(3)"
                type="button"
                class="btn btn_left tog_lvl_back_3"
              >
                <i class="fas fa-chevron-left"></i>Back
              </button>
              <button
                type="button"
                @click="saveData"
                :class="{ disabled: showLoader, 'btn btn_right': true }"
              >
                Submit
              </button>
              <b-spinner
                v-if="showLoader"
                style="position: relative; float: right; top: 20px"
                label="Spinning"
              ></b-spinner>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  languageArr,
  propertyTypeArr,
  starRatingArr,
  addressProofTypeArr,
  roomAmenitiesArr,
  bedTypeArr,
  hotalModel,
  cancellationPolicyObj,
  roomTypeArr,
  measureTypeArr,
  inclusionsArr,
  propertyRooms,
  contactPersonRoleArr,
  firstStepValidator,
  secondStepValidator,
  thirdStepValidator,
  hotelRoomValidator,
  hoursArr,
  policyDuration,
  currencyArr
} from './config'
import { amenitiesArr } from '../../../db/common/amenitiesWithIcon'
import {
  USER_ADD_HOTEL,
  HOTEL_IMG_UPLOAD_GET_ID_KEY,
  AUTH_LOGIN,
  ADMIN_FETCH_HOTEL_BY_ID,
  USER_UPDATE_HOTEL,
  ADMIN_FETCH_HOTEL_USER,
  USER_SEARCH_CITIES
} from '../../../services/ENDPOINT'
import Multiselect from 'vue-multiselect'
import LeafletMap from '../../../components/common/LeafletMap'
import $ from 'jquery'
const tempHotelSignUpInfo = 'tempHotelSignUpInfo'
import Axios from 'axios'
export default {
  name: 'HotelRegister',
  components: {
    Multiselect,
    LeafletMap
  },
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      hoursArr,
      languageArr,
      propertyTypeArr,
      starRatingArr,
      amenitiesArr,
      addressProofTypeArr,
      roomAmenitiesArr,
      bedTypeArr,
      roomTypeArr,
      cancellationPolicyObj,
      measureTypeArr,
      propertyRooms,
      inclusionsArr,
      contactPersonRoleArr,
      firstStepValidator,
      secondStepValidator,
      thirdStepValidator,
      hotelRoomValidator,
      currencyArr,
      showLoader: false,
      hotelInfo: this._.cloneDeep(hotalModel),
      activeTab: 1,
      latlng: [23.0208241, 72.50863950000002],
      hotelSignUpInfo: JSON.parse(localStorage.getItem(tempHotelSignUpInfo)),
      paramsId: null,
      hotelerList: [],
      contactPersonPhone: '',
      policyDuration,
      addNewHotelAmenitieValue: '',
      addNewRoomAmenitieValue: '',
      phoneNumberValid: false,
      selectDestination: null,
      citiesArr: [],
      searchCitiesLoader: false
    }
  },
  computed: {
    activeProgressBar () {
      let style = ''
      if (this.activeTab === 1) style = 'width:0%'
      if (this.activeTab === 2) style = 'width:33.33%'
      if (this.activeTab === 3) style = 'width:66.66%'
      if (this.activeTab === 4) style = 'width:100%'
      return style
    },
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    })
  },
  mounted () {
    this.paramsId = this.$route.params.id
    if (this.paramsId) {
      this.getHotelsById()
    } else {
      if (this.loggedIn) {
        this.hotelInfo.contactPersonName = this.userInfo?.contactName
        this.hotelInfo.propertyName = this.userInfo?.hotelName
        this.hotelInfo.contactPersonPhone = this.userInfo?.phone
        this.hotelInfo.contactPersonEmail = this.userInfo?.email
        this.hotelInfo.bookingEmail = this.userInfo?.email
        this.hotelInfo.bookingPhone = this.userInfo?.phone
      } else {
        this.hotelInfo.contactPersonName = this.hotelSignUpInfo?.contactName
        this.hotelInfo.propertyName = this.hotelSignUpInfo?.hotelName
        this.hotelInfo.contactPersonPhone = this.hotelSignUpInfo?.phone
        this.hotelInfo.contactPersonEmail = this.hotelSignUpInfo?.email
        this.hotelInfo.bookingEmail = this.hotelSignUpInfo?.email
        this.hotelInfo.bookingPhone = this.hotelSignUpInfo?.phone
      }
      this.$validator.reset()
      this.hotelInfo.propertyRooms.push(this._.cloneDeep(propertyRooms))
      this.hotelInfo.propertyRooms[0].policys = []
      this.hotelInfo.propertyRooms[0].policys.push(this._.cloneDeep(this.cancellationPolicyObj))
    }

    if (this.loggedInUserType === 'ADMIN') {
      this.getHotelerUser()
    }
    // if (this.loggedIn === false || this.loggedInUserType === 'CUSTOMER') {
    //   this.$router.push({ name: 'Unauthorized' })
    // }
    if (this.hotelSignUpInfo && (!this.hotelSignUpInfo.email || this.loggedInUserType === 'CUSTOMER')) {
      this.$router.push({ name: 'Unauthorized' })
    }
  },
  methods: {
    changeCity (v) {
      if (v) {
        this.hotelInfo.propertyCity = v.DESTINATION
        this.hotelInfo.propertyCountry = v.COUNTRY
      }
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
    deleteImages (item, index) {
      const title = 'Confirmation!'
      const msg = 'Are you sure, you want to Delete This Image?'
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          this.hotelInfo.attachments.images.splice(index, 1)
          const payload = {
            propertyId: this.paramsId,
            id: this.hotelInfo._id,
            attachments: {
              images: this.hotelInfo.attachments.images
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
    addNewHotelAmenities () {
      this.$validator.validateAll(['Amenitie']).then((isValid) => {
        if (isValid) {
          this.amenitiesArr.push({ label: this.addNewHotelAmenitieValue })
          this.hotelInfo.hotelAmenities.push(this.addNewHotelAmenitieValue)
          this.addNewHotelAmenitieValue = ''
          this.$validator.reset(['Amenitie'])
        }
      })
    },
    addNewRoomAmenities (index) {
      this.$validator.validateAll(['Room Amenitie' + index]).then((isValid) => {
        if (isValid) {
          this.roomAmenitiesArr.push(this.addNewRoomAmenitieValue)
          this.addNewRoomAmenitieValue = ''
          this.$validator.reset(['Room Amenitie' + index])
        }
      })
    },
    addCancellationPolicy (index) {
      const room = this.hotelInfo.propertyRooms[index]
      if (!room.policys) {
        room.policys = []
      }
      room.policys.push(this._.cloneDeep(this.cancellationPolicyObj))
      this.$set(this.hotelInfo.propertyRooms, index, room)
    },
    removeCancellationPolicy (roomIndex, policyIndex) {
      const room = this.hotelInfo.propertyRooms[roomIndex]
      room.policys.splice(policyIndex)
      this.$set(this.hotelInfo.propertyRooms, roomIndex, room)
    },
    async getHotelerUser () {
      try {
        this.$root.$loader(true)
        const result = await ADMIN_FETCH_HOTEL_USER()
        this.hotelerList = result.hotelSignUps
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
        this.$root.$loader(true)
        const payload = {
          propertyId: this.paramsId,
          toDate: '',
          fromDate: ''
        }
        const result = await ADMIN_FETCH_HOTEL_BY_ID(payload)
        if (result.hotelData) {
          // this.hotelInfo = this._.cloneDeep(result.hotelDat)
          const data = this._.cloneDeep(result.hotelData.hotel)
          data.accountDetails = result.hotelData.accountDetails.length > 0 ? result.hotelData.accountDetails[0] : {}
          data.commercialDetails = result.hotelData.commercialDetails.length > 0 ? result.hotelData.commercialDetails[0] : {}
          data.investmentDetails = result.hotelData.investmentDetails.length > 0 ? result.hotelData.investmentDetails[0] : {}

          if (data.accountDetails && data.accountDetails._id) {
            data.accountDetails.id = data.accountDetails._id
          }
          if (data.commercialDetails && data.commercialDetails._id) {
            data.commercialDetails.id = data.commercialDetails._id
          }
          if (data.investmentDetails && data.investmentDetails._id) {
            data.investmentDetails.id = data.investmentDetails._id
          }
          for (const i in data.attachments) {
            data.attachments[i].forEach((d, index) => {
              if (!d) data.attachments[i].splice(index, 1)
            })
          }
          this.hotelInfo.propertyRooms.filter(i => {
            if (i.policys) {
              console.log('a')
            } else {
              i.policys = []
            }
          })
          this.hotelInfo = this._.cloneDeep(data)
          const hotelAmenities = this.hotelInfo.hotelAmenities
          hotelAmenities.filter(i => {
            if (!this.amenitiesArr.some(p => p.label === i)) {
              this.amenitiesArr.push({ label: i })
            }
          })
          this.hotelInfo.propertyRooms.filter(iterator => {
            iterator.roomAmentiies.filter(i => {
              if (!this.roomAmenitiesArr.some(p => p === i)) {
                this.roomAmenitiesArr.push(i)
              }
            })
          })
          console.log(this.hotelInfo.propertyRooms)
          this.$refs.propertyCity.value = this.hotelInfo.propertyCity
          this.contactPersonPhone = this.hotelInfo.contactPersonPhone
        }
      } catch (err) {
        if (err) {
          // this.$notify({
          //   group: 'eb-notification',
          //   title: 'Oops',
          //   text: 'Something Went Wrong Please Try Again',
          //   type: 'error',
          //   duration: 5000
          // })
        }
      } finally {
        this.$root.$loader(false)
      }
    },
    updateContactPersonPhone (v) {
      if (v.formatInternational) {
        this.phoneNumberValid = v.isValid
        this.hotelInfo.contactPersonPhone = v.formatInternational
      }
    },
    changeAddress (v) {
      this.hotelInfo.propertyAddress = v.address.LongLabel
      this.hotelInfo.propertyCity = v.address.City
      // this.$refs.propertyCity.value = v.address.City
      // this.hotelInfo.propertyCountry = v.address.CountryCode
      this.hotelInfo.propertyState = v.address.Region
      this.hotelInfo.propertyPostalCode = v.address.Postal
      this.hotelInfo.locationId.lat = v.latlng.lat
      this.hotelInfo.locationId.lng = v.latlng.lng
    },
    clickMarkers (test) {
      console.log(test)
    },
    deleteRoomImages (imgIndex, roomIndex) {
      const title = 'Confirmation!'
      const msg = 'Are you sure, you want to Delete This Image?'
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          this.hotelInfo.propertyRooms[roomIndex].imageFiles.splice(imgIndex, 1)
        })
    },
    async actionHotelImage (event, index) {
      this.$validator.validateAll(['Upload Room Images' + index]).then(async (isValid) => {
        if (isValid) {
          const file = event.target.files
          const imgId = []
          for (const i of file) {
            try {
              const result = await HOTEL_IMG_UPLOAD_GET_ID_KEY()
              imgId.push({ url: result.S3GetURL + result.key })
              try {
                await Axios.put(result.url, i, {
                  headers: {
                    'Content-Type': 'image/jpeg'
                  }
                })
              } catch (err) {
                console.log(err)
              }
            } catch (err) {
              console.log(err)
            }
          }
          if (this.paramsId) {
            this.hotelInfo.propertyRooms[index].imageFiles.push(...imgId)
          } else {
            this.hotelInfo.propertyRooms[index].imageFiles = imgId
          }
        }
      })
    },
    changeContactPersonEmail () {
      if (!this.paramsId) {
        const data = this.hotelerList.find(i => i.email === this.hotelInfo.contactPersonEmail)
        this.hotelInfo.contactPersonName = data?.contactName
        this.hotelInfo.propertyName = data?.hotelName
        this.hotelInfo.contactPersonPhone = data?.phone
        this.hotelInfo.contactPersonEmail = data?.email
        this.hotelInfo.bookingEmail = data?.email
        this.hotelInfo.bookingPhone = data?.phone
      }
    },
    deleteRoom (index) {
      const title = 'Confirmation!'
      const msg = `Are you sure, you want to Delete ${'this'} Room?`
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          this.hotelInfo.propertyRooms.splice(index, 1)
        })
    },
    addMoreRoom () {
      this.hotelInfo.propertyRooms.push(this._.cloneDeep(propertyRooms))
    },
    changeStep (activeTab) {
      this.activeTab = activeTab
    },
    step1NextClick () {
      this.$validator.validateAll(firstStepValidator).then((isValid) => {
        if (isValid && this.phoneNumberValid) {
          this.activeTab = 2
          $('html, body').animate({ scrollTop: 0 }, 'slow')
        }
      })
    },
    step2NextClick () {
      console.log(this.hotelInfo)
      this.$validator.validateAll(secondStepValidator).then((isValid) => {
        if (isValid) {
          this.activeTab = 3
          $('html, body').animate({ scrollTop: 0 }, 'slow')
        }
      })
    },
    step3NextClick () {
      console.log(this.hotelInfo.propertyRooms)
      const validateArr = []
      for (const i in this.hotelInfo.propertyRooms) {
        hotelRoomValidator.forEach((hotel) => {
          validateArr.push(hotel + i)
        })
      }
      this.$validator.validateAll(validateArr).then((isValid) => {
        if (isValid) {
          this.activeTab = 4
          $('html, body').animate({ scrollTop: 0 }, 'slow')
        }
      })
    },
    async hotelImgInput (event) {
      this.$validator.validateAll(['Upload Hotel Images']).then(async (isValid) => {
        if (isValid) {
          const file = event.target.files
          const imgId = []
          for (const i of file) {
            try {
              const imageToSend = i
              const result = await HOTEL_IMG_UPLOAD_GET_ID_KEY()
              imgId.push({ url: result.S3GetURL + result.key })
              try {
                await Axios.put(result.url, imageToSend, {
                  headers: {
                    'Content-Type': 'image/jpeg'
                  }
                })
              } catch (err) {
                console.log(err)
              }
            } catch (err) {
              console.log(err)
            }
          }
          if (this.paramsId) {
            this.hotelInfo.attachments.images.push(...imgId)
          } else {
            this.hotelInfo.attachments.images = imgId
          }
        }
      })
    },
    async addressProof (event) {
      this.$validator.validateAll(['Address Proof Scan Copy']).then(async (isValid) => {
        if (isValid) {
          const file = event.target.files
          let imgId = {}
          for (const i of file) {
            try {
              const result = await HOTEL_IMG_UPLOAD_GET_ID_KEY()
              imgId = result.S3GetURL + result.key
              try {
                await Axios.put(result.url, i, {
                  headers: {
                    'Content-Type': 'image/jpeg'
                  }
                })
              } catch (err) {
                console.log(err)
              }
            } catch (err) {
              console.log(err)
            }
          }
          if (this.paramsId) {
            this.hotelInfo.attachments.officailDocs[0] = { url: imgId }
          } else {
            this.hotelInfo.attachments.officailDocs.push({ url: imgId })
          }
        }
      })
    },
    async panCardProof (event) {
      this.$validator.validateAll(['PAN Card Scan Copy']).then(async (isValid) => {
        if (isValid) {
          const file = event.target.files
          let imgId = {}
          for (const i of file) {
            try {
              const result = await HOTEL_IMG_UPLOAD_GET_ID_KEY()
              imgId = result.S3GetURL + result.key
              try {
                await Axios.put(result.url, i, {
                  headers: {
                    'Content-Type': 'image/jpeg'
                  }
                })
              } catch (err) {
                console.log(err)
              }
            } catch (err) {
              console.log(err)
            }
          }
          if (this.paramsId) {
            this.hotelInfo.attachments.officailDocs[1] = { url: imgId }
          } else {
            this.hotelInfo.attachments.officailDocs.push({ url: imgId })
          }
        }
      })
    },
    async saveData () {
      this.$validator.validateAll(thirdStepValidator).then(async (isValid) => {
        if (isValid) {
          if (this.paramsId) {
            const payload = this._.cloneDeep(this.hotelInfo)
            // delete payload.commercialDetails
            // delete payload.accountDetails
            // delete payload.assetDetails
            // delete payload.attachments
            // delete payload.investmentDetails
            payload.propertyId = String(this.paramsId)
            try {
              this.$root.$loader(true)
              this.showLoader = true
              await USER_UPDATE_HOTEL(payload)
              this.$notify({
                group: 'eb-notification',
                title: 'SUCCESS! ',
                text: 'Hotel Update Successfuly',
                type: 'success',
                duration: 7000
              })
              if (this.loggedInUserType === 'ADMIN') {
                this.$router.push({ name: 'ADMIN_PROPERTIES' })
              } else if (this.loggedIn === false && this.hotelSignUpInfo) {
                this.login()
              } else {
                this.$router.push({ name: 'AGENT_PROPERTIES' })
              }
            } catch (err) {
              this.$notify({
                group: 'eb-notification',
                title: err.message.errors[0].kind ?? 'Oops',
                text: err.message.errors[0].message ?? 'Something Went Worng',
                type: 'error',
                duration: 5000
              })
            } finally {
              this.$root.$loader(false)
              this.showLoader = false
            }
          } else {
            this.hotelInfo.propertyId = new Date().valueOf()
            try {
              this.$root.$loader(true)
              this.showLoader = true
              await USER_ADD_HOTEL(this.hotelInfo)
              this.$notify({
                group: 'eb-notification',
                title: 'SUCCESS! ',
                text: 'Hotel Added Successfuly',
                type: 'success',
                duration: 7000
              })
              if (this.loggedInUserType === 'ADMIN') {
                this.$router.push({ name: 'ADMIN_PROPERTIES' })
              } else if (this.loggedIn === false && this.hotelSignUpInfo) {
                this.login()
              } else {
                this.$router.push({ name: 'AGENT_PROPERTIES' })
              }
            } catch (err) {
              this.$notify({
                group: 'eb-notification',
                title: err.message.errors[0].kind ?? 'Oops',
                text: err.message.errors[0].message ?? 'Something Went Worng',
                type: 'error',
                duration: 5000
              })
            } finally {
              this.$root.$loader(false)
              this.showLoader = false
            }
          }
        }
      })
    },
    async login () {
      try {
        this.$root.$loader(true)
        this.showLoader = true
        const result = await AUTH_LOGIN(this.hotelSignUpInfo)
        this.$notify({
          group: 'eb-notification',
          title: 'SUCCESS! ',
          text: `Howdy ${result.loginInfo.loginDetails.contactName}, Welcome to Yenna Rascala!`,
          type: 'success',
          duration: 7000
        })
        this.$store.dispatch('auth/setUser', result.loginInfo)
        this.$router.push({ name: 'AGENT_DASHBOARD' })
        localStorage.removeItem(tempHotelSignUpInfo)
      } catch (err) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops',
          text: err?.message?.errors[0]?.message ?? 'Something Went Wrong',
          type: 'error',
          duration: 5000
        })
      } finally {
        this.$root.$loader(false)
        this.showLoader = false
      }
    }
  }
}
</script>
<style>
#hotel-register .progress {
  height: 6.5px !important;
}
#hotel-register .fa-chevron-right,
#hotel-register .fa-chevron-left {
  color: black;
}
.newline-hotel-register {
  border-bottom: 1px solid #fff !important;
  padding: 0 0 20px !important;
  margin-bottom: 20px !important;
  display: inline-block !important;
  width: 100% !important;
}
.padding67 {
  padding: 67px 0 60px!important;
}
.bookingPhone .country-selector__list__item .dots-text {
  font-weight: 500;
}
.bookingPhone .country-selector__country-flag .iti-flag-small{
  position: relative;
  left: 29px;
  bottom: 3px;
}
.bookingPhone .input-tel__label {
  display: none;
}
.add-hote-room-remove-img-main-div {
  background-color: white;
  padding-left: 4px;
  padding-right: 4px;
  position: relative;
  float: left;
  top: 24px;
  z-index: 1;
}
.geocoder-control {
  display: none
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
