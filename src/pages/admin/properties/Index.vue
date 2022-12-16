<template>
  <div class="content_view_wrap">
    <span class="d-flex align-items-center justify-content-between">
    <h1 style="margin-bottom: 0px !important;">Properties</h1>
    <div class="dash_btn_container">
      <router-link :to="{name: 'ADMIN_PROPERTIES_ADD'}">
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
            <div class="col-md-2" style="text-align: left;">
              <div class="form_input_wrap">
                <div class="form-group">
                  <h4>Search</h4>
                  <input type="text" v-model="pagination.search" @input="searchHotelAction" class="form-control text-black" placeholder="Search by keyword(s).">
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form_input_wrap">
                <h4>Select Status</h4>
                <div class="input_block">
                  <select class="form-control" @change="changePerRowPage" v-model="pagination.status">
                    <option value="">All</option>
                    <option value="New">New</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form_input_wrap">
                <h4>Select Hotel Status</h4>
                <div class="input_block">
                  <select class="form-control" @change="changePerRowPage" v-model="pagination.hotelStatus">
                    <option value="">All</option>
                    <option value="enabled">Enabled</option>
                    <option value="disable">Disable</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-6" style="text-align: right">
              <p style="display: inline-block; padding: 0px 5px">
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
                  v-model="pagination.perRowPage"
                  @change="changePerRowPage"
              >
                <option style="background: #fff;" :value="5">5</option>
                <option style="background: #fff;" :value="15">15</option>
                <option style="background: #fff;" :value="40">40</option>
                <option style="background: #fff;" :value="100">100</option>
               </select
              ><span style="margin-left: 7px">Entries</span>
              <i
                class="fa fa-refresh ml-2"
                :class="{
                  'fa fa-refresh ml-2': true,
                  'fa-spin': tabelLoader,
                }"
                title="Refresh Records"
                @click="getPagination"
              />
              <span v-if="!tabelLoader" class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div class="main_table_wrap">
          <b-table :busy="tabelLoader" responsive show-empty fixed striped hover :items="hotelsArr" :fields="fields">
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template v-slot:cell(actions)="row">
              <div class="dash_view_btn">
                <router-link :to="`/admin/properties-edit/${row.item.propertyId}`">
                  <a class="btn btn-info">Edit</a>
                </router-link>
              </div>
              <div class="dash_view_btn pl-2 pt-2" title="Aprove This Hotel" v-if="row.item.status == 'rejected' || row.item.status === 'new' || row.item.status === 'New'" @click="changeStatus('accepted', row.item.propertyId)">
                <a class="btn btn-success">Approve</a>
              </div>
              <div class="dash_view_btn pl-2 pt-2" title="Reject This Hotel" v-if="row.item.status == 'accepted'|| row.item.status === 'new' || row.item.status === 'New'" @click="changeStatus('rejected', row.item.propertyId)">
                <a class="btn btn-danger">Reject</a>
              </div>
              <div class="dash_view_btn pl-2 pt-2"  title="Enable This Hotel" v-if="row.item.hotelStatus == 'disable'" @click="changeToggle('enabled',row.item.propertyId)">
                <a class="btn btn-success">Enable</a>
              </div>
              <div class="dash_view_btn pl-2 pt-2" title="Disable This Hotel" v-if="row.item.hotelStatus == 'enabled'" @click="changeToggle('disable',row.item.propertyId)">
                <a class="btn btn-danger">Disable</a>
              </div>
              <div class="dash_view_btn pt-2">
                <router-link :to="`/admin/properties/${row.item.propertyId}`">
                  <a class="btn btn-primary">View</a>
                </router-link>
              </div>
              <div class="dash_view_btn pl-2 pt-2" v-show="false" title="Disable This Hotel" @click="troubleshoot(row.item.propertyId)">
                <a class="btn btn-info">Troubleshoot</a>
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
                <strong>{{ pagination.currentPage }}</strong> to
                <strong
                  >{{ pagination.currentPage * pagination.perRowPage }}
                </strong>
                of {{ pagination.totalItems }} Entries
              </p>
            </div>
            <div class="col-md-6">
              <b-pagination
                v-model="pagination.currentPage"
                :per-page="pagination.perRowPage"
                :total-rows="pagination.totalItems"
                @change="changePage"
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
import { ADMIN_HOTEL_APPROVE, ADMIN_HOTEL_TOGGLE, ADMIN_FETCH_PROPERTIES_PAGINATION } from '../../../services/ENDPOINT'

export default {
  name: 'AdminPropertiesList',
  data () {
    return {
      pagination: {
        currentPage: 1,
        perRowPage: 15,
        totalPages: 0,
        totalItems: 0,
        nextPage: 0,
        status: '',
        hotelStatus: '',
        search: ''
      },
      tabelLoader: false,
      fields,
      hotelsArr: []
    }
  },
  mounted () {
    this.getPagination()
  },
  methods: {
    searchHotelAction () {
      const timer = this.searchHotelAction.timer
      if (timer) {
        clearTimeout(timer)
      }
      this.searchHotelAction.timer = setTimeout(() => {
        this.getPagination()
      }, 500)
    },
    changePerRowPage () {
      this.pagination.currentPage = 1
      this.getPagination()
    },
    changePage (currentPage) {
      this.pagination.currentPage = currentPage
      this.getPagination()
    },
    async troubleshoot (propertyId) {
      const payloadChangeStatus = {
        status: 'rejected',
        propertyId
      }
      await ADMIN_HOTEL_APPROVE(payloadChangeStatus)

      const payloadChangeTroggle = {
        hotelStatus: 'disable',
        propertyId
      }
      await ADMIN_HOTEL_TOGGLE(payloadChangeTroggle)
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
            const hotel = this.hotelsArr.find(iterator => iterator.propertyId === propertyId)
            hotel.status = status
            const index = this.hotelsArr.findIndex(iterator => iterator.propertyId === propertyId)
            this.$set(this.hotelsArr, index, hotel)
            this.$notify({
              group: 'eb-notification',
              title: 'Success!',
              text: result.message,
              type: 'success',
              duration: 5000
            })
            // this.getHotels()
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
            const hotel = this.hotelsArr.find(iterator => iterator.propertyId === propertyId)
            hotel.hotelStatus = hotelStatus
            const index = this.hotelsArr.findIndex(iterator => iterator.propertyId === propertyId)
            this.$set(this.hotelsArr, index, hotel)
            this.$notify({
              group: 'eb-notification',
              title: 'Success!',
              text: result.message,
              type: 'success',
              duration: 5000
            })
            // this.getHotels()
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
    async getPagination () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await ADMIN_FETCH_PROPERTIES_PAGINATION(this.pagination)
        this.hotelsArr = result.hotels
        this.pagination = result.pagination
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
    }
  }
}
</script>
