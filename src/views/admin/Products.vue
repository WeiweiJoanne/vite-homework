<template>
  <div class="mt-5">
    <h2 class="text-center">後臺產品列表</h2>
  </div>
</template>

<script>
const { VITE_API } = import.meta.env;

export default {
  data() {
    return {};
  },
  mounted() {
    this.isLogin();
  },
  methods: {
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
};
</script>
