<template>
    <div class="login d-flex justify-content-center align-items-center bg-dark mt-5 category-update" >
       <div class="w-50 text-light">
         <h3>Update Category</h3>
         <div class="image">
            <div class="image" v-if="category.image!=null">
                <div  class="dispaly-image overflow-hidden">
                    <img class="w-100" style="height:300px" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image">
                </div>
            </div>
            <div v-else class="no-image">
                no image
            </div>
         </div>
         <div class="mb-3">
            <label for="formFile" class="form-label">Change or Set the Image</label>
            <input v-on:change="setPicture" class="form-control" type="file" id="formFile" multiple>
          </div>
         <div class="mb-3"> 
           <label  class="form-label">Title</label>
           <input v-model="title" type="text" class="form-control" />
           <small class="text-danger">{{ titleValid }}</small>
         </div>
         <div class="mb-3">
            <small class="text-primary">{{ messageAboutParent }}</small>
            <button class="btn btn-secondary form-control" v-on:click="getForm()">Change the Parent Category </button>
            <p class="text-end reset-btn"><span class="text-danger btn " v-on:click="reset()">Reset</span></p>
          </div>
          <div v-show="showForm">
            <CategoryNav  @getCategoryById="getParentData"/>
          </div>
         <button class="btn btn-danger w-100 logIn-buttun" v-on:click="update()" v-show="baseSpinner!=true">
           update
         </button>
         <BaseSpinner  v-if="baseSpinner== true"/>
         <small class="text-danger text-center">{{ errorMessage }}</small>
         <small class="text-success text-center">{{ successMessage}}</small>
       </div>
     </div>
</template>

<script>
 import BaseSpinner from '@/components/Spinner/BaseSpinner';
 import CategoryNav from '@/components/Category/CategoryNav';
import axios from 'axios';


export default {
   
    data:function()
    {
        return{
            //Category
            category:null,
            //MainCategory
            mainCategory:null,
            //Inputs
            title:"",
            //Form to change the ParentCategory
            showForm:false,
            //Spinner
            baseSpinner:false,
            //Global Success Message
            successMessage:"",
            //Global Error Message
            errorMessage:"",
            //Categories
            categories:null,
            //Info about the choosed new ParentCategory
            messageAboutParent:"",
            //Title Field Validation
            titleValid:"",
            //Set Id of the new Parent Category
            newParentCategoryId:null,
            //Set Or Change the Image
            images:null,
        }
    },
    methods:{
        getForm:function()
        {
            if(this.showForm==false)
            {
            this.showForm=true; 
            }else{
                this.showForm=false;
            }
        },
        getParentData:function({id,title})
        {
            this.newParentCategoryId=id;
            this.messageAboutParent="You have choosed "+title+"-Category as a ParentCategory";
            console.log(id,title);
        },
        reset:function()
        {
            window.location.reload();
        },
        update:function()
        {
            this.baseSpinner=true;
            var mainCategoryId;
            if(this.newParentCategoryId!=null)
            {
                mainCategoryId=this.newParentCategoryId;
            }else if(this.mainCategory!=null){
                mainCategoryId=this.mainCategory.id;
            }
            else{
                mainCategoryId=null;
            }
            console.log(mainCategoryId);
            console.log(this.images)
            axios.post(this.$store.state.baseBackendUrlRequest+"category/update",{
                id:this.category.id,
                title:this.title,
                mainCategoryId:mainCategoryId,
                images:this.images,
            },{
                headers: {
                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
                'Content-Type': 'multipart/form-data',
                }
            }).then(res=>{
                this.baseSpinner=false;
                if(res.data.success==true){
                    this.successMessage=res.data.message;
                }else{
                    this.errorMessage="Something went wrong"
                }
                console.log(res)
            }).catch(err=>{
                this.baseSpinner=false;
                if(err.response.data.errors!=null)
                {
                    if(err.response.data.errors.title!=null)
                    {
                        this.titleValid=err.response.data.errors.title[0]
                    }
                }
                this.errorMessage=err.response.data.message
                console.log(err)
            })
        },
        resetMessages:function()
        {
            this.successMessage="";
            this.errorMessage="";
            this.titleValid="";
        },
        setPicture(e)
        {
        var images = e.target.files || e.dataTransfer.files;
        this.images=images;
        },
    },
    mounted:function()
    {
        //CategoryId exists in URL
        if(this.$route.query.categoryId!=null)
        {
            //Get The Category && The MainCategory Data Using Vuex
            this.$store.dispatch('getCategoryById',{
                categoryId:this.$route.query.categoryId,
            }).then(res=>{
                //Set Category
                this.category=res.data.category;
                this.mainCategory=res.data.mainCategory;
                console.log(this.category.image)
                 //Set Title In Input
                this.title=this.category.title;
                //Set ParentCategory Data, if they exist
                if(this.mainCategory!=null)
                {
                    this.messageAboutParent="This Category has '"+this.mainCategory.title+"' as Parent Category";
                }else{
                    this.messageAboutParent="This Category is a Main Category";
                }
            }).catch(err=>{
                console.log(err)
                //Error by Request. Go to ErrorPage
            })
        }else{
            this.$router.push({ name: "ErrorPage" });
        }
    },
    components:{
        BaseSpinner,
        CategoryNav,
       
    }
}
</script>

<style>
.category-update{
    min-height: 40em;
}
.reset-btn{
    border-bottom: 1px solid brown;
}
</style>