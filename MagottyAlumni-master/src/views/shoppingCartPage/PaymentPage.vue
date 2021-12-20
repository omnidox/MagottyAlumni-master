<template>
  <div id="box">
    <p id="top">PaymentInfo</p>
    <b-form @submit.prevent="isEnough">
      <b-form-group label-cols="4" label-cols-lg="2" label="Select card type (*):">
        <b-form-select id="cardType"  type="text" :options="VisaOrMaster" required></b-form-select>
      </b-form-group>
      <b-form-group label-cols="4" label-cols-lg="2" id="input-group-1" label="Firstname:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.firstName" type = "text" required placeholder="Please enter first name as shown on card">

        </b-form-input>
      </b-form-group>
      <b-form-group label-cols="4" label-cols-lg="2" id="input-group-2" label="Lastname:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.lastName" type = "text" required placeholder="Please enter last name as shown on card">

        </b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" id="input-group-3" label="Cardnumber:" label-for="input-3">
        <b-form-input id="input-3" type = "number" required placeholder="Please enter Card number"
        ></b-form-input>
      </b-form-group>


      <b-form-group label-cols="4" label-cols-lg="2" id="input-group-4" label="CVnumber:" label-for="input-4">
        <b-form-input id="input-4"  type = "number" required placeholder="Please enter CV number"
        ></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" id="input-group-5" label="Cell Phone:" label-for="input-5">
        <b-form-input id="input-5" v-model="form.cellphone" type = "number" required placeholder="Enter Cell phone Number"
        ></b-form-input>
      </b-form-group>

      <div id="shippingInfo">
        <p id = "mid" >Enter billing Address:</p>

        <b-form-group label-cols="4" label-cols-lg="2" label="Street address (*):">
          <b-form-input id="streetAddress" v-model="form.streetAddress" type="text" placeholder="Enter street address"
                        required></b-form-input>
        </b-form-group>

        <b-form-group label-cols="4" label-cols-lg="2" label="Street address 2 (optional):">
          <b-form-input id="streetAddress2" v-model="form.streetAddress2" type="text"
                        placeholder="optional"></b-form-input>
        </b-form-group>

        <b-form-group label-cols="4" label-cols-lg="2" label="City (*):">
          <b-form-input id="city" v-model="form.city" type="text" placeholder="Enter city" required></b-form-input>
        </b-form-group>

        <b-form-group label-cols="4" label-cols-lg="2" label="State (*):">
          <b-form-select id="state" v-model="form.State" type="text" :options="USAState"
                         required></b-form-select>
        </b-form-group>

        <b-form-group label-cols="4" label-cols-lg="2" label="Zip code (*):">
          <b-form-input id="zipCode" v-model="form.zipCode" type="number" placeholder="Enter Zip code"
                        required></b-form-input>
        </b-form-group>

      </div>
      <b-row align-h="around">
        <b-button id="button" variant="primary" type="submit">Confirm</b-button>
      </b-row>

    </b-form>



  </div>
</template>

<script>
export default {
  data() {
    return {
      product:[],
      amount:[],
      availableAmount:[],
      foundProduct:[],
      form: {
        firstName:'',
        lastName:'',
        streetAddress:'',
        streetAddress2:'',
        city:'',
        State:'',
        zipCode:0,
        email:'',
        product:'',
        amount:0,
        orderNumber:0,
        cellphone:0,
        newAmount:0,



      },
      USAState: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
        'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
        'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY'],
      VisaOrMaster:['Visa','Master'],
      show: true
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.form.email = this.$cookies.get('email')
      const url = `/cart?email=${this.form.email}`
      await this.$axios.get(url).then(res=>{
        for (let i = 0 ; i < res.data.length ; i++){
          this.product[i] = res.data[i].item

        }
        for(let j = 0 ; j<res.data.length ; j++){
          this.amount[j] = res.data[j].amount

        }

      })
    },
    async isEnough(){
      const time = new Date();
      this.form.orderNumber = time.getTime()

      let Enough = true

      for ( let i = 0 ; i < this.product.length ; i++){


          await this.$axios.get(`/shopping/isEnough?item=${this.product[i]}`).then(res=>{
           this.foundProduct[i] = res.data
          })

      }


      for (let j = 0 ; j < this.product.length; j++){
        if(this.foundProduct[j].amount < this.amount[j]){
          alert('Sorry,'+this.product[j]+'is out of stack')
          Enough = false
          break
        }
      }



      if (Enough){
        for (let k = 0 ; k <this.product.length ; k++){
          this.form.amount = this.amount[k]
          this.form.product = this.product[k]
          this.form.newAmount = this.foundProduct[k].amount - this.amount[k]
          await this.$axios.post('shopping/success',this.form)
          await this.$axios.post('shopping/clearCart',this.form)
          await this.$axios.post('shopping/reset',this.form)
        }

      }
      await this.$router.push('/confirm')


    },

  },

}



</script>


<style scoped>

#box{
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px #eee;
  margin: 20px auto;
  display: table;
  width: 1200px;
  text-align: center;
}
#button{
  background-color: #800001;
  font-size: 40px;
}

#top{
  text-align: left;
  color: black;
  margin-bottom: 30px;
  font-size: 40px;
}

#mid{
  text-align: left;
  color: black;
  margin-bottom: 30px;
  font-size: 40px;
}


</style>
