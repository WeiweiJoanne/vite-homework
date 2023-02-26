<template>
  <VueLoading :active="isLoading" :is-full-page="fullPage"></VueLoading>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">
        <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ filterDate(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${item.id}`"
                v-model="item.is_paid"
                @change="updatePaid(item)"
              />
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal(item)"
              >
                檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelOrderModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <!-- <OrderModal
    :order="tempOrder"
    ref="orderModal"
    @update-paid="updatePaid"
  ></OrderModal>
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal> -->
  <Pagination
    :pagination="pagination"
    :get-product-all="getProductAll"
  ></Pagination>
</template>

<script>
// const { VITE_API, VITE_API_PATH } = import.meta.env;
import { inject } from "vue";
import Pagination from "../../components/PaginationItem.vue";

export default {
  data() {
    return {
      isActive: null,
      isLoading: true,
      fullPage: true,
      pagination: {},
      orders: [],
    };
  },
  inject: ["VITE_API", "VITE_API_PATH", "filterDate"],
  mounted() {
    this.isLogin();
    // /v2/api/{api_path}/admin/orders
    this.$http(`${this.VITE_API}api/${this.VITE_API_PATH}/admin/orders`).then(
      (res) => {
        const data = res.data.orders;
        this.orders = data;
        this.isLoading = false;
      }
    );
  },
  methods: {
    isLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)petsHome\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.$http.defaults.headers.common["Authorization"] = token;

      const checkLoginAPI = `${this.VITE_API}api/user/check`;

      this.$http
        .post(checkLoginAPI)
        .then(() => {})
        .catch(() => {
          this.$router.push("/login");
        });
    },
    getProductAll(page = 1) {
      this.isLoading = true;
      const getProductsAPI = `${this.VITE_API}api/${this.VITE_API_PATH}/admin/products/?page=${page}`;
      this.$http
        .get(getProductsAPI)
        .then((res) => {
          this.products = Object.values(res.data.products);
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
  },
  components: { Pagination },
};
</script>
