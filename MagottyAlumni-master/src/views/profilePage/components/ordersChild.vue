<template>
  <div id="box" v-show="dataReady">
    <h3>Orders</h3>
    <hr>
    <ul>
      <li v-for="(order, index) in orderData" v-bind:key="index">
        Order Number: {{order.orderNumber}}<br>
        Status: {{order.status}}<br>
        <b-button @click.prevent="showDetail(index, order.orderNumber)" id="danger">show more details</b-button>
        <ul v-for="(orders, index2) in orderDetail" v-bind:key="index2" v-show="showOrderChange[index]">
          {{orders.product}} x {{orders.amount}}
        </ul>
        <hr>
      </li>
    </ul>


    <b-pagination
        align="center"
        class="align-middle"
        v-model="currentPage"
        :total-rows="this.orderPageData.length"
        :per-page="10"
        @click.native="changePage(currentPage)"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currentPage: 1,
      dataReady: false,
      orderPageData: [],
      orderData: [],
      showOrderChange: [false, false, false, false, false, false, false, false, false, false],
      orderDetail: [],
    }
  },

  mounted () {
    this.getData()

  },

  methods: {
     async getData() {
       await this.$axios.post('/profile/orders', {email: this.$cookies.get('email')}).then(res=>{


        if (res.data.length === 0){
          console.log('no data')
        } else {
          this.orderPageData[0] = res.data[0]
          let indexForPage = 1
          for (let i = 0; i < res.data.length; i++){
            if (this.orderPageData[indexForPage -1].orderNumber !== res.data[i].orderNumber){
              this.orderPageData[indexForPage] = res.data[i]
              indexForPage++
            }
          }
        }

        let arrayLength
        if (this.orderPageData.length < 10){
          arrayLength = this.orderPageData.length
        } else {
          arrayLength = 10
        }
        for (let j = 0; j < arrayLength; j++){
          this.orderData[j] = this.orderPageData[j]
        }
         this.dataReady = true
      })
    },

    changePage(currentPage){
       this.showOrderChange = [false, false, false, false, false, false, false, false, false, false]
      let showNumber = this.orderPageData.length - (10 * (currentPage - 1))
      if (showNumber > 10){
        showNumber = 10
      }
      this.orderData = []
      for (let i = 0; i < showNumber; i++){
        this.orderData[i] = this.orderPageData[(10 * currentPage) - (10 - i)]
      }
    },

    async showDetail(index, orderNumber) {
      for (let i = 0; i < 10; i++){
        this.$set(this.showOrderChange, i, false)
      }
      await this.$axios.get(`/profile/orderNumber?orderNumber=${orderNumber}`).then(res=>{
        this.orderDetail = res.data
      })
      this.$set(this.showOrderChange, index, !this.showOrderChange[index])
    }


  }


}
</script>

<style scoped>
#box{
  padding: 20px;
  border: 1px solid;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  margin: 20px auto;
}
#danger{
  background-color: #800001;
}
h3{
  color: #800001;
}
li{
  list-style: none;
}
</style>
