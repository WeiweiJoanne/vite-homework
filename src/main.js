import { createApp, provide } from "vue";
import { createPinia } from "pinia";

import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import "./assets/all.scss";

import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

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

const app = createApp(App);
// app.config.globalProperties.$APP = import.meta.env.VITE_API;
import { filterDate } from "./methods/filters";

app.provide("VITE_API", import.meta.env.VITE_API);
app.provide("VITE_API_PATH", import.meta.env.VITE_API_PATH);
app.provide("filterDate", filterDate);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.component("VueLoading", Loading);
app.component("VueForm", Form);
app.component("VueField", Field);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
