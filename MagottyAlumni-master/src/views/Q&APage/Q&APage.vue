<template>
  <div id="box">
    <br>
    <br>
    <p class="title"><b>FAQs</b></p>
    <div class="body">
      <p class="questions"><b>Questions will go here</b></p>
      <p class="answers">Answers will go here</p>
    </div>
    <br>
    <br>


  </div>
</template>

<script>
export default {
name: "Q&APage"
}
</script>

<style scoped>
#box{
  max-width: 1200px;
  margin: 0 auto;
}
.title{
  font-size: 20px;
  padding: 5px;
  color: #800001;
  text-align: center;
}
p{
  margin: 0;
  padding: 0;
}

.body{
  padding: 10px;
  margin-left: 20px;
  text-align: center;
}
.questions{
  color: black;
}
.answers{
  color: gray;
}
.resource{
  font-size: 20px;
  color: gray;
}
</style>
