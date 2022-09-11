Vue.component('cart', {
  data() {
    return {
      cartItems: [],
      amount: 0,
      quantityGoods: 0,
      show: false,
    };
  },

  async mounted() {
    try {
      const data = await this.$parent.getJson('/api/cart');

      this.$data.quantityGoods = data.quantityGoods;
      this.$data.amount = data.amount;

      data.contents.forEach((product) => {
        this.$data.cartItems.push(product);
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  methods: {
    $_changeQuantityGoods() {
      this.quantityGoods = this.cartItems.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
    },

    $_changeAmount() {
      this.amount = this.cartItems.reduce(
        (acc, product) => acc + +product.price * +product.quantity,
        0
      );
    },

    async addProduct(item) {
      try {
        const isСartFill = !!this.cartItems;

        if (isСartFill) {
          const findProduct = this.cartItems.find(
            (cartProduct) => cartProduct.id_product === item.id_product
          );

          if (findProduct) {
            const data = await this.$parent.putJson(
              `/api/cart/${findProduct.id_product}`,
              { quantity: 1 }
            );

            if (data.result) {
              findProduct.quantity++;
              this.$_changeAmount();
              this.$_changeQuantityGoods();
              return;
            }
          }
        }

        const product = Object.assign({ quantity: 1 }, item);
        const data = await this.$parent.postJson(`/api/cart`, product);

        if (data.result) {
          this.cartItems.push(product);
          this.$_changeAmount();
          this.$_changeQuantityGoods();
        }
      } catch (error) {
        console.error(error.message);
      }
    },

    async removeProduct(item) {
      try {
        const findProduct = this.cartItems.find(
          (cartProduct) => cartProduct.id_product === item.id_product
        );

        if (findProduct.quantity > 1) {
          const data = await this.$parent.putJson(
            `/api/cart/${findProduct.id_product}`,
            { quantity: -1 }
          );

          if (data.result) {
            findProduct.quantity--;
            this.$_changeAmount();
            this.$_changeQuantityGoods();
            return;
          }
        }

        const data = await this.$parent.deleteJson(
          `/api/cart/${findProduct.id_product}`
        );

        if (data.result) {
          this.cartItems.splice(this.cartItems.indexOf(findProduct), 1);
          this.$_changeAmount();
          this.$_changeQuantityGoods();
        }
      } catch (error) {
        console.error(error.message);
      }
    },
  },

  template: `
  <div class="cart-wrapper">
  <span class="cartIconWrap" @click="show=!show"> <img class="cart-icon" src="img/cart.svg" alt="cart">
      <span class="cartCounter" v-if="quantityGoods">  {{ quantityGoods }} </span>
  </span>
  <div class="b-cartHidden" v-if="show">
      <div class="b-cartHidden__row b-cartHidden__row_header">
          <span>Название товара</span>
          <span>Количество</span>
          <span>Цена за шт.</span>
          <span>Итого</span>
      </div>
      <cart-item
            v-for="item of cartItems"
            :cartItem="item"
            :key="item.id_product" />
      <div class="b-cartHidden__line"></div>
      <div class="b-cartHidden__total">
      <span>Товаров в корзине на сумму: <span class="cartTotalValue">{{ this.amount }}</span>$</span>
  </div>
  </div>
</div>
  `,
});

Vue.component('cart-item', {
  props: ['cartItem'],
  template: `
  <div class="b-cartHidden__rowWrapper">
    <div class="b-cartHidden__row">
      <span>{{ cartItem.product_name }}</span>
      <span class="prodCount">{{ cartItem.quantity }}</span>
      <span>{{ cartItem.price }}</span>
      <span class="totalPrice">{{ cartItem.quantity*cartItem.price }}$</span>
    </div>
    <div class="b-cartHidden__btnWrapper">
      <button @click="$parent.removeProduct(cartItem)" style="cursor:pointer" class="b-cartHidden__delBtn">Удалить</button>
    </div>
  </div>
`,
});
