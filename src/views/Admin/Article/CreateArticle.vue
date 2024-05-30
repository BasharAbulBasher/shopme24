<template>
  <div class="create-article container bg-dark mt-3  p-3 card" style="min-height:30em">
    <h3 class="text-danger mb-3">Create Article</h3>
    <div class="row">
      <div class="col-md-6 text-light">
        <h3 class="text-danger">Article Data</h3>
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input class="form-control" v-model="titleInput"/>
          <small class="text-danger text-center">{{title}}</small>
        </div>
        <div class="mb-3">
          <label class="form-label">Price</label>
          <input class="form-control" v-model="priceInput"/>
          <small class="text-danger text-center">{{price}}</small>
        </div>
        <div class="mb-3">
          <label  class="form-label">Description</label>
          <textarea class="form-control" v-model="descriptionInput"/>
          <small class="text-danger text-center">{{description}}</small>
        </div>
        <div class="mb-3">
          <label for="formFileMultiple" class="form-label">Pitures</label>
          <input v-on:change="setPictures" class="form-control" type="file" id="formFileMultiple" multiple>
        </div>
      </div>
      <div class="col-md-6">
        <categoryNav @getCategoryById="getCategoryId"/>
        <small class="text-primary">{{ choosedCategory }}</small>
        <p><small class="text-danger">{{ category_id}}</small></p>
      </div>
      <button class="btn btn-danger w-100 logIn-buttun" v-on:click="create()" v-show="baseSpinner!=true">
        CREATE
      </button>
      <BaseSpinner v-if="baseSpinner== true" />
      <small class="text-danger text-center">{{errorMessage}}</small>
      <small class="text-success text-center">{{successMessage}}</small>
    </div>
  </div>
</template>

<script>
import CategoryNav from '@/components/Category/CategoryNav.vue';
import BaseSpinner from '@/components/Spinner/BaseSpinner.vue';
import axios from 'axios';
export default {
  data:function(){
    return {
      //Artricle-Data
      titleInput:null,
      priceInput:null,
      descriptionInput:null,
      category_idInput:null,
      pictures:null,
      //Spinner
      baseSpinner:false,
      //Error-Message
      errorMessage:"",
      //Success-Message
      successMessage:"",
      //ValidMessages
      title:"",
      description:"",
      price:"",
      category_id:"",
      //Data about the choosed Category
      choosedCategory:"",

    }
  },
  methods:{
    reset:function()
    {
      //ErrorMessage
      this.errorMessage="";
      //Success-Message
      this.successMessage="";
      this.categoryEnabeleMessage="";
      //ValidMessages
      this.title="";
      this.description="";
      this.price="";
      this.category_id="";
      //Data about the choosed Category
      this.choosedCategory="";

    },
    create:function()
    {
      this.reset();
      this.baseSpinner=true;
      axios.post(this.$store.state.baseBackendUrlRequest+'article/save',{
        title:this.titleInput,
        price:this.priceInput,
        description:this.descriptionInput,
        pictures:this.pictures,
        category_id:this.category_idInput,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          'Content-Type': 'multipart/form-data',
        }
      }).then(res=>{
        console.log(res)
        this.baseSpinner=false;
        this.successMessage=res.data.message;
        this.resetInputs();
      }).catch(err=>{
        this.baseSpinner=false;
        this.catchError(err)
        console.log(err)
      })
    },
    getCategoryId:function({id,title})
    {
      console.log(id,title)
      this.category_idInput=id;
      this.choosedCategory="I will use '"+title+"' as a Category of the Article";
    },
    catchError:function(err)
    {
      var errResponseData=err.response.data;
      this.errorMesage=errResponseData.message;
      if(errResponseData.errors!=null)
      {
        this.getValidAttributes().forEach(attr => {
          if(errResponseData.errors[attr]!=null)
          {
            this[attr]=errResponseData.errors[attr][0];
          }
        });
      }
    },
    getValidAttributes:function()
    {
      return[
        'title',
        'price',
        'description',
        'category_id',
       ]
    },
    setPictures:function(e){
      var files = e.target.files || e.dataTransfer.files;
      this.pictures=files;
    },
    resetInputs:function()
    {
      this.titleInput=null;
      this.priceInput=null;
      this.descriptionInput=null;
      this.category_idInput=null;
    }
  },
    components:{
      CategoryNav,
      BaseSpinner,
    }
}

</script>

<style>
.logIn-buttun {
  font-size: 25px;
  font-weight: bolder;
  letter-spacing: 5px;
}
</style>