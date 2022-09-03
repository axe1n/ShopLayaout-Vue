Vue.component('burger_menu', {
  data() {
    return {
      show: false,
    };
  },

  template: `
  <div class="menu-burger-wrapper">
  <img class="menu-icon" src="img/menu-burger.svg" alt="menu" @click="show=!show">
  <nav class="menu__hidden" v-if="show">
    <div class="menu__close"><img src="img/icon-delete.svg" alt="close menu" @click="show=!show"></div>
    <h2>MENU</h2>
    <ul>
      <li><a class="menu__mainCat" href="#">MAN</a>
          <ul>
              <li><a class="menu__secondaryCat" href="#">Accessories</a></li>
              <li><a class="menu__secondaryCat" href="#">Bags</a></li>
              <li><a class="menu__secondaryCat" href="#">Denim</a></li>
              <li><a class="menu__secondaryCat" href="#">T-Shirts</a></li>
          </ul>
      </li>
      <li><a class="menu__mainCat" href="#">WOMAN</a>
          <ul>
              <li><a class="menu__secondaryCat" href="#">Accessories</a></li>
              <li><a class="menu__secondaryCat" href="#">Jackets & Coats</a></li>
              <li><a class="menu__secondaryCat" href="#">Polos</a></li>
              <li><a class="menu__secondaryCat" href="#">T-Shirts</a></li>
              <li><a class="menu__secondaryCat" href="#">Shirts</a></li>
          </ul>
      </li>
      <li><a class="menu__mainCat" href="#">KIDS</a>
          <ul>
              <li><a class="menu__secondaryCat" href="#">Accessories</a></li>
              <li><a class="menu__secondaryCat" href="#">Jackets & Coats</a></li>
              <li><a class="menu__secondaryCat" href="#">Polos</a></li>
              <li><a class="menu__secondaryCat" href="#">T-Shirts</a></li>
              <li><a class="menu__secondaryCat" href="#">Shirts</a></li>
              <li><a class="menu__secondaryCat" href="#">Bags</a></li>
          </ul>
      </li>
  </ul>
</nav>
</div>
`,
});
