<template>
  <div class="content_view_wrap">
    <h1>Invester Information </h1>
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
            fixed
            :items="items"
            :fields="fields"
            :show-empty="true"
            responsive
          >
            <template v-slot:table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
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
import { ADMIN_FETCH_ALL_CONTENT } from 'src/services/admin'
import {
  ADMIN_FETCH_CONTACT_PAGINATION
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
        nextPage: 0
      },
      fields: fields,
      items: [],
      currentPage: 0,
      perPage: 25,
      tabelLoader: false,
      search: ''
    }
  },
  mounted () {
    this.getcontactUs()
    this.getPagination()
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
    async getcontactUs () {
      try {
        this.$root.$loader(true)
        this.tabelLoader = true
        const result = await ADMIN_FETCH_ALL_CONTENT()
        this.items = result.contactUs.reverse()
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
        const result = await ADMIN_FETCH_CONTACT_PAGINATION(this.pagination)
        console.log(result)
        this.items = result.contactUs
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
