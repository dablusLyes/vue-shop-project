<template>
  <div class="app">
    <NewEditProduct
      v-if="showModal"
      @closeModal="closeModal"
      :item="selectedItem"
    />
        <div class="input search-input">
          <v-text-field
            label="Search..."
            v-model.trim="search"
            hide-details="auto"
          ></v-text-field>
        </div>
        
    <div id="filterGroup" class="filterGroup" :class="{ filtersActive : showFilters }">
      <button class="filterButton" @click="toggleFilters">
        <v-icon color="blue" :large="true" class="filterButtonIcon">mdi-filter-menu-outline</v-icon>
      </button>
      <div v-if="showFilters" class="filtering">
        <v-select
          label="Categories"
          v-model="filter"
          :items="[
            'All',
            'Smartphones',
            'laptops',
            'home-decoration',
            'fragrances',
            'skincare',
            'groceries',
          ]"
        ></v-select>
        <v-select
          label="Sort by:"
          v-model="sort"
          :items="['Trending', 'Lowest price', 'Highest price', 'Discount']"
        ></v-select>
      </div>
    </div>
    <div class="item-list">
      <div v-for="item in computedItems" :key="item.id">
        <ProductCard @toggleModal="itemModal" class="item-card" :item="item" />
      </div>
    </div>
    <div class="newItemButton">
      <v-btn
        color="blue"
        :large="true"
        elevation="10"
        :rounded="true"
        @click="itemModal"
      >
        <v-icon class="plusIcon" color="white">mdi-plus-circle</v-icon>add new item</v-btn>
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
      showFilters: false,
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
    toggleFilters() {
      this.showFilters = !this.showFilters;
      console.log(this.showFilters);
    },
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
        let filter = this.filter.toLocaleLowerCase();
        if (filter == "all") {
          return items;
        } else {
          return items.filter((item) => item.category === filter);
        }
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
      this.showModal = true;
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
  background-color: rgb(247, 239, 239);
}
.filtering {
  width: 100%;
  padding: 10px 30px;
  /* display: flex; */

  /* align-items: center; */
}

#filterGroup {
  margin: 20px;
  padding: 5px 10px;
  border-radius: 6px;
  width : 70px;
  height: 60px;
  position:relative;
  left: -10px;
  top:-10px;
  transition : .3s;
  background-color: white;
  border:2px solid #1976D2


}

#filterGroup.filtersActive {
  width:60%;
  height: 100%;
}

.filterButton{
  padding : 10px;
  position: relative;
  left: 0px;

}


.search-input {
  width: 100%;
}
.newItemButton {
  position: fixed;
  right: -140px;
  bottom: 50px;
  transition: 0.3s;
}
.newItemButton:hover {
  transform: translateX(-140px);
}

.item-list {
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 10px;
}
.plusIcon {
  padding-right: 20px;
}
@media screen and (max-width: 680px) {
  .item-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media screen and (max-width: 1250px) {
  .item-list {
    grid-template-columns: repeat(2, 1fr);
  }
  .filtering {
    width: 100%;
  }
}
@media screen and (max-width: 1630px) {
  .item-list {
    grid-template-columns: repeat(4, 1fr);
  }

}

</style>