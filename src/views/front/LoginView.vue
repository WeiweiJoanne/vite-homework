<template>
  <div class="mt-5">
    <div class="d-flex justify-content-center align-items-center">
      <div class="col-12 col-sm-8 col-lg-5 p-3">
        <h2 class="text-center">登入</h2>
        <div class="mb-3">
          <label for="username" class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            id="username"
            placeholder="name@example.com"
            v-model="username"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="****"
            v-model="password"
            @keyup.enter="login(username, password)"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary col-12 mt-3"
          @click="login(username, password)"
        >
          登入
        </button>
      </div>
    </div>
  </div>
</template>
<script>
const { VITE_API, VITE_APIPATH } = import.meta.env;
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login(username, password) {
      const regex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);

      if (regex.test(username)) {
        const api = `${VITE_API}admin/signin`;
        const body = {
          username,
          password,
        };
        this.$http
          .post(api, body)
          .then(res => {
            const { message, token, expired } = res.data;
            alert(message);
            document.cookie = `petsHome=${token}; expire=${expired}; Path=/`;
            this.$router.push("/admin");
          })
          .catch(err => {
            alert(err.response.data.message);
          });
      } else {
        alert("Email 格式不正確");
      }
    },
  },
};
</script>
