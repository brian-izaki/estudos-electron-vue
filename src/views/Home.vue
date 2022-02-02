<template>
  <main>
    <section class="card-container">
      <router-link class="card pointer" to="/note">
        <div>
          <p>Criar anotação</p>
        </div>
      </router-link>

      <div class="card">
        Info do sistema operacional:
        <br />
        {{ state.os }} v. {{ state.osVersion }}
      </div>

      <div class="card pointer" @click="showMsgInTerminal">
        <p>Deve mandar mensagem para o terminal</p>
      </div>

      <div class="card">
        <p>Deve mandar o texto do input para o terminal</p>

        <input type="text" v-model="state.textoCustomizado" class="input" />
        <button type="button" @click="sendMsg2Terminal">Enviar</button>
      </div>

      <div class="card pointer" @click="openNewWindow">
        <p>Abre outra janela com título diferente</p>
      </div>

      <div class="card">
        <p>
          Utiliza manipulação de erro no Node.js, a mensagem de retorno vem dele
        </p>
        <label class="input pointer">
          Ativar erro
          <input type="checkbox" v-model="state.isWantError" class="pointer" />
        </label>
        <button type="button" @click="sendError2Node()">Enviar</button>

        <p>{{ state.errorMsg }}</p>
      </div>

      <div @click="showModal" class="card pointer">
        <p>Acesse um arquivo .txt e veja o conteudo em um Modal</p>
      </div>

      <div @click="showModalSerials" class="card pointer">
        <p>Veja as portas seriais</p>
      </div>
    </section>

    <Dialog
      :header="state.modalTitle"
      v-model:visible="state.modalVisible"
      :modal="true"
    >
      <pre>{{ state.modalContent }}</pre>
    </Dialog>

    <Dialog
      header="Portas seriais"
      v-model:visible="state.modalVisibleSerials"
      :style="{ width: '50vw' }"
      :modal="true"
    >
      <DataTable :value="state.serialList" responsiveLayout="scroll">
        <Column field="path" header="Path"></Column>
      </DataTable>
    </Dialog>
  </main>
</template>

<script lang="ts">
import { PortInfo } from "serialport";
import { defineComponent, onMounted, reactive } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const state = reactive({
      os: "",
      osVersion: "",
      textoTerminal: "Hello World",
      textoCustomizado: "",
      isWantError: false,
      errorLoading: false,
      errorMsg: "",
      modalVisible: false,
      modalTitle: "",
      modalContent: "",
      modalVisibleSerials: false,
      modalTitleSerial: "",
      serialList: [] as PortInfo[],
    });

    onMounted(async () => {
      const electronOs = window.apiDesktop.os;
      state.os = electronOs.type;
      let regex = /(?<=~).+(?=-)/g;
      let version = electronOs.version.match(regex);
      state.osVersion = version?.length ? version[0] : "";
    });

    const openNewWindow = () => {
      window.open("/");
    };

    const showMsgInTerminal = () => {
      window.handleTerminal.print();
    };

    const sendMsg2Terminal = () => {
      window.handleTerminal.sendMessage(state.textoCustomizado);
    };

    const sendError2Node = async () => {
      try {
        state.errorLoading = true;
        const message: string = await window.myErrors.makeError(
          state.isWantError
        );
        state.errorMsg = message;
      } catch (err) {
        state.errorMsg = err as string;
      } finally {
        state.errorLoading = false;
      }
    };

    const showModal = async () => {
      try {
        const texto = await window.dialog.readTextFiles({
          filters: [{ name: "txt", extensions: ["txt"] }],
          defaultPath: ".", // sem ele, vai direto pro src-tauri (deve ser o caminho do build no tauri.conf.json)
        });

        const regex = /(?:.(?!\/))+$/gim;
        const findArr = regex.exec(texto.path);
        state.modalTitle = findArr?.length ? findArr[0].replace("/", "") : "";
        state.modalContent = texto.content;
      } catch (err) {
        console.log(err);
        state.modalTitle = "Problemas...";
        state.modalContent =
          "Desculpe... tivemos problemas ao tentar ler ou acessar os arquivos";
      } finally {
        state.modalVisible = true;
      }
    };

    const showModalSerials = async () => {
      state.serialList = await window.serial.list();
      state.modalVisibleSerials = true;
    };

    return {
      state,
      openNewWindow,
      showMsgInTerminal,
      sendMsg2Terminal,
      sendError2Node,
      showModal,
      showModalSerials,
    };
  },
});
</script>

<style lang="scss" scoped>
main {
  margin: 20px 50px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.card-container {
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
}

.card {
  box-sizing: border-box;
  width: 250px;
  height: 250px;
  display: flex;
  flex-flow: column wrap;
  border-radius: 5px;
  background-color: #812f33e1;
  transition: transform 0.3s;
  color: #f3feb0;
  padding: 20px;

  &:hover {
    transform: translate(0, -5px);
  }
}

.pointer {
  cursor: pointer;
}

.horas {
  width: 50px;
  height: 200px;
  background-color: #f3feb0;
  margin-bottom: 20px;
}

.list-promocao {
  width: 50px;
  height: 200px;
  background-color: #fea443;
}

button {
  cursor: pointer;
}

.input {
  box-sizing: content-box;
  width: 100%;
  margin-bottom: 10px;
}
</style>
