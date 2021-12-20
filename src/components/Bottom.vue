<template>
  <div id="box">
    <br>
    <div>
      <p id="AA"><b>©2021 by Maggotty High Alumni Association US Northern Region. All Right Reserved <br>
      A website by "The Mondays"</b></p>

      <br>


    </div>
    <div style="z-index: 1;">

      <b-container>


        <ul class="nav justify-content-center">
            Bottom Navigation
        </ul>
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" href="/q&a">FAQs</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/history">History</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/events">Events</a>
              </li>
               <li class="nav-item">
              <a class="nav-link" href="/donate">Donate</a>
            </li>
            </ul>

            <p></p>
        <br><br><br>

      </b-container>
    </div>

  </div>
</template>

<script>
export default {
name: "Bottom"
}
</script>

<style type="text/css" scoped>
  #box{
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  p{
    margin: 0;
    padding: 0;
  }

  #AA{
    color: #800001;
    font-size: 18px;
    text-align: center;
  }

  a{
    color: black;
  }

  #colorTop{
    background-color: #CEC094;
    height: 25px;
    position: absolute;
    z-index: 0;
  }

  #colorBottom{
    background-color: #CEC094;
    height: 50px;
    position: absolute;
    bottom: 0;
    z-index: 0;
  }



</style>
