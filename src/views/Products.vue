<template>
  <div class="app">
    <NewEditProduct
      v-if="showModal"
      @closeModal="closeModal"
      :item="selectedItem"
    />
    <div class="discounted">
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        :show-arrows="true"
      >
        <v-carousel-item v-for="(item, i) in discountedItems" :key="i">
          <v-sheet  height="100%">
            <div class="d-flex fill-height justify-center align-center">
              <div class="text-h2">{{ item.thumbnail }}</div>
            </div>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <!-- <div v-for="item in discountedItems" :key="item.id">
        {{ item }}
      </div> -->
    </div>
    <div class="filtering">
      <div class="input search-input">
        <v-text-field
          label="Search..."
          v-model.trim="search"
          hide-details="auto"
        ></v-text-field>
      </div>
      <div class="input filter-input">
        <v-select
          label="Categories"
          v-model="filter"
          :items="[
            'smartphones',
            'laptops',
            'home-decoration',
            'fragrances',
            'skincare',
            'groceries',
          ]"
        ></v-select>
      </div>
      <div class="input sort-input">
        <v-select
          label="Sort by:"
          v-model="sort"
          :items="['Trending', 'Lowest price', 'Highest price', 'Discount']"
        ></v-select>
        <v-btn @click="itemModal" color="blue"> Add a new product </v-btn>
      </div>
    </div>
    <div class="item-list">
      <div v-for="item in computedItems" :key="item.id">
        <ProductCard @toggleModal="itemModal" class="item-card" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import NewEditProduct from "@/components/NewEditProduct.vue";
import ProductCard from "../components/ProductCard.vue";
export default {
  components: { ProductCard, NewEditProduct },
  data() {
    return {
      showModal: false,
      search: "",
      filter: "",
      sort: "id",
      selectedItem: {},
    };
  },

  mounted() {
    this.$store.dispatch("getItems");
  },
  methods: {
    searchedItems(items) {
      if (this.search.length > 0) {
        return items.filter((item) =>
          item.title.toLowerCase().includes(this.search)
        );
      } else {
        return items;
      }
    },
    filteredItems(items) {
      if (this.filter.length > 0) {
        return items.filter((item) => item.category === this.filter);
      } else {
        return items;
      }
    },

    sortedItems(items) {
      if (this.sort.length > 0) {
        switch (this.sort) {
          case "Trending":
            return items.sort((a, b) =>
              a["id"] > b["id"] ? 1 : a["id"] < b["id"] ? -1 : 0
            );
          case "Lowest price":
            return items.sort((a, b) =>
              a["price"] > b["price"] ? 1 : a["price"] < b["price"] ? -1 : 0
            );
          case "Highest price":
            return items.sort((a, b) =>
              a["price"] < b["price"] ? 1 : a["price"] > b["price"] ? -1 : 0
            );
          case "Discount":
            return items.sort((a, b) =>
              a["discountPercentage"] < b["discountPercentage"]
                ? 1
                : a["discountPercentage"] > b["discountPercentage"]
                ? -1
                : 0
            );
          default:
            return items;
        }
      } else {
        return items;
      }
    },

    itemModal(payload) {
      this.selectedItem = payload;
    },
    closeModal() {
      this.showModal = false;
    },
  },
  computed: {
    listItems() {
      return this.$store.getters.listItems;
    },

    computedItems() {
      return this.sortedItems(
        this.searchedItems(this.filteredItems(this.listItems))
      );
    },
    discountedItems() {
      return this.listItems
        .sort((a, b) =>
          a["discountPercentage"] < b["discountPercentage"]
            ? 1
            : a["discountPercentage"] > b["discountPercentage"]
            ? -1
            : 0
        )
        .slice(0, 4);
    },
  },
};
</script>

<style>
.app {
  margin-top: 50px;
  padding: 0 40px;
}
.filtering {
  width: 100%;
  padding: 50px 30px;
  display: block;

  /* align-items: center; */
}
.input {
  /* width: 90%;  */
  /* padding: 20px; */
  /* margin: 50px 20px;  */
  /* border: 2px solid black; */
}

.item-list {
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 10px;
}

@media screen and (max-width: 1250px) {
  .item-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .filtering {
    width: 100%;
  }
}

@media screen and (max-width: 680px) {
  .item-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>