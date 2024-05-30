import Vue, { customRef } from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Global/AppPages/Home'
import Login from '../views/Auth/Login.vue'
import Register from '@/views/Auth/Register.vue'
import ConformRegister from '@/views/Auth/ConformRegister.vue'
import ErrorPage from '../views/Error/ErrorPage.vue'
import PasswordForget from '../views/Auth/PasswordForget'
import ResetNewPassword from '../views/Auth/ResetNewPassword.vue'
import ShowCategoriesVue from '@/views/Admin/Category/ShowCategories.vue'
import CreateCategoryVue from '@/views/Admin/Category/CreateCategory.vue'
import UpdateCategoryVue from '@/views/Admin/Category/UpdateCategory.vue'
import CreateArticleVue from '@/views/Admin/Article/CreateArticle.vue'
import AdminArticleShow from '@/views/Admin/Article/ShowArticles.vue'
import AdminArticleEdit from '@/views/Admin/Article/Edit.vue'
import UpdateArticle from '@/views/Admin/Article/Update.vue'
import DeliveryAddress from'@/views/Customer/DeliveryAddress.vue'
import Cart from '@/views/Global/AppPages/Cart.vue'
import ShowArticles from '@/views/Global/AppPages/ShowArticles.vue'
import Payment from '@/views/Customer/Payment.vue'
import CustomerArticleEdit from '@/views/Customer/Article/Edit.vue'
import CustomerInvoiceShow from '@/views/Customer/Invoice/Show.vue'
import AdminInvoiceShow from '@/views/Admin/Invoice/Show.vue'
import Fashion from '@/views/Global/AppPages/Fashion.vue'

Vue.use(VueRouter)

const routes = [
//Global Url
{
  path: '/',
  name: 'Home',
  component: Home
},
{
  path: '/cart',
  name: 'Cart',
  component: Cart
},
{
  path: '/article/show',
  name: 'ShowArticles',
  component: ShowArticles
},
{
  path: '/errorPage',
  name: 'ErrorPage',
  component: ErrorPage
},
{
  path: '/fashion',
  name: 'Fashion',
  component: Fashion
},
  //Auth Url
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
    meta:{
      auth:true,
    }
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register,
    meta:{
      auth:true,
    }
  },
  {
    path: '/confirmRegister',
    name: 'ConfirmRegister',
    component: ConformRegister
  },
  {
    path: '/auth/passwordForget',
    name: 'PasswordForget',
    component: PasswordForget,
    meta:{
      auth:true,
    }
  },
  {
    path: '/resetNewPassword',
    name: 'ResetNewPassword',
    component: ResetNewPassword
  },
  //Admin Url
  {
    path: '/admin/article/create',
    name: 'CreateArticleVue',
    component: CreateArticleVue,
    meta:{
      admin:true,
    }
  },
  {
    path: '/admin/article/update',
    name: 'UpdateArticle',
    component: UpdateArticle,
    meta:{
      admin:true,
    }
  },
  {
    path: '/admin/article/show',
    name: 'AdminArticleShow',
    component: AdminArticleShow,
    meta:{
      admin:true,
    }
  },
  {
    path: '/admin/article/edit',
    name: 'AdminArticleEdit',
    component: AdminArticleEdit,
    meta:{
      admin:true,
    }
  },
  {
    path: '/admin/category/create',
    name: 'CreateCategoryVue',
    component: CreateCategoryVue,
    meta:{
      admin:true,
    }
  },
  {
    path: '/admin/category/show',
    name: 'ShowCategoriesVue',
    component: ShowCategoriesVue,
    meta:{
      admin:true,
    }
  },
  {
    path: '/admin/category/update',
    name: 'UpdateCategoryVue',
    component: UpdateCategoryVue,
    meta:{
      admin:true,
    }
  },
  {
    path: '/admin/invoice/show',
    name: 'AdminInvoiceShow ',
    component:AdminInvoiceShow,
    meta:{
      admin:true,
    }
  },
  //User Url
  {
    path: '/user/deliveryAddress',
    name: 'DeliveryAddress',
    component: DeliveryAddress,
    meta:{
      customer:true,
    }
  },
  {
    path: '/user/payment',
    name: 'Payment',
    component: Payment,
    meta:{
      customer:true,
    }
  },
  {
    path: '/user/article/edit',
    name: 'CustomerArticleEdit',
    component: CustomerArticleEdit,
  },
  {
    path: '/user/invoice/show',
    name: 'CustomerInvoiceShow',
    component:CustomerInvoiceShow,
    meta:{
      customer:true,
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

//Middelewares
router.beforeEach((to, from, next) => {
  var refreshToken = localStorage.getItem("refreshToken");
  var roles = JSON.parse(localStorage.getItem("roles"));
  //Auth-Middleware
  if(to.matched.some(record => record.meta.auth)) {
    //User did NOT login
   if (refreshToken==null) {
    //Go to the Auth Layer
      next()
      return
    }else{
      //Go To Home
      next('/')
    }
  }
  //Admin-Middleware
  else if(to.matched.some(record => record.meta.admin)) {
    //The User is an Admin
    if (roles.some((data) => data.title === "ADMIN")) {
      //Go to the Admin Layer
      next()
      return
    }else{
      //Go To Home
      next('/')
    }
  }
  //Customer-Middleware
  else if(to.matched.some(record => record.meta.customer)) {
    //The User is an Admin
    if (roles.some((data) => data.title === "CUSTOMER")) {
      //Go to the Admin Layer
      next()
      return
    }else{
      //Go To Home
      next('/')
    }
  }
  //Without-Middleware
  else{
    next()
  }
})

export default router
