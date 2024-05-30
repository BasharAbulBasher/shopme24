<template>
  <div class="errorPage d-flex justify-content-center align-items-center bg-dark card mt-2">
    <div class="message w-50">
      <h3 class="text-danger">Error</h3>
      <p class="text-danger">Something went wrong...</p>
      <small class="text-secondary">{{ message }}</small>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      message:this.$route.query.message,
    };
  },

  mounted() {
    if(this.$route.query.token!=null)
    {

    }
  },

  methods: {
    
  },
};
</script>
<style scoped>
.message{
  padding: 50px;
  min-height: 500px;
}
</style>