<template>
    <div>
        <EditArticle v-bind:article="article"/>
        <div class="article-edit-footer text-center mt-3">
            <router-link class="btn btn-danger w-50" :to="{path:'/admin/article/update', query:{'id':article.id,}}">Update</router-link> 
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