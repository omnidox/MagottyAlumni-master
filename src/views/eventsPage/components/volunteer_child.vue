<template>
  <div id="box" v-show="isReady">
    <b-img center :src="require(`../../../../src/assets/volunteer_banner.jpg`)" fluid></b-img>
    <hr>
    <div id="ul" v-for="(event, index) in pageData" v-bind:key="index">
      <p id="title">{{event.title}}</p>
      <p>{{event.date}}</p>
      <P>{{event.content}}</P>
      <hr>
    </div>
    <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="10"
        @click.native="changePage(currentPage)"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return{
      isReady: false,
      currentPage: 1,
      eventsData: [],
      pageData: [],
    }
  },

  mounted() {
    this.getData()
  },

  methods:{
    async getData() {
      await this.$axios.get('/events/volunteer').then(res=>{
        this.eventsData = res.data
        let arrayLength
        if (this.eventsData.length < 10){
          arrayLength = this.eventsData.length
        } else {
          arrayLength = 10
        }
        for (let i = 0; i < arrayLength; i++){
          this.pageData[i] = this.eventsData[i]
        }
        this.isReady = true
      })
    },

    changePage(currentPage) {
      const totalLength = this.eventsData.length
      let arrayLength
      if (totalLength - ((currentPage-1) * 10) < 10){
        arrayLength = totalLength - ((currentPage-1) * 10)
      } else {
        arrayLength = 10
      }
      this.pageData = []
      for (let i = 0; i < arrayLength; i++){
        this.pageData[i] = this.eventsData[((currentPage-1) * 10) + i]
      }
    }
  },

  computed:{
    rows(){
      return this.eventsData.length
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
  margin: 0 auto;
}
hr{
  height: 1px;
  background-color: #800001;
  color: #800001;
}
p{
  margin: 0;
  padding: 0;
}
#title{
  font-size: 20px;
  color: #800001;
}
#ul{
  text-align: center;
  list-style: none;
}
</style>
