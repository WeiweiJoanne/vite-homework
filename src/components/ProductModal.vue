<template>
  <div
    class="modal fade"
    ref="productModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    id="product-modal-temp"
  >
    <div
      class="modal-dialog modal-xl"
      v-show="modalFor == 'new' || modalFor == 'edit'"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">產品規格</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="row g-3 needs-validation" novalidate>
            <div class="d-flex flex-wrap">
              <div class="col-12 col-sm-7 pe-3">
                <div class="mb-3">
                  <label for="product-title" class="form-label">產品標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="product-title"
                    v-model.trim="modalData.title"
                    placeholder="請輸入產品標題"
                    required
                  />
                </div>
                <div class="row g-2 flex-wrap">
                  <div class="col-12 col-sm-6 mb-3">
                    <label for="product-category" class="form-label"
                      >產品分類</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="product-category"
                      v-model.trim="modalData.category"
                      placeholder="請輸入產品分類"
                      required
                    />
                  </div>
                  <div class="col-12 col-sm-6 mb-3">
                    <label for="product-unit" class="form-label"
                      >產品單位</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="product-unit"
                      v-model.trim="modalData.unit"
                      placeholder="請輸入產品單位"
                      required
                    />
                  </div>
                  <div class="col-12 col-sm-6 mb-3">
                    <label for="product-origin-price" class="form-label"
                      >產品原價</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="product-origin-price"
                      v-model.number="modalData.origin_price"
                      placeholder="請輸入產品原價"
                      required
                    />
                  </div>
                  <div class="col-12 col-sm-6 mb-3">
                    <label for="product-price" class="form-label"
                      >產品售價</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      id="product-price"
                      v-model.number="modalData.price"
                      placeholder="請輸入產品售價"
                      required
                    />
                  </div>
                </div>
                <hr />
                <div class="mb-3">
                  <label for="product-description" class="form-label"
                    >產品描述</label
                  >
                  <textarea
                    class="form-control"
                    id="product-description"
                    v-model.trim="modalData.description"
                    placeholder="請輸入產品描述"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="product-content" class="form-label"
                    >產品說明內容</label
                  >
                  <textarea
                    class="form-control"
                    id="product-content"
                    v-model.trim="modalData.content"
                    placeholder="請輸入產品說明內容"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="product-enable"
                      v-model="modalData.is_enabled"
                      :checked="modalData.is_enabled == 1"
                    />
                    <label class="form-check-label" for="product-enable">
                      產品啟用
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-5 ps-3">
                <div class="mb-5">
                  <label for="imageUrl" class="form-label">主圖網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="imageUrl"
                    placeholder="請輸入主圖網址"
                    v-model="modalData.imageUrl"
                    required
                  />
                  <img class="img-fluid" :src="modalData.imageUrl" />
                </div>
                <h3 class="mt-3 mb-2">多圖新增</h3>
                <div class="">
                  <div
                    v-if="
                      Array.isArray(modalData.imagesUrl) &&
                      Object.keys(productTemp).includes('imagesUrl')
                    "
                  >
                    <div v-for="(image, i) in modalData.imagesUrl" :key="i">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片網址"
                        v-model="modalData.imagesUrl[i]"
                      />
                      <img class="img-fluid" :src="image" />
                    </div>
                  </div>

                  <div class="text-center mt-2 d-grid">
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="switchImgBtn('delete')"
                      v-if="insertImgBtn == 'insert'"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      @click="switchImgBtn('insert')"
                      v-else
                    >
                      -
                    </button>
                  </div>
                  <div class="text-center mt-5 d-grid">
                    <button
                      type="button"
                      class="btn btn-danger"
                      @click="excute"
                    >
                      <span v-if="modalFor === 'new'">建立新產品</span>
                      <span v-else>更新產品</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="modal-dialog" role="document" v-show="modalFor == 'del'">
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
          <h5 class="modal-title text-center" id="exampleModalLabel">
            確定要刪除 {{ modalData.title }} 嗎?
          </h5>
          <div class="d-flex justify-content-center my-4">
            <button
              type="button"
              class="btn btn-outline-danger mx-2"
              @click="excute"
            >
              確定刪除
            </button>
            <button
              type="button"
              class="btn btn-secondary mx-2"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";
const { VITE_API, VITE_API_PATH } = import.meta.env;
export default {
  data() {
    return {
      modal: {},
      insertImgBtn: "insert",
      modalData: {},
    };
  },
  props: ["modalFor", "productTemp", "getProductAll", "pagination"],
  watch: {
    productTemp: {
      handler: function (newVal) {
        this.modalData = this.productTemp;
        if (Object.keys(this.productTemp).includes("imagesUrl")) {
          this.insertImgBtn =
            newVal.imagesUrl[newVal.imagesUrl.length - 1] !== ""
              ? "insert"
              : "delete";
        }
        this.modalData.is_enabled = this.modalData.is_enabled ? 1 : 0;
      },
      deep: true,
    },
  },
  methods: {
    open() {
      this.modal.show();
    },
    close() {
      this.modal.hide();
    },
    excute() {
      const objVal = Object.values(this.productTemp);
      const isValidForm = objVal.includes("") ? false : true;
      const excuteAPI =
        this.modalFor === "new"
          ? `${VITE_API}api/${VITE_API_PATH}/admin/product`
          : `${VITE_API}api/${VITE_API_PATH}/admin/product/${this.modalData.id}`;
      let method = "";
      if (this.modalFor === "new") {
        method = "post";
      } else if (this.modalFor === "edit") {
        method = "put";
      } else if (this.modalFor === "del") {
        method = "delete";
      }

      if (this.modalFor == "new" || this.modalFor == "edit") {
        if (!isValidForm) {
          alert("請將欄位填寫完畢");
        } else {
          const data = {
            data: this.modalData,
          };
          this.$http[method](excuteAPI, data)
            .then(() => {
              this.modalData = {};
              this.getProductAll(this.pagination.current_page);
              this.close();
            })
            .catch((err) => console.log(err));
        }
      } else {
        this.$http[method](excuteAPI)
          .then(() => {
            this.modalData = {};
            this.getProductAll(this.pagination.current_page);
            this.close();
          })
          .catch((err) => console.log(err));
      }
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModal);
  },
};
</script>
