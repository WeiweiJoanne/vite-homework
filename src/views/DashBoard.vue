<template>
  <main>
    <h1 class="text-center">後台頁面</h1>
    <header>
      <div class="wrapper text-center">
        <RouterLink to="/">前台首頁</RouterLink> |
        <RouterLink to="/admin">後台首頁</RouterLink> |
        <RouterLink to="/admin/products">後台產品列表</RouterLink> |
        <RouterLink to="/admin/orders">後台訂單</RouterLink> |
        <a href="" @click.prevent="logout"> 登出 </a>
      </div>
    </header>
    <RouterView></RouterView>
  </main>
</template>
<script>
export default {
  data() {
    return {
      isLoading: true,
      fullPage: true,
    };
  },
  methods: {
    logout() {
      document.cookie = `petsHome=; expire=; Path=/`;
      this.$router.push("/");
    },
  },
};
</script>
