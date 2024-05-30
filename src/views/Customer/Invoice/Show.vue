<template>
  <div class="myInvoices">
    <InvoiceShow v-bind:data="data"/>
</div>
</template>

<script>
import axios from 'axios';
import InvoiceShow from '@/components/Invoice/Show.vue'
export default {
  name: 'ShopmeLaravelVuejsShow',

  data() {
    return {
      data:null,
    };
  },

  mounted() {
    axios.post(this.$store.state.baseBackendUrlRequest+'invoice/showMyInvoices',null,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        }
    }).then(res=>{
        console.log(res)
        this.data=res.data;
    }).catch(err=>{
        console.log(err)
    })
  },

  methods: {
    
  },
  components:{
    InvoiceShow,
  }
};
</script>
<style scoped>

</style>