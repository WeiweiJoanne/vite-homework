<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item">
        <a
          :class="['page-link', { disabled: !pagination.has_pre }]"
          href="#"
          aria-label="Previous"
          @click.prevent="goTopage('prev')"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page">
        <a
          :class="['page-link', { active: page == pagination.current_page }]"
          href="#"
          @click.prevent="goTopage('num', page)"
          >{{ page }}</a
        >
      </li>
      <li class="page-item">
        <a
          :class="['page-link', { disabled: !pagination.has_next }]"
          href="#"
          aria-label="Next"
          @click.prevent="goTopage('next')"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ["pagination", "getProductAll"],
  methods: {
    goTopage(action, num = null) {
      this.$emit("initIsActive",null);
      if (action !== "num" && num === null) {
        action === "next"
          ? this.getProductAll(this.pagination.current_page + 1)
          : this.getProductAll(this.pagination.current_page - 1);
      }
      if (action === "num") {
        this.getProductAll(num);
      }
    },
  },
};
</script>
