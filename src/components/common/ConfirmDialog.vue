<template>
  <b-modal
      v-model="dialog"
      hide-header-close
    >
    <template v-slot:modal-title>
     <p class="my-2" style="color: black;">{{ title }}</p>
    </template>
      <b-container fluid>
        <p class="my-2" style="color: black;">
          {{message}}
        </p>
      </b-container>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right ml-2"
            @click="agree"
          >
            Ok
          </b-button>
          <b-button
            size="sm"
            class="float-right ml-2"
            @click="cancel"
          >
            Close
          </b-button>
        </div>
      </template>
    </b-modal>
</template>

<script>
export default {
  name: 'Confirm',

  data () {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null
    }
  },
  methods: {
    open (title, message) {
      this.dialog = true
      this.title = title
      this.message = message
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree () {
      this.resolve(true)
      this.dialog = false
    },
    cancel () {
      this.dialog = false
    }
  }
}
</script>
