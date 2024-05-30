<template>
    <div class="jungen-mode mb-5">
      <h2 class="category-title text-center">JUNGEN</h2>
      <div class="row">
        <div v-for="(category, index) in jungen_category.categories" :key="index" class="col-md-3">
          <a class="bg-dark d-block text-center mb-1" :href="'/article/show?categoryId='+category.id"><img class="cat_img" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image"><span class="text-warning btn">{{ category.title }}</span></a> 
        </div>
      </div>
      <div class="display-mainImage bg-dark mt-2">
        <div class="row">
          <div class="col-md-6 cover">
            <img class="main-image w-100" :src="$store.state.imagesStorage+'categories/'+jungen_category.id+'/'+jungen_category.image">
            <h2 class="text-logo1 text-secondary"> TO ALL THE BOYS</h2>
            <h2 class="text-logo2 text-secondary"> AlWAYS AND FOREVER</h2>
          </div>
          <div class="col-md-6">
            <div class="mt-1 ms-5" v-for="(category, index) in categories" :key="index">
             <a :href="'/article/show?categoryId='+category.id"> <img class="cat_img" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image"> </a> 
              <span class="ms-2"><a class="text-warning" :href="'/article/show?categoryId='+category.id">{{ category.title }}</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  
    data() {
      return {
        categories:null,
      };
    },
  
    mounted() {
      this.$store.dispatch('getCategories',{
      categoryId:31,
    }).then(res=>{
      this.categories=res.data.category.categories;
      console.log(this.categories)
    }).catch(err=>{
      console.log(err)
    })
    },
  
    methods: {
      
    },
    props:['jungen_category']
  };
  </script>
  <style scoped>
  .category-title{
      color: grey;
      letter-spacing: 10px;
      border-bottom: 4px solid grey;
    }
    .cat_img{
      width: 100px;
      height: 100px;
      border-radius: 100px 100px 100px 100px;
    }
    .jungenModeLogo{
      width: 512px;
      height: 240px;
    }
    .main-image{
      width:50%;
      height: 400px;
      border-radius: 50% 50% 50% 50%;
    }
    .cover{
      position: relative;
    }
    .text-logo1{
      position:absolute;
      top: 40%;
      left: 8%;
      font-size: 45px;
      letter-spacing:6px;
    }
    .text-logo2{
      position:absolute;
      top: 51%;
      left: 19%;
      font-size: 22px;
      letter-spacing: 6px;
      border-top: 1px solid yellow;
    }
  </style>