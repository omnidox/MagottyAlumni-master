<template>
  <div id="box">
    <b-card id="card" >
      <b-img :src="require('../../assets/gradual-growth-plant-scheme-sprout-260nw-1927551848.jpg')" fluid></b-img>
      <b-card-text>From sapling to mighty trees, your donations will help ensure the growth of all Maggotty Alumni. </b-card-text>
      <b-card-text>Please donate today!</b-card-text>

    </b-card>
    <b-form-group label="Donate options:" id="from-group">
      <b-form-radio v-model="selected"  name="some-radios" value="5" > $ 5</b-form-radio>
      <b-form-radio v-model="selected"  name="some-radios" value="10">$ 10</b-form-radio>
      <b-form-radio v-model="selected"  name="some-radios" value="20">$ 20</b-form-radio>
      <b-form-radio v-model="selected"  name="some-radios" value="50">$ 50</b-form-radio>
    <br>
      <b-card-text>Or add a custom amount!</b-card-text>


      <b-form-radio v-model="selected"  name="some-radios" :value="value">$ {{value}}
        <b-form-input @click="clicked" id="input-2" v-model="value" type="number"  required
        ></b-form-input>
      </b-form-radio>

    </b-form-group>
    <b-button href="/pay" variant="primary" id="button">Donate $ {{selected}}</b-button>


  </div>
</template>

<script>



export default {
  data() {
    return {
      selected:'5',
      value: 1,

      show: true
    }
  },
  methods:{
    clicked(){
      this.selected = this.value
    },

    check() {
      if (this.selected < 0) {
        this.selected = ''
      }
    }
  }
}



</script>


<style scoped>

#box{
  max-width: 1200px;
  margin: 0 auto;


}
#card{
  background-color: #ffdc04;
  border: #ffdc04;
  text-align: center;
}
#from-group{
  margin-left: 45%;
}
#input-2{
  position: center;
}
#button{
  margin-left: 46%;
  background-color: #800001;
}


</style>
