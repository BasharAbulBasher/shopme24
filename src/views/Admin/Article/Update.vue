<template>
  <div class="update-article bg-dark mt-2 p-5 card" style="min-height: 30em">
      <h3 class="text-danger">Update Article</h3>
    <div class="text-light row mt-5">
      <div class="col-md-4 article-data">
        <h3 class="text-danger">Article Data</h3>
        <div class="mb-3">
          <label  class="form-label">Title</label>
          <input v-model="titleInput" type="text" class="form-control"/>
          <small class="text-danger">{{ title }}</small>
        </div>
        <div class="mb-3">
          <label class="form-label">Price</label>
          <input v-model="priceInput" type="number" class="form-control"/>
          <small class="text-danger">{{ price }}</small>
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea v-model="descriptionInput" type="text" class="form-control"></textarea>
          <small class="text-danger">{{ description }}</small>
        </div>
        <div class="mb-3">
          <label for="formFileMultiple" class="form-label">New Pitures</label>
          <input v-on:change="setPictures" class="form-control" type="file" id="formFileMultiple" multiple>
        </div>
      </div>
      <div class="col-md-4 category-nav">
        <CategoryNav @getCategoryById="getCategoryId"/>
        <small class="text-primary">{{ choosedCategory }}</small>
        <small class="text-danger">{{ category_id }}</small>
      </div>
      <div class="article-pictures col-md-4">
        <h3 class="text-danger">Remove Pictures</h3>
        <div v-for="(picture,index) in pictures" :key="index">
          <div class="row">
            <img class="remove-img mt-1 col-md-3" :src="$store.state.imagesStorage+'articles/'+id+'/'+picture.path" :alt="picture.path">
            <div class="form-check col-md-6">
              <input class="form-check-input" type="checkbox" v-on:click="removePictures(picture.path)">
              <label class="form-check-label" >
                Remove this Picture
              </label>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="update-article-footer">
      <button class="btn btn-danger w-100 logIn-buttun" v-on:click="update()" v-show="baseSpinner!=true">
        Update
      </button>
      <BaseSpinner v-if="baseSpinner== true" />
      <small class="text-danger text-center" >{{errorMesage}}</small>
      <h2 class="text-success text-center" >{{successMessage}}</h2>
    </div>
  </div>
</template>

<script>
import CategoryNav from '@/components/Category/CategoryNav.vue';
import BaseSpinner from '@/components/Spinner/BaseSpinner.vue';
import axios from 'axios';
import store from '@/store';

export default {
    data() {
        return {
          //Article-Data
            id: null,
            oldCategory_id:null,
            priceInput: null,
            titleInput: null,
            descriptionInput: null,
            pictures: null,
            //Global Error-Message
            errorMesage:"",
            //Global Success-Message
            successMessage:"",
            //Spinner
            baseSpinner: false,
            //Pictures to remove
            picturesToRemove:[],
            //New Pictures
            newPictures:null,
            //New Category
            newCategory_id:null,
            //ValidMessages
            title:"",
            description:"",
            price:"",
            category_id:"",
            //Data about choosed Category
            choosedCategory:"",
        };
    },
    created() {
        this.$store.dispatch('getArticleById',{
          articleId: this.$route.query.id,
        }).then(res=>{
        this.article=res.data;
        this.id=this.article.id
        this.oldCategory_id=this.article.category_id;
        this.newCategory_id=this.article.category_id;
        this.priceInput = this.article.price;
        this.titleInput = this.article.title;
        this.descriptionInput = this.article.description;
        this.pictures = this.article.pictures;
        }).catch(err=>{
          console.log(err)
        })

       
    },
    methods: {
      removePictures(path)
      {
        if(this.picturesToRemove.includes(path))
        {
          this.picturesToRemove.splice(this.picturesToRemove.indexOf(path), 1);
        }else{
          this.picturesToRemove.push(path);
        }
        console.log(this.picturesToRemove)
      },
      reset:function()
      {
        //ErrorMessage
        this.errorMessage="";
        //Success-Message
        this.successMessage="";
        //ValidMessages
        this.title="";
        this.description="";
        this.price="";
        this.category_id="";
        //Data about the choosed Category
        this.choosedCategory="";
      },
      update(){
        this.reset();
        this.baseSpinner=true;
        axios.post(this.$store.state.baseBackendUrlRequest+'article/update',{
          'id':this.id,
          'price':this.priceInput,
          'title':this.titleInput,
          'description':this.descriptionInput,
          'category_id':this.newCategory_id,
          'picturesToDelete':this.picturesToRemove,
          'pictures':this.newPictures,
        },{
          headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          'Content-Type': 'multipart/form-data',
          }
        }).then(res=>{
          this.baseSpinner=false;
          this.successMessage=res.data.message;
          window.location.reload();
        }).catch(err=>{
          console.log(err)
          this.baseSpinner=false;
          this.catchError(err)
        })
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
      setPictures:function(e){
        var files = e.target.files || e.dataTransfer.files;
        this.newPictures=files;
        console.log(this.newPictures);
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
      getCategoryId:function({id,title})
      {
        this.newCategory_id=id;
        this.choosedCategory="I will use '"+title+"' as a Category of the Article";
      },
    },
    components: { 
      CategoryNav,
      BaseSpinner,
     }
};
</script>

<style lang="scss" scoped>
.remove-img{
  widows: 40px;
  height: 40px;
}
</style>