import { Axios } from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { globalFunctions } from '@/globalFunctions';
import $ from "jquery";




Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    refreshToken:null,
    roles:null,
    baseBackendUrlRequest:'http://127.0.0.1:8000/',
    imagesStorage:'http://127.0.0.1:8000/storage/',
   
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    //Auth
   logIn({commit},payload)
   {
      //Define Promise with parama resolve && reject
        return new Promise((resolve,reject)=>{
          //Send Rquest during axios to login with Params username && password
          axios.post(this.state.baseBackendUrlRequest+'auth/login',{email:payload.email,password:payload.password})
          .then(res=>{ 
            if(res.data.success==true)
            {
              globalFunctions.setAuthData(res.data.data.user.refresh_token, res.data.data.user.roles);
            }
            resolve(res);
          })
          .catch(err=>{
            reject(err);
          })
      })
    },
    logout()
    {
      //Define Promise with parama resolve && reject
      return new Promise((resolve,reject)=>{
        //Send Rquest during axios to login with Params username && password
        axios.post(this.state.baseBackendUrlRequest+'auth/logout',null,{
          headers: {
             Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
            }
        })
        .then(res=>{ 
          if(res.data.success==true)
          {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("roles");
          }
          resolve(res);
        })
        .catch(err=>{
          reject(err);
        })
    })
    },
    //Category
    getCategories({commit},payload)
    {
      return new Promise((resolve,reject)=>{
        axios.post(this.state.baseBackendUrlRequest+"category/getCategoryById",{
          categoryId:payload.categoryId
        })
        .then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        })
      })
    },
    getMainCategories()
    {
      return new Promise((resolve,reject)=>{
        axios.get(this.state.baseBackendUrlRequest+"category/getMainCategories")
        .then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        })
      })
    },
    getCategoryById({commit},payload)
    {
      return new Promise((resolve,reject)=>{
        axios.post(this.state.baseBackendUrlRequest+"category/getCategoryById",{
          categoryId:payload.categoryId
        })
        .then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        })
      })
    },
    //Article
    getArticles()
    {
      return new Promise((resolve, reject) => {
        axios.get(this.state.baseBackendUrlRequest+'article/show')
        .then(res=>{
          resolve(res);
        }).catch(err=>{
          reject(err);
        })
      });

    },
    getArticlesByCategoryId({commit},payload)
    {
      return new Promise((resolve,reject)=>
      {
        axios.post(this.state.baseBackendUrlRequest+'article/getByCategoryId',{
          id:payload.categoryId
          }).then(res=>{
            resolve(res);
          }).catch(err=>{
            reject(err);
        })
      })
    },
    getArticleById({commit},payload)
    {
      return new Promise((resolve,reject)=>
      {
        axios.post(this.state.baseBackendUrlRequest+'article/getArticleById',{
          articleId:payload.articleId
          }).then(res=>{
            resolve(res);
          }).catch(err=>{
            reject(err);
        })
      })
    },
    getSearchedArticles({commit},payload)
    {
      return new Promise((resolve,reject)=>
      {
        axios.post(this.state.baseBackendUrlRequest+'article/getSearchedArticles',{
          searchedValues:payload.searchedValues
          }).then(res=>{
            resolve(res);
          }).catch(err=>{
            reject(err);
        })
      })
    },
    //Address
    getDeliveryAddresses()
    {
      return new Promise((resolve,reject)=>
      {
        axios.post(this.state.baseBackendUrlRequest+'address/show',null,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
             }
        }).then(res=>{
            resolve(res);
        }).catch(err=>{
            reject(err);
        })
      })
    }
  },
  modules: {
  }
})

