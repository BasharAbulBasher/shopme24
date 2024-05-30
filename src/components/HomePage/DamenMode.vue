<template>
  <div>
    <div class="damen-mode">
        <div class="damen-mode-header text-center">
          <h2 class="category-title">DAMENMODE</h2>
          <div class="damen-categories row">
            <div v-for="(category, index) in damen_category.categories" :key="index" class="col-md-3">
             <a :href="'/article/show?categoryId='+category.id"><img class="cat_img" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image"></a> 
              <p class="text-secondary">{{ category.title }}</p>
            </div>
          </div>
          <div class="display_mainImage">
            <img class="main-image" :src="$store.state.imagesStorage+'categories/'+damen_category.id+'/'+damen_category.image">
            <div class="logo-text1">
              <h2 class="text1 text-secondary">SPORTMODUS</h2>
              <p class="text1-line"></p>
              <h2 class="text1 text-secondary" style="margin-top: -31px;">AKTI<span class="text-danger">V</span>IERT</h2>
            </div>
            <div class="logo-text2">
            <a  href="" style="text-decoration: none"><h4 class="text-danger">Training sah noch nie besser aus</h4></a>
            </div>
            <div class="sub-categories1">
                <div  v-for="(category, index) in categories" :key="index">
                  <div v-if="index < 3">
                    <a :href="'/article/show?categoryId='+category.id"><img class="cat-img" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image"></a>
                    <p class="m-0"><a class="text-secondary" :href="'/article/show?categoryId='+category.id">{{ category.title }}</a></p>
                  </div>
                </div>
            </div>
            <div class="sub-categories2">
                <div v-for="(category, index) in categories" :key="index">
                  <div v-if="index > 3 && index < 7">
                    <a :href="'/article/show?categoryId='+category.id"><img class="cat-img" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image"></a>
                    <p class="text-secondary m-0"><a class="text-secondary" :href="'/article/show?categoryId='+category.id">{{ category.title }}</a></p>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div class="damen-mode-body">
         
        </div>
      </div>
  </div>
</template>

<script>
export default {
  watch: {
  },

  data() {
    return {
      categories:null,
    };
  },

  mounted() {
    this.$store.dispatch('getCategories',{
      categoryId:12,
    }).then(res=>{
      this.categories=res.data.category.categories;
      console.log(this.categories)
    }).catch(err=>{
      console.log(err)
    })
  },

  methods: {
    
  },
  props:["damen_category"]
};
</script>
<style scoped>
.category-title{
    color: grey;
    letter-spacing: 10px;
  }
  .cat_img{
    width: 100px;
    height: 100px;
    border-radius: 100px 100px 100px 100px;
  }
  .category-title{
    border-bottom: 4px solid grey;
  }
  .main-image{
    width:100%;
    height:400px;
  }
  .display_mainImage{
    position: relative;
  }
  .sub-categories1{
    position: absolute;
    top: 8px;
    left: 100px;
  }
  .sub-categories2{
    position: absolute;
    top: 8px;
    right: 39px;
  }.cat-img{
    width:100px;
    height:100px;
    border-radius: 100% 100% 100% 100%;
  }
  .logo-text1{
    position: absolute;
    top: 50%;
    left: 32%;
  }
  .text1{
    font-size: 60px;
    letter-spacing: -7px;
    margin-bottom: -12px;
  }
  .text1-line{
    border-bottom: 3px solid gray;
  }
  .logo-text2{
    position: absolute;
    top: 77%;
    left: 26%;
    /*color: #f5a448;*/
    font-size: 21px;
    letter-spacing: 3px;
    border: 1px solid brown;
    z-index:2;
  }
  .logo-text2:hover{
    scale: 1.3;
  }
    
</style>