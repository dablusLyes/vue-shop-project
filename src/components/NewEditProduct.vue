<template>
  <div  > 
    <div @click="emitCloseModal" class="modal-container"></div>
    <div class="modal">
      <v-form>
        <v-container>
          <v-row>
              <v-img
                height="350"
                width="100"
                :src="product.thumbnail"
                cover
            />
            <v-col cols="12" md="12">

              <v-file-input label="File input"  variant="underlined" accept="image/png, image/jpeg, image/bmp" @change="imageInput" ></v-file-input>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
               v-model="product.title"
                class="name-input input"
                label="Product name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
              v-model="product.description"
                class="description-input input"
                label="Product description"
                required
              ></v-text-field>
              <v-select
              label="Category"
              v-model="product.category"
              :items="[
                'smartphones',  
                'laptops',
                'home-decoration',
                'fragrances',
                'skincare',
                'groceries',
              ]"
            ></v-select>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field v-model="product.price" type="number" label="Product price"  required></v-text-field>
            </v-col>       
            <v-col cols="12" md="12">
              <v-text-field v-model="product.discountPercentage"  type="number" label="Discount"  required></v-text-field>
            </v-col>
            <v-btn
                color="green"
                class="mr-4"
                @click="submit"
                >
                submit
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  props:['item'],
data(){
    return{
      product :{
        images : []
      },
      method : ''
    }
},
methods:{
    submit(){
      console.log(this.item);
      let payload = this.product;
      console.log(payload);
      console.log(this.method);
      if(this.method == 'create') this.createItem(payload)
      if(this.method == 'edit') this.editItem(payload)  
      this.emitCloseModal();    
    },
    createItem(payload){
      this.$store.commit('createItem', payload)
    }, 
    editItem(payload){
      this.$store.commit('editItem', payload)
    },
    emitCloseModal(){
      this.$emit('closeModal')
    },
    imageInput(e){
      console.log(e);
      let path ="../src/assets/"
      this.product.thumbnail = path + e.name
      this.product.images = [this.product.thumbnail, ...this.product.images]
      console.log(path);
    }
},

mounted(){
  if(this.item.id)
  {
    let obj = JSON.parse(JSON.stringify(this.item));
    this.product = obj
    this.method = 'edit'
  }else{
    this.method = 'create'
  }

}
};
</script>


<style scoped>
.modal-container{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 31;
    width: 100%;
    height: 100vh;
    background-color: rgba(12,12,12,0.5);
}
.modal{
    z-index: 33;
    background-color: white;
    position: fixed;
    width : 350px;
    display: flex;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5%;
    padding: 30px;
}
.input{
  width: 90%;
}
.modal-image{
    width:100%;
    height: 30vh;
}

</style>