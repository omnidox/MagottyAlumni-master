<template>
  <div id="box">
    <b-row>
      <b-col>
    <div>
      <b-form @submit.prevent="submitAdd">
        <h4>Add news</h4>
        <div v-show="isShowAdd">
          <b-form-group label-cols="4" label-cols-lg="2" label="Title:">
            <b-form-input v-model="addForm.title" type="text" required placeholder="Enter title"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="3" label="Content:">
            <b-form-textarea v-model="addForm.content" required placeholder="Enter content" rows="5"></b-form-textarea>
          </b-form-group>
          <b-button class="button" type="submit">Add News Content</b-button>
        </div>
      </b-form>
      <hr>
    </div>
      </b-col>


      <b-col>
    <div class="margin">
      <b-form>
        <h4>Find news</h4>
        <b-form-group label-cols="4" label-cols-lg="2" label="Title:">
          <b-form-input id="title" v-model="findTitle" type="text" required placeholder="Enter title"></b-form-input>
        </b-form-group>
        <b-button class="button" @click.prevent="submitFind(findTitle)">Find news</b-button>
      </b-form>
      <div v-show="showChange[10]">
        <ul>
          <li>Title: <b>{{changeForm.title}}</b></li>
        </ul>
        <button class="deleteButton" @click.prevent="deleteCareer(changeForm.sortDate)">delete</button>
        <button class="changeButton" @click="showFindChange = !showFindChange">change</button>
      </div>
        <b-form @submit.prevent="submitChange" v-show="showFindChange">
          <b-form-group label-cols="4" label-cols-lg="2" label="Title:">
            <b-form-input v-model="changeForm.title" type="text" required></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="content:">
            <b-form-textarea v-model="changeForm.content" type="text" rows="5" required></b-form-textarea>
          </b-form-group>
          <b-form-checkbox v-model="changeForm.checkbox" value="checked" unchecked-value="unchecked">Move to the front</b-form-checkbox>
          <b-button class="button" type="submit" >Submit change</b-button>
        </b-form>
      <hr>
    </div>
      </b-col>
    </b-row>

    <div v-show="isShowCrop">
      <div size="120" class="user" style="margin: 0 auto">
        <b-icon class="icon primary white--text" @click="$refs.FileInput.click()">add picture</b-icon>
        <input ref="FileInput" type="file" style="display: none;" @change="onFileSelect" />
      </div>
      <b-container v-model="dialog" width="500">
        <b-card>
          <b-card-text>
            <VueCropper v-show="selectedFile" ref="cropper" :src="selectedFile" alt="Source Image"></VueCropper>
          </b-card-text>
          <b-card>
            <b-btn class="button primary" @click="savePhoto() (dialog = false)">Crop</b-btn>
          </b-card>
        </b-card>
      </b-container>
    </div>

    <div class="margin">
      <h4>News list</h4>
      <ul>
        <li v-for="(career, index) in careerData" :key="index">
          Title: <b>{{career.title}}</b>
          <br>
          <button class="deleteButton" @click.prevent="deleteCareer(career.sortDate)">delete</button>
          <button class="changeButton" @click.prevent="clickChangeCareer(index, career.title, career.content, career.sortDate, career.oldSortDate)">change</button>
          <b-form @submit.prevent="submitChange" v-show="showChange[index]">
            <b-form-group label-cols="4" label-cols-lg="2" label="Title:">
              <b-form-input v-model="changeForm.title" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="2" label="content:">
              <b-form-textarea v-model="changeForm.content" type="text" rows="5" required></b-form-textarea>
            </b-form-group>
            <b-form-checkbox v-model="changeForm.checkbox" value="checked" unchecked-value="unchecked">Move to the front</b-form-checkbox>
            <b-button class="button" type="submit" >Submit change</b-button>
          </b-form>
          <hr>
        </li>
      </ul>

      <b-pagination
          align="center"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="10"
          @click.native="changePage(currentPage)"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VueCropper from "vue-cropperjs";


const url = '/resources/news'
export default {
  components: { VueCropper },
  props: ['image_name'],
  data() {
    return{
      mime_type: '',
      cropedImage: '',
      autoCrop: false,
      selectedFile: '',
      image: '',
      dialog: false,
      files: '',

      showChange: [false, false, false, false, false, false, false, false, false, false, false],
      currentPage: 1,
      careerData: [],
      pageData: [],
      showFindChange: false,
      findTitle: '',
      isShowAdd: true,
      isShowCrop: false,

      changeForm: {
        title: '',
        content: '',
        oldSortDate: '',
        sortDate: '',
        checkbox: 'unchecked',
      },

      addForm: {
        title: '',
        content: '',
        sortDate: '',
        date: '',
        path: '',
      }
    }
  },

  methods: {
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
          this.careerData[i] = this.pageData[i]
        }
        console.log()
      })
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

    async submitFind() {
      const url = `/admin/findCareer?title=${this.findTitle}`
      await this.$axios.get(url).then(res=>{
        if (res.data === 'not found') {
          alert("Can not find")
        } else {
          this.changeForm.title = res.data.title
          this.changeForm.content = res.data.content
          this.changeForm.sortDate = res.data.sortDate
          this.changeForm.oldSortDate = res.data.sortDate
          for (let i = 0; i < 11; i++){
            this.$set(this.showChange, i, false)
          }
          this.$set(this.showChange, 10, true)
          this.showFindChange = false
        }
      })
    },

    async changePage(currentPage) {
      const newUrl = `/resources/career/page?page=${currentPage}`
      await this.$axios.get(newUrl).then(res=>{
        this.careerData = res.data
        for (let i = 0; i < 11; i++){
          this.$set(this.showChange, i, false)
        }
        this.showFindChange = false
        this.changeForm.title = ''
        this.changeForm.content = ''
        this.changeForm.sortDate = ''
        this.changeForm.oldSortDate = ''
        this.changeForm.checkbox = 'unchecked'
      })
    },

    submitAdd() {
      const today = new Date()
      this.addForm.sortDate = Date.now()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()
      this.addForm.date = yyyy + '-' + mm + '-' + dd
      this.$axios.post('/admin/addCareer', this.addForm).then(res=>{

        alert("Please add picture")
        this.isShowAdd = false
        this.isShowCrop = true
      })
    },

    savePhoto() {
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('news_photo', blob, 'name.jpeg')
        formData.append('name', this.addForm.title)
        alert('success')
        this.$axios.post('/admin/addNewsPhoto', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res=>{

          this.$router.go(0)
        })}, this.mime_type)
    },

    async submitChange(){
      if (this.changeForm.checkbox === 'checked'){
        this.changeForm.sortDate = Date.now()
      }
      await this.$axios.post('/admin/changeCareer', this.changeForm).then(res=>{

        this.$router.go(0)
      })
    },

    async deleteCareer(sortDate) {
      let answer = window.confirm("You you sure?")
      if (answer){
        await this.$axios.post('/admin/deleteCareer', {sortDate: sortDate}).then(res=>{

          this.$router.go(0)
        })
      }
    },

    clickChangeCareer(index, title, content, sortDate){
      for (let i = 0; i < 11; i++){
        this.$set(this.showChange, i, false)
      }
      this.$set(this.showChange, index, !this.showChange[index])
      this.changeForm.title = title
      this.changeForm.content = content
      this.changeForm.sortDate = sortDate
      this.changeForm.oldSortDate = sortDate
      this.changeForm.checkbox = 'unchecked'
      this.showFindChange = false
    },
  },



  mounted() {
    this.getData()
  },

  computed:{
    rows() {
      return this.pageData.length
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
h4{
  color: #800001;
}
hr{
  height: 1px;
  background-color: #800001;
  color: #800001;
}
.margin{
  margin-top: 20px;
}
.button{
  background-color: #800001;
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
.icon{
  background-color: #800001;
  color: white;
  font-size: 20px;
  border: 1px solid #800001;
  border-radius: 5px;
}
ul{
  list-style: none;
}
</style>
