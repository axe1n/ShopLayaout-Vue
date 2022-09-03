Vue.component('cart', {
  data() {
    return {
      cartUrl: '/getBasket.json',
      cartItems: [],
      amount: 0,
      quantityGoods: 0,
      show: false,
    };
  },
  mounted() {
    this.$parent.getJson(`/api/cart`).then((data) => {
      this.$data.quantityGoods = data.quantityGoods;
      this.$data.amount = data.amount;
      data.contents.forEach((product) => {
        this.$data.cartItems.push(product);
      });
    });
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

    addProduct(item) {
      const isСartFull = !!this.cartItems;

      if (isСartFull) {
        const findProduct = this.cartItems.find(
          (cartProduct) => cartProduct.id_product === item.id_product
        );

        if (findProduct) {
          return this.$parent
            .putJson(`/api/cart/${findProduct.id_product}`, { quantity: 1 })
            .then((data) => {
              if (data.result) {
                findProduct.quantity++;
                this.$_changeAmount();
                this.$_changeQuantityGoods();
              }
            });
        }
      }

      const product = Object.assign({ quantity: 1 }, item);
      this.$parent.postJson(`/api/cart`, product).then((data) => {
        if (data.result) {
          this.cartItems.push(product);
        }
        this.$_changeAmount();
        this.$_changeQuantityGoods();
      });
    },

    removeProduct(item) {
      const findProduct = this.cartItems.find(
        (cartProduct) => cartProduct.id_product === item.id_product
      );

      if (findProduct.quantity > 1) {
        return this.$parent
          .putJson(`/api/cart/${findProduct.id_product}`, { quantity: -1 })
          .then((data) => {
            if (data.result) {
              findProduct.quantity--;
              this.$_changeAmount();
              this.$_changeQuantityGoods();
            }
          });
      }

      this.$parent
        .deleteJson(`/api/cart/${findProduct.id_product}`)
        .then((data) => {
          if (data.result) {
            this.cartItems.splice(this.cartItems.indexOf(findProduct), 1);
            this.$_changeAmount();
            this.$_changeQuantityGoods();
          }
        });
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
