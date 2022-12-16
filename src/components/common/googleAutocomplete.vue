<template>
    <input
      id="autocompleteplace"
      ref="autocompleteplace"
      v-model="value"
      :placeholder="placeholder"
      :name="name"
      :class="inputClass"
      type="text"
      @input="getValue"
      @click="getValue"
      @change="getValue"
      @keydown.enter="getValue"
      @select="getValue"
      @blur="getValue"
    >
</template>

<script>
export default {
  inject: ['$validator'],
  $_veeValidate: {
    validator: 'new'
  },
  props: {
    validate: {
      type: String,
      default: ''
    },
    valueSet: {
      type: String,
      default: ''
    },
    inputClass: {
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    autocomplete: '',
    indf: '',
    value: '',
    position: null
  }),
  watch: {
    valueSet (v) {
      // this.value = this.valueSet
    }
  },
  mounted () {
    /* eslint-disable */
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocompleteplace),
      {types: ['(regions)']}
    )
  },

  methods: {
    getValue () {
      const timer = this.getValue.timer
      if (timer) {
        clearTimeout(timer)
      }
      this.getValue.timer = setTimeout(() => {
        console.log(this.autocomplete)
        this.value = document.getElementById('autocompleteplace').value
        this.$emit('input', this.value)
      }, 200)
    }
  }
}
</script>

<style>

</style>
