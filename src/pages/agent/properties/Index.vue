<template>
  <div class="content_view_wrap">
    <span class="d-flex align-items-center justify-content-between">
    <h1 style="margin-bottom: 0px !important;">Properties</h1>
    <div class="dash_btn_container">
      <router-link :to="{name: 'AGENT_PROPERTIES_ADD'}">
        <a class="blue_bgcolor"
          ><i class="fas fa-plus"></i> Add Property</a
        >
      </router-link>
    </div>
    </span>
    <div class="overview_main_content_container">
      <div class="overview_main_table_container">
        <div class="table_search_form_container">
          <div class="row ">
            <div class="col-md-3">
              <div class="form_input_wrap">
                <div class="form-group">
                  <h4>Search</h4>
                  <input type="text" v-model="search" class="form-control text-black" placeholder="Search by keyword(s).">
                </div>
              </div>
            </div>
             <div class="col-md-2">
              <div class="form_input_wrap">
                <h4>Select Status</h4>
                <div class="input_block">
                  <select name="" id="" class="form-control" v-model="selectStatus">
                    <option value="All">All</option>
                    <option value="New">New</option>
                    <option value="accepted">accepted</option>
                    <option value="rejected">rejected</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-7" style="text-align: right">
              <p style="display: inline-block; padding: 10px 5px">
                <i
                  class="fa fa-list"
                  style="margin-right: 7px; color: #cecece"
                ></i
                >List:
              </p>
              <select
                style="background: rgb(34, 34, 34);
                  border-color: white;
                  border: solid;
                  border-width: 1px;
                  background: #222222"
                v-model="perPage"
              >
                <option style="background: #fff;" :value="5">5</option>
                <option style="background: #fff;" :value="25">25</option>
                <option style="background: #fff;" :value="50">50</option>
                <option style="background: #fff;" :value="100">100</option>
                <option style="background: #fff;" :value="500">500</option>
                <option style="background: #fff;" :value="1000">1000</option></select
              ><span style="margin-left: 7px">Entries</span>
            </div>
          </div>
        </div>
        <div class="main_table_wrap">
          <b-table
            :busy="tabelLoader"
            show-empty
            :per-page="perPage"
            :current-page="currentPage"
            striped
            hover
            :items="items"
            fixed
            :filter="search"
            :fields="fields"
            responsive
            >
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template v-slot:cell(actions)="row">
              <div class="dash_view_btn pl-2 pt-2">
                <router-link :to="`/agent/properties-edit/${row.item.propertyId}`">
                  <a class="btn btn-info">Edit</a>
                </router-link>
              </div>
              <div class="dash_view_btn pl-2 pt-2">
                <router-link :to="`/agent/properties/${row.item.propertyId}`">
                  <a class="btn btn-primary">View</a>
                </router-link>
              </div>
                <div class="dash_view_btn pl-2 pt-2" title="Disable This Hotel" v-if="row.item.hotelStatus === 'enabled'" @click="changeToggle('disable',row.item.propertyId)">
                  <a class="btn btn-danger">Disable</a>
                </div>
                <div class="dash_view_btn pl-2 pt-2"  title="Enable This Hotel" v-if="row.item.hotelStatus === 'disable'" @click="changeToggle('enabled',row.item.propertyId)">
                  <a class="btn btn-success">Enable</a>
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
<script>
import { fields } from './config'
import { HOTEL_FETCH_HOTEL_BY_EMAIL, ADMIN_HOTEL_APPROVE, ADMIN_HOTEL_TOGGLE } from '../../../services/ENDPOINT'
import { mapGetters } from 'vuex'

export default {
  name: 'AgentPropertiesList',
  data () {
    return {
      currentPage: 0,
      perPage: 5,
      tabelLoader: false,
      fields,
      hotelsArr: [],
      search: '',
      selectStatus: 'All'
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType'
    }),
    items () {
      let arr = []
      if (this.selectStatus === 'All') arr = this.hotelsArr
      else arr = this.hotelsArr.filter(i => i.status === this.selectStatus)
      return arr
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
        const result = await HOTEL_FETCH_HOTEL_BY_EMAIL(this.userInfo.email)
        this.hotelsArr = result.hotels.reverse()
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
    changeStatus (status, propertyId) {
      const title = 'Confirmation!'
      const msg = `Are you sure, you want to Change Status ${'this'} Hotel?`
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          try {
            this.$root.$loader(true)
            const payload = {
              status,
              propertyId
            }
            const result = await ADMIN_HOTEL_APPROVE(payload)
            this.$notify({
              group: 'eb-notification',
              title: 'Success!',
              text: result.message,
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
    },
    changeToggle (hotelStatus, propertyId) {
      const title = 'Confirmation!'
      const msg = `Are you sure, you want to Change Toggle ${'this'} Hotel?`
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          try {
            this.$root.$loader(true)
            const payload = {
              hotelStatus,
              propertyId
            }
            const result = await ADMIN_HOTEL_TOGGLE(payload)
            this.$notify({
              group: 'eb-notification',
              title: 'Success!',
              text: result.message,
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
