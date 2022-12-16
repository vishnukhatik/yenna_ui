<template>
    <div class="main_container">
      <div class="main_bg" id="content_main_bg"></div>
      <div class="checkout_main_container">
        <h1 class="text-center pt-3" >{{ heading }}</h1>
        <div
          class="ql-editor"
          contenteditable="true"
          v-html="content">{{ content }}
        </div>
        <br><br>
      </div>
  </div>
</template>
<script>
import {
  ADMIN_BLOG_FETCH_BY_ID
} from '../../../services/ENDPOINT'
import $ from 'jquery'
export default {
  data: () => ({
    slag: '',
    content: '',
    title: '',
    heading: ''
  }),
  watch: {
    '$route' (to, from) {
      this.$router.push(to.fullPath)
    }
  },
  mounted () {
    $('button').on('click', function () {
      $('meta[name=description]').remove()
      $('head').append('<meta name="description" content="this is new">')
    })
    if (this.$route.meta.ContentPage) {
      this.slag = this.$route.params.slag
      if (this.slag) {
        this.getData()
      } else {
        this.$swal({
          type: 'warning',
          animation: true,
          title: 'Something went wrong',
          timer: 2000
        })
        setTimeout(this.$router.push('/'), 2001)
      }
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    onDivInput (e) {
      document.title = 'Yenna Rascala'
      this.myHtmlCode = e.target.innerHTML
    },
    async getData () {
      this.$root.$loader(false)
      try {
        this.$root.$loader(true)
        const res = await ADMIN_BLOG_FETCH_BY_ID(this.slag)
        if (res.blog.length > 0) {
          const data = res.blog[0]
          this.content = data.content
          this.title = data.title
          this.heading = data.heading
          document.title = 'Yenna Rascala | ' + data.title
          // document.getElementsByTagName('meta').keywords.content = data ? data.meta_tags[0] : ''
          // document.getElementsByTagName('description').description.content = data.description
        }
      } catch (err) {
        this.$notify({
          group: 'eb-notification',
          title: 'Oops',
          text: 'FAILED! Something Went Wrong Please Try Again',
          type: 'error',
          duration: 5000
        })
      } finally {
        this.$root.$loader(false)
      }
    }
  }
}
</script>
