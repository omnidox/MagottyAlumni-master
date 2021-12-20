<template>
  <div id="box">
    <b-form>
      <b-container>

          <b-row sm="6">
            <b-col>
            <div class="addBorder">
              <div size="120" class="user" style="margin: 0 auto">
                <b-img :src="this.userData.path" class="profile-img"></b-img>
              </div>


              <h4>My Profile</h4>
              <hr>
                  <b-form-group label-cols="6" label="First Name:">
                    <p>{{this.userData.firstName}}</p>
                  </b-form-group>
                  <b-form-group label-cols="6" label="Last Name:">
                    <p>{{this.userData.lastName}}</p>
                  </b-form-group>
                  <b-form-group label-cols="6" label="Email:">
                    <p>{{this.userData.email}}</p>
                  </b-form-group>
                  <b-form-group label-cols="6" label="Cellphone:">
                    <p>{{this.userData.cellphone}}</p>
                  </b-form-group>


            </div>
            </b-col>

            <b-col sm="6">
              <div class="addBorder">
                <h4>Shipping Address</h4>
                <hr>
                <b-row>
                  <b-col>
                    <b-form-group label-cols="6" label="Street address:">
                      <p>{{this.userData.streetAddress}}</p>
                    </b-form-group>
                    <b-form-group v-show="isShow" label-cols="6" label="Street address 2:">
                      <p>{{this.userData.streetAddress2}}</p>
                    </b-form-group>
                    <b-form-group label-cols="6" label="City:">
                      <p>{{this.userData.city}}</p>
                    </b-form-group>
                    <b-form-group label-cols="6" label="State:">
                      <p>{{this.userData.state}}</p>
                    </b-form-group>
                    <b-form-group label-cols="6" label="Zip code:">
                      <p>{{this.userData.zipCode}}</p>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </b-col>


          </b-row>

            <div class="addBorder">
              <h4>Description</h4>
              <hr>
              <b-row>
                <b-col>
                  <b-form-group label-cols="12">
                    <p style="white-space: pre-line">{{this.userData.description}}</p>
                  </b-form-group>
                </b-col>
              </b-row>
            </div>

      </b-container>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "userChild",

  data(){
    return{
      isShow: false,

      userData: {
        path: '',
        firstName: '',
        lastName: '',
        email: '',
        avatarPath: '',
        cellphone: '',
        streetAddress: '',
        streetAddress2: '',
        city: '',
        state: '',
        zipCode: '',
        description: '',
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods:{
    async getData(){
      await this.$axios.post('/profile/user', {email:this.$cookies.get('email')}).then(res=>{
        const data = res.data
        this.userData.path = "http://localhost:3000/" + data.avatarPath
        this.userData.email = data.email
        this.userData.firstName = data.firstName
        this.userData.lastName = data.lastName
        this.userData.cellphone = data.cellphone
        this.userData.streetAddress = data.streetAddress
        this.userData.streetAddress2 = data.streetAddress2
        this.userData.city = data.city
        this.userData.state = data.state
        this.userData.zipCode = data.zipCode
        this.userData.description = data.description
        if (this.userData.streetAddress2) {this.isShow = true}
      })
    }
  }
}
</script>

<style scoped>
#box{
  margin: 10px auto;
}
.user {
  width: 140px;
  height: 140px;
  border-radius: 100%;
  border: 3px solid #2e7d32;
  position: relative;
}
.profile-img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
h4{
  color: #800001;
}
  .addBorder{
    padding: 20px;
    border: 1px solid;
    border-radius: 40px;
    box-shadow: 0 0 10px black;
    margin-top: 10px;
  }
</style>
