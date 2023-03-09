<template>
    <div>
      <v-expand-x-transition appear>
      <v-navigation-drawer
        v-if="sidebar"
        v-model="sidebar"
        clipped
        color="grey lighten-4"
        app
        permanent
      >
        <v-list dense class="pt-0">
          <v-list-item to="/" :ripple="false">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/products" :ripple="false">
            <v-list-item-icon>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Products</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-expand-x-transition>
    <v-app-bar app dark dense clipped-left color="primary">
      <v-app-bar-nav-icon fab @click="sidebar = !sidebar" :ripple="false"></v-app-bar-nav-icon>
      <v-toolbar-title>Template app</v-toolbar-title>
    </v-app-bar>
    </div>
</template>

<script>
export default { 
    props: [""],
    components: {  },
    data: () => ({
        sidebar: false
    }),
    methods: {},
    computed: {}
};
</script>
