<template>
  <div class="admin-invoiceShow mt-1">
    <div class="search d-flex justify-content-center bg-dark p-4" >
      <div class="form row">
        <div class="search-invoiceId col-md-6">
          <div class="mb-3">
            <label class="form-label text-light">Invoice-Id</label>
            <input v-model="invoiceId" type="text" class="form-control" placeholder="Invoice Id...">
            <button v-on:click="searchByInvoiceId()" class="btn btn-danger w-100 mt-1">Search</button>
          </div>
        </div>
        <div class="search-emain col-md-6">
          <div class="mb-3">
            <label class="form-label text-light">Email address</label>
            <input v-model="email" type="email" class="form-control" placeholder="Email ...">
            <button v-on:click="searchByEmail()" class="btn btn-danger w-100 mt-1">Search</button>
          </div>
        </div>
      </div>
    </div>
    <div class="result bg-dark p-4">
      <h3 class="result-title text-danger w-50">The Result for your Research</h3>
      <div class="result-body">
        <small class="text-danger">{{ message }}</small>
        <InvoiceShow v-if="data!=null" v-bind:data="data"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import InvoiceShow from '@/components/Invoice/Show.vue'
export default {
  data() {
    return {
      invoiceId:null,
      email:null,
      data:null,
      message:null,
    };
  },

  mounted() {
    
  },

  methods: {
    searchByInvoiceId()
    {
      this.reset();
      axios.post(this.$store.state.baseBackendUrlRequest+'invoice/showInvoiceById',{
        invoiceId:this.invoiceId,
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
        }
      }).then(res=>{
        console.log(res.data)
        this.data=res.data;
      }).catch(err=>{
        console.log(err)
        if(err.response.data.message!=null)
        {
          this.message=err.response.data.message;
        }
      })
    },
    searchByEmail()
    {
      this.reset();
      axios.post(this.$store.state.baseBackendUrlRequest+'invoice/showInvoicesByEmail',{
        email:this.email,
      },{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
        }
      }).then(res=>{
        this.data=res.data;
      }).catch(err=>{
        console.log(err)
        if(err.response.data.message!=null)
        {
          this.message=err.response.data.message;
        }
      })
    },
    reset()
    {
      this.data=null;
      this.message=null;
    }
  },
  components:{
    InvoiceShow,
  }
};
</script>