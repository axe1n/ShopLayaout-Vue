Vue.component('filter_comp', {
  data() {
    return {
      userSearch: '',
    };
  },

  template: `
    <form action="#" class="search-form">
      <input type="text" class="search-field" v-model="userSearch" @input="$root.$refs.products.filter(userSearch)" />
      <img class="search-icon" src="img/search.svg" alt="search">
    </form>
    `,
});
