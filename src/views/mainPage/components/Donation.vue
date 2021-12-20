<template>
  <div id="box">
    <a href="/donate"><b-img id="photo" :src="require('@/assets/donate_make a difference.gif')" fluid alt="contact image"></b-img></a>

  </div>
</template>

<script>
export default {
name: "Contact"
}
</script>

<style scoped>
  #box {
    max-width: 1200px;
    margin: 0 auto;
  }
  .purple{
    color: #800001;
  }
  span{
    font-size: 15px;
  }
  #photo{
    margin-top: 20px;
  }

</style>
