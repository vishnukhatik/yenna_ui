<template>
  <div class="content_view_wrap">
    <span class="d-flex align-items-center justify-content-between">
    <h1 style="margin-bottom: 0px !important;">Users Overview</h1>
    <div class="dash_btn_container">
      <router-link :to="{name: 'ADMIN_USER_ADD'}">
        <a class="blue_bgcolor"
          ><i class="fas fa-plus"></i> Add Users</a
        >
      </router-link>
    </div>
    </span>
    <div class="overview_blocks_container">
      <div class="row">
        <div class="col-md-4 mb-2">
          <div class="overview_block_wrap" style="background-color: #0bb4af">
            <div class="bg_icon"><i class="fas fa-file"></i></div>
            <h4>Total Users</h4>
            <h3>{{totalUser}}</h3>
          </div>
        </div>
        <div class="col-md-4 mb-2">
          <div class="overview_block_wrap lightgreygreen_bgcolor">
            <div class="bg_icon"><i class="fas fa-business-time"></i></div>
            <h4>Active Users</h4>
            <h3>{{activeUser}}</h3>
          </div>
        </div>
        <div class="col-md-4 mb-2">
          <div class="overview_block_wrap rederpink_bgcolor">
            <div class="bg_icon">
              <i class="fas fa-clipboard-check"></i>
            </div>
            <h4>Deactive Users</h4>
            <h3>{{ deActiveUser }}</h3>
          </div>
        </div>
      </div>
    </div>

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
            :items="usersList"
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
            <template v-slot:cell(actions)="row">
              <i class="font-size-21 fas fa-trash pl-2 cursor-pointer" @click="deletePage(row.item)" />
              <i class="font-size-21 fas fa-pen pl-2 cursor-pointer" @click="editContent(row.item.content_type)" />
            </template>
            <!-- <template v-slot:cell(actions)="row">
               <div class="dash_view_btn" title="Aprove This Hotel" v-if="row.item.status == 'rejected'" @click="changeStatus('accepted', row.item.propertyId)">
                <a class="btn btn-success">Aprove</a>
              </div>
              <div class="dash_view_btn" title="Reject This Hotel" v-if="row.item.status == 'accepted'" @click="changeStatus('rejected', row.item.propertyId)">
                <a class="btn btn-danger">Reject</a>
              </div>
              <div class="dash_view_btn pl-2" title="Disable This Hotel" v-if="row.item.hotelStatus == 'enabled'" @click="changeToggle('disable',row.item.propertyId)">
                <a class="btn btn-danger">Disable</a>
              </div>
              <div class="dash_view_btn pl-2"  title="Enable This Hotel" v-if="row.item.hotelStatus == 'disable'" @click="changeToggle('enabled',row.item.propertyId)">
                <a class="btn btn-success">Enable</a>
              </div>
            </template> -->
          </b-table>
          <div class="row pt-3 pb-3 pl-3 pr-3">
            <div class="col-md-6">
              <p style="display: inline-block">
                <i
                  class="fa fa-list"
                  style="margin-right: 10px; color: #cecece"
                ></i
                >Showing <strong>{{ pagination.currentPage }}</strong> to
                <strong>{{ pagination.currentPage * pagination.perRowPage }} </strong>
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
  ADMIN_FETCH_USERS,
  ADMIN_USER_APPROVE,
  ADMIN_USER_TOGGLE,
  ADMIN_USER_DELETE,
  ADMIN_FETCH_ADMIN_USER_PAGINATION
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
      usersList: [],
      currentPage: 0,
      perPage: 25,
      tabelLoader: false,
      search: '',
      usersArr: []
    }
  },
  prps: {
    id: Number
  },
  mounted () {
    // this.getHotels()
    this.getPagination()
  },
  computed: {
    totalUser () {
      return this.usersList.length
    },
    deActiveUser () {
      return 0
    },
    activeUser () {
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
            const result = await ADMIN_USER_APPROVE(payload)
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
            const result = await ADMIN_USER_TOGGLE(payload)
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
    async getHotels () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await ADMIN_FETCH_USERS()
        this.usersList = result.userSignUps.reverse()
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
    editContent (id) {
      this.$router.push('/admin/user-page-edit/' + id)
    },
    deletePage (item) {
      const title = 'Confirmation!'
      const msg = 'Are you sure, you want to Delete Page?'
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          try {
            this.$root.$loader(true)
            const result = await ADMIN_USER_DELETE(item)
            console.log(item)
            const idx = this.pagesList.indexOf(item)
            this.pagesList.splice(idx, 1)
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
    async getPagination () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await ADMIN_FETCH_ADMIN_USER_PAGINATION(this.pagination)
        this.usersList = result.adminData
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
