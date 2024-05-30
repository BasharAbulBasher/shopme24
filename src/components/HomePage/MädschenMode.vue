<template>
  <div class="mädschen-mode">
    <h2 class="category-title text-center">MÄDCHEN</h2>
    <div class="row header">
      <div v-for="(category, index) in maedchen_category.categories" :key="index" class="col-md-3">
          <a class="bg-dark d-block" :href="'/article/show?categoryId='+category.id"><img class="cat_img" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image"><span class="btn" style="color:#E27084">{{ category.title }}</span></a> 
      </div>
    </div>
    <div class="row mt-2 body" style="background-color: #E27084;">
      <div class="col-md-3">
        <div class="ms-md-5 mt-4">
          <div v-for="(category,index) in categories" :key="index">
            <div v-if="index==0">
              <a :href="'/article/show?categoryId='+category.id"><img class="cat_img" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image" ></a>
              <a class="text-secondary" :href="'/article/show?categoryId='+category.id">  <p >{{ category.title }}</p></a>
            
            </div>
            <div v-if="index==1">
              <a :href="'/article/show?categoryId='+category.id"><img class="cat_img" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image" ></a>
              <a class="text-secondary" :href="'/article/show?categoryId='+category.id">  <p >{{ category.title }}</p></a>
            </div>
          </div>
        </div>
      </div>
      <div class="main-image-cover col-md-6">
        <img class="main-image" :src="$store.state.imagesStorage+'categories/'+maedchen_category.id+'/'+maedchen_category.image" >
        <h2 class="cover-logo">
          <span class="cv1"> LADY </span>
          <span class="cv2">-STYLE</span>
          <h2 class="cv3">BEAUTI GIRL</h2>
        </h2>
      </div>
      <div class="col-md-3">
        <div class="mt-4">
          <div v-for="(category,index) in categories" :key="index">
            <div v-if="index==2">
              <a :href="'/article/show?categoryId='+category.id"><img class="cat_img" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image" ></a>
              <a class="text-secondary" :href="'/article/show?categoryId='+category.id">  <p >{{ category.title }}</p></a>
              </div>
            <div v-if="index==3">
              <a :href="'/article/show?categoryId='+category.id"><img class="cat_img" :src="$store.state.imagesStorage+'categories/'+category.id+'/'+category.image" ></a>
              <a class="text-secondary" :href="'/article/show?categoryId='+category.id">  <p >{{ category.title }}</p></a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      categories:null,
    };
  },

  mounted() {
    this.$store.dispatch('getCategories',{
      categoryId:27,
    }).then(res=>{
      this.categories=res.data.category.categories;
      console.log(this.categories)
    }).catch(err=>{
      console.log(err)
    })
  },

  methods: {
    
  },
  props:['maedchen_category']
};
</script>
<style scoped>
.category-title{
    color: grey;
    letter-spacing: 10px;
    border-bottom: 4px solid grey;
  }
  .cat_img{
    width: 100px;
    height: 100px;
    border-radius: 100px 100px 100px 100px;
  }
  .main-image{
    width: 100%;
    height: 400px;
    border-radius: 50% 50% 50% 50%;
  }
  .main-image-cover {
    position:relative;
  }
  .cover-logo{
    position: absolute;
    top:30%;
    left: 60px;
    font-size: 60px;
    
  }
  .cv1{
    color: #E27084;
    letter-spacing: -5px;
    border-bottom: 5px solid #E27084;
  }
  .cv2{
    color:  #E27084;;
    letter-spacing: 15px;
     border-bottom: 5px solid #E27084;
  }
  .cv3{
    color: gray;
    font-size: 43px;
    margin-top: -3px;
    text-align: center;
    letter-spacing: 8px;
    border-bottom: 1px solid gray;
  }

</style>