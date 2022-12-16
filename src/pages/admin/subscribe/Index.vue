<template>
  <div class="content_view_wrap">
    <h1>Subscribe Overview</h1>
    <div class="overview_main_content_container">
      <div class="overview_main_table_container">
        <div class="table_search_form_container">
          <div class="row ">
            <div class="col-md-3" style="text-align: left;">
              <div class="form_input_wrap">
                <div class="form-group">
                  <h4>Search</h4>
                  <input type="text" @input="searchHotelAction" v-model="pagination.email" class="form-control text-black" placeholder="Search by keyword(s).">
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="form_input_wrap">
                <h4>Select Subscribed</h4>
                <div class="input_block">
                  <select class="form-control" @change="changePerRowPage" v-model="pagination.isSubscribed">
                    <option value="">All</option>
                    <option :value="true">Active</option>
                    <option :value="false">Deactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-6" style="text-align: right">
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
            striped
            hover
            show-empty
            fixed
            :items="subscribeData"
            :fields="fields"
            responsive
          >
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
             <template v-slot:cell(createdAt)="row">
              {{ `${dateFormate(row.item.createdAt)}  ( ${timeCalculate(row.item.createdAt)} ) ` }}
            </template>
            <template v-slot:cell(status)="row">
              <div class="dash_view_btn" v-if="row.item.isSubscribed == true">
                <a class="btn btn-success">Active</a>
              </div>
              <div class="dash_view_btn" v-if="row.item.isSubscribed == false">
                <a class="btn btn-danger">Deactive</a>
              </div>
            </template>
            <template v-slot:cell(actions)="row">
              <i class="font-size-21 fas fa-toggle-on pl-2 cursor-pointer" v-if="row.item.isSubscribed === false" @click="changeStatus(row.item.emailId, true)" style="color:#AA990B"  />
              <i class="font-size-21 fas fa-toggle-off pl-2 cursor-pointer" v-if="row.item.isSubscribed === true" @click="changeStatus(row.item.emailId, false)" style="color:#C12727" />
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
  PUBLIC_UN_SUBSCRIPTION,
  ADMIN_FETCH_SUBSCRIBE_PAGINATION
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
        isSubscribed: '',
        email: ''
      },
      fields: fields,
      subscribeData: [],
      currentPage: 0,
      perPage: 25,
      tabelLoader: false
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
    timeCalculate (v) {
      const date = this.$moment(v)
      const NOW = new Date()
      const times = [['second', 1], ['minute', 60], ['hour', 3600], ['day', 86400], ['week', 604800], ['month', 2592000], ['year', 31536000]]
      var diff = Math.round((NOW - new Date(date)) / 1000)
      for (var t = 0; t < times.length; t++) {
        if (diff < times[t][1]) {
          if (t === 0) {
            return 'Just now'
          } else {
            diff = Math.round(diff / times[t - 1][1])
            return diff + ' ' + times[t - 1][0] + (diff === 1 ? ' ago' : 's ago')
          }
        }
      }
    },
    dateFormate (v) {
      return this.$moment(v).format('DD-MM-YYYY')
    },
    async changeStatus (emailId, isSubscribed) {
      const title = 'Confirmation!'
      const msg = `Are you sure, you want to ${isSubscribed ? 'Subscribed' : ' Unsubscribed'}?`
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          try {
            this.$root.$loader(true)
            const payload = {
              emailId: emailId,
              isSubscribed: isSubscribed
            }
            await PUBLIC_UN_SUBSCRIPTION(payload)
            const info = this.subscribeData.find(iterator => iterator.emailId === emailId)
            info.isSubscribed = isSubscribed
            const index = this.subscribeData.findIndex(iterator => iterator.emailId === emailId)
            this.$set(this.subscribeData, index, info)
            this.$notify({
              group: 'eb-notification',
              title: 'SUCCESS!',
              text: 'Successfully Status Change',
              type: 'success',
              duration: 5000
            })
          } catch {
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
        const result = await ADMIN_FETCH_SUBSCRIBE_PAGINATION(this.pagination)
        this.subscribeData = result.subscribeData
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
