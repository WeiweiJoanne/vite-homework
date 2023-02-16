<template>
  <VueLoading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="fullPage"
  />
  <div class="mt-5">
    <h2 class="text-center">商品列表</h2>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">產品名稱</th>
          <th scope="col">原價</th>
          <th scope="col">售價</th>
          <th scope="col">查看細節</th>
        </tr>
      </thead>
      <tbody v-if="products.length > 0">
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.title }}</td>
          <td>${{ product.origin_price }}</td>
          <td>${{ product.price }}</td>
          <td>
            <RouterLink :to="`/product/${product.id}`">查看細節</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const { VITE_API, VITE_APIPATH } = import.meta.env;
export default {
  data() {
    return {
      isLoading: true,
      fullPage: true,
      products: [],
    };
  },
  mounted() {
    this.$http
      .get(`${VITE_API}api/${VITE_APIPATH}/products/all`)
      .then((res) => {
        console.log(res);
        this.products = Object.values(res.data.products);
        // this.pagination = res.data.pagination
        this.isLoading = false;
      })
      .catch((err) => console.log(err));
  },
  methods: {},
};
</script>
