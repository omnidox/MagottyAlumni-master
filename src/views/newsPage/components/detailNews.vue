<template>
  <div id="box">
    <strong>{{event.title}}</strong>
    <p id="date">{{event.date}}</p>

      <b-img :src="`http://localhost:3000/${event.path}`" class="photo"></b-img>

    <div>
      <p id="content">{{event.content}}</p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return{
      event:[]
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    async getData() {
      const newUrl = `/resources/news/detail/?id=${this.$route.query.id}`
      await this.$axios.get(newUrl).then(res=>[
          this.event = res.data
      ])
    }
  }

}
</script>

<style scoped>
#box{
  padding: 20px;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  margin: 20px auto;
  max-width: 900px;
}
#photo{
  float: right;
  clear: both;
}
.photo{
  max-width: 250px;
}
p{
  white-space: pre-line;
  word-break:break-all;
}
#date{
  color: gray;
}
strong{
  font-size: 20px;
}
</style>
