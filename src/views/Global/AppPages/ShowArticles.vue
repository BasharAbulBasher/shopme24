<template>
  <div>
    <h3>{{ parentCategoryTitle }}</h3>
    <div class="row leftNav-articles">
        <div class="left-nav col-md-2 d-flex justify-content-center">
            <div class="dispaly-left-nav row bg-dark ">
                <div class="title-image text-center" v-for="(category, index) in categories" :key="index" >
                    <a :href="'/article/show?categoryId='+category.id"><img class="main-image" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image"></a>
                    <p class="text-primary"> <a :href="'/article/show?categoryId='+category.id"> >>{{ category.title }}</a></p>
                </div>
            </div>
        </div>
        <div class="display-articles col-md-10">
            <ShowArticles v-bind:articles="pageArticles"/>
        </div>
    </div>
    <div class="foter d-flex justify-content-center mt-1">
        <BasePagination v-bind:count="count" @changePageNr="setArticlesInPage($event)"/>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import ShowArticles from '@/components/Article/ShowArticles.vue';
import BasePagination from '@/components/Pagination/BasePagination.vue';
import store from '@/store';
export default {
  data() {
    return {
        parentCategoryTitle:null,
        categories:null,
        articles:[],
        count:0,
        pageArticles:null,
    };
  },

  mounted() {
    this.getArticles(this.$route.query.categoryId)
    console.log("hello")
  },
  methods: {
    setInArticles(articles)
    {
        articles.forEach(article => {
            this.articles.push(article)
        });
    },
    setCount()
    {
        this.count=Math.ceil(this.articles.length/10)
    },
    setArticlesInPage(pageNr)
    {
        var start=(pageNr*10)-10;
        var end=pageNr*10;
        this.pageArticles=this.articles.slice(start,end);
    },
    getArticles(categoryId)
    {
        this.articles=[];
        this.$store.dispatch('getCategories',{
        categoryId:categoryId
    }).then(res=>{
        console.log(res.data)
        this.parentCategoryTitle=res.data.category.title;
        this.categories=res.data.category.categories
    }).catch(err=>{
        console.log(err)
    });
    this.$store.dispatch('getArticlesByCategoryId',{
        categoryId:categoryId
    }).then(res=>{
        if(res.data.childCatArticles.length>0)
        {
            this.setInArticles(res.data.childCatArticles);
        }
        if(res.data.parentCatArticles.length>0)
        {
            this.setInArticles(res.data.parentCatArticles);
        }
        if(res.data.grandCatArticles.length>0)
        {
            this.setInArticles(res.data.grandCatArticles);
        }
       this.setCount();
       this.setArticlesInPage(1);
    }).catch(err=>{
        console.log(err)
    })
    }
  },
  components:{
    ShowArticles,
    BasePagination,
  }
};
</script>
<style scoped>
    .main-image{
        width:50px;
        height:50px;
        border-radius: 100% 100% 100% 100%;
    }
    .left-nav{
        position: relative;
        /*overflow: hidden;*/
    }
  
    .dispaly-left-nav{
        position: absolute;
        top:-400px;
       animation: displayLeftNav 2s ease 2s both;
    }
    @keyframes displayLeftNav{
        from{
            top: -400px;
        }
        to{
             top: 0px;
        }
    }
 
</style>