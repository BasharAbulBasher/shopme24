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
            <a class="nav-link btn" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
            <a class="nav-link btn" href="/fashion">Fashions</a>
          </li>
          </ul>
          <form class="d-flex me-1" >
            <input v-on:keyup="getResult()" v-model="search" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          </form>  
          <p id="count-articles-inCart" class="text-danger text-center">{{ countArticlesInCart }}</p>
          <a href="/cart" ><i class="fa fa-shopping-cart text-light me-3" aria-hidden="true"></i></a> 
          <div class="nav-item dropdown text-danger">
            <a class="nav-link dropdown-toggle btn" id="user-dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-user" aria-hidden="true"></i>
            </a>
            <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown" style="top: 150%;left:-140px">
              <li><a class="dropdown-item text-secondary" href="/user/deliveryAddress">Delivery Addresses</a></li>
              <li><a class="dropdown-item text-secondary" href="/user/invoice/show">Invoicess & Orders</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item btn text-danger" v-on:click="logout()">Logout</a></li>
            </ul>
          </div>
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
  data:function()
  {
    return{
      countArticlesInCart:JSON.parse(localStorage.getItem('articlesInCart')).length,
      search:null,
      searchedValues:[],
      articles:null,
      showResult:false,
    }
  },
  methods:{
    logout:function()
    {
      this.$store.dispatch('logout')
      .then(res=>{
        console.log(res);
        if(res.data.success==true)
        {
          if(this.$route.name=='Home')
          {
          window.location.reload();
          }
          else{
          this.$router.push({ name: "Home" });
          window.location.reload();
          }
        }
        else{
          if(this.$route.name!='ErrorPage')
          {
            this.$router.push({ name: "ErrorPage" });
            window.location.reload();
          }
        }
      })
      .catch(err=>{
        if(this.$route.name!='ErrorPage')
          {
            //this.$router.push({ name: "ErrorPage" });
            //window.location.reload();
            console.log(err)
          }
      })
    },
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
  }

}
</script>

<style>
#count-articles-inCart
{
  position: absolute;
  right: 60px;
  top:0px;
  font-size: larger;
}
.logo{
  border-radius: 100% 100% 100% 100%;
}
.logo-image{
  height: 44px;
  width: 44px;
}

</style>