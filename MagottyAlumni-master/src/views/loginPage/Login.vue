<template>
  <div>
    <topImg></topImg>
    <userInfo></userInfo>
    <br><br><br>
  </div>
</template>



<script>
import userInfo from "@/views/loginPage/components/Loginpage";
import topImg from "@/views/loginPage/components/topImg"
export default {
  components:{
    userInfo:userInfo,
    topImg:topImg,
  }
}
</script>

<style scoped>

</style>
