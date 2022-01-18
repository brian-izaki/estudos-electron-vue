<template>
  <nav>
    <div class="menu-container">
      <div class="return-container">
        <button
          v-if="routeName !== 'Home'"
          @click="returnPage"
          class="return"
          title="Voltar para página anterior"
        >
          &lt;
        </button>
      </div>
      <h1>{{ routeName }}</h1>
      <p>Bem vindo Brian!</p>
    </div>
  </nav>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const routeName = ref();

    watch(
      () => route.name,
      (name) => (routeName.value = name)
    );

    function returnPage() {
      router.back();
    }

    return {
      routeName,
      returnPage,
    };
  },
});
</script>

<style lang="scss" scoped>
nav {
  background: #705e78;
}

.return-container {
  flex: 1;
  justify-self: end;
  width: auto;
}

.return {
  font-size: 30px;
  background: none;
  border: none;
  color: #f3feb0;
  cursor: pointer;
}

.menu-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  color: #f3feb0;

  & p,
  & h1 {
    flex: 1;
  }
}
</style>
