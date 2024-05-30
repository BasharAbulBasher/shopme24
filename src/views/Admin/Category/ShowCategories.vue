<template>
<div class="container mt-5">
    <div class="row">
        <div class="col-md-6 mainCategories bg-dark">
            <h3 class="text-danger text-center">Main Categories</h3>
            <div class="row" v-for="(mainCategory, index) in mainCategories" :key="index">
                <p class="col-md-6 btn text-light" v-on:click="getCategories(mainCategory.id)" >{{ mainCategory.title }}</p>
                <a class="col-md-6 btn text-danger" :href="'/admin/category/update?categoryId='+mainCategory.id">update</a>
            </div>
        </div>
        <div class="col-md-6 categories bg-dark">
            <h3 class="text-danger text-center">Categories</h3>
            <div class="row" v-for="category in categories" :key="category">
                <p class="col-md-6 btn text-light" v-on:click="getCategories(category.id)" >{{category.title }}</p>
                <a class="col-md-6 btn text-danger" :href="'/admin/category/update?categoryId='+category.id">update</a>

            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    data:function()
    {
        return{
            mainCategories:null,
            categories:null,
        }
    },
    methods:{
        getCategories:function(categoryId)
        {
            console.log(categoryId)
            this.$store.dispatch('getCategories',{
                categoryId:categoryId,
            })
            .then(res=>{
            this.categories=res.data.category.categories
            console.log(res.data)
            }).catch(err=>{
            console.log(err)
            })
        }

    },
    created:function()
    {
        this.$store.dispatch('getMainCategories')
        .then(res=>{
            this.mainCategories=res.data
        }).catch(err=>{
            console.log(err)
        })
    }
}
</script>

<style>
.mainCategories{
    border: 2px solid gray;
}
.categories{
   
    border: 2px solid gray;
}
</style>