<template>
  <div />
</template>
<script>
export default {
  created () {
    window.addEventListener('online', () => {
      this.$notify({
        group: 'eb-notification',
        title: 'Are you Online 😊',
        type: 'success',
        duration: 5000
      })
    })

    window.addEventListener('offline', () => {
      this.$notify({
        group: 'eb-notification',
        title: 'Oops! No Internet 😢',
        text: 'Please check your network connection',
        type: 'warn',
        duration: 5000
      })
    })
  }
}
</script>
