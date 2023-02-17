<template>
  <main>
    <h1 class="text-center">前台頁面</h1>
    <header>
      <div class="wrapper text-center">
        <RouterLink to="/">首頁</RouterLink> |
        <RouterLink to="/products">商品列表</RouterLink> |
        <RouterLink to="/carts">購物車</RouterLink> |
        <RouterLink to="/admin">後台管理</RouterLink>
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
};
</script>
