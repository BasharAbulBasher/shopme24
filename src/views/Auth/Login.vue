<template>
  <div class="login d-flex justify-content-center align-items-center bg-dark mt-5" style="height: 25em">
    <div class="w-50 text-light">
      <h3 class="">LOGIN</h3>
      <div class="mb-3 d-flex justify-content-end">
        <div><router-link to="/auth/register" class="text-danger">Register</router-link></div>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 d-flex justify-content-between">
        <div>
          <router-link to="/auth/passwordForget" class="text-danger">Password Forget</router-link>
        </div>
      </div>
      <button class="btn btn-danger w-100 logIn-buttun" v-on:click="login()" v-show="baseSpinner!=true">
        LOGIN
      </button>
      <BaseSpinner v-if="baseSpinner== true" />
      <small class="text-danger text-center" v-show="errorMesage != null">{{
        errorMesage
      }}</small>
    </div>
    <div class="logo text-danger d-none d-md-block">
      <img class="img-logo" src="@/assets/logo.png">
    </div>
  </div>
</template>

<script type="text/javascript">
import BaseSpinner from '@/components/Spinner/BaseSpinner.vue';

export default {
  data: function () {
    return {
      email: null,
      password: null,
      errorMesage: null,
      baseSpinner:null,
    };
  },
  methods: {
    login:function (){ 
      this.baseSpinner=true;
        this.$store
        .dispatch("logIn", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.baseSpinner=false;
         if(res.data.success==true)
          {
          this.$router.push({ name: "Home" });
          window.location.reload();
          }
          this.errorMesage=res.data.message;
          console.log(res.data.success);
          console.log(res.data.data.user.roles);
        })
        .catch((err) => {
          this.baseSpinner=false;
          console.log('catch Error Login')
          this.errorMesage = err.response.data.message;
          console.log(err.response.data.message);
        });
    },
  },
  components:{
    BaseSpinner
  }
}
</script>

<style>
h3 {
  color: brown;
  font-size: 50px;
  letter-spacing: 5px;
  border-bottom: 3px solid brown;
}
.logIn-buttun {
  font-size: 25px;
  font-weight: bolder;
  letter-spacing: 5px;
}
.login{
  position: relative;
}
.logo{
  position: absolute;
  top: 0px;
  left:0px;
}
</style>
