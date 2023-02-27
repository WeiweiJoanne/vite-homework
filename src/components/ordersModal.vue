<template>
  <VueLoading :active="isLoading" :is-full-page="fullPage"></VueLoading>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="productModal"
  >
    <div class="modal-dialog modal-lg" v-show="modalFor == 'view'">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <h4 class="my-1 text-center">購買人資料</h4>
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 100px">姓名</th>
                  <td>{{ user.name }}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{{ user.email }}</td>
                </tr>
                <tr>
                  <th>電話</th>
                  <td>{{ user.tel }}</td>
                </tr>
                <tr>
                  <th>地址</th>
                  <td>{{ user.address }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 class="my-1 text-center">購物明細</h4>
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 100px">訂單編號</th>
                  <td>{{ orderTemp.id }}</td>
                </tr>
                <tr>
                  <th>下單時間</th>
                  <td>{{ filterDate(orderTemp.create_at) }}</td>
                </tr>
                <tr>
                  <th>付款時間</th>
                  <td>
                    <span v-if="orderTemp.paid_date">
                      {{ filterDate(orderTemp.paid_date) }}
                    </span>
                    <span v-else>尚未付款</span>
                  </td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td>
                    <strong v-if="orderTemp.is_paid" class="text-success"
                      >已付款</strong
                    >
                    <span v-else class="text-muted">尚未付款</span>
                  </td>
                </tr>
                <tr>
                  <th>總金額</th>
                  <td>${{ orderTemp.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 class="my-1 text-center">購買商品</h4>
            <table class="table">
              <tbody>
                <tr v-for="item in orderTemp.products" :key="item.id">
                  <th>
                    {{ item.product.title }}
                  </th>
                  <td>{{ item.qty }} / {{ item.product.unit }}</td>
                  <td class="text-end">${{ item.final_total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-dialog modal-lg" v-show="modalFor == 'del'">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <h4 class="my-1 text-center">確定刪除?</h4>
            <div>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ orderTemp.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ filterDate(orderTemp.create_at) }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span
                        v-if="orderTemp.paid_date !== null && orderTemp.is_paid"
                      >
                        {{ filterDate(orderTemp.paid_date) }}
                      </span>
                      <span v-else>尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="orderTemp.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>${{ orderTemp.total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table class="table">
                <tbody>
                  <tr v-for="item in orderTemp.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">${{ item.final_total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="text-end">
            <button
              type="button"
              class="btn btn-danger"
              @click="delOrder(orderTemp.id)"
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from "vue";
import { Modal } from "bootstrap";
export default {
  data() {
    return {
      isActive: null,
      isLoading: false,
      fullPage: true,
      modal: {},
      modalData: {},
      user: {},
      isPaid: false,
    };
  },
  inject: ["VITE_API", "VITE_API_PATH", "filterDate"],
  props: ["modalFor", "orderTemp", "getOrdersAll"],
  watch: {
    orderTemp: {
      handler: function () {
        this.user = this.orderTemp.user;
        this.isPaid = this.orderTemp.is_paid;
      },
      deep: true,
    },
  },
  methods: {
    delOrder(id) {
      this.isLoading = true;
      // /v2/api/{api_path}/admin/order/{id}
      this.$http["delete"](
        `${this.VITE_API}api/${this.VITE_API_PATH}/admin/order/${id}`
      ).then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          this.close();
          this.getOrdersAll();
        }
        this.isLoading = false;
      });
    },
    open() {
      this.modal.show();
    },
    close() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModal);
  },
};
</script>
