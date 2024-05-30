<template>
  <div class="show-article">
    <div v-if="article.pictures.length>0" >
      <img class="show-img" :src="imagesStorage+'articles/'+article.id+'/'+article.pictures[0].path" alt="No-pic">
    </div>
      <div class="header">
        <h5 class="header-title">{{ article.title|substringTit }}</h5>
        <p class="header-price text-primary mb-0">{{ article.price }}€</p>
      </div>
      <div class="body">
        <p class="m-0">{{ article.description|substringDes }}...</p>
      </div>
      <div class="footer">
        <div v-if="isAdmin">
          <div v-if="article.pictures.length>0" >
            <router-link class="btn btn-danger w-100" :to="{path:'/admin/article/edit', query:{'id':article.id,'title':article.title ,'price':article.price,'description':article.description,'category_id':article.category_id,'mainPicture':article.pictures[0].path}}"> show</router-link>
          </div>
          <div v-else>
            <router-link class="btn btn-danger w-100" :to="{path:'/admin/article/edit', query:{'id':article.id,'title':article.title ,'price':article.price,'description':article.description,'category_id':article.category_id}}"> show</router-link>
          </div>
        </div>
        <div v-else>
          <div v-if="article.pictures.length>0" >
            <router-link class="btn btn-danger w-100" :to="{path:'/user/article/edit', query:{'id':article.id,'title':article.title ,'price':article.price,'description':article.description,'category_id':article.category_id, 'mainPicture':article.pictures[0].path}}"> show</router-link>
          </div>
          <div v-else>
            <router-link class="btn btn-danger w-100" :to="{path:'/user/article/edit', query:{'id':article.id,'title':article.title ,'price':article.price,'description':article.description,'category_id':article.category_id}}"> show</router-link>
          </div>
          <a class="btn btn-outline-danger w-100 mt-1" v-on:click="addToCart(article,$event)">Add to Cart</a>
        </div>

      
        
      </div>
  </div>
</template>

<script>
import $ from "jquery"
export default {
  data:function()
  {
    return{
      editArticle:null,
      imagesStorage:this.$store.state.imagesStorage,
      isAdmin:false,
    }
  },
  methods:
  {
    addToCart(article,e)
    {
      var articles=[];
      //localStorage.removeItem("articlesInCart");
      if(localStorage.getItem("articlesInCart")==null)
      {
        articles.push(article);
        localStorage.setItem("articlesInCart",JSON.stringify(articles))
      }else{
        JSON.parse(localStorage.getItem("articlesInCart")).forEach(articleInCart => {
          articles.push(articleInCart);
        });
        articles.push(article);
        localStorage.setItem("articlesInCart",JSON.stringify(articles))
      }
      //Add Animation to Button 'addToCart'
      $(e.target).addClass('add-to-cart')
      setTimeout(()=>$(e.target).removeClass("add-to-cart"),2000);
      //Increment Count of Articles in CartSympol in NavBar
      $("#count-articles-inCart").addClass("inc-count-articles")
      setTimeout(()=>$("#count-articles-inCart").removeClass("inc-count-articles"),1000)
      $("#count-articles-inCart").text('');
      $("#count-articles-inCart").text(JSON.parse(localStorage.getItem('articlesInCart')).length);
    }
  },
  props:['article'],
  mounted(){
    var roles = JSON.parse(localStorage.getItem("roles"));
      if(roles !=null && roles.some((role) => role.title == "ADMIN"))
      {
        this.isAdmin=true;
      }
  }

}
</script>

<style>

.show-img{
  width: 230px;
  height: 155px;
}
.add-to-cart{
  animation: addToCart 2s ease ;
}
@keyframes addToCart{
  from{
    box-shadow: 0 0 0px brown,0 0 0px brown,0 0 0px brown;
  }
  to{
    box-shadow: 0 0 10px brown,0 0 40px brown,0 0 80px brown;
  }
}
.inc-count-articles{
  animation: incCountArticles 1s linear ;
}
@keyframes incCountArticles{
  0%{
    top:8px;
  }
  50%{
    top:-11px;
  }
  100%{
    top:-22px;
  }
}

</style>