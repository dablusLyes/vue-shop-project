<template>
      <header>
        <nav class="container">
            <div class="branding">
                <img class="logo" src="../assets/logo.png" alt="">
                <h1>Vue shop</h1>
            </div>
        </nav>
    </header>
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

<style scoped>

  header{
    margin-bottom: 30px;
    box-shadow: 0 0 15 20px black;
  }
  .branding{
    display: flex;
    justify-content: center;
  }
  .logo {
    width: 40px;
  }
</style>