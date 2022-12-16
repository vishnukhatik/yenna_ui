<template>
  <div class='content_view_wrap'>
    <div class='overview_main_content_container'>
      <div class='overview_main_table_container'>
        <div class='table_search_form_container'>
          <form>
            <div class='row'>
              <div class='col-md-6 mt-2'>
                <h4>BookMark Overview</h4>
              </div>
              <div class='col-md-3'>
                <div class='form_input_wrap'>
                  <h4>Search</h4>
                  <div class='form-group'>
                    <input
                      type='text'
                      v-model='search'
                      class='form-control text-black'
                      placeholder='Search by keyword(s).'
                    />
                  </div>
                </div>
              </div>
              <div class='col-md-3'>
                <div class='align-items-center d-flex  form_input_wrap'>
                  <h4>
                    <i
                      class='fa fa-list'
                      style='margin-right: 7px; color: #cecece'
                    ></i
                    >List:
                  </h4>
                  <div class='input_block'>
                    <select
                      style='background: rgb(34, 34, 34);
                  border-color: white;
                  border: solid;
                  border-width: 1px;
                  background: #222222'
                      v-model='perPage'
                    >
                      <option style='background: #fff;' :value='5'>5</option>
                      <option style='background: #fff;' :value='25'>25</option>
                      <option style='background: #fff;' :value='50'>50</option>
                      <option style='background: #fff;' :value='100'
                        >100</option
                      >
                      <option style='background: #fff;' :value='500'
                        >500</option
                      >
                      <option style='background: #fff;' :value='1000'
                        >1000</option
                      ></select
                    >
                  </div>
                  <span style='margin-left: 7px'>Entries</span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class='main_table_wrap'>
          <b-table
            :per-page='perPage'
            :filter='search'
            :current-page='currentPage'
            striped
            hover
            show-empty
            :items='bookmarkArr'
            :fields='fields'
            ref="bookingHistory"
            responsive
          >
            <!-- <template v-slot:table-busy>
              <div class='text-center text-danger my-2'>
                <b-spinner class='align-middle'></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template> -->
            <template v-slot:cell(createdAt)='row'>
              {{ `${dateFormate(row.item.createdAt)}` }}
            </template>
            <template v-slot:cell(actions)='row'>
              <i
                title='Remove Bookmark'
                class='font-size-21 fas fa-trash pl-2 cursor-pointer'
                @click='removeBookMark(row.item)'
              />
              <i
                title='View Hotel'
                class='font-size-21 fas fa-eye pl-2 cursor-pointer'
                @click='hotelDetails(row.item.propertyId)'
              />
            </template>
          </b-table>
          <div class='row pt-3 pb-3 pl-3 pr-3'>
            <div class='col-md-6'>
              <p style='display: inline-block'>
                <i
                  class='fa fa-list'
                  style='margin-right: 10px; color: #cecece'
                ></i
                >Showing <strong>{{ currentPage }}</strong> to
                <strong>{{ currentPage * perPage }} </strong>
                of {{ bookmarkArr.length }} Entries
              </p>
            </div>
            <div class='col-md-6'>
              <b-pagination
                v-model='currentPage'
                :per-page='perPage'
                :total-rows='bookmarkArr.length'
                class='float-right'
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
import { mapGetters } from 'vuex'
import { AUTH_FETCH_USER_BY_ID } from 'src/services/auth'
import store from 'src/store'
import bookmark from 'src/mixins/bookmark'
export default {
  name: 'BookMark',
  mixins: [bookmark],
  data () {
    return {
      fields: fields,
      search: '',
      currentPage: 0,
      perPage: 25
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'auth/loggedInUser',
      loggedIn: 'auth/loggedIn',
      loggedInUserType: 'auth/loggedInUserType',
      bookmarkArr: 'user/getBookMark'
    })
  },
  mounted () {
    this.getBookMark()
  },
  methods: {
    hotelDetails (propertyId) {
      this.$router.push({ path: `/hotels/${propertyId}` })
    },
    async getBookMark () {
      try {
        const result = await AUTH_FETCH_USER_BY_ID(this.userInfo.email)
        store.dispatch('user/SET_BOOK_MARK', result.userInfo[0].bookmarks)
      } catch (err) {
        // Vue.notify({
        //   group: 'eb-notification',
        //   title: 'Oops',
        //   text: 'Something Went Wrong Please Try Again',
        //   type: 'error',
        //   duration: 5000
        // })
      }
    },
    removeBookMark (item) {
      const bookmarkArr = this.bookmarkArr
      const idx = bookmarkArr.findIndex(i => i.propertyId === item.propertyId)
      if (idx !== -1) {
        bookmarkArr.splice(idx, 1)
      }
      this.actionBookmark(this.userInfo._id, bookmarkArr, false)
    },
    timeCalculate (v) {
      const date = v
      const NOW = new Date()
      const times = [
        ['second', 1],
        ['minute', 60],
        ['hour', 3600],
        ['day', 86400],
        ['week', 604800],
        ['month', 2592000],
        ['year', 31536000]
      ]
      var diff = Math.round((NOW - new Date(date)) / 1000)
      for (var t = 0; t < times.length; t++) {
        if (diff < times[t][1]) {
          if (t === 0) {
            return 'Just now'
          } else {
            diff = Math.round(diff / times[t - 1][1])
            return (
              diff + ' ' + times[t - 1][0] + (diff === 1 ? ' ago' : 's ago')
            )
          }
        }
      }
    },
    dateFormate (v) {
      return this.$moment(v).format('DD-MM-YYYY')
    }
  }
}
</script>
