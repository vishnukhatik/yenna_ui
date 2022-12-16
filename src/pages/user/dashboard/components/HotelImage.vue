<template>
  <div class="bk_info_content_img" v-if="imgPath">
    <q-img style="height: 160px; max-width: 173px" :src="imgPath" alt="" />
    <div class="pt-3">
      <span style="font-size: 14px;" class="color--yellow"><span style="color: white;font-weight: 400" v-if="extraDetails.otherFeesDetails">Application Fees: </span>{{ currency(extraDetails.otherFeesDetails.transactionFee,extraDetails.currency) }}</span><br>
      <span style="font-size: 13px;" class="color--yellow"><span style="color: white;font-weight: 400" v-if="extraDetails.otherFeesDetails">GST : </span>{{ currency(extraDetails.otherFeesDetails.GST,extraDetails.currency) }}</span><br>
      <span style="font-size: 14px;" class="color--yellow"><span style="color: white;font-weight: 400" >Total : </span>{{ currency(extraDetails.totalAmount,extraDetails.currency) }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgPath: {
      type: String
    },
    totalRoomCost: {
      type: Number
    },
    extraDetails: {
      type: Object
    }
  }
}
</script>
