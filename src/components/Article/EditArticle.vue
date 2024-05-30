<template>
    <div class="edit-article">
        <div class="d-felx justify-content-center align-items-center bg-dark">
            <div class="display-main-picture">
                <div class="img-cover">  
                    <div class="img-cover-text d-flex justify-content-center align-items-center h-100">
                        <h2 class="text-danger logo">SHOPME-</h2>
                        <h3 class="title">{{ article.title|substringTit }}</h3>
                    </div>
                </div>
                <img v-if="article.mainPicture!=null" class="main-picture" :src="imagesStorage+'articles/'+article.id+'/'+article.mainPicture">
            </div>
            <div class="display-article bg-dark row">
                <div class="article-slider col-md-6">
                    <BaseSlider v-bind:articleId="article.id" />
                </div>
                <div class="article-data col-md-6"> 
                    <div class="text-secondary">
                        <p>{{ article.title }} <br> {{ article.description }}.<br>Price:{{ article.price }}€</p>
                    </div>
                </div>
            </div>

            
        </div>
    </div>
</template>

<script>
import BaseSlider from '../Slider/BaseSlider.vue';
export default {
  props: {
  },

    data() {
        return {
            imagesStorage:this.$store.state.imagesStorage,
        };
    },

    mounted() {
    },

    methods: {
        
    },
    components:{
        BaseSlider,
    }
    ,
    props:['article']

};
</script>

<style lang="scss" scoped>
.img-cover{
    position: absolute;
    background-color: black;
    opacity: 0.8;
    width:100%;
    height: 200px;
}
.main-picture{
width:100%;
height: 200px;
}
.display-article{
    padding: 50px;
}
.logo{
    text-shadow: 0px 0px 30px brown, 0px 0px 50px brown ,0px 0px 00px brown;
    position: absolute;
    top: 39%;
    left:-142px;
    animation: logo 1s ease both;
}
@keyframes logo{
    from{
        left:-142px;
    }
    to{
        left:310px;
    }
}
.title{
    animation: title 2s ease both 2s;
}
@keyframes title{
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
}

</style>