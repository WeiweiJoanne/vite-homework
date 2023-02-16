<template>
  <main>
    <h1 class="text-center">前台頁面</h1>
    <header>
      <div class="wrapper text-center">
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/products">Product</RouterLink> |
        <RouterLink to="/carts">Carts</RouterLink>
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
