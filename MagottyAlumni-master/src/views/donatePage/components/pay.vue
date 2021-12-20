<template>
  <div id="box">
    <p id="top">PaymentInfo</p>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label-cols="4" label-cols-lg="2" label="Select card type (*):">
        <b-form-select id="cardType" v-model="form.card" type="text" :options="VisaOrMaster" required></b-form-select>
      </b-form-group>
      <b-form-group label-cols="4" label-cols-lg="2" id="input-group-1" label="Fullname:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.fullName" type = "text" required placeholder="Please enter full name as shown on card">

        </b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" id="input-group-2" label="Cardnumber:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.cardNumber" type = "number" required placeholder="Please enter Card number"
        ></b-form-input>
      </b-form-group>


      <b-form-group label-cols="4" label-cols-lg="2" id="input-group-3" label="CVnumber:" label-for="input-3">
        <b-form-input id="input-2" v-model="form.cvNumber" type = "number" required placeholder="Please enter CV number"
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
        <b-button type="submit" variant="primary" id="button" >Confirm</b-button>
      </b-row>

    </b-form>



  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        card:'',
        fullName: '',
        cardNumber: '',
        cvNumber:'',
        streetAddress:'',
        streetAddress2:'',
        city:'',
        State:'',
        zipCode:'',

      },
      USAState: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
        'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
        'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY'],
      VisaOrMaster:['Visa','Master'],
      show: true
    }
  },
  methods: {
    onSubmit(){
      this.$router.push('/thanks')
    }

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
