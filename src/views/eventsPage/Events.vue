<template>
  <div id="box">
    <b-container>

      <ul class="nav justify-content-center">
        <b-row class="center" > <p id="menu">Events</p></b-row>
      </ul>

      <ul class="nav justify-content-center">
        <router-link :id="isUpcoming? 'changeColor': ''" to="/events/upcoming" tag="li">Up-Coming Events</router-link>

      </ul>
      <ul class="nav justify-content-center">
        <router-link :id="isvolunteer? 'changeColor': ''" to="/events/volunteer" tag="li">Volunteer Events</router-link>
      </ul>

      <ul class="nav justify-content-center">
        <router-link :id="isAlumnievent? 'changeColor': ''" to="/events/alumnievent" tag="li">Alumni Events</router-link>
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
name: "Events",
  data(){
    return{
      isUpcoming: false,
      isvolunteer: false,
      isAlumnievent: false,
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
      this.isUpcoming = false
      this.isvolunteer = false
      this.isAlumnievent = false
      switch (path[2]) {
        case 'upcoming':
          this.isUpcoming = true
          break
        case 'volunteer':
          this.isvolunteer = true
          break
        case 'alumnievent':
          this.isAlumnievent = true
          break
      }
    }
  },
}
</script>

<style scoped>
#box{
  max-width: 1200px;
  margin: 20px auto;
}
#left{
  padding: 0;
  list-style: none;
  border: 1px solid;
  border-radius: 20px;
  box-shadow: 0 0 10px black;
  text-align: center;
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
</style>
