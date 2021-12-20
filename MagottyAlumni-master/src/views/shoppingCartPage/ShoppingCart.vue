<template>
  <div id="box">
    <p id="top">Shopping Cart</p>
    <div v-show="emptyPage">
      <ul>
        <ul>Your cart is empty now. Let's go shopping.</ul>

      </ul>
    </div>

    <b-card v-for="(items,index) in cart" v-bind:key="index" id="card">
      <b-img :src="'http://localhost:3000/'+items.path" class="profile-img" style="max-width: 200px"></b-img>
      <b-card-text>{{items.item}}</b-card-text>
      <b-card-text>Unit price: {{items.price}}$/ea</b-card-text>
      <b-form-group label-cols="4" label-cols-lg="2" label="Choose amount:">
          <b-form-input id="input-4" v-model=items.amount min="1" type = "number" :max=items.maxAmount v-on:blur = "changeAmount(index)" required placeholder="Chose amounts.">

          </b-form-input>
      </b-form-group>
      <b-button @click.prevent="deleteItems(index)" id="button1">Remove this item from cart</b-button>

    </b-card>
      <b-button href="/order" v-show="!emptyPage" id="button2">Check out!</b-button>

  </div>
</template>

<script>
export default {
  data(){
    return {
        emptyPage: false,
        cart:[],
        pageData:[],
        email:'',
        form:{
          amount:'',
          email: '',
          path: '',
        }

    }

  },
  mounted() {
    this.getData()
  },
  methods:{
    async getData() {
      this.email = this.$cookies.get('email')
      const url = `/cart?email=${this.email}`
      await this.$axios.get(url).then(res=>{
        this.cart = res.data
        if(this.cart.length===0){
          this.emptyPage = true

        }

      })
    },


    async changeAmount(index){
      this.form.email = this.$cookies.get('email')
      this.form.amount = this.cart[index].amount
      this.form.path = this.cart[index].path





      await this.$axios.post('/cart/changeAmount',this.form).then(res=>{
        this.cart = res.data
      })
    },

    async deleteItems(index){
      this.form.email = this.$cookies.get('email')
      this.form.path = this.cart[index].path
      let answer = window.confirm("Do you want to remove this item from your shopping cart?")
      if (answer){
        await this.$axios.post('/cart/deleteItems',this.form).then(res=>{
          console.log(res.data)
          this.$router.go(0)
        })
      }

    }


  },




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
  text-align: center;
}
#card{
  background-color: #ffdc04;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
}
#button1,#button2{
  background-color: #800001;
}

</style>
