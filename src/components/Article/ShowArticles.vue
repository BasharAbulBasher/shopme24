<template>
    <div>
        <div class="row">
            <div class="card col-md-3" v-for="(article,index) in articles" :key="index">
                <ShowArticle v-bind:article="article"/> 
            </div>
        </div> 
    </div> 
  </template>
  
  <script>
  import ShowArticle from '@/components/Article/ShowArticle';
  export default {
  props:['articles'],
  components:{
    ShowArticle
  },

  }
  </script>
  
  <style>
  
  </style>