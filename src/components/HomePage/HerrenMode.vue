<template>
  <div>
    <div class="damen-mode">
        <div class="damen-mode-header text-center">
          <h2 class="category-title">HERRENMODE</h2>
          <div class="damen-categories row">
            <div v-for="(category, index) in herren_category.categories" :key="index" class="col-md-3">
             <a :href="'/article/show?categoryId='+category.id"><img class="cat_img" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image"></a> 
              <p class="text-secondary">{{ category.title }}</p>
            </div>
          </div>
          <div class="display-mainImage">
            <img class="main-image" :src="$store.state.imagesStorage+'categories/'+herren_category.id+'/'+herren_category.image">
          </div>
        </div>
        <div class="damen-mode-body">
       
        </div>
      </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
  props:["herren_category"]
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
  .main-image{
    width:100%;
    height: 400px;
  }

</style>