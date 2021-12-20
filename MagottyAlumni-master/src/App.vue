<template>
  <div id="box">
    <navBar :key="$route.fullPath"></navBar>
    <router-view></router-view>


    <bottomDiv></bottomDiv>

  </div>
</template>

<script>
import navBar from './components/NavBar';
import bottom from './components/Bottom';


export default {
  components: {
    navBar: navBar,
    bottomDiv: bottom,
  }
}
</script>

<style>
#box{
  background-color: #ffdc04;
}
</style>
