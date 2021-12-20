<template>
  <div id="box">
    <process></process>
  </div>
</template>

<script>
import process from "@/views/forgetPage/components/process"
export default {
  components: {
    process: process
  }
}
</script>

<style scoped>
  #box {
    max-width: 1200px;
    margin: 20px auto;
  }
</style>
