<template>
  <div class="login d-flex justify-content-center align-items-center bg-dark mt-5" style="height: 25em">
    <div class="w-50 text-light">
      <h3 class="">Create Category</h3>
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input class="form-control" v-model="title"/>
        <small class="text-danger">{{ titleErorrMessge }}</small>
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">Piture</label>
        <input v-on:change="setPicture" class="form-control" type="file" id="formFile">
      </div>
      <div class="mb-3">
        <button class="btn btn-secondary form-control" v-on:click="chooseMainCategory()">Choose Parent-Category</button>
        <button class="btn btn-secondary form-control mt-3" v-on:click="asMainCategory()">The New Category is a Main-Category</button>
        <small class="text-primary">{{ resultMessage }}</small>
      </div>
      <button class="btn btn-danger w-100 crateCategory-buttun" v-on:click="create()" v-show="baseSpinner!=true">
        Create
      </button>
      <BaseSpinner v-if="baseSpinner== true" />
      <small class="text-danger text-center">{{ errorMesage}}</small>
      <small class="text-success text-center">{{ successMessage}}</small>
    </div>
    <div id="chooseMainCategoryForm" v-show="chooseMainCategoryForm">
      <p class="closeForm btn text-danger" v-on:click="closeForm()">Close</p>
      <div id="chooseMainCategoryForm-body" class="row text-light">
          <div class="col-md-6">
            <h3>MainCategories</h3>
            <div v-for="mainCategory in mainCategories" :key="mainCategory">
              <p class="btn text-light categoryTitle" v-on:click="getCategories(mainCategory.id, mainCategory.title)">{{ mainCategory.title }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <h3>Categories</h3>
            <div v-for="category in categories" :key="category">
              <p class="btn text-light categoryTitle" v-on:click="getCategories(category.id, category.title)">{{ category.title }}</p>
            </div>
          </div>
      </div>
      <div class="chooseMainCategoryForm-footer text-center">
        <p class="btn btn-danger w-50" v-on:click="getMainCategoryDaten()">Choose {{ mainCategoryTitle }} as a Parent-Category</p>
        <div>
          <small class="text-primary">{{ mainCategoryMessage }}</small>
        </div>
      </div>
       
     
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseSpinner from '@/components/Spinner/BaseSpinner.vue';
import axios from 'axios';

export default {
  data: function () {
    return {
      baseSpinner:false,
      errorMesage:null,
      title:null,
      chooseMainCategoryForm:false,
      mainCategories:null,
      categories:null,
      mainCategoryTitle:null,
      mainCategoryId:null,
      mainCategoryMessage:"",
      resultMessage:"",
      titleErorrMessge:"",
      errorMesage:"",
      successMessage:"",
      thisCategoryIsMainCategory:false, 
      isMainCategory:false,
      image:null,
      
    };
  },
  methods: {
    chooseMainCategory:function()
    {
      this.reset();
      this.chooseMainCategoryForm=true;
      this.$store.dispatch('getMainCategories')
      .then(res=>{
        this.mainCategories=res.data
      }).catch(err=>{
        console.log(err)
      })
    },
    asMainCategory:function()
    {
      this.reset();
      this.resultMessage="You have choosed, that the New Category is a Main Category";
      this.isMainCategory=true;
    },
    closeForm:function()
    {
      this.reset();
      this.chooseMainCategoryForm=false;
    },
    getCategories:function(categoryId,categoryTitle)
    {
      this.mainCategoryMessage="";
      this.mainCategoryTitle=categoryTitle;
      this.mainCategoryId=categoryId;
      this.$store.dispatch('getCategories',{
        categoryId:categoryId,
      }).then(res=>{
        this.categories=res.data.category.categories;
        if(res.data.category.categories.length==0)
        {
          this.mainCategoryMessage=this.mainCategoryTitle+' has NOT Child-Categories at the Moment';
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getMainCategoryDaten:function() 
    {
      this.mainCategoryMessage="";
      this.resultMessage="";
      console.log('mainCategoryId:'+this.mainCategoryId+'. mainCategoryTitle:'+this.mainCategoryTitle)
      if(this.mainCategoryId==null)
      {
        this.mainCategoryMessage="Please choose a Parent-Category";
      }else{
        this.resultMessage="You have chossed "+this.mainCategoryTitle+" as a Parent-Category";
        this.chooseMainCategoryForm=false;
      }
    },
    reset:function()
    {
      this.mainCategoryMessage="";
      this.resultMessage="";
      this.titleErorrMessge="";
      this.errorMesage="";
      this.successMessage="";
      this.mainCategoryId=null;
      this.mainCategoryTitle=null;
      this.isMainCategory=false;
    },
    resetMessage:function()
    {
      this.titleErorrMessge="";
      this.errorMesage="";
      this.successMessage="";
    },
    create:function()
    {
      this.resetMessage();
      if(this.isMainCategory==false && this.mainCategoryId==null)
      {
        this.resultMessage="Please choose a Parent-Category. If the new Categpry has'nt a Parent-Category, click the bove Buttun";
      }
      else if(this.isMainCategory==true)
      {
        this.createCategory(null);
      }
      else if(this.mainCategoryId!=null)
      {
        this.createCategory(this.mainCategoryId)
      }
      else{
        this.resultMessage="Something went worng!!!"
      }
    },
    createCategory:function(mainCategoryId)
    {
      axios.post(this.$store.state.baseBackendUrlRequest+"category/save",{
        mainCategoryId:mainCategoryId,
        title:this.title,
        image:this.image,
      },{
        headers: {
             Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
             'Content-Type': 'multipart/form-data',
            }
      }).then(res=>{
        this.title=null;
        var message=" ";
        if(res.data.success==true){
          message+=res.data.message+". ";
          message+="The Category is "+res.data.category.title+". ";
          if(res.data.mainCategory==null)
          {
            message+="This Category is a Main Category."
          }
          else{
            message+="This Category has Category-'"+res.data.mainCategory+"' as a Parent Category."
          }
          this.successMessage=message;
        }else{
          this.errorMesage= this.errorMesage="Something went wrong";
        }
      }).catch(err=>{
        this.title=null;
        if(err.response.data.errors!=null)
        {
          if(this.titleErorrMessge=err.response.data.errors.title!=0)
          {
            this.titleErorrMessge=err.response.data.errors.title[0];
          }
        }else{
            this.errorMesage="Something went wrong!!"
        }
      })
    },
    setPicture(e)
    {
      var images = e.target.files || e.dataTransfer.files;
      this.image=images[0];
    },
  },
  components:{
    BaseSpinner
  }
}
</script>

<style>
#chooseMainCategoryForm{
position: absolute;
height: 500px;
background-color: black;
width: 100%;
opacity: 0.9;
}
.closeForm{
  position: absolute;
  right: 0px;
}

.categoryTitle:hover{
  margin-left: 3px;
  font-size: large;
}


</style>
