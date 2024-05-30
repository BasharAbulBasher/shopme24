<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="text-danger" href="/" style="text-decoration: none"><span class="bg-light logo"><img class="logo-image" src="@/assets/logo.png"></span></a>
    <h3 class="navbar-brand"><a class="text-danger" href="/" style="text-decoration: none; margin-left: 34px;">ShopMe</a></h3>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Category
                </a>
                <ul class="dropdown-menu  bg-dark" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item text-danger" href="/admin/category/create">Create</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="/admin/category/show">Show</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Article
                </a>
                <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item text-danger" href="/admin/article/create">Create</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="/admin/article/show">Show</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Invoices&&Orders
                </a>
                <ul class="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item text-danger" href="/admin/invoice/show">Show Invoices</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="#">Show Orders</a></li>
                </ul>
            </li>
        </ul>
        <div class="d-flex">
        <button v-on:click="logout()" class="btn btn-outline-danger" type="submit">Logout</button>
        </div>

    </div>
  </div>
</nav>
</template>

<script>
export default {
    methods:{
        logout()
        {
            this.$store.dispatch('logout')
            .then(res=>{
            if(res.data.success==true)
            {
                if(this.$route.name=='Home')
                {
                window.location.reload();
                }
                else{
                this.$router.push({ name: "Home" });
                window.location.reload();
                }
            }
            else{
                if(this.$route.name!='ErrorPage')
                {
                    this.$router.push({ name: "ErrorPage" });
                    window.location.reload();
                }
            }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>
.logo{
    border-radius: 100% 100% 100% 100%;
  }
  .logo-image{
    height: 44px;
    width: 44px;
  }
</style>