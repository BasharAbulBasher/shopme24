<template>
    <div class="register">
      <div
        class="d-flex justify-content-center align-items-center bg-dark mt-5 "
        style="height: 35em"
      >
        <div class="w-50 text-light">
          <h3 class="">Register</h3>
          <div class="mb-3 row">
            <div class="col-md-6">
                <label for="first_name" class="form-label">Firstname</label>
                <input
                v-model="first_name"
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                id="first_name"
                />
                <small class="text-danger" v-show="errorMesageFirst_name != null">{{
                errorMesageFirst_name
                }}</small>
            </div>
            <div class="col-md-6">
                <label for="last_name" class="form-label">Lastname</label>
                <input
                v-model="last_name"
                type="text"
                class="form-control"
                aria-describedby="emailHelp"
                id="last_name"
                />
                <small class="text-danger" v-show="errorMesageLast_name != null">{{
                errorMesageLast_name
                }}</small>
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
            <small class="text-danger" v-show="errorMesageEmail != null">{{
              errorMesageEmail
            }}</small>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
            <small class="text-danger" v-show="errorMessagePassword != null">{{
              errorMessagePassword
            }}</small>
          </div>
          <div class="mb-3">
            <label class="form-label">Confirm Password</label>
            <input v-model="confirmPassword" type="password" class="form-control" />
            <small class="text-danger" v-show="errorMessageConfirmPassword != null">{{
              errorMessageConfirmPassword
            }}</small>
          </div>
          <button
            class="btn btn-danger w-100 register-buttun"
            v-on:click="register()"
            v-show="spiner != true"
          >
            Register
          </button>
          <BaseSpinner v-if="spiner == true" />
          <small class="text-danger text-center" v-show="errorMesage != null">{{
            errorMesage
          }}</small>
          <small class="text-success text-center" v-show="successMessage != null">{{
            successMessage
          }}</small>
        </div>
      </div>
      <div class="logo text-danger d-none d-md-block">
        <img class="img-logo" src="@/assets/logo.png">
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import BaseSpinner from '@/components/Spinner/BaseSpinner.vue';
  export default {
  data: function () {      
    return {
      first_name:null,
      last_name:null,
      email: null,
      password: null,
      confirmPassword: null,
      errorMesage: null,
      errorMesageFirst_name:null,
      errorMesageLast_name:null,
      errorMesageEmail: null,
      errorMessagePassword: null,
      errorMessageConfirmPassword:null,
      successMessage: null,
      spiner: null,
    };
  },
  methods: {
    reset:function()
      {
        this.errorMesageFirst_name=null,
        this.errorMesageLast_name=null,
        this.errorMesage = null;
        this.errorMesageEmail = null;
        this.errorMessagePassword = null;
        this.errorMessageConfirmPassword=null;
        this.successMessage = null;
      },
    register: function () {
      this.spiner = true;
      this.reset();
      const myDate = {
      first_name:this.first_name,  
      last_name:this.last_name,  
      email: this.email,
      password: this.password,
      confirmPassword:this.confirmPassword
      };
      axios.post(this.$store.state.baseBackendUrlRequest+"auth/register", myDate)
      .then(res => {
        this.spiner = false;
        console.log(res.data);
        if (res.data.success == true) {
          this.successMessage=res.data.message
        }
        else {
          this.errorMesage = res.data.message;
        }
      })
      .catch(err => {
        console.log('catchError')
        this.spiner = false;
        console.log(err);
        if(err.response.data.errors.first_name !=null)
        {
        this.errorMesageFirst_name=err.response.data.errors.first_name[0];
        }
        if(err.response.data.errors.last_name !=null)
        {
        this.errorMesageLast_name=err.response.data.errors.last_name[0];
        }
        if(err.response.data.errors.email!=null)
        {
        this.errorMesageEmail=err.response.data.errors.email[0];
        }
        if(err.response.data.errors.password!=null)
        {
        this.errorMessagePassword=err.response.data.errors.password[0];
        }
        if(err.response.data.errors.confirmPassword!=null)
        {
        this.errorMessageConfirmPassword=err.response.data.errors.confirmPassword[0];
        }
      });

    },
  },
  components:{
    BaseSpinner,
  }
}
  </script>
  
  <style>
  .register-buttun {
    font-size: 25px;
    font-weight: bolder;
    letter-spacing: 5px;
  }
  .register{
    position: relative;
  }
  .logo{
    position: absolute;
    top: 0px;
    left:0px;
  }

  </style>
  