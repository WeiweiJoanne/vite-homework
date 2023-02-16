<template>
  <div class="col p-4">
    <div class="text-end mb-4">
      <button class="btn btn-danger" type="submit" @click="deleteCart('all')">
        清除購物車
      </button>
    </div>
    <table class="table align-middle table-sm">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th>數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in carts" :key="item.id">
          <td>
            <button
              class="btn btn-danger rounded-circle my-2"
              type="button"
              @click="deleteCart(item.id)"
            >
              X
            </button>
          </td>
          <td>{{ item.product.title }}</td>
          <td>
            <div class="input-group">
              <select class="form-control" v-model="item.qty">
                <option v-for="i in 20" :key="i">{{ i }}</option>
              </select>
              <span class="input-group-text" id="basic-addon2">{{
                item.product.unit
              }}</span>
            </div>
          </td>
          <td>${{ item.product.price }}</td>
        </tr>
        <tr>
          <td colspan="4" class="text-end">總共: ${{ total }}</td>
        </tr>
      </tbody>
    </table>
    <v-form class="mt-5" v-slot="{ errors }" @submit="onSubmit">
      <div class="form-floating mb-3">
        <v-field
          id="username"
          name="姓名"
          type="username"
          :class="['form-control', { 'is-invalid': errors['姓名'] }]"
          placeholder="請輸入 username"
          rules="required"
          v-model="user.username"
        ></v-field>
        <label for="username-input">Name</label>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>
      <div class="form-floating mb-3">
        <v-field
          id="email"
          name="Email"
          type="email"
          :class="['form-control', { 'is-invalid': errors['Email'] }]"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="user.email"
        ></v-field>
        <label for="email-input">Email</label>
        <error-message name="Email" class="invalid-feedback"></error-message>
      </div>
      <div class="form-floating mb-3">
        <v-field
          id="telphone"
          name="電話"
          type="tel"
          :class="['form-control', { 'is-invalid': errors['電話'] }]"
          placeholder="請輸入 telphone"
          rules="min: 8|numeric|required"
          v-model="user.telphone"
        ></v-field>
        <label for="telphone-input">Telphone</label>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>
      <div class="form-floating mb-3">
        <v-field
          id="address"
          name="地址"
          type="tel"
          :class="['form-control', { 'is-invalid': errors['地址'] }]"
          placeholder="請輸入 address"
          rules="min: 8|required"
          v-model="user.address"
        ></v-field>
        <label for="address-input">Address</label>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>
      <div class="form-floating mb-3">
        <textarea
          style="height: 100px"
          id="message"
          name="message"
          type="text"
          class="form-control"
          placeholder="請輸入 message"
          v-model="user.message"
        ></textarea>
        <label for="message-input">Message</label>
        <error-message name="message" class="invalid-feedback"></error-message>
      </div>
      <div class="text-end d-grid">
        <button class="btn btn-primary" type="submit">送出</button>
      </div>
    </v-form>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

const { VITE_API, VITE_APIPATH } = import.meta.env;
// zh_TW
// import { required, email, min } from '@vee-validate/rules';
// defineRule('required', required);
// defineRule('email', email);
// defineRule('min', min);
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

// 設定預設語系
setLocale("zh_TW");

export default {
  data() {
    return {
      user: {},
      isLoading: true,
      fullPage: true,
      carts: [],
    };
  },
  mounted() {
    this.isLoading = true;
    this.getCart();
  },
  methods: {
    getCart() {
      this.$http
        .get(`${VITE_API}api/${VITE_APIPATH}/cart`)
        .then((res) => {
          const data = res.data.data.carts;
          this.carts = data;
          this.isLoading = false;
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    total() {
      let total = 0;
      this.carts.forEach((e) => {
        total += e.final_total;
      });
      return total;
    },
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
  },
};
</script>
