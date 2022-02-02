<template>
  <section>
    <Card class="container">
      <template #title> Criar anotação </template>

      <template #content>
        <form @submit.prevent="onSubmit" class="container-form">
          <div class="group-input">
            <label for="createdAt"> Anotado em </label>
            <Calendar v-model="createdAt" id="createdAt" />
          </div>

          <div class="group-input">
            <label for="title"> Título </label>
            <InputText v-model="formState.title" id="title" />
          </div>

          <div class="group-input">
            <label for="note"> Anotação </label>
            <Textarea
              v-model="formState.note"
              id="note"
              :autoResize="true"
              rows="5"
            />
          </div>

          <div class="group-button">
            <Button
              @click="cleanForm"
              label="Cancelar"
              icon="pi pi-times"
              class="p-button-danger"
            />
            <Button
              type="submit"
              label="Salvar"
              icon="pi pi-check"
              class="p-button-success"
            />
          </div>
        </form>
      </template>
    </Card>
  </section>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import { reactive, ref } from "@vue/reactivity";
import NoteForm from "../../models/Note/NoteForm";

export default {
  name: "Note",

  components: {
    Card,
    InputText,
    Textarea,
    Calendar,
  },

  setup() {
    const createdAt = ref(new Date());

    const state = reactive({
      form: new NoteForm(),
    });

    const onSubmit = () => {
      state.form.createdAt = createdAt.value;
      console.log("Salvar anotação", state.form);
    };

    const cleanForm = () => {
      createdAt.value = new Date();
      state.form.title = "";
      state.form.note = "";
    };

    return {
      createdAt,
      formState: state.form,
      onSubmit,
      cleanForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 30px auto 0;
  width: 80%;
}

.container-form {
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
}

.group-input {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  gap: 5px;

  input,
  textarea {
    width: 100%;
  }
}

.group-button {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
