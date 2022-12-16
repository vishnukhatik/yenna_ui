<template>
  <div class="bk_info_address">
    <i class="fas fa-map-marker-alt"></i> {{
      address
    }}
  </div>
</template>
<script>
export default {
  props: {
    address: {
      type: String
    }
  }
}
</script>
