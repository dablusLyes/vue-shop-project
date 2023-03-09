<template >
  <div class="item-card">
    <v-card class="card mx-auto" max-width="300" height="600">
      <v-img
        class="align-end item-image text-white"
        height="350"
        v-bind:src="item.thumbnail"
        cover
      >
      <div class="discount">{{ Math.floor(item.discountPercentage) }} %</div>
      </v-img>
      <v-card-title class="white"> {{ item.title }} </v-card-title>

        <v-card-subtitle class="description-container pt-4">
          <p>{{ item.description }}</p>
        </v-card-subtitle>
        <v-card-text>
          <p>{{ item.category }}</p>
        </v-card-text>
        <v-card-text class="prices">
          <p class="discountedPrice">{{ discountedPrice }}.- </p>
          <p v-if="showDiscountValue" class="originalPrice">{{item.price}}.-</p>
        </v-card-text>
        <div class="actions">
            <button class="delete" @click="deleteItem"> <v-icon class="deleteIcon" > mdi-trash-can </v-icon> </button>
            <button class="edit" @click="editItem">     <v-icon class="editIcon"> mdi-note-edit-outline </v-icon> </button>
        </div>
    
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data(){
    return {
      showDiscountValue:false,
      discountedPrice:'',
      hoveredCard : false
    }
  },
  methods: {
    deleteItem(){
        this.$store.commit('deleteItem', this.item.id)
    },
    hoverCard(){
      console.log(this.item.id);
    },
    editItem(){
      this.$emit('toggleModal',this.item)
    }
  },
  mounted(){
    if(this.item.discountPercentage > 10)
      this.showDiscountValue=true;
      this.discountedPrice  = Math.floor(this.item.price - (this.item.price * (this.item.discountPercentage/100)))
    }
  
};
</script>
 
<style scoped>
.description-container{
  height: 100px;
}
.deleteIcon:hover{
  color: red;
}
.editIcon:hover{
  color: green;
}
.prices{
  display: flex;
  padding: 0 5px;
}
.discountedPrice {
  font-weight: bold;
  font-size: 2em;
}
.originalPrice{
  text-decoration: line-through;
  text-decoration-color: red;
}
.discount {
  background-color: red;
  color: white;
  font-weight: bold;
  width: 40px;
  text-align: center;
  top: -5px;
  left: -10px;
  z-index: 20;
}
.actions{
  background-color: flex;
  justify-content: right;
  position: absolute;
  bottom: 0;
  padding: 5px;
  right: 0;
  opacity: 0;
  transition: 0.3s;
}
.actions > *{
  padding: 0 5px;
}
.card:hover .actions{
  opacity: 1;

}



</style>