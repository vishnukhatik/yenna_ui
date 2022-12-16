<template>
  <div class="content_view_wrap">
    <h1>Customers Overview</h1>
    <!-- <div class="overview_blocks_container">
      <div class="row">
        <div class="col-md-4 mb-2">
          <div class="overview_block_wrap" style="background-color: #0bb4af">
            <div class="bg_icon"><i class="fas fa-file"></i></div>
            <h4>Total Customers</h4>
            <h3>{{totalCustomer}}</h3>
          </div>
        </div>
        <div class="col-md-4 mb-2">
          <div class="overview_block_wrap lightgreygreen_bgcolor">
            <div class="bg_icon"><i class="fas fa-business-time"></i></div>
            <h4>Active Customers</h4>
            <h3>{{activeCustomer}}</h3>
          </div>
        </div>
        <div class="col-md-4 mb-2">
          <div class="overview_block_wrap rederpink_bgcolor">
            <div class="bg_icon">
              <i class="fas fa-clipboard-check"></i>
            </div>
            <h4>Deactive Customers</h4>
            <h3>{{ deActiveCustomer }}</h3>
          </div>
        </div>
      </div>
    </div> -->

    <div class="overview_main_content_container">
      <div class="overview_main_table_container">
        <div class="table_search_form_container">
          <div class="row ">
            <div class="col-md-3" style="text-align: left;">
              <div class="form_input_wrap">
                <div class="form-group">
                  <h4>Search</h4>
                  <input type="text" v-model="search" class="form-control text-black" placeholder="Search by keyword(s).">
                </div>
              </div>
            </div>
            <div class="col-md-9" style="text-align: right">
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
                v-model="pagination.perRowPage"
                @change="changePerRowPage"
              >
              <option style="background: #fff;" :value="5">5</option>
              <option style="background: #fff;" :value="15">15</option>
              <option style="background: #fff;" :value="40">40</option>
              <option style="background: #fff;" :value="100">100</option></select
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
          <b-table
            :busy="tabelLoader"
            :per-page="perPage"
            :filter="search"
            :current-page="currentPage"
            striped
            hover
            show-empty
            :items="customersList"
            :fields="fields"
            responsive
          >
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template v-slot:cell(name)="row">
              {{
                `${row.item.firstName}  ${row.item.middleName}  ${row.item.lastName}`
              }}
            </template>
            <template v-slot:cell(status)="row">
              <div v-if="row.item.isActive == 1">
                <p>Active</p>
              </div>
              <div v-if="row.item.isActive == 0">
                <p>Deactive</p>
              </div>
            </template>
              <template v-slot:cell(actions)="row">
                <div class="dash_view_btn" v-if="row.item.isActive == 0" @click="changeActiveDeactive(1, row.item._id)">
                  <a class="btn btn-success">Active</a>
                </div>
                <div class="dash_view_btn" v-if="row.item.isActive == 1" @click="changeActiveDeactive(0, row.item._id)">
                  <a class="btn btn-danger">Deactive</a>
                </div>
            </template>
          </b-table>
          <div class="row pt-3 pb-3 pl-3 pr-3">
            <div class="col-md-6">
              <p style="display: inline-block">
                <i
                  class="fa fa-list"
                  style="margin-right: 10px; color: #cecece"
                ></i
                >Showing <strong>{{ pagination.currentPage }}</strong> to
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
<script >
import {
  ADMIN_FETCH_CUSTOMERS,
  ADMIN_USER_APPOVE,
  ADMIN_FETCH_CUSTOMER_PAGINATION,
  ADMIN_USER_ACTIVE_DEACTIVE
} from '../../../services/ENDPOINT'
import { fields } from './config'
export default {
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
      fields: fields,
      customersList: [],
      currentPage: 0,
      perPage: 25,
      tabelLoader: false,
      search: ''
    }
  },
  mounted () {
    this.getCoustomer()
    this.getPagination()
  },
  computed: {
    totalCustomer () {
      return this.customersList.length
    },
    deActiveCustomer () {
      return 0
    },
    activeCustomer () {
      return 0
    }
  },
  methods: {
    changePerRowPage () {
      this.pagination.currentPage = 1
      this.getPagination()
    },
    changePage (currentPage) {
      this.pagination.currentPage = currentPage
      this.getPagination()
    },
    changeActiveDeactive (isActive, _id) {
      const title = 'Confirmation!'
      const msg = `Are you sure, you want to ${isActive ? 'Activate ' : 'Deactivate '} this User?`
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          try {
            this.$root.$loader(true)
            const payload = {
              _id,
              isActive
            }
            const result = await ADMIN_USER_ACTIVE_DEACTIVE(payload)
            const hotel = this.customersList.find(iterator => iterator._id === _id)
            hotel.isActive = isActive
            const index = this.customersList.findIndex(iterator => iterator._id === _id)
            this.$set(this.customersList, index, hotel)
            this.$notify({
              group: 'eb-notification',
              title: 'Success!',
              text: result.message,
              type: 'success',
              duration: 5000
            })
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
    changeToggle (status, userId) {
      const title = 'Confirmation!'
      const msg = 'Are you sure, you want to Change Status'
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          try {
            this.$root.$loader(true)
            const payload = {
              userId,
              status
            }
            const result = await ADMIN_USER_APPOVE(payload)
            this.$notify({
              group: 'eb-notification',
              title: 'Success!',
              text: result.message,
              type: 'success',
              duration: 5000
            })
            this.getCoustomer()
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
    async getCoustomer () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await ADMIN_FETCH_CUSTOMERS()
        this.customersList = result.userSignUps
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
    async getPagination () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await ADMIN_FETCH_CUSTOMER_PAGINATION(this.pagination)
        this.customersList = result.users
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
