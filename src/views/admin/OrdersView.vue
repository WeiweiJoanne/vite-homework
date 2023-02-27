<template>
  <VueLoading :active="isLoading" :is-full-page="fullPage"></VueLoading>
  <div class="text-end">
    <button class="btn btn-danger btn-sm" type="button" @click="delAll">
      刪除全部訂單
    </button>
  </div>
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
                @click="openModal('view', item)"
              >
                檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openModal('del', item)"
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
  <OrdersModal
    ref="orderTemp"
    :modal-for="modalFor"
    :order-temp="orderTemp"
    :get-orders-all="getOrdersAll"
  ></OrdersModal>
  <Pagination :pagination="pagination" :get-orders-all="getOrdersAll"></Pagination>
</template>

<script>
// const { VITE_API, VITE_API_PATH } = import.meta.env;
import { inject } from "vue";
import Pagination from "../../components/PaginationItem.vue";
import OrdersModal from "../../components/ordersModal.vue";

export default {
  data() {
    return {
      isActive: null,
      isLoading: true,
      fullPage: true,
      pagination: {},
      orders: [],
      modalFor: null,
      orderTemp: {},
    };
  },
  inject: ["VITE_API", "VITE_API_PATH", "filterDate"],
  mounted() {
    this.isLogin();
    // /v2/api/{api_path}/admin/orders
    this.getOrdersAll();
  },
  methods: {
    openModal(todo, item) {
      this.modalFor = todo;
      this.orderTemp = item;
      this.$refs.orderTemp.open();
    },
    delAll() {
      this.isLoading = true;
      // /v2/api/{api_path}/admin/order/{id}
      this.$http["delete"](
        `${this.VITE_API}api/${this.VITE_API_PATH}/admin/orders/all`
      )
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            this.getOrdersAll();
          }
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
    updatePaid(item) {
      this.isLoading = true;
      // /v2/api/{api_path}/admin/order/{id}
      const id = item.id;
      const data = {
        data: {
          paid_date: item.is_paid ? parseInt(Date.now() / 1000): null,
          is_paid: item.is_paid,
        },
      };
      console.log(data);
      this.$http["put"](
        `${this.VITE_API}api/${this.VITE_API_PATH}/admin/order/${id}`,
        data
      )
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            this.getOrdersAll()
          }
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
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
    getOrdersAll() {
      this.isLoading = true;
      // /v2/api/{api_path}/admin/orders
      this.$http(`${this.VITE_API}api/${this.VITE_API_PATH}/admin/orders`).then(
        (res) => {
          const data = res.data.orders;
          this.orders = data;
          this.isLoading = false;
          this.pagination = res.data.pagination
        }
      );
    },
  },
  components: { Pagination, OrdersModal },
};
</script>
