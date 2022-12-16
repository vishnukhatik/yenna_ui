<template>
  <nprogress-container />
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import Nprogress from 'nprogress'
Nprogress.configure({ showSpinner: false })
export default {
  components: {
    NprogressContainer
  },
  methods: {
    show (v) {
      if (v) {
        document.getElementById('root-id').style = 'cursor: wait;'
        Nprogress.start()
      } else {
        document.getElementById('root-id').style = ''
        Nprogress.done()
      }
    }
  }
}
</script>
