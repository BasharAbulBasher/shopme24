<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid"> 
                <a class="text-danger" href="/" style="text-decoration: none"><span class="bg-light logo"><img class="logo-image" src="@/assets/logo.png"></span></a>
                <h3 class="navbar-brand"><a class="text-danger" href="/" style="text-decoration: none; margin-left: 34px;">ShopMe</a></h3>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn" href="/fashion">Fashions</a>
                      </li>
                </ul>
                <form class="d-flex" style="margin-right: -20px;">
                    <input v-on:keyup="getResult()" v-model="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                </form>
                <ul class="mb-2 mb-lg-0">
                    <a class="btn btn-danger w-100" href="/auth/login"> Login <i class="fa-solid fa-lock"></i></a>
                </ul>
                </div>
            </div>
        </nav>
        <div class="searched-articles">
            <SearchedArticles v-if="showResult" v-bind:articles="articles" />
        </div>
    </div>
</template>

<script>
import SearchedArticles from '@/components/Article/SearchedArticles.vue'
import $ from 'jquery'
export default {
    data:function(){
        return {
            search:null,
            searchedValues:[],
            articles:null,
            showResult:false,
        }
    },
    methods:{
        getResult()
        {
            this.setResult()
            this.searchedValues=this.search.split(" ");
            this.$store.dispatch("getSearchedArticles",{
                searchedValues:this.searchedValues.reverse(),
            }).then(res=>{
                this.articles=res.data.articles;
            }).catch(err=>{
                console.log(err)
            })

        },
        setResult()
        {
            this.showResult=false;
            if(this.search!="")
            {
                this.showResult=true;
            }
        }

    },
    components:{
        SearchedArticles,
    },
}
</script>

<style>
.logo{
    border-radius: 100% 100% 100% 100%;
  }
  .logo-image{
    height: 44px;
    width: 44px;
  }
</style>