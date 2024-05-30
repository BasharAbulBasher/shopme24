<template>
  <div class="result d-flex justify-content-center">
    <div class="result-content text-secondary text-center bg-dark p-2 card">
      <div  v-for="(article, index) in articles" :key="index">
       <div class="searched-article ">
          <a style="text-decoration: none;" :href="'/article/show?categoryId='+article.category_id">
            <span class="title text-danger">{{ article.title|substringTit }}</span> 
            <span v-if="article.pictures.length>0">
                <img class="img" :src="$store.state.imagesStorage+'articles/'+article.id+'/'+article.pictures[0].path">
            </span>
            <br>
            <span class="description text-secondary">{{ article.description|substringDes }}</span>
          </a>
       </div>
      </div>
 </div>
  </div>

</template>

<script>
export default {
  name: 'ShopmeLaravelVuejsSearchedArticles',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
  props:['articles']
};
</script>
<style scoped>
.result{
  position: relative;
}
.result-content{
  position: absolute;
  height: 100px;
  overflow:auto;
  z-index: 99;
}
.searched-article{
  border-bottom: 1px solid gray;
}
.img{
  height: 50px;
  width: 50px;
  border-radius: 100% 100% 100% 100%;
}
.description{
  font-size: 13px;
}
</style>