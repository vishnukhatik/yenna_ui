import { USER_ADD_BOOK_MARK, AUTH_FETCH_USER_BY_ID } from '../services/ENDPOINT'
import store from '../store/index'
import Vue from 'vue'
export default {
  methods: {
    async actionBookmark (id, bookmarkArr, isAdded) {
      try {
        const payload = {
          id: id,
          bookmarks: bookmarkArr
        }
        const result = await USER_ADD_BOOK_MARK(payload)
        const title = `Bookmark ${isAdded ? 'Addedd' : 'Remove'} Successfully`
        Vue.notify({
          group: 'eb-notification',
          title: 'Success!',
          text: title,
          type: 'success',
          duration: 5000
        })
        store.dispatch('user/SET_BOOK_MARK', result.user.bookmarks)
      } catch (err) {
        // Vue.notify({
        //   group: 'eb-notification',
        //   title: 'Oops!',
        //   text: 'Something Went Wrong Please Try Again',
        //   type: 'error',
        //   duration: 5000
        // })
      }
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
    }
  }
}
