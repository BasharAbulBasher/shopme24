<template>
    <div>
        We Reset Your Password
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
    created:function(){
        this.checkTokenAndPassword();
        console.log(this.$route.query.rememberToken+","+localStorage.getItem('newPassword'))
        axios.post(this.$store.state.baseBackendUrlRequest+"auth/confirmResetPassword",this.getRequestData(),this.getRequestConfig())
        .then(res=>{
            console.log(res);
            this.thenRequest(res);
        }).catch(err=>{
            console.log(err)
            this.catchError(err);
        })
    },
    methods:{
        checkTokenAndPassword:function()
        {
            if(this.$route.query.rememberToken==null || this.$route.query.rememberToken=="" || localStorage.getItem('newPassword')==null)
            {
               this.goToErrorPage();
            }
        },
        getRequestData:function()
        {
            return {
                newPassword:localStorage.getItem('newPassword'),
            }
        },
        getRequestConfig:function()
        {
            return{
                headers: {
                    Authorization: "Bearer "+this.$route.query.rememberToken,
                }
            }
        },
        thenRequest:function(res)
        {
            console.log(res);
            if(res.data.success)
            {
                globalFunctions.setAuthData(res.data.data.user.refresh_token, res.data.data.user.roles);
                this.goToHomePage();
                window.location.reload()
            }else{
            this.goToErrorPage();
            }
        },
        catchError:function(err)
        {
            console.log(err);
            this.goToErrorPage();
        },
        goToErrorPage:function()
        {
            this.$router.push({ name: "ErrorPage" });
        },
        goToHomePage:function()
        {
            this.$router.push({ name: "Home" });
        }

    }
}
</script>

<style>

</style>