<template>
  <div id="box">
    <p><b>Forget Password?</b></p>
    <b-form @submit.prevent="submitEmail" v-show="showEmail">
      <b-form-group label-cols="4" label-cols-lg="2" label="Email:">
        <b-form-input v-model="email" type="email" required placeholder="Enter email here"></b-form-input>
      </b-form-group>
      <b-button class="button" type="submit">Next</b-button>
    </b-form>

    <b-form @submit.prevent="submitAnswer" v-show="showQuestions">
      <b-form-group :label="savedQuestion1">
        <b-form-input v-model="inputAnswer1" type="text" required placeholder="Answer for question1"></b-form-input>
      </b-form-group>
      <b-form-group :label="savedQuestion2">
        <b-form-input v-model="inputAnswer2" type="text" required placeholder="Answer for question2"></b-form-input>
      </b-form-group>
      <b-button class="button" type="submit">Next</b-button>
    </b-form>

    <b-form @submit.prevent="submitPassword" v-show="showPassword">
      <b-form-group label-cols="4" label-cols-lg="2" :class="{'passwordError':isPassword1}" label="Password:">
        <b-form-input id="password" v-model="form.password" v-on:blur="checkPassword" type="password"
                      placeholder="Enter password" required></b-form-input>
        <div :class="isChangeBorder? 'passwordRequirementsError' : 'passwordRequirementsDefault'">
          <span>One lowercase letter required</span><br>
          <span>One uppercase letter required</span><br>
          <span>One number required</span><br>
          <span>One special character required</span><br>
          <span>8 characters minimum</span><br>
        </div>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="2" :class="{'passwordError':isPassword2}"
                    label="Renter password:">
        <b-form-input id="rePassword" v-model="form.password2" v-on:blur="comparePassword" type="password"
                      placeholder="Renter password" required></b-form-input>
        <div v-show="isShow" id="passwordNotMatch">
          <span>Please enter the same password</span>
        </div>
      </b-form-group>
      <b-button class="button" type="submit">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return{
      showEmail: true,
      showQuestions: false,
      showPassword: false,
      isPassword1: false,
      isPassword2: false,
      isChangeBorder: false,
      isShow: false,

      email: '',
      savedQuestion1: '',
      savedQuestion2: '',
      savedAnswer1: '',
      savedAnswer2: '',
      inputAnswer1: '',
      inputAnswer2: '',

      form: {
        email: '',
        password: '',
        password2: '',
      }
    }
  },

  methods: {
    async submitEmail() {
      await this.$axios.get(`/forget?email=${this.email}`).then(res=>{
        if (res.data === ""){
          alert("Account not exist, please check your email")
        } else {
          this.savedQuestion1 = res.data.question1
          this.savedQuestion2 = res.data.question2
          this.savedAnswer1 = res.data.answer1
          this.savedAnswer2 = res.data.answer2
          this.form.email = res.data.email
          this.showEmail = false
          this.showQuestions = true
        }
      })
    },

    submitAnswer() {
      if (this.savedAnswer1 === this.inputAnswer1 && this.savedAnswer2 === this.inputAnswer2) {
        this.showQuestions = false
        this.showPassword = true
      } else {
        alert("Wrong answer")
        this.inputAnswer1 = ''
        this.inputAnswer2 = ''
      }
    },

    checkPassword() {
      if (!(/\d/.test(this.form.password) && /[a-z]/.test(this.form.password) && /[A-Z]/.test(this.form.password) &&
          /[!@#$%^&*)(+=._-]/.test(this.form.password) && this.form.password.length >= 8)) {
        this.isPassword1 = true;
        this.isChangeBorder = true;
        return this.form.password = '';
      } else {
        this.isPassword1 = false;
        this.isChangeBorder = false;
      }
    },

    comparePassword() {
      if (!(this.form.password2 === this.form.password)) {
        this.isPassword2 = true;
        this.isShow = true;
        return this.form.password2 = '';
      } else {
        this.isPassword2 = false;
        this.isShow = false;
      }
    },

    async submitPassword() {
      await this.$axios.post('/forget/change', this.form).then(res=>{
        alert("The password has been reset successfully")
        this.$router.push('/login')
      })
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
.button{
  background-color: #800001;
}
p{
  font-size: 20px;
  color: #800001;
}
.passwordError {
  color: red;
}

.passwordRequirementsError {
  width: fit-content;
  border-style: solid;
  padding: 5px;
  margin-top: 5px;
  border-radius: 20px;
  color: red;
}

.passwordRequirementsDefault {
  width: fit-content;
  border-style: solid;
  padding: 5px;
  margin-top: 5px;
  border-radius: 20px;
  color: gray;
}
</style>
