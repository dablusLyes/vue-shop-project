<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mt-10">
        <h1 class="text-h4 mb-3">Welcome to our template app &#128075;</h1>

        <p class="subheading font-weight-regular">This simplified front-end stack includes:</p>
        <v-card flat class="d-inline-block grey lighten-3 pa-4 rounded-xl">
          <div v-for="item in stack" :key="item.name" class="d-flex align-center">
            <v-avatar tile size="20" class="mr-1"><img :src="item.pic" /></v-avatar> {{ item.name }}
            <div class="ml-2">➟</div>
            <a :href="item.link" target="_blank" class="text-decoration-none ml-1">DOCS</a>
          </div>
        </v-card>

        <p class="mt-4">Happy hacking!</p>

        <v-img
          src="https://joineer.com/wp-content/uploads/2021/08/joineer_150x35.png"
          contain
          height="30"
          class="mt-10"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    stack: [
      {
        name: "Vue 2",
        link: "https://v2.vuejs.org/",
        pic: "https://miro.medium.com/max/512/0*FW1WvrvhgODK1qiR.png",
      },
      {
        name: "Vuetify",
        link: "https://vuetifyjs.com/en/",
        pic: "https://seeklogo.com/images/V/vuetify-logo-3BCF73C928-seeklogo.com.png",
      },
      {
        name: "Vuex",
        link: "https://vuex.vuejs.org/",
        pic: "https://user-images.githubusercontent.com/7110136/29002857-9e802f08-7ab4-11e7-9c31-604b5d0d0c19.png",
      },
      {
        name: "Vue router",
        link: "https://router.vuejs.org/",
        pic: "https://user-images.githubusercontent.com/7110136/29002858-a09570d2-7ab4-11e7-8faa-5dd6d4458b0d.png",
      },
      {
        name: "i18n",
        link: "https://kazupon.github.io/vue-i18n/",
        pic: "https://kazupon.github.io/vue-i18n/vue-i18n-logo.png",
      },
    ],
  }),
};
</script>
