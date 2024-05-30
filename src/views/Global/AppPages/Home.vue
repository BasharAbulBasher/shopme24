<template>
  <div class="home">
    <div class="row">
      <div id="category-display">
        <CategoryNav @getCategoryById="searchByCategory" class="bg-dark"/>
      </div>
      <div class="left-nav-home col-md-2 bg-dark p-2" style="min-height:500px">
          <h3 v-on:click="showCategories()"><a class="btn text-light category-title">>>Categories</a></h3>
          <div class="damen">
            <h3> 
              <a :href="'/article/show?categoryId='+d_categories.id" class="btn text-light category-title"> >>{{ d_categories.title }}</a>
            </h3>
          </div>
          <div class="herren">
            <h3> 
              <a :href="'/article/show?categoryId='+h_categories.id" class="btn text-light category-title"> >>{{ h_categories.title }}</a>
            </h3>
          </div>
          <div class="maedschen">
            <h3> 
              <a :href="'/article/show?categoryId='+m_categories.id" class="btn text-light category-title"> >>{{ m_categories.title }}</a>
            </h3>
          </div>
          <div class="jungen">
            <h3> 
              <a :href="'/article/show?categoryId='+j_categories.id" class="btn text-light category-title"> >>{{ j_categories.title }}</a>
            </h3>
          </div>

          <h3><a href="/cart" class="btn text-light"> >>Go To Cart</a> </h3>
      </div>
      <div class="display-articles col-md-10">
        <div class="searched-articlesByCategory" v-if="articlesByPageNr!=null">
          <ShowArticles v-bind:articles="articlesByPageNr"/>
          <div class="pagination d-flex justify-content-center mt-1">
              <BasePagination v-if="count>0" v-bind:count="count" @changePageNr="changePageNr($event)" />
          </div>
        </div>
        <div class="home-components">
          <DamenMode v-bind:damen_category="d_categories" class="mb-5"/>
          <HerrenMode v-bind:herren_category="h_categories" class="mb-5"/>
          <MaedschenMode v-bind:maedchen_category="m_categories" class="mb-5"/>
          <JungenMode v-bind:jungen_category="j_categories"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import CategoryNav from '@/components/Category/CategoryNav.vue';
import ShowArticles from '@/components/Article/ShowArticles.vue';
import BasePagination from '@/components/Pagination/BasePagination.vue';
import DamenMode from '@/components/HomePage/DamenMode.vue';
import HerrenMode from '@/components/HomePage/HerrenMode.vue';
import MaedschenMode from '@/components/HomePage/MädschenMode.vue';
import JungenMode from '@/components/HomePage/JungenMode.vue';
import $ from "jquery"

export default {

  data() {
    return {
        count:0,
        articles:null,
        articlesByPageNr:null,
        d_categories:null,
        h_categories:null,
        m_categories:null,
        j_categories:null,
    };
  },
  methods: {
    searchByCategory({id,title})
    {
        this.$store.dispatch('getArticlesByCategoryId',{
            categoryId:id
        }).then(res=>{
            console.log(res)
            if(res.data.childCatArticles.length>0)
            {
                this.setArticles(res.data.childCatArticles);
            }
            else if(res.data.parentCatArticles.length>0)
            {
                this.setArticles(res.data.parentCatArticles);
            }
            else if(res.data.grandCatArticles.length>0)
            {
                this.setArticles(res.data.grandCatArticles);
            }
            else{
                console.log('No Articles found...')
            }
        }).catch(err=>{
            console.log(err)
        })      
    },
    setArticles(articles)
    {
        this.articles=articles;
        this.changePageNr(1);
    },
    changePageNr(pageNr)
    {
        console.log(pageNr)
        var start=(pageNr*10)-10;
        var end=pageNr*10;
        this.articlesByPageNr=this.articles.slice(start,end);
    },
    showCategories()
    {
      $("#category-display").slideToggle();
    },
  },
  mounted(){
    //Get DamenCategories
      this.$store.dispatch('getCategories',{
        categoryId:4
      }).then(res=>{
        this.d_categories=res.data.category;
      }).catch(err=>{
        console.log(err)
      });
      //Get HerrenCategories
      this.$store.dispatch('getCategories',{
        categoryId:5
      }).then(res=>{
        this.h_categories=res.data.category;
      }).catch(err=>{
        console.log(err)
      })
      //Get MädschenCategories
      this.$store.dispatch('getCategories',{
        categoryId:6
      }).then(res=>{
        this.m_categories=res.data.category;
      }).catch(err=>{
        console.log(err)
      })
      //Get JungenCategories
      this.$store.dispatch('getCategories',{
        categoryId:7
      }).then(res=>{
        this.j_categories=res.data.category;
      }).catch(err=>{
        console.log(err)
      })
  },
  components:{
    CategoryNav,
    ShowArticles,
    BasePagination,
    DamenMode,
    HerrenMode,
    MaedschenMode,
    JungenMode,
  },
  watch:{
    articles:function()
    {
        if(this.articles!=null)
        {
            this.count=Math.ceil(this.articles.length/10);
        }else{
            this.count=0;
        }
    }
  },
};
</script>
<style scoped>
#category-display{
    display: none;
}
.category-title{
  font-size: 20px;
}


</style>
