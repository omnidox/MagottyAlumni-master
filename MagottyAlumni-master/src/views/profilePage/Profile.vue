<template>
  <div id="box">
    <b-container>

      <ul class="nav justify-content-center">
        <b-row class="center" > <p id="menu">Menu</p></b-row>
      </ul>

      <ul class="nav justify-content-center">
        <router-link :id="isUser? 'changeColor': ''" to="/profile/user" tag="li">User</router-link>

      </ul>
      <ul class="nav justify-content-center">
        <router-link :id="isShipping? 'changeColor': ''" to="/profile/shipping" tag="li">Edit shipping</router-link>
      </ul>

      <ul class="nav justify-content-center">
        <router-link :id="isDescription? 'changeColor': ''" to="/profile/editPD" tag="li">Description & Portrait</router-link>
      </ul>

      <ul class="nav justify-content-center">
        <router-link :id="isPassword? 'changeColor': ''" to="/profile/password" tag="li">Change password</router-link>
      </ul>

      <ul class="nav justify-content-center">
        <router-link :id="isOrders? 'changeColor': ''" to="/profile/orders" tag="li">Orders</router-link>
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
  components: {

  },
  data() {
    return{
      isUser: false,
      isShipping: false,
      isDescription: false,
      isPassword: false,
      isOrders: false,
    }
  },
  watch:{
    $route (){
      this.changeBGC()
    }
  },
  mounted() {
    this.changeBGC()
  },
  methods:{
    changeBGC() {
      const url = window.location.pathname
      const path = url.split('/')
      this.isUser = false
      this.isShipping = false
      this.isDescription = false
      this.isPassword = false
      this.isOrders = false
      switch (path[2]) {
        case 'user':
          this.isUser = true
          break
        case 'shipping':
          this.isShipping = true
          break
        case 'password':
          this.isPassword = true
          break
        case 'editPD':
          this.isDescription = true
          break
        case 'orders':
          this.isOrders = true
          break
      }
    }
  },
}
</script>

<style scoped>
  #box{
    max-width: 1200px;
    margin: 0px auto;
  }
  #menu{
    color: #800001;
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 0;
    text-align: center;
  }
  #changeColor{
    background-color: #800001;
    color: #ffdc04;
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
</style>
