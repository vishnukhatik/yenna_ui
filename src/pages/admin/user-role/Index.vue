<template>
  <div class="content_view_wrap">
    <downloadexcel
      v-if="false"
      class            = "btn"
      :fetch           = "fetchData"
      :fields          = "json_fields"
      :before-generate = "startDownload"
      :before-finish   = "finishDownload">
      Download Excel
    </downloadexcel>
    <span class="d-flex align-items-center justify-content-between">
    <h1 style="margin-bottom: 0px !important;">User Role</h1>
    <div class="dash_btn_container">
        <a class="blue_bgcolor" @click="$bvModal.show('userRoleModal')"
          ><i class="fas fa-plus"></i> Add User Role</a
        >
    </div>
    </span>
    <div class="overview_main_content_container">
      <div class="overview_main_table_container">
        <div class="table_search_form_container">
          <div class="row ">
            <div class="col-md-3" style="text-align: left;">
              <div class="form_input_wrap">
                <div class="form-group">
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
                v-model="perPage"
              >
                <option style="background: #fff;" :value="5">5</option>
                <option style="background: #fff;" :value="25">25</option>
                <option style="background: #fff;" :value="50">50</option>
                <option style="background: #fff;" :value="100">100</option>
                <option style="background: #fff;" :value="500">500</option></select
              ><span style="margin-left: 7px">Entries</span>
              <i
                class="fa fa-refresh ml-2"
                :class="{
                  'fa fa-refresh ml-2': true,
                  'fa-spin': tabelLoader,
                }"
                title="Refresh Records"
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
            :items="userRoleList"
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
            <template v-slot:cell(name)="row">
              {{
                `${row.item.firstName}  ${row.item.middleName}  ${row.item.lastName}`
              }}
            </template>
            <template v-slot:cell(actions)="row">
              <i class="font-size-21 fas fa-trash pl-2 cursor-pointer" @click="deletePage(row.item)" />
              <i class="font-size-21 fas fa-pen pl-2 cursor-pointer" @click="$bvModal.show('userRoleModal')" />
            </template>
          </b-table>
          <div class="row pt-3 pb-3 pl-3 pr-3">
            <div class="col-md-6">
              <p style="display: inline-block">
                <i
                  class="fa fa-list"
                  style="margin-right: 10px; color: #cecece"
                ></i
                >Showing <strong>{{ currentPage }}</strong> to
                <strong>{{ currentPage * perPage }} </strong>
                of {{ userRoleList.length }} Entries
              </p>
            </div>
            <div class="col-md-6">
              <b-pagination
                v-model="currentPage"
                :per-page="perPage"
                :total-rows="userRoleList.length"
                class="float-right"
              ></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="userRoleModal" hide-footer hide-header no-fade>
      <div class="modal_container">
        <div class="modal_overlay"></div>
        <user-role-modal
          @close="$bvModal.hide('userRoleModal')"
          @userRoleData="listUserRole"
        />
      </div>
    </b-modal>
  </div>
</template>
<script >
import userRoleModal from './UserRoleModal'
import downloadexcel from 'vue-json-excel'
import { fields } from './config'
export default {
  components: {
    userRoleModal,
    downloadexcel
  },
  data () {
    return {
      json_fields: {
        'Complete name': 'name',
        date: 'date'
      },
      fields: fields,
      userRoleList: [],
      currentPage: 0,
      perPage: 25,
      tabelLoader: false,
      search: ''
    }
  },
  mounted () {
  },
  methods: {
    async fetchData () {
      const response = [{ name: 'harsh', date: '02/05/1998' }, { name: 'harsh', date: '02/05/1998' }]
      return response
    },
    startDownload () {
      console.log('show loading')
    },
    finishDownload () {
      console.log('hide loading')
    }
  }
}
</script>
