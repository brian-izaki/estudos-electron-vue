<template>
  <header-logged />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderLogged from "@/components/HeaderLogged/index.vue";

export default defineComponent({
  components: {
    "header-logged": HeaderLogged,
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fafafa;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
