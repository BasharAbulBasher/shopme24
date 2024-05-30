<template>
  <div class="articles-slider" >
      <div :id="articles[0].category_id" class="slider d-flex" :style="'width:'+articles.length*200+'px'">
        <div id="slider-components ms-1"  class="slider-components" v-for="(article,index) in articles" :key="index">
          <div v-if="article.pictures.length>0">
            <router-link :to="{path:'/user/article/edit', query:{'id':article.id,'title':article.title ,'price':article.price,'description':article.description,'category_id':article.category_id, 'mainPicture':article.pictures[0].path}}"> <img style="width:155px;height:155px" :src="$store.state.imagesStorage+'articles/'+article.id+'/'+article.pictures[0].path" class="card-img-top" alt="..."> </router-link> 
          </div>
          <div v-else>
            <router-link :to="{path:'/user/article/edit', query:{'id':article.id,'title':article.title ,'price':article.price,'description':article.description,'category_id':article.category_id, 'mainPicture':null}}"> <img style="width:100%;height:100px" src="@/assets/logo.png" class="card-img-top" alt="..."> </router-link> 
          </div>
            <div class="card-body">
              <small class="card-title text-danger">{{ article.title|substringTit }}</small><br>
              <small class="card-text text-light">{{ article.description|substringDes }}</small>
            </div>
        </div>
      </div>
      <div class="left-icon btn" v-on:click="moveToLeft(articles[0].category_id)">
        <i class="fa-solid fa-caret-left fa-2xl" style="color: #81868d;"></i>
      </div>
      <div class="right-icon btn" v-on:click="moveToRight(articles[0].category_id)">
        <i class="fa-solid fa-caret-right fa-2xl" style="color: #81868d;"></i>
      </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data() {
    return {
      sliderPosition:0,
      endStation:0,
    };
  },

  mounted() {
    
  },

  methods: {
    moveToLeft(sliderId)
    {
      this.endStation=600-$("#"+sliderId).width();

      if(this.sliderPosition > this.endStation)
      {
        this.sliderPosition-=600;
    
       $("#"+sliderId).css('transform', 'translateX('+this.sliderPosition+'px)')
        console.log(this.sliderPosition)
      }
    },
    moveToRight(sliderId)
    {
      if(this.sliderPosition <0)
      {
        this.sliderPosition+=600;
        $("#"+sliderId).css('transform', 'translateX('+this.sliderPosition+'px)')
        console.log(this.sliderPosition)
      }
    }
  },
  props:['articles']
};
</script>
<style scoped>
.articles-slider{
  position: relative;
  width:1000px;
  border: 1px solid gray;
  height: 200px;
  overflow: hidden;
}
.slider-components {
  width:200px
}
.left-icon{
  position: absolute;
  top:50%;
  opacity: 0.7;
}
.right-icon{
  position: absolute;
  top:50%;
  right:0%;
  opacity: 0.7;
}

  
</style>