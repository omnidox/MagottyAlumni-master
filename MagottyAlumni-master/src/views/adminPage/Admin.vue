<template>
  <div id="box">
    <b-container >




      <ul class="nav justify-content-center">
        <b-row class="center" > <p id="menu">Menu</p></b-row>
      </ul>

      <ul class="nav justify-content-center">
        <router-link :id="isNews? 'changeColor': ''" to="/admin/handleNews" tag="li" v-show="isShowNews">News</router-link>

      </ul>
      <ul class="nav justify-content-center">
        <router-link :id="isEvents? 'changeColor': ''" to="/admin/handleEvent" tag="li" v-show="isShowEvents ">Alumni and Volunteer Events</router-link>
      </ul>

      <ul class="nav justify-content-center">
        <router-link :id="isShopping? 'changeColor': ''" to="/admin/handleShopping" tag="li" v-show="isShowShopping">Shopping</router-link>
      </ul>

      <ul class="nav justify-content-center">
        <router-link :id="isUser? 'changeColor': ''" to="/admin/handleUser" tag="li" v-show="isShowUser">User</router-link>

      </ul>
      <ul class="nav justify-content-center">
        <router-link :id="isOrder? 'changeColor': ''" to="/admin/handleOrder" tag="li" v-show="isShowOrder">Order</router-link>
      </ul>
      <br>



      <b-row sm="9">
        <router-view></router-view>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return{
      isShowNews: false,
      isShowEvents: false,
      isShowShopping: false,
      isShowUser: false,
      isShowOrder: false,
      accountType: '',

      isNews: false,

      isEvents:false,
      isShopping: false,
      isUser: false,
      isOrder: false,
    }
  },

  watch:{
    $route (){
      this.changeBGC()
    }
  },

  mounted() {
    this.getUser()
    this.changeBGC()
  },

  methods:{
    getUser() {
      const admin = this.$cookies.get("isAdmin")
      switch (admin) {
        case "1":// Assistant Treasure Account
          this.isShowOrder = true
          this.isShowShopping = true
          break
        case "2": //Treasurer account
          this.isShowOrder = true
          this.isShowShopping = true
          break
        case "3": //Vice President Account
          this.isShowUser = true
          this.isShowShopping = true
          this.isShowEvents = true
          this.isShowNews = true
          break
        case "4": //President Account
          this.isShowNews = true
          this.isShowEvents = true
          this.isShowShopping = true
          this.isShowUser = true
          this.isShowOrder = true
          break
        case "5": //Admin Account
          this.isShowNews = true
          this.isShowEvents = true
          this.isShowShopping = true
          this.isShowUser = true
          this.isShowOrder = true
          break
      }
    },
    changeBGC() {
      const url = window.location.pathname
      const path = url.split('/')

      this.isNews = false
      this.isEvents = false
      this.isShopping = false
      this.isUser = false
      this.isOrder = false
      switch (path[2]) {
        case 'handleNews':
          this.isNews = true
          break
        case 'handleEvent':
          this.isEvents = true
          break
        case 'handleShopping':
          this.isShopping = true
          break
        case 'handleUser':
          this.isUser = true
          break
        case 'handleOrder':
          this.isOrder = true
          break
      }
    }
  },
}
</script>

<style scoped>
  #box{
    max-width: 1200px;
    margin: 0 auto;
  }
  #menu{
    color: #800001;
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 0;
    text-align: center;
  }
  #left{
    padding: 0;
    list-style: none;
    border: 1px solid;
    border-radius: 20px;
    box-shadow: 0 0 10px black;
    text-align: center;
    margin-top: 20px;
  }


  #changeColor{
    background-color: #800001;
    color: #ffdc04;
  }


</style>
