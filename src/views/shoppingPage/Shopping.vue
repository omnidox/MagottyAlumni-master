<template>
  <div>

    <b-card v-for="product in productData" v-bind:key="product">

      <b-img :src="'http://localhost:3000/'+product.path" class="profile-img"></b-img>
      <b-card-text>Product name: {{product.name}}</b-card-text>
      <b-card-text>Unit price: {{product.price}}</b-card-text>
      <b-card-text>Available amount: {{product.amount}}</b-card-text>
      <b-card-text>Available amount: {{product.path}}</b-card-text>


      <b-button href="#" variant="primary">Add to cart</b-button>
    </b-card>
    <b-pagination
        v-model="CurrentPage"
        :total-rows="rows"
        :per-page="10"
        @click.native="changePage(CurrentPage)"
    ></b-pagination>

  </div>
</template>


<script>

const url = '/admin/products';

export default {
  data(){
    return{
      productData:[],
      currentPage:1,
      pageData:[],

    }

  },
  mounted() {
    this.getData()
  },
  methods:{

    async changePage(currentPage) {
      const newUrl = `/shopping/page?page=${currentPage}`
      await this.$axios.get(newUrl).then(res=>{
        this.productData = res.data
      })
    },
    async getData() {
      await this.$axios.get(url).then(res=>{
        this.pageData = res.data
        let arrayLength
        if(this.pageData.length < 10){
          arrayLength = this.pageData.length
        } else {
          arrayLength = 10
        }
        for (let i = 0; i < arrayLength; i++){
          this.productData[i] = this.pageData[i]
        }
      })
    }

  },

  computed:{
    rows() {
      return this.pageData.length
    }
  }
}


</script>

<style scoped>

</style>