<template>
  <div>
    <div class="row mt-3 ms-1"> 
        <div class="col-md-2 article-search bg-dark">
            <div class="">
                <p>Article Search</p>
                <div class="search-by-category">
                    <CategoryNav @getCategoryById="searchByCategory"/>
                </div>
                <div class="search-by-name">
                    <div class="mb-3">
                        <h4 class="text-danger">Search by Articles Title</h4>
                        <input v-on:keyup="srearchByTitle()" v-model="articleTitle" type="text" class="form-control" placeholder="Title...." name="articleTitle" >
                    </div>
                </div>
                <div class="search-by-article-id mt-5"> 
                    <div class="input-group mb-3">
                        <h4 class="text-danger">Search by Articles Id</h4>
                        <button class="btn btn-outline-danger" type="button" v-on:click="searchById()">Search</button>
                        <input v-model="articleId" type="number" min="0" class="form-control" placeholder="Id...." name="articleId" >
                    </div>
                </div>
            </div>
        </div> 
        <div class="col-md-10 display">
            <div class="row">
                <h4 v-if="article==null && articles==null" class="text-center" >No Articles....</h4>
                <div class="display-article">
                    <ShowArticle class="col-md-3 display-article card" v-if="article!=null"   v-bind:article="article"/>
                </div>
                <div class="col-md-12 display-articles-pagination">
                    <ShowArticles   v-if="articlesByPageNr!=null"  v-bind:articles="articlesByPageNr"/>
                </div>
                <BasePagination v-if="count>0" v-bind:count="count" @changePageNr="changePageNr($event)" class="d-flex justify-content-center mt-1"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import BasePagination from '@/components/Pagination/BasePagination.vue'
import ShowArticles from '@/components/Article/ShowArticles.vue'
import ShowArticle from '@/components/Article/ShowArticle.vue'
import CategoryNav from '@/components/Category/CategoryNav.vue'
import axios from 'axios'
//
export default {
    data:function()
    {
        return{
            count:0,
            articles:null,
            article:null,
            articleTitle:null,
            articleId:null,
            articlesByPageNr:null,
        }
    },
    methods:{
        changePageNr:function($event)
        {
            var start=($event*10)-10;
            var end=$event*10;
            this.articlesByPageNr=this.articles.slice(start,end);
        },
        searchByCategory({id,title})
        {
            this.$store.dispatch('getArticlesByCategoryId',{
                categoryId:id
            }).then(res=>{
                console.log(res.data)
                if(res.data.childCatArticles.length>0)
                {
                     this.setNewArticles(res.data.childCatArticles);
                }
               else if(res.data.parentCatArticles.length>0)
                {
                    this.setNewArticles(res.data.parentCatArticles);
                }
                 else if(res.data.grandCatArticles.length>0)
                {
                    this.setNewArticles(res.data.grandCatArticles);
                }
                else{
                    console.log('Error by Search of Articles')
                }

                console.log(this.articles)
            }).catch(err=>{
                console.log(err)
            })
        },
        srearchByTitle:function()
        {
            axios.post(this.$store.state.baseBackendUrlRequest+"article/getArticlesByTitle",{
                articleTitle:this.articleTitle
            }).then(res=>{
                this.setNewArticles(res.data)
            }).catch(err=>{
                console.log(err)
            })
            
        },
        searchById:function()
        {
            axios.post(this.$store.state.baseBackendUrlRequest+"article/getArticleById",{
                articleId:this.articleId
            }).then(res=>{
                console.log(res.data)
                this.resetResponseArticles();
                if(res.data==null || res.data=='')
                {
                    this.article=null;
                }
                else{
                    console.log('article'+res.data)
                    this.article=res.data
                }

            }).catch(err=>{
                console.log(err)
            })
        },
        startPage:function()
        {
            this.articlesByPageNr=this.articles.slice(0,10);
        },
        resetResponseArticles:function()
        {
            this.articles=null;
            this.articlesByPageNr=null;
            this.article=null;
        },
        setNewArticles(articles)
        {
            this.resetResponseArticles();
            this.articles=articles;
            this.startPage();
        }
    },
    created:function()
    {
        this.$store.dispatch('getArticles').then(res=>{
            //Set Articles
            this.articles=res.data;
            this.startPage();
            console.log(this.articles)
        }).catch(err=>{
            console.log(err)
        })
    },
    components: { 
        BasePagination,
        ShowArticles,
        CategoryNav,
        ShowArticle,
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
    }

}
</script>

<style>

</style>