<template>
  <div>
    <div @click="emitCloseModal" class="modal-container"></div>
    <div class="modal">
      <v-form @submit.prevent validate-on="submit">
            <v-img
            v-if="previewThumbnail"
              class="preview-image"
              height="350"
              v-bind:src="previewThumbnail"
              cover
            ></v-img>
            <v-text-field
              v-model="imageInputText"
              @change="imageArrayPush"
              :rules="urlCheck"
              class="image-input input"
              label="Image URL"
              required
            ></v-text-field>
            <div class="chips">
              <div
                class="chip"
                v-for="(image, idx) in product.images"
                :key="image.id"
              >
                <v-chip
                  @click="changePreviewThumbnail(idx)"
                  class="ma-1 chiplet"
                  closable
                >
                  image {{ idx + 1 }}
                  <v-icon @click="imageArrayPop(idx)">
                    mdi-close-circle-outline
                  </v-icon>
                </v-chip>
              </div>
            </div>
            <div class="inputs">
              <v-text-field
                v-model="product.title"
                class="name-input input"
                label="Product name"
                :rules="inputRules"
                required
              ></v-text-field>
              <v-textarea
                v-model="product.description"
                :rules="inputRules"
                rows="3"
                density="compact"
                class="description-input input"
                label="Product description"
                required
              ></v-textarea>
              <v-select
                class="input category-input"
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
              <v-text-field
                :rules="intRules"
                class="input price-input"
                v-model="product.price"
                type="number"
                label="Product price"
                required
              ></v-text-field>
              <v-text-field
                class="input discount-input"
                v-model="product.discountPercentage"
                type="number"
                label="Discount"
                required
              ></v-text-field>
            </div>
              <v-btn block type="submit" class="submitBtn" color="green" @click="submit">
                {{method}} item
              </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      imageInputText: "",
      product: {
        images: [],
      },
      method: "",
      previewThumbnail: "",
      urlPattern : /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
      urlCheck: [
        (val) => {
          if(val.length == 0) return true
          if(this.urlPattern.test(val)) return true
          return 'Invalid URL'
        },
      ],
      inputRules : [
        (val)=>{
          if(val) return true
          return 'Input must be filled'
        }
      ],
      intRules: [
        val=>{
          if(!val) return 'Input must be filled'
          if(val < 0) return 'Value must be positive'
          return true
        }
      ]
    };
  },
  methods: { 
    submit() {
      let payload = this.product;
      if(!payload.title) return;
      if(!payload.description) return;
      if(payload.images.length == 0) return;
      if(!payload.price) return;
      if(!(payload.discountPercentage >= 0)) payload.discountPercentage =0;
      if(!payload.thumbnail) payload.thumbnail = payload.images[0]


      if (this.method == "create") this.createItem(payload);
      if (this.method == "edit") this.editItem(payload);
      this.emitCloseModal();
    },
    createItem(payload) {
      this.$store.commit("createItem", payload);
    },
    editItem(payload) {
      this.$store.commit("editItem", payload);
    },
    emitCloseModal() {
      this.$emit("closeModal");
    },
    imageArrayPop(idx) {
      this.product.images.splice(idx, 1);
    },
    imageArrayPush() {
      let image = this.imageInputText.trim();
      let resultImages = image.split(' ')
      let errorImages = resultImages.map(image => {
        if(this.urlPattern.test(image)){
          this.product.images.push(image.trim());
          this.previewThumbnail = image.trim()
        }else{
          return image.trim();
        }
      })
      this.imageInputText = errorImages.join(' ');
    },
    changePreviewThumbnail(idx) {
      this.previewThumbnail = this.product.images[idx];
      this.product.thumbnail = this.product.images[idx];
    },
  },


  mounted() {
    if (this.item.id) {
      let obj = JSON.parse(JSON.stringify(this.item));
      this.product = obj;
      this.method = "edit";
      this.previewThumbnail = this.product.thumbnail;
    } else {
      this.method = "create";
    }
  },
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 31;
  width: 100%;
  height: 100vh;
  background-color: rgba(12, 12, 12, 0.5);
}
.modal {
  z-index: 33;
  background-color: white;
  position: fixed;
  width: 560px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5%;
  overflow: auto;
  overflow-x: hidden;
}
.inputs {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  padding: 5px 20px;
}
.input {
  width: 45%;
  margin: 0 5px;
}
.image-input {
  display: block;
  width: 100%;
  padding: 5px 20px;
  margin-top:20px;
}
.description-input{
  width:100%;
}
.chips {
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  max-width: 95%;
  margin-bottom: 20px ;
}
.chip {
  box-sizing: border-box;
}
.preview-image {
  /* width: 50%; */
  height: 100px;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
}
.submitBtn{
  height: 300px;
}
.activeChip{
  border:3px solid black

}
@media screen and (max-width: 680px) {
  .modal {
    width: 350px;
    max-height: calc(100vh - 210px);
    overflow-y: auto;
    overflow-x: hidden;
  }
  .preview-image{
    width:350px
  }
  .chips{
    width:100%;
  }
  .chip {
  width: 30%;
  margin: 0 5px;
} 
  .inputs{
    margin: 10px 10px
  }
}
</style>