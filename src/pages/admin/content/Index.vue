<template>
  <div class="content_view_wrap">
    <span class="d-flex align-items-center justify-content-between">
    <h1 style="margin-bottom: 0px !important;">Content Overview</h1>
    <div class="dash_btn_container">
      <router-link :to="{name: 'ADMIN_CONTACT_ADD'}">
        <a class="blue_bgcolor"
          ><i class="fas fa-plus"></i> Add Content</a
        >
      </router-link>
    </div>
    </span>
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
            <div class="col-md-3">
              <div class="form_input_wrap">
                <h4>Select Published</h4>
                <div class="input_block">
                  <select class="form-control" @change="changePerRowPage" v-model="pagination.isPublished">
                    <option value="">All</option>
                    <option :value="true">Published</option>
                    <option :value="false">Not Published</option>
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
            :filter="search"
            striped
            hover
            show-empty
            fixed
            :items="pagesList"
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
              <div class="dash_view_btn" title="Not Published This Page" v-if="row.item.isPublished == true">
                <a class="btn btn-success">Published</a>
              </div>
              <div class="dash_view_btn" title="Published This Page" v-if="row.item.isPublished == false">
                <a class="btn btn-danger">Not Published</a>
              </div>
            </template>
            <template v-slot:cell(actions)="row">
              <i class="font-size-21 fas fa-trash pl-2 cursor-pointer" @click="deletePage(row.item)" />
              <i class="font-size-21 fas fa-pen pl-2 cursor-pointer" @click="editContent(row.item.content_type)" />
              <router-link :to="`/blog/${row.item.content_type}`" target="_blank">
                <i class="font-size-21 fas fa-eye pl-2 cursor-pointer"/>
              </router-link>
              <i class="font-size-21 fas fa-toggle-on pl-2 cursor-pointer" title="Published This Page" v-if="row.item.isPublished == false" @click="changeStatus(true, row.item)" style="color:#AA990B"  />
              <i class="font-size-21 fas fa-toggle-off pl-2 cursor-pointer" title="Not Published This Page" v-if="row.item.isPublished == true" @click="changeStatus(false, row.item)" style="color:#C12727" />
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
  ADMIN_BLOG_UPDATE,
  ADMIN_BLOG_DELTE,
  ADMIN_FETCH_BLOG_PAGINATION
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
        isPublished: ''
      },
      fields: fields,
      pagesList: [],
      currentPage: 0,
      perPage: 5,
      tabelLoader: false,
      search: ''
    }
  },
  mounted () {
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
    changeStatus (status, item) {
      const title = 'Confirmation!'
      const msg = `Are you sure, you want to Change Status ${'this'} Page?`
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          try {
            this.$root.$loader(true)
            const payload = this._.cloneDeep(item)
            payload.isPublished = status
            const result = await ADMIN_BLOG_UPDATE(payload)
            this.$notify({
              group: 'eb-notification',
              title: 'Success!',
              text: result.message,
              type: 'success',
              duration: 5000
            })
            const idx = this.pagesList.indexOf(item)
            this.$set(this.pagesList, idx, payload)
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
    editContent (id) {
      this.$router.push('/admin/content-page-edit/' + id)
    },
    deletePage (item) {
      const title = 'Confirmation!'
      const msg = 'Are you sure, you want to Delete Page?'
      this.$root.$confirm(title, msg)
        .then(async confirmed => {
          try {
            this.$root.$loader(true)
            const result = await ADMIN_BLOG_DELTE(item)
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
        const result = await ADMIN_FETCH_BLOG_PAGINATION(this.pagination)
        this.pagesList = result.blogs
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
