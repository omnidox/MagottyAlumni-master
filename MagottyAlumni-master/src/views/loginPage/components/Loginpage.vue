<template>
  <div id="box" style="background-color: darkred">
    <b-form @submit.prevent="onSubmit" v-if="show">
      <b-form-group label-cols="4"  id="input-group-1" style="color: yellow" label="Email:" label-for="input-1">
        <b-form-input id="input-1" v-model="form.email" type="email" required placeholder="Enter email here."
        ></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" id="input-group-2" style="color: yellow" label="Password:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.password" type = "password" required placeholder="Enter password here."
        ></b-form-input>
      </b-form-group>


      <b-form-group id="input-group-3" >
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-3">
          <b-form-checkbox style="color: yellow" id="checkbox" v-model="me" >Remember me</b-form-checkbox>
          <b-link href="/forget" style="color: yellow">Forgot password</b-link>
        </b-form-checkbox-group>
      </b-form-group>
      <b-row align-h="around">
        <b-button type="submit" variant="primary" >Login</b-button>
        <a href="/register"><b-button variant="danger" >Sign up</b-button></a>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      me: [],
      form: {
        email: '',
        password: '',
      },
      show: true
    }
  },
  methods: {
    async onSubmit(){
      await this.$axios.post('/login',this.form).then(res=>{
        if (typeof (res.data) === 'object'){
          if (this.me === [true]){
            this.$cookies.set('email', res.data.email, 60 * 60 * 24 * 30)
            this.$cookies.set('isAdmin', res.data.isAdmin, 60 * 60 * 24 * 30)
            this.$router.go(-1)
          } else {
            this.$cookies.set('email', res.data.email, 60 * 60 * 24)
            this.$cookies.set('isAdmin', res.data.isAdmin, 60 * 60 * 24)
            this.$router.go(-1)
          }
        } else {
          alert(res.data)
        }
      }).catch(function (err){
        alert(err)})
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
  margin: 30px auto;
  display: table;
}


</style>
