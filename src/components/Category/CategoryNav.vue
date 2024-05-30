<template>
    <div class="category-nav">  
        <h3 class="text-danger">Categories</h3> 
        <div class="nav-header text-end" style="margin-top:-18px">
            <span class="text-primary btn" v-on:click="reset">Reset</span>
        </div>
        <div class="category-nav-body" v-for="(category, index ) in categories" :key="index">
            <p class="text-light btn" v-on:click="getCategoryById(category.id, category.title)"> {{ category.title }} </p>
        </div>

    </div>
  </template>
  
  <script>
  export default {
    data:function()
    {
        return{
        categories:null,
        }
    },
      methods:{
        getCategoryById:function(categoryId, categoryTitle)
        {
            //Pass Vla. categoryId
            this.$emit('getCategoryById',{
                'id':categoryId,
                'title':categoryTitle
            });
            //Call Func. getCategories
            this.getCategories(categoryId);
        },
        getCategories:function(categoryId)
        {
            //Get Categories Using Vuex
            this.$store.dispatch('getCategoryById',{
                categoryId:categoryId,
            }).then(res=>{
                //Check if the Categories exist
                if(res.data.category.categories.length>0)
                {
                //Set the Categories
                this.categories=res.data.category.categories;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        getMainCategories:function()
        {
            //Get The MainCategories Using Vuex
            this.$store.dispatch('getMainCategories')
            .then(res=>{
                //Set the MainCategories
                this.categories=res.data;
            }).catch(err=>{
                //Error by Request
                console.log(err);
            })
        },
        reset:function()
        {
            this.getMainCategories();
        }

      },
      created:function(){
        this.getMainCategories();
      },
  }
  </script>
  
  <style>

  
  </style>