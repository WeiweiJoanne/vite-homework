<template>
  <VueLoading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="fullPage"
  />

  <div>
    <div class="row align-items-center">
      <div class="col-sm-6">
        <img class="img-fluid" :src="temProduct.imageUrl" alt="" />
      </div>
      <div class="col-sm-6">
        <span class="badge bg-primary rounded-pill"></span>
        <h3>{{ temProduct.title }}</h3>
        <p>商品描述： {{ temProduct.description }}</p>
        <p>商品內容： {{ temProduct.content }}</p>
        <div class="h5" v-if="temProduct.origin_price === temProduct.price">
          {{ temProduct.price }} 元
        </div>
        <div v-else>
          <del class="h6">原價 {{ temProduct.origin_price }} 元</del>
          <div class="h5">現在只要 {{ temProduct.price }} 元</div>
        </div>
        <div>
          <div class="input-group">
            <select class="form-control" v-model.number="qty">
              <option v-for="i in 20" :key="i">{{ i }}</option>
            </select>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(temProduct.id, qty)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_API, VITE_APIPATH } = import.meta.env;
export default {
  data() {
    return {
      isLoading: true,
      fullPage: true,
      temProduct: {},
      qty: 1,
      // carts: [],
    };
  },
  mounted() {
    this.isLoading = true;
    const id = this.$route.params.id;
    this.$http(`${VITE_API}api/${VITE_APIPATH}/product/${id}`)
      .then((res) => {
        this.temProduct = res.data.product;
        this.isLoading = false;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const data = {
        data: {
          product_id: id,
          qty: qty,
        },
      };
      this.$http
        .post(`${VITE_API}api/${VITE_APIPATH}/cart`, data)
        .then((res) => {
          if (res.data.success) {
            // this.getCart();
            alert("加入購物車成功");
            this.qty = 1
          } else {
            alert("加入購物車失敗");
          }
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
    // getCart() {
    //   this.$http
    //     .get(`${VITE_API}api/${VITE_APIPATH}/cart`)
    //     .then((res) => {
    //       const data = res.data.data.carts;
    //       // this.carts = data;
    //     })
    //     .catch((err) => console.log(err));
    // },
  },
};
</script>
