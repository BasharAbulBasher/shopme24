<template>
 <div
    class="password-forget d-flex justify-content-center align-items-center bg-dark mt-5"
    style="height: 27em"
  >
    <div class="w-50 text-light">
      <h3>RESET PASSWORD</h3>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="emailInput" type="text" class="form-control" id="email" aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">New Password</label>
        <input v-model="passwordInput" type="password" class="form-control" id="password" aria-describedby="emailHelp"/>
        <small class="text-danger text-center" v-show="password!= null">{{
        password
      }}</small>
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm New Password</label>
        <input v-model="confirmPasswordInput" type="password" class="form-control" id="confirmPassword"/>
        <small class="text-danger text-center" v-show="confirmPassword!= null">{{
        confirmPassword
      }}</small>
      </div>
      <div class="mb-3 d-flex justify-content-between">
      </div>
      <button class="btn btn-danger w-100 logIn-buttun" v-on:click="resetPassword()" v-show="baseSpinner!=true">
        Reset Password
      </button>
      <BaseSpinner  v-if="baseSpinner== true"/>
      <small class="text-danger text-center" v-show="errorMesage != null">{{
        errorMesage
      }}</small>
      <small class="text-success text-center" v-show="successMessage != null">{{
        successMessage
      }}</small>
    </div>
    <div class="logo text-danger d-none d-md-block">
        <img class="img-logo" src="@/assets/logo.png">
      </div>
  </div>
</template>

<script>
import BaseSpinner from '@/components/Spinner/BaseSpinner.vue'
import axios from 'axios'
export default {
    data:function()
    {
        return{
            emailInput:null,
            passwordInput:null,
            confirmPasswordInput:null,
            baseSpinner:null,
            errorMesage:null,
            password:null,
            confirmPassword:null,
            errResponseData:null,
            successMessage:null,
        }
    },
    methods:{
        resetPassword:function()
        {
            this.reset();
            this.visableSpinner();
            axios.post(this.$store.state.baseBackendUrlRequest+"auth/resetPassword",
            this.getRequestData())
            .then(res=>{
                localStorage.setItem('newPassword',this.passwordInput);
                this.invisableSpinner();
                this.thenRequest(res);
            }).catch(err=>{
                this.invisableSpinner();
                this.catchError(err);
            })
        },
        reset:function()
        {
            this.baseSpinner=null;
            this.errorMesage=null;
            this.errResponseData=null;
            this.password=null;
            this.confirmPassword=null;
            this.successMessage=null;
        },
        getValidAttributes:function()
        {
            return[
                'password',
                'confirmPassword',
            ]
        },
        catchError:function(err)
        {
            this.errResponseData=err.response.data;
            this.errorMesage=this.errResponseData.message;
            if(this.errResponseData.errors!=null)
            {
                this.getValidAttributes().forEach(attr => {
                if(this.errResponseData.errors[attr]!=null)
                {
                    this[attr]=this.errResponseData.errors[attr][0];
                }
                });
            }
        },
        getRequestData:function()
        {
            return{
                email:this.emailInput,
                password:this.passwordInput,
                confirmPassword:this.confirmPasswordInput,
            }
        },
        thenRequest:function(res)
        {
            if(res.data.success== true)
            {
                this.successMessage=res.data.message;
            }
            else{
                this.errResponseData="Somthing went wrong!!"
            }
        },
        visableSpinner:function()
        {
            this.baseSpinner=true;
        },
        invisableSpinner:function()
        {
            this.baseSpinner=false;
        }
    },
    components:{
        BaseSpinner
    }
}
</script>

<style>
.logIn-buttun {
  font-size: 25px;
  font-weight: bolder;
  letter-spacing: 5px;
}
.password-forget {
    position: relative;
}
.logo{
    position: absolute;
    top: 0px;
    left:0px;
  }
</style>