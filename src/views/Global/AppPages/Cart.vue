<template>
  <div>
    <div class="container mt-3">
      <table class="table table-dark table-striped text-center">
        <thead>
            <tr>
                <th scope="col"><h3>Article</h3></th>
                <th scope="col"><h3>Price</h3></th>
                <th scope="col"><h3>Picture</h3></th>
                <th><h3>Remove</h3></th>
            </tr>
        </thead>
        <tbody class="table-body">
            <tr v-for="(article, index) in articles" :key="index">
              <td scope="row">{{ article.title }}</td>
              <td scope="row">{{ article.price }}€</td>
              <td scope="row"><img :src="$store.state.imagesStorage+'articles/'+article.id+'/'+article.pictures[0].path" alt="..." style="width:50px;height:50px"></td>
              <td><button class="btn btn-outline-danger" v-on:click="remove(index)">Remove</button></td>
            </tr>
            <tr><th>Total Price</th><th></th><th></th><th >{{ totalPrice }}€</th></tr>
        </tbody>
      </table>
      <div v-if="customer_logedIn && articles.length>0" class="d-flex justify-content-center bg-dark mb-2" style="padding:50px">
        <div class="checkout-form">
          <div class="title">
            <h3 class="text-light">CHEKOUT-FORM</h3>
          </div>
          <div class="delevery-address mb-1">
            <label class="text-light">Your Delivery Address</label>
            <select v-model="address" class="form-select" aria-label="Default select example">
              <option selected ></option>
              <option v-for="(address, index) in deliveryAddresses" :key="index" :value='{"id":address.id, "last_name":address.last_name, "first_name":address.first_name, "street":address.street, "nr":address.nr, "plz":address.plz, "city":address.city }'>{{address.first_name}} {{ address.last_name }}. {{ address.street }}{{ address.nr }}, {{ address.city }}{{ address.plz }}'</option>
            </select>
            <small class="text-danger">{{ noAddressMes }}</small>
            <small class="d-block mb-3" ><a class=" text-primary" href="/deliveryAddress">Create new Delivery Address</a></small>
          </div>
          <div class="go-toCheckout">
            <button v-on:click="checkOut()" class="btn btn-danger w-100"><span class="go-toPayment">Go to Payment</span></button>
          </div>
          <div class="logo text-danger">
            <img class="img-logo" src="@/assets/logo.png">
          </div>
        </div>
      </div>
      <div class="show-more bg-dark p-5">
        <h3 class="text-danger w-25 mb-5">SHOW MORE</h3>
        <div  v-for="(articles, index) in showMoreArticles" :key="index">
          <ArticlesSlider v-bind:articles="articles" class="mt-2 mx-auto"/>
        </div>
        
      </div>
    </div>
  </div>   
</template>

<script>
import store from '@/store';
import Payment from '@/views/Customer/Payment.vue';
import ArticlesSlider from '@/components/Slider/ArticlesSlider.vue';
import $ from "jquery";

export default {
  data() {
    return {
      address:null,
      totalPrice:0,
      articles:JSON.parse(localStorage.getItem("articlesInCart")),
      deliveryAddresses:null,
      customer_logedIn:false,
      noAddressMes:"",
      showMoreArticles:[],
    };
  },
   mounted(){
    //Calculate Totla-Price
    this.calculateTotalPrice();
    //check, if customer loged in
    var roles = JSON.parse(localStorage.getItem("roles"));
    if(roles !=null && roles.some((role) => role.title == "CUSTOMER"))
    {
      this.customer_logedIn=true;
    }
    //Get Delivey-Addresses of the Custommer
    if(this.customer_logedIn)
    {
      this.$store.dispatch("getDeliveryAddresses")
     .then(res=>{
      this.deliveryAddresses=res.data;
     })
     .catch(err=>{
      console.log(err)
     })
    }
    //Show more Articles
    if(this.articles.length>0)
    {
      this.articles.forEach(article => {
        this.$store.dispatch('getArticlesByCategoryId',{
          categoryId:article.category_id
        }).then(res=>{
          this.showMoreArticles.push(res.data.childCatArticles);
        }).catch(err=>{
          console.log(err)
        })
      });
    }
    console.log( this.showMoreArticles)
   },
  methods: {
    calculateTotalPrice()
    {
      this.totalPrice=0;
      if(this.articles.length>0)
      {
        this.articles.forEach(article => {
        this.totalPrice+=article.price;
        }); 
        this.totalPrice=Number.parseFloat(this.totalPrice).toFixed(2);
      }
    },
    remove(index)
    {
      //Remove the article from Localstorage
      var articlesInCart=JSON.parse(localStorage.getItem("articlesInCart"))
      articlesInCart.splice(index,1);
      localStorage.setItem("articlesInCart",JSON.stringify(articlesInCart))
      this.articles=articlesInCart;
      //Calculate the Total Price agin
      this.calculateTotalPrice();
      //Set the new calculated Price in the Element
      $('table-body').children('tr').eq(index).addClass('invisible');
      //Set count of Articles in cartSympol 
      $("#count-articles-inCart").text(" ");
      $("#count-articles-inCart").text(JSON.parse(localStorage.getItem('articlesInCart')).length);
    },
    checkOut()
    {
      this.noAddressMes="";
      if(!this.address)
      {
        this.noAddressMes="Your Delivery Address is required";
      }else{
        localStorage.setItem("addressId",this.address.id);
        this.$router.push({name:"Payment", query:{last_name:this.address.last_name, first_name:this.address.first_name, street:this.address.street, nr:this.address.nr, plz:this.address.plz, city:this.address.city }})
      }
    }
  },
  components:{
    ArticlesSlider,
  }
  
};
</script>
<style scoped>
.go-toPayment{
  border-bottom: 1px solid white;
  letter-spacing: 4px;
}
.checkout-form{
  position: relative;
}
.logo{
  position: absolute;
  top: -34%;
  left: -100%;
}
.logo-small{
  width:100px;
  height: 100px;
}
</style>