<template>
  <div>
    We confirm your Account
  </div>
</template>

<script>
import axios from 'axios';
import { globalFunctions } from '@/globalFunctions';
export default {

    data:function()
    {
        return{

        }
    },
    methods:{

    },
  created:function(){
    if(this.$route.query.token==null)
    {
      this.$router.push({ name: "ErrorPage" });
    }
    else{
      axios.post(this.$store.state.baseBackendUrlRequest+'auth/confirmRegister',null,{
        headers:{
          Authorization: `Bearer ${this.$route.query.token}`
        }
      }).then(res=>{
        console.log(res);
        if(res.data.success)
        {
        globalFunctions.setAuthData(this.$route.query.token, res.data.data.user.roles);
        this.$router.push({ name: "Home" });
        window.location.reload();
        }
        else{
          this.$router.push({ name: "ErrorPage" });
        }
      }).catch(err=>{
        this.$router.push({ name: "ErrorPage" });
      })
    }
  }
}
</script>

<style>

</style>