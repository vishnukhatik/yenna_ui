<template>
  <div class="content_view_wrap">
    <h1>Total Activities Monthly Overview </h1>
    <div class="overview_blocks_container">
      <div class="row">
        <div class="col-md-4">
          <div class="overview_block_wrap rederpink_bgcolor">
            <div class="bg_icon"><i class="fas fa-hotel"></i></div>
            <h4>Total Hotels</h4>
            <h3>3,569</h3>
          </div>
        </div>
        <div class="col-md-4">
          <div class="overview_block_wrap lightgreygreen_bgcolor">
            <div class="bg_icon"><i class="fas fa-business-time"></i></div>
            <h4>Pending Hotel Approval</h4>
            <h3>421</h3>
          </div>
        </div>
        <div class="col-md-4">
          <div class="overview_block_wrap greenblue_bgcolor">
            <div class="bg_icon">
              <i class="fas fa-clipboard-check"></i>
            </div>
            <h4>Hotels Listed with Us</h4>
            <h3>2,456</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="overview_main_content_container">
      <div class="overview_main_table_container">
        <div class="table_search_form_container">
          <form>
            <div class="row">
              <div class="col-md-3">
                <div class="form_input_wrap">
                  <h4>Select Period</h4>
                  <div class="form-group">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="From date"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form_input_wrap">
                  <h4>Search by Hotel</h4>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Type Hotel Name or City"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form_input_wrap">
                  <h4>Select Status</h4>
                  <div class="input_block">
                    <select name="" id="" class="form-control">
                      <option value="0">All Status</option>
                      <option value="1">Approved</option>
                      <option value="2">Disabled</option>
                      <option value="3">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form_input_wrap">
                  <h4>Select Country</h4>
                  <div class="input_block">
                    <select name="" id="" class="form-control">
                      <option value="0">All Country</option>
                      <option value="1">India</option>
                      <option value="2">US</option>
                      <option value="3">Canada</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="form_input_wrap">
                  <button type="submit" class="btn btn-warning">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="main_table_wrap">
          <b-table :busy="tabelLoader" responsive :per-page="perPage" :current-page="currentPage" striped hover :items="hotelsArr" :fields="fields">
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template v-slot:cell(actions)="row">
              <div class="dash_view_btn">
                <router-link :to="`/admin/hotels/${row.item.propertyId}`">
                  <a class="btn btn-primary">View</a>
                </router-link>
              </div>
              <div class="dash_view_btn" @click="changeStatus('accepted', row.item.propertyId)">
                <a class="btn btn-success">Send Coupon</a>
              </div>
            </template>
          </b-table>
          <div
            class="row pt-3 pb-3 pl-3 pr-3"
          >
            <div
              class="col-md-6"
            >
              <p style="display: inline-block;">
                <i
                  class="fa fa-list"
                  style="margin-right: 10px; color: #cecece;"
                ></i
                >Showing
                <strong>{{ currentPage }}</strong> to
                <strong
                  >{{ currentPage * perPage }}
                </strong>
                of {{ hotelsArr.length }} Entries
              </p>
            </div>
            <div class="col-md-6">
              <b-pagination
                v-model="currentPage"
                :per-page="perPage"
                :total-rows="hotelsArr.length"
                class="float-right"
              ></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import { ADMIN_FETCH_HOTEL, ADMIN_HOTEL_APPROVE } from '../../../services/ENDPOINT'
import { fields } from './config'
export default {
  data () {
    return {
      fields: fields,
      hotelsArr: [],
      currentPage: 0,
      perPage: 10,
      tabelLoader: false
    }
  },
  mounted () {
    this.getHotels()
  },
  methods: {
    async getHotels () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await ADMIN_FETCH_HOTEL()
        console.log('API Working', result)
        this.hotelsArr = result.hotelData
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
        this.tabelLoader = false
      }
    },
    changeStatus (status, id) {
      const title = 'Confirmation!'
      const msg = `Are you sure, you want to Change Status ${'this'} Hotel?`
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          try {
            this.$root.$loader(true)
            await ADMIN_HOTEL_APPROVE(status, id)
            this.$notify({
              group: 'eb-notification',
              title: 'Success!',
              text: 'Status Change Successfully',
              type: 'success',
              duration: 5000
            })
            this.getHotels()
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
    }
  }
}
</script>
