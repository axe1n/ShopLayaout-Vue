Vue.component('filter_comp', {
  data() {
    return {
      userSearch: '',
      show: false,
    };
  },

  methods: {
    mouseleaveHideEl() {
      const isUserSearchEmpty = !this.$data.userSearch;

      if (isUserSearchEmpty) {
        this.$data.show = false;
      }
    },
  },

  template: `
    <form action="#" class="search-form" @mouseleave="mouseleaveHideEl">
      <input type="text" class="search-field"  v-model="userSearch" @input="$root.$refs.products.filter(userSearch)" v-if="show"  />
      <img class="search-icon" src="img/search.svg" alt="search" @mouseover="show=true"  >
    </form>
    `,
});
