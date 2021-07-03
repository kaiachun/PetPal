<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>圖片</th>
          <th>名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width: 200px">
            <div
              style="
                height: 200px;
                background-size: cover;
                background-position: center;
              "
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
          </td>
          <td class="fw-bolder">
            {{ item.title }}
          </td>
          <td>
            <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
            <del class="h6 text-secondary" v-if="item.price"
              >原價 {{ item.origin_price }} 元</del
            >
            <div class="h5 text-danger fw-bolder" v-if="item.price">
              現在只要 {{ item.price }} 元
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-info"
                @click="getProduct(item)"
              >
                查看更多
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 加入分頁按鈕 -->
    <div class="d-flex justify-content-center mt-5">
      <pagination :page="pagination" @get-product="getProducts"></pagination>
    </div>
  </div>
</template>

<script>
// 載入分頁元件
import pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      page: "",
    };
  },
  components: {
    pagination,
  },
  mounted() {
    // 取得所有產品
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      // process.env 為 node 語法，表示應用程序中的環境變數下的變數名稱
      const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      console.log(url);

      this.$http.get(url).then((res) => {
        if (res.data.success) {
          console.log(res);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }
      });
    },
    getProduct(item) {
      // 取得單一產品
      console.log(item);
      this.$router.push(`/product/${item.id}`);
    },
  },
  created() {},
};
</script>
