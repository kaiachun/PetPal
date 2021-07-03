<template>
  <!-- 單一頁面 -->
  <div class="container">
    <div class="row mt-5">
      <div class="col-sm-6">
        <img class="img-fluid" :src="product.imageUrl" alt="" />
      </div>
      <div class="col-sm-6 d-flex flex-column justify-content-between">
        <h2>
          <div class="badge bg-info rounded-pill">{{ product.title }}</div>
        </h2>
        <h3 class="">描述：{{ product.description }}</h3>
        <h3 class="">內容：{{ product.content }}</h3>
        <h4 class="text-secondary">
          <del>原價 {{ product.origin_price }} 元</del>
        </h4>
        <div class="h3 text-danger fw-bolder">
          現在只要 {{ product.price }} 元
        </div>

        <div class="input-group">
          <input
            type="number"
            class="form-control"
            v-model.number="qty"
            min="1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      product: {},
      status: {},
      modal: "",
      qty: 1,
    };
  },
  methods: {},
  created() {
    const { id } = this.$route.params;

    this.id = id;
    const url = `${process.env.VUE_APP_URL}api/${process.env.VUE_APP_PATH}/product/${id}`;
    
    this.$http.get(url).then((res) => {

      if (res.data.success) {
        this.product = res.data.product;
      } else {
        console.log(res.data.message);
      }
    });
  },
};
</script>
