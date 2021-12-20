<template>
  <div id="box">
    <b-card no-body v-show="dataReady" style="background-color: #ffdc04;">
      <b-tabs card>
        <b-tab no-body title="Pending">
          <li v-for="(pending, index) in pendingData" v-bind:key="index">
            <p>Order Number: <b>{{pending.orderNumber}}</b></p>
            <p>Email: <b>{{pending.email}}</b></p>
            <button class="deleteButton" @click.prevent="trackingButton(index, pending.orderNumber)">add tracking</button>
            <button class="changeButton" @click.prevent="deleteOrder(pending.orderNumber)">cancel</button>
            <b-form @submit.prevent="addTracking()" v-show="showPendingChange[index]">
              <b-form-group  label-cols="4" label-cols-lg="2" label="tracking:">
                <b-form-input v-model="addTrackingForm.tracking" type="text" required placeholder="Enter tracking number"></b-form-input>
              </b-form-group>
              <b-button class="button" type="submit">Add</b-button>
            </b-form>
            <hr>
          </li>
          <b-pagination
              v-model="currentPendingPage"
              :total-rows="this.pendingPageData.length"
              :per-page="10"
              @click.native="changePendingPage(currentPendingPage)"
          ></b-pagination>
        </b-tab>

        <b-tab no-body title="Shipping">
          <li v-for="(shipping, index) in shippingData" v-bind:key="index">
            <p>Order Number: <b>{{shipping.orderNumber}}</b></p>
            <p>Email: <b>{{shipping.email}}</b></p>
            <button class="deleteButton" @click.prevent="delivered(shipping.orderNumber)">delivered</button>
            <hr>
          </li>
          <b-pagination
              v-model="currentShippingPage"
              :total-rows="this.shippingPageData.length"
              :per-page="10"
              @click.native="changeShippingPage(currentShippingPage)"
          ></b-pagination>
        </b-tab>

        <b-tab no-body title="Delivered">
          <li v-for="(delivered, index) in deliveredData" v-bind:key="index">
            <p>Order Number: <b>{{delivered.orderNumber}}</b></p>
            <p>Email: <b>{{delivered.email}}</b></p>
            <hr>
          </li>
          <b-pagination
              align="center"
              v-model="currentDeliveredPage"
              :total-rows="this.deliveredPageData.length"
              :per-page="10"
              @click.native="changeDeliveredPage(currentDeliveredPage)"
          ></b-pagination>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return{
      currentPendingPage: 1,
      currentShippingPage: 1,
      currentDeliveredPage: 1,
      currentFindPage: 1,
      findOrderEmail: '',
      showResult: false,
      dataReady: false,

      showPendingChange: [false, false, false, false, false, false, false, false, false, false],
      showFindOrderChange: [false, false, false, false, false, false, false, false, false, false],

      pendingPageData: [],
      shippingPageData: [],
      deliveredPageData: [],
      findPageData: [],

      pendingData: [],
      shippingData: [],
      deliveredData: [],
      findData: [],

      addTrackingForm: {
        orderNumber: '',
        tracking: '',
      },

      addFoundTrackingForm: {
        orderNumber: '',
        tracking: '',
    }


    }
  },
  created() {
    this.getPendingData()
    this.getShippingData()
    this.getDeliveredData()
  },

  methods: {
    async delivered(orderNumber) {
      await this.$axios.post('/admin/delivered', {orderNumber: orderNumber}).then(res=>{

        this.$router.go(0)
      })
    },



    async getPendingData() {
      await this.$axios.get('/admin/findPending').then(res=>{
        if (res.data.length === 0){
          console.log("no data")
        } else {
          this.pendingPageData[0] = res.data[0]
          let indexForPage = 1

          for (let i = 1; i < res.data.length; i++){
            if (this.pendingPageData[indexForPage-1].orderNumber !== res.data[i].orderNumber){
              this.pendingPageData[indexForPage] = res.data[i]
              indexForPage++
            }
          }
          let arrayLength
          if(this.pendingPageData.length < 10){
            arrayLength = this.pendingPageData.length
          } else {
            arrayLength = 10
          }
          for (let j = 0; j < arrayLength; j++){
            this.pendingData[j] = this.pendingPageData[j]
          }
        }
      })
    },

    async getShippingData() {
      await this.$axios.get('/admin/findShipping').then(res=>{
        if (res.data.length === 0){
          console.log("no data")
        } else {
          this.shippingPageData[0] = res.data[0]
          let indexForPage = 1
          for (let i = 1; i < res.data.length; i++){
            if (this.shippingPageData[indexForPage-1].orderNumber !== res.data[i].orderNumber){
              this.shippingPageData[indexForPage] = res.data[i]
              indexForPage++
            }
          }
          let arrayLength
          if(this.shippingPageData.length < 10){
            arrayLength = this.shippingPageData.length
          } else {
            arrayLength = 10
          }
          for (let j = 0; j < arrayLength; j++){
            this.shippingData[j] = this.shippingPageData[j]
          }
        }
      })
    },

    async getDeliveredData() {
      await this.$axios.get('/admin/findDelivered').then(res=>{
        if (res.data.length === 0){
          console.log("no data")
        } else {
          this.deliveredPageData[0] = res.data[0]
          let indexForPage = 1
          for (let i = 1; i < res.data.length; i++){
            if (this.deliveredPageData[indexForPage-1].orderNumber !== res.data[i].orderNumber){
              this.deliveredPageData[indexForPage] = res.data[i]
              indexForPage++
            }
          }
          let arrayLength
          if(this.deliveredPageData.length < 10){
            arrayLength = this.deliveredPageData.length
          } else {
            arrayLength = 10
          }
          for (let j = 0; j < arrayLength; j++){
            this.deliveredData[j] = this.deliveredPageData[j]
          }
        }
        this.dataReady = true
      })
    },

    changePendingPage(currentPage) {
      let showNumber = this.pendingPageData.length - (10 * (currentPage - 1))
      if (showNumber > 10){
        showNumber = 10
      }
      this.pendingData = []
      for (let i = 0; i < showNumber; i++){
        this.pendingData[i] = this.pendingPageData[(10 * currentPage) - (10 - i)]
      }
        this.addTrackingForm.orderNumber = ''
        this.addTrackingForm.tracking = ''
    },



    changeShippingPage(currentPage) {
      let showNumber = this.shippingPageData.length - (10 * (currentPage - 1))
      if (showNumber > 10){
        showNumber = 10
      }
      this.shippingData = []
      for (let i = 0; i < showNumber; i++){
        this.shippingData[i] = this.shippingPageData[(10 * currentPage) - (10 - i)]
      }
    },

    changeDeliveredPage(currentPage) {
      let showNumber = this.deliveredPageData.length - (10 * (currentPage - 1))
      if (showNumber > 10){
        showNumber = 10
      }
      this.deliveredData = []
      for (let i = 0; i < showNumber; i++){
        this.deliveredData[i] = this.deliveredPageData[(10 * currentPage) - (10 - i)]
      }
    },



    async addTracking() {
      await this.$axios.post('/admin/addTracking', this.addTrackingForm).then(res=>{
        this.$router.go(0)
      })
    },



    async deleteOrder(orderNumber) {
      let answer = window.confirm("Are you sure?")
      if (answer){
        await this.$axios.post('/admin/deleteOrder', {orderNumber: orderNumber}).then(res=>{
          this.$router.go(0)
        })
      }
    },


    trackingButton(index, orderNumber) {
      for (let i = 0; i < 10; i++){
        this.$set(this.showPendingChange, i, false)
      }
      this.$set(this.showPendingChange, index, !this.showPendingChange[index])
      this.addTrackingForm.orderNumber = orderNumber
      this.addTrackingForm.tracking = ''
    }
  },



}
</script>

<style scoped>
#box{
  padding: 20px;
  margin: 20px auto;
}
p{
  margin: 0;
  padding: 0;
}
.deleteButton{
  background-color: #CEC094;
  color: #800001;
}
.changeButton{
  background-color: #CEC094;
  color: #800001;
  margin-left: 10px;
}
li{
  list-style: none;
}
.button{
  background-color: #800001;
}
</style>
