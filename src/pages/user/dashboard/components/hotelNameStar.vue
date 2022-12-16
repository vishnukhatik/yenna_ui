<template>
  <div class="bk_info_title_wrap">
    <h3><router-link :to="'/hotels/'+hotelInfo.propertyId"> <a>{{ hotelInfo.propertyName }}</a> </router-link></h3>
    <div class="star_val" v-if="false">
      <i class="fas fa-star"></i> <i class="fas fa-star"></i>
      <i class="fas fa-star"></i> <i class="fas fa-star"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hotelInfo: {
      type: Object
    }
  },
  watch: {
    hotelInfo (v) {
      console.log(v)
    }
  }
}
</script>
