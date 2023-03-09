<template>
  <div class="item-card">
    <v-card class="mx-auto" max-width="300" height="600">
      <div class="discount">{{ Math.floor(item.discountPercentage) }} %</div>
      <v-img
        class="align-end item-image text-white"
        height="350"
        v-bind:src="item.thumbnail"
        cover
      >
        <v-card-title class="white"> {{ item.title }} </v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4">
        <div>{{ item.description }}</div>
      </v-card-subtitle>
        <v-card-text>
          <p>{{ item.category }}</p>
        </v-card-text>
        <v-card-text>
          <p class="price">{{ item.price }}.-</p>
        </v-card-text>
        <div class="actions">
            <button class="delete" @click="deleteItem"> <v-icon> mdi-trash-can </v-icon> </button>
            <button class="edit" @click="editItem"> <v-icon> mdi-note-edit-outline </v-icon> </button>
        </div>
    
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    
    deleteItem(){
        this.$store.commit('deleteItem', this.item.id)
    },
    editItem(){
      this.$emit('toggleModal',this.item)
    }
  },
};
</script>
 
<style scoped>
.item-card {
}

.bottom-card {
}
.price {
  font-weight: bold;
  font-size: 2em;
}
.discount {
  background-color: red;
  color: white;
  font-weight: bold;
  position: absolute;
  width: 40px;
  text-align: center;
  border-radius: 20%;
  top: -5px;
  left: -10px;
  z-index: 20;
}
</style>