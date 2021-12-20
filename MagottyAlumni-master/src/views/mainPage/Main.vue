<template>
  <div id="box">

<br>
    <div>
      <b-alert id="border" show variant="danger">Welcome to the Maggotty Alumni Association</b-alert>
    </div>
    <Donation></Donation>

  </div>
</template>

<script>

import Donation from "./components/Donation"


export default {
  name: "Main",
  components: {

    Donation: Donation,

  }
}
</script>

<style scoped>
  #box{
    margin-bottom: 30px;
  }

  #border{

    text-align: center;

  }

  #text{
    color: #880001;
    font-size: 16px;
  }
</style>
