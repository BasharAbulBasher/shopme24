<template>
  <div class="mt-2">
    <div class="header d-flex justify-content-center">
      <div class="">
        <div class="display-image row">
          <div class="damen col-6">
            <div v-on:mouseover="showDamenCategories()" v-on:mouseleave=" heddenDamenCategories()" class="display-img text-end">
              <img class="damen-img" style="height: 200px;" src="@/assets/Damen/damenLogo.png">
            </div>
            <div class="display-title text-center">
              <p class="fw-bold text-secondary">Women's Fashion</p>
            </div>
          </div>
          <div class="herren col-6">
            <div v-on:mouseover="showHerrenCategories()" v-on:mouseleave=" heddenHerrenCategories()" class="display-img text-end">
              <img class="herren-img" style="height: 200px;" src="@/assets/Herren/herrenLogo.png">
            </div>
            <div class="display-title">
              <p class="text-center fw-bold text-secondary">Men's Fashion</p>
            </div>
          </div>
        </div>
        <div class="display-menu row" style="margin-bottom: -78px;">
          <div class="col-6 damen-menu" >
            <div class="d-categories" v-on:mouseover="showDamenCategories()" v-on:mouseleave=" heddenDamenCategories()">
              <div v-for="(category,index) in d_categories" :key="index">
                <div class="mb-1 text-center">
                  <small class="d-block"><a :href="'/article/show?categoryId='+category.id">{{ category.title }}</a></small>
                </div>
              </div>
            </div>
          </div>
            <div class="col-6 herren-menu">
              <div class="h-categories" v-on:mouseover="showHerrenCategories()" v-on:mouseleave=" heddenHerrenCategories()">
                <div v-for="(category,index) in h_categories" :key="index">
                  <div class="mb-1 text-center">
                    <small class="d-block"><a :href="'/article/show?categoryId='+category.id">{{ category.title }}</a></small>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    <div class="body d-flex justify-content-center mb-5">
      <div class="damen-sliders bg-dark p-5">
        <h3 class="text-danger">WOMENS-FASHION</h3>
        <div class="damen-slider-header">
          <img style="width: 100%;height:194px" src="@/assets/Damen/Schuhen/schuhenLogo.jpg" alt="">
        </div>
        <div>
          <div class="damen-slider3 bg-dark mt-2">
            <ArticlesSlider v-bind:articles="d_slider3_articles" />
          </div>
          <div class="damen-slider1 bg-dark mt-2">
            <ArticlesSlider v-bind:articles="d_slider1_articles" />
          </div>
          <div class="damen-slider2 bg-dark mt-2">
            <ArticlesSlider v-bind:articles="d_slider2_articles" />
          </div>
        </div>


      </div>


    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import ArticlesSlider from '@/components/Slider/ArticlesSlider'
export default {

  data() {
    return {
      d_categories:null,
      h_categories:null,
      d_slider1_articles:[],
      d_slider2_articles:[],
      d_slider3_articles:[],
    };
  },

  mounted() {
    //Get Damen-Categories
    this.$store.dispatch('getCategories',{
      categoryId:4,
    }).then(res=>{
      this.d_categories=res.data.category.categories;
    }).catch(err=>{
      console.log(err)
    })
    //Get Herren-categories
    this.$store.dispatch('getCategories',{
      categoryId:5,
    }).then(res=>{
      this.h_categories=res.data.category.categories;
    }).catch(err=>{
      console.log(err)
    })
    //Get Damen Slider1 Articles
    this.$store.dispatch("getArticlesByCategoryId",{
      categoryId:12
    }).then(res=>{
      console.log(res.data)
      res.data.parentCatArticles.forEach(article => {
        this.d_slider1_articles.push(article)
      });
    }).catch(err=>{
      console.log(err)
    })
    //Get Damen Slider2 Articles
    this.$store.dispatch("getArticlesByCategoryId",{
      categoryId:21
    }).then(res=>{
      console.log(res.data)
      res.data.parentCatArticles.forEach(article => {
        this.d_slider2_articles.push(article)
      });
    }).catch(err=>{
      console.log(err)
    })
    //Get Damen Slider2 Articles
    this.$store.dispatch("getArticlesByCategoryId",{
      categoryId:11
    }).then(res=>{
      console.log(res.data)
      res.data.parentCatArticles.forEach(article => {
        this.d_slider3_articles.push(article)
      });
    }).catch(err=>{
      console.log(err)
    })
  },
  methods: {
    showDamenCategories()
    {
      $(".d-categories").fadeIn();
      $(".damen-img").css("transform","scale(0.7)")
    },
    heddenDamenCategories()
    {
      $(".d-categories").fadeOut();
      $(".damen-img").css("transform","scale(1)")
    },
    showHerrenCategories()
    {
      $(".h-categories").fadeIn();
      $(".herren-img").css("transform","scale(0.7)")
    },
    heddenHerrenCategories()
    {
      $(".h-categories").fadeOut();
      $(".herren-img").css("transform","scale(1)")
    },
  },
  components:{
    ArticlesSlider,
  }
};
</script>

<style scoped>
.header{
    position: relative;
}
.d-categories{
    display: none;
}
.h-categories{
  display:none;
}
.cat-img{
    width:50px;
    height:50px;
    border-radius: 100% 100% 100% 100%;
}
.damen-menu{
  height: 200px;
  overflow:auto;
  margin-left: 0px;
  margin-top: -20px;
}
.herren-menu{
  height: 200px;
  overflow:auto;
  margin-left: 0px;
  margin-top: -20px;
}

</style>