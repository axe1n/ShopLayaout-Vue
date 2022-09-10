Vue.component('products', {
  data() {
    return {
      products: [],
    };
  },

  async mounted() {
    try {
      const data = await this.$parent.getJson('/api/products');

      data.forEach((product) => {
        this.$data.products.push(product);
      });
    } catch (error) {
      console.error(error.message);
    }
  },

  methods: {
    async filter(userSearch) {
      try {
        const data = await this.$parent.getJson('/api/products');
        const regexp = new RegExp(userSearch, 'i');

        this.$data.products = data.filter((product) =>
          regexp.test(product.product_name)
        );
      } catch (error) {
        console.error(error.message);
      }
    },
  },

  template: `
  <div class="cards">
  <product 
  v-for="item of this.products" 
  :product="item"
  :key="item.id_product" />
  </div>
  `,
});

Vue.component('product', {
  props: ['product'],
  template: `
  <article class="card">
  <img class="card-image" :src="product.img">
  <div class="card-blackout">
      <button class="add-to-cart-button add-to-cart-button_white" @click="$root.$refs.cart.addProduct(product)">
          <img src="img/icon-white-cart-btn.svg" alt="cart">
          Add to Cart
      </button>
  </div>
  <div class="card-description">
      <h2>{{ product.product_name }}</h2>
      <p>{{ product.description }}</p>
      <span class="card-price">
          $ {{ product.price }}
      </span>
  </div>
  </article>
    `,
});
