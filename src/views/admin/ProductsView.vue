<template>
  <div>
    <VueLoading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
    />
    <div
      :class="[
        'd-flex justify-content-center flex-wrap-reverse',
        { 'align-items-center': isActive == null },
      ]"
    >
      <div
        class="col-12 col-sm-5 col-lg-5 p-3"
        v-if="products.length > 0 && isActive !== null"
      >
        <div class="card p-3">
          <div class="d-flex">
            <div class="col-4">
              <div
                class="col-12 mb-2 pe-1 pe-sm-2 pe-lg-3"
                v-for="image in products[isActive].imagesUrl"
                :key="image"
              >
                <img
                  :src="image"
                  class="card-img-top primary-image"
                  alt="..."
                />
              </div>
            </div>
            <div class="col-8">
              <img
                :src="products[isActive].imageUrl"
                class="card-img-top primary-image"
                alt="..."
              />
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">
              {{ products[isActive].title }}
              <span class="badge bg-primary">{{
                products[isActive].category
              }}</span>
            </h5>
            <p class="card-text">
              {{ products[isActive].description }}
            </p>
            <p class="card-text">
              {{ products[isActive].content }}
            </p>
            <p class="card-text">
              售價：
              <span class="fs-2 fw-bold fst-italic text-danger me-2"
                >${{ products[isActive].price }}
              </span>
              <span class="text-secondary text-decoration-line-through"
                >${{ products[isActive].origin_price }}</span
              >
              {{ products[isActive].unit }}/元
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-5 col-lg-5 p-3" v-else>
        <h3 class="text-center">請選擇商品</h3>
      </div>
      <div class="col-12 col-sm-7 col-lg-6">
        <div class="text-end my-4">
          <button
            type="button"
            class="btn btn-primary"
            @click="openModal('new')"
          >
            新增產品
          </button>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">產品名稱</th>
              <th scope="col">原價</th>
              <th scope="col">售價</th>
              <th scope="col">是否啟用</th>
              <th scope="col">查看細節</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody v-if="products.length > 0">
            <tr v-for="(product, i) in products" :key="product.id">
              <td>{{ product.title }}</td>
              <td>${{ product.origin_price }}</td>
              <td>${{ product.price }}</td>
              <td :class="{ 'text-success': product.is_enabled > 0 }">
                {{ product.is_enabled > 0 ? "啟用" : "未啟用" }}
              </td>
              <td>
                <button
                  type="button"
                  :class="[
                    'btn btn-secondary',
                    { 'btn-success': isActive == i },
                  ]"
                  @click="productDetail(i)"
                  :disabled="isActive == i"
                >
                  {{ isActive == i ? "正在查看" : "查看細節" }}
                </button>
              </td>
              <td>
                <div class="d-grid gap-2 d-md-block">
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm"
                    @click="openModal('edit', product.id)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openModal('del', product.id)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p>目前有 {{ products.length }} 項產品</p>

        <ProductModal
          :modal-for="modalFor"
          :product-temp="productTemp"
          :get-product-all="getProductAll"
          :pagination="pagination"
          ref="productModal"
        ></ProductModal>
        <Pagination
          :pagination="pagination"
          :get-product-all="getProductAll"
          @init-is-active="toInitIsActive"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_API, VITE_API_PATH } = import.meta.env;
import Pagination from "../../components/PaginationItem.vue";
import ProductModal from "../../components/ProductModal.vue";

export default {
  data() {
    return {
      products: [],
      isActive: null,
      isLoading: true,
      fullPage: true,
      modalFor: null,
      productTemp: {},
      pagination: {},
    };
  },
  mounted() {
    this.isLogin();
    this.getProductAll();
  },
  methods: {
    openModal(todo, id) {
      this.modalFor = todo;
      if (todo == "new") {
        this.productTemp = {};
      } else if (todo == "edit") {
        this.products.forEach((el, i) => {
          if (el.id === id) {
            this.productTemp = JSON.parse(JSON.stringify(this.products[i]));
          }
        });
      } else {
        this.products.forEach((el, i) => {
          if (el.id === id) {
            this.productTemp = JSON.parse(JSON.stringify(this.products[i]));
            // this.productTemp = { ...this.products[i] };
          }
        });
      }

      console.log(this.$refs.productModal);
      this.$refs.productModal.open();

      // productModal.show();
    },
    toInitIsActive(val) {
      this.isActive = val;
    },
    getProductAll(page = 1) {
      this.isLoading = true;
      const getProductsAPI = `${VITE_API}api/${VITE_API_PATH}/admin/products/?page=${page}`;
      this.$http
        .get(getProductsAPI)
        .then((res) => {
          this.products = Object.values(res.data.products);
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
    productDetail(num) {
      this.isActive = num;
    },
    isLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)petsHome\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.$http.defaults.headers.common["Authorization"] = token;

      const checkLoginAPI = `${VITE_API}api/user/check`;

      this.$http
        .post(checkLoginAPI)
        .then(() => {})
        .catch(() => {
          this.$router.push("/login");
        });
    },
  },
  components: { Pagination, ProductModal },
};
</script>
