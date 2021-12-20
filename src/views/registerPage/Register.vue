<template>
  <div>
    <topImg></topImg>
    <userInfo></userInfo>
  </div>
</template>



<script>
import userInfo from "@/views/registerPage/components/userInfo";
import topImg from "@/views/registerPage/components/topImg"
export default {
  components:{
    userInfo:userInfo,
    topImg:topImg,
  }
}
</script>

<style scoped>

</style>