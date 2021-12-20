<template>
  <div id="box">
    <b-container>
      <b-col>
        <b-row sm="5" class="addBorder">
          <h4>Change my avatar</h4>
          <hr>
          <div size="120" class="user" style="margin: 0 auto">
            <b-img :src="this.userPhoto.path" class="profile-img"></b-img>
            <b-icon class="icon primary white--text" @click="$refs.FileInput.click()"><b>+</b></b-icon>
            <input ref="FileInput" type="file" style="display: none;" @change="onFileSelect" />
          </div>
          <b-container v-model="dialog" width="500">
            <b-card>
              <b-card-text>
                <VueCropper v-show="selectedFile" ref="cropper" :src="selectedFile" alt="Source Image"></VueCropper>
              </b-card-text>
              <b-card>
                <b-btn class="primary button" @click="saveImage() (dialog = false)">Crop</b-btn>
              </b-card>
            </b-card>
          </b-container>
        </b-row>

        <b-row sm="5" class="addBorder">
          <b-form @submit.prevent="changeDescription">
            <h4>Change my description</h4>
            <hr>
            <b-form-textarea v-model="userDescription.description" rows="5"></b-form-textarea>
            <b-button class="button" type="submit">Change description</b-button>
          </b-form>
        </b-row>
      </b-col>
    </b-container>

  </div>
</template>


<script>
import VueCropper from "vue-cropperjs"
import 'cropperjs/dist/cropper.css'

export default {
  components: { VueCropper },
  props: ['image_name'],
  data() {
    return {
      mime_type: '',
      cropedImage: '',
      autoCrop: false,
      selectedFile: '',
      image: '',
      dialog: false,
      files: '',

      userDescription: {
        email: '',
        description: ''
      },

      userPhoto: {
        email: '',
        path: '',
      },

    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    saveImage() {
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('profile_photo', blob, 'name.jpeg')
        formData.append('email', this.userPhoto.email)
        this.$axios.post('profile/changePhoto', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res=>{
          this.userPhoto.path = "http://localhost:3000/" + res.data
          alert('success')
          this.$router.go(0)
        })
      }, this.mime_type)
    },
    onFileSelect(e) {
      const file = e.target.files[0]
      this.mime_type = file.type
      if (typeof FileReader === 'function') {
        this.dialog = true
        const reader = new FileReader()
        reader.onload = (event) => {
          this.selectedFile = event.target.result
          this.$refs.cropper.replace(this.selectedFile)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    async getData(){
      await this.$axios.post('/profile/user', {email:this.$cookies.get('email')}).then(res=>{
        const data = res.data
        this.userPhoto.email = data.email
        this.userPhoto.path = "http://localhost:3000/" + data.avatarPath
        this.userDescription.email = data.email
        this.userDescription.description = data.description
      })
    },
    async changeDescription() {
      await this.$axios.post('/profile/changeDescription', this.userDescription).then(res=>{
        alert(res.data)
      })
    },
  },
}
</script>
<style scoped>
#box{
  margin: 20px auto;
}
h4{
  color: #800001;
}
.button{
  background-color: #800001;
  margin-top: 10px;
}
.user {
  width: 140px;
  height: 140px;
  border-radius: 100%;
  border: 3px solid #2e7d32;
  position: relative;
}
.addBorder{
  padding: 20px;
  border: 1px solid;
  border-radius: 40px;
  box-shadow: 0 0 10px black;
  margin-right: 20px;
}
.profile-img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.icon {
  position: absolute;
  top: 10px;
  right: 0;
  background: #e2e2e2;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
  text-align: center;
  color: #0000ff;
  font-size: 14px;
  cursor: pointer;
}
</style>
