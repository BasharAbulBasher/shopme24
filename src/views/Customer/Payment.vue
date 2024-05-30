<template>
  <div class="payment card mt-2 mb-5" style="min-height:500px">
    <h3 class="text-danger">Payment</h3>
    <div class="payment-infos d-flex justify-content-center text-secondary">
      <div class="w-50">
        <div class="address text-center">
          <h4>{{ $route.query.last_name }} {{ $route.query.first_name}}, {{  $route.query.street }}{{  $route.query.nr }} <br>{{  $route.query.plz }}{{  $route.query.city }}</h4>
          <h5>Totl Price: {{ totalPrice }} €</h5>
        </div>
          <div class="mx-auto" ref="paypal"> </div>
      </div>
      <div class="logo text-danger">
        <img class="img-logo" src="@/assets/logo.png">
      </div>
    </div>
    <div v-if="isPaymentSuccess" class="success-payment p-5">
      <div v-on:click="goToHome()" class="close text-end">
        <i class="btn close-icon fa-solid fa-rectangle-xmark fa-2xl" style="color: #d41c1c;"></i>
      </div>
      <div class="success-payment-form d-flex justify-content-center align-items-center h-75">
        <div v-on:mouseover="removeOpacity()" v-on:mouseleave="setOpacity()" class="success-payment-body bg-dark card">
          <p style="color: #63E6BE;font-size: 20px;">The Payment is executed seccessfuly</p>
          <div class="text-center">
            <i class="check-icon fa-solid fa-circle-check fa-2xl" style="color: #63E6BE;"></i>
          </div>
          <small class="text-secondary">We thank you very much for your Shoping from our Page.<br>
          Plese check your Order Email. To show your Orders and<br> the Invoices, click please the following Link
          <a href="/">My Orders & Invoices</a>
        </small>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios';
import $ from 'jquery'
export default {
  data() {
    return {
      totalPrice:0,
      articles:[],
      isPaymentSuccess:false,
    };
  },
  methods: {
    setLoaded:function()
    {
      window.paypal.Buttons({
        createOrder:(data,actions)=>{
          return actions.order.create({
            purchase_units: [
              {
              amount:{
                  currency_code: "USD",
                  value: this.totalPrice
              }
            }
            ],
          })
        },
        onApprove:async(data, actions, resp)=>{
          axios.post(this.$store.state.baseBackendUrlRequest+"order/save",{
            articles:this.articles,
            address_id:localStorage.getItem("addressId"),         
            payment_token:data.facilitatorAccessToken,
            payment_source:data.paymentSource
          },{
            headers:{
              Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
            }
          }).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          })
          localStorage.removeItem("articlesInCart")
          localStorage.removeItem("addressId")
          this.isPaymentSuccess=true;
        },
        onError:err=>{
          this.$router.push({name:'errorPage',query:{message:"Something went wrong with the Payments Action. To execute your Order, try please to payment agin."}})
        }
      }).render(this.$refs.paypal)
    },
    goToHome()
    {
      this.$router.push({name:"Home"});
      window.location.reload();
    },
    //Style
    removeOpacity()
    {
      $(".success-payment").css("opacity","1");
    },
    setOpacity()
    {
      $(".success-payment").css("opacity","0.9");
    }
  },
  mounted() {
    //Get Total Price
    JSON.parse(localStorage.getItem("articlesInCart")).forEach(article => {
      this.totalPrice+=article.price;
      this.articles.push(article);
      console.log(this.articles)
    });
     //Config Paypal
     const script=document.createElement("script");
     script.src="https://www.paypal.com/sdk/js?client-id=AV7M5igoxg5pgKZGI0b9IZZieFP-GxTVOCgzRBH0dFan1ugdmll9R4JUFOQu9jnuB8L1Q06RFVDeDXj0";
     script.addEventListener("load",this.setLoaded);
     document.body.appendChild(script);
  },
};
</script>
<style scoped>
.payment{
    padding: 50px;
    background: black;
    opacity: 0.9;
    
}
.success-payment{
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.9;
  z-index: 100;
}
.success-payment-body{
  padding: 50px;
}
.close-icon{
  box-shadow:0px 0px 10px #d41c1c,0px 0px 40px  #d41c1c,0px 0px 80px #d41c1c ;
}
.check-icon{
  animation: checkIcon 2s ease 1s both;
}
@keyframes checkIcon{
  from{
    font-size: 0px;
  }
  to{
    font-size: 100px;
  }
}
.payment-infos {
  position: relative;
}
.logo{
  position: absolute;
  top: 0px;
  left:0px;
}


</style>