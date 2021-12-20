<template>
  <div id="box">
    <b-card id="card">
      <b-img :src="require('../../../assets/thank-you-banner-text-1.jpg')"></b-img>
      <b-card-text></b-card-text>
      <b-card-text>We humbly accept you donation. Rest assured your contribution will be put to the best of use!</b-card-text>

    </b-card>

  </div>
</template>

<script>
export default {
}



</script>


<style scoped>

#box{
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px #eee;
  margin: 10px auto;
  display: table;
  width: 1200px;
}
#card{
  background-color: #ffdc04;
  border: #ffdc04;
  text-align: center;
}


</style>
