<template>
    <div>
        <EditArticle v-bind:article="article"/>   
        <div class="text-center">
            <button class="btn btn-danger w-50 mb-5">Add to Cart</button>
        </div> 
    </div>
</template>

<script>
import EditArticle from '@/components/Article/EditArticle'
export default {
    data() { 
        return {
            article:null,
        };
    },

    created() {
        this.article=this.$route.query;
    },

    methods: {
        
    },
    components:{
        EditArticle
    }
};
</script>

<style lang="scss" scoped>

</style>