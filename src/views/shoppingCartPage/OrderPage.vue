<template>
  <div id="box">
    <p id="top">Please Confirm your order!</p>
    <ul id="item" v-for="(order,index) in total" v-bind:key="index">
      <strong><p>{{order.item}}</p></strong>
    </ul>
    <p id="total"><strong>Total: {{this.newTotal}}$</strong></p>
    <b-button href="/payment" id="button1">Confirm</b-button>
    <b-button href="/cart" id="button2">Cancel</b-button>



  </div>
</template>

<script>
export default {
  data(){
    return{

      total:[],
      email:'',
      price:[],
      amount:[],
      newTotal: 0,

      form:{
        email:'',
        item:'',
      }

    }
  },
  mounted() {

    this.countTotal()
  },
  methods:{

    async countTotal(){
      this.email = this.$cookies.get('email')
      const url = `/cart?email=${this.email}`
      await this.$axios.get(url).then(res=>{

        this.total = res.data
        this.price = res.data.price
        this.amount = res.data.amount

        for(let i = 0 ; i < this.total.length ; i++){
          this.newTotal += this.total[i].amount * this.total[i].price


        }


      })
    }
  }
}
</script>

<style scoped>
#top{
  text-align: Left;
  color: #800001;
  margin-bottom: 30px;
  font-size: 25px;
}
#box{
  padding: 20px;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  margin: 20px auto;
  display: table;
  width: 1200px;
}
#item{
  margin-left: 42%;
}
#total{
  margin-left: 46%;
}
#button1{
  background-color: #800001;
  margin-left: 40%;
}
#button2{
  background-color: #800001;
  margin-left: 5%;
}

</style>
