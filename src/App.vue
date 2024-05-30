<template>
  <div>
    <component :is="choseNavbar"></component>
      <router-view />
  </div>
</template>
<script>
import CustomerNav from "@/components/Navbar/CustomerNav.vue";
import AdminNav from "@/components/Navbar/AdminNav.vue";
import GlobalNav from "@/components/Navbar/GlobalNav.vue";


export default {
  data: function () {
    return {

    };
  },

  components: {
    GlobalNav,
    CustomerNav,
    AdminNav,
  },
  computed: {
    choseNavbar() {

      console.log("refresh_token:"+localStorage.getItem("refreshToken")+". Roles:"+localStorage.getItem("roles"))
      var refreshToken = localStorage.getItem("refreshToken");
      var roles = JSON.parse(localStorage.getItem("roles"));
      if (refreshToken == null || roles == null) {
        return GlobalNav;
      } else {
        if (roles.some((role) => role.title === "CUSTOMER")) {
          return CustomerNav;
        } else if (roles.some((data) => data.title === "ADMIN")) {
          return AdminNav
        } else {
          return GlobalNav;
        }
      }
    },
  },
};
</script>


