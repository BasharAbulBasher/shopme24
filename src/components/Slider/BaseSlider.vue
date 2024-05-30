<template>
    <div class="base-slider">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators btns">
                <div v-for="(picture, index) in article.pictures" :key="index">
                    <button v-if="index==0" type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="index" class="active" aria-current="true"  :aria-label="'Slide '+(index+1)"></button>
                    <button v-else type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="index" :aria-label="'Slide '+(index+1)"></button>
                  </div>
            </div>
            <div class="carousel-inner">
                <div v-for="(picture, index) in article.pictures" :key="index">
                    <div v-if="index==0" class="carousel-item active">
                        <img :src="imagesStorage+'articles/'+article.id+'/'+picture.path" class="d-block img-slider" alt="...">
                      </div>
                      <div v-else class="carousel-item">
                        <img :src="imagesStorage+'articles/'+article.id+'/'+picture.path" class="d-block img-slider" alt="...">
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
          </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imagesStorage:this.$store.state.imagesStorage,
            article:null,
        };
    },

    mounted() {
        console.log(this.articleId)
        this.$store.dispatch('getArticleById',{
            articleId:this.articleId
        }).then(res=>{
            console.log(res.data)
            this.article=res.data
        }).catch(err=>{
            console.log(err)
        })
    },

    methods: {
        
    },
    props:{   
        articleId: {
        type: String,
        default: () => ({}),
        },
    }
};
</script>

<style lang="scss" scoped>
.img-slider{
    width: 542px;
    height: 235px;
}
.btns{
    background-color:black;
    opacity: 0.5;
}

</style>