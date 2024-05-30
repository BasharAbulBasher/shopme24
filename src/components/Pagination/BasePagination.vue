<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
        </li>
        <div  v-for="n in count" :key="n">
            <li class="page-item"><a class="page-link btn" v-on:click="paginationBtn(n)" >{{ n }}</a></li>
        </div>
        <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>
</template>

<script>
export default {
    data:function()
    {
        return{
            pageNr:null
        }
    },
    methods:{
        paginationBtn:function(n)
        {
            this.$emit('changePageNr',n);
        }
    },
    props:['count']

}
</script>

<style>

</style>