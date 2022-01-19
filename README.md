# Electron com Vue.js

## Project setup

- ter o node.js instalado no computador. [ver documentação](https://www.electronjs.org/pt/docs/latest/tutorial/quick-start#prerequisites)
- versão do node utilizada `16`
- usando o nvm:
  ```shell
  # nvm
  nvm use
  ```
  ```shell
  # nvm-windows no powershell
  nvm use $(Get-content .nvmrc)
  ```
- após configuração do ambiente, prossiga com a instalação usando npm

  ```shell
  npm install

  # executar aplicação desktop
  npm run dev

  # executar aplicação somente no navegador
  npm run vue:dev
  ```

- outros comandos:

  ```shell
  # Verificar info sobre o projeto tauri
  npm run tauri:info

  # Lints and fixes files
  npm run lint
  ```

## Dependências

- vue.js
  - [vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/)
- electron

<br />

## Anotações

<details>
  <summary>Estrutura do projeto</summary>

### **Estrutura do projeto**

- A aplicação tem 2 lados. _Front (HTML, CSS e JS)_ e o _Back (node.js e APIs do electron)_
- `src`: fica o Front

  - nele é onde fica a aplicação Vue.js com os componentes de layout.

- `src-electron`: fica o Back
  - diretório `src`: códigos que são responsáveis por se comunicar com o Sistema Operacional.
  - `background.ts`: arquivo inicial do electron para executar a aplicação.
  - `preload.ts`: arquivo que vai executar antes do layout ser renderizado. Executa códigos em node.js
    - Nele eu adiciono propriedades ao objeto Window do browser para que eu possa acessar os recursos nativos do computador.
  - diretório `src/events`: criei ele para organizar a lógica dentro de `background.ts` (pra que não ficasse vários `.on`)
  - diretório `src/handlers`: criei ele para adicionar os códigos que manipulam apenas código em node.js. (nele não foi possível acessar APIs do electron)

---

</details>

<details>
  <summary>APIs do electron</summary>

### **APIs do electron**

- `contextBridge.exposeInMainWorld`: utilizado para que a aplicação front-end possa acessar métodos que se comunicam com o SO.
  - como ele eu exponho propriedades/métodos no objeto global `window`
  - o nome da propriedade será a string passadsa no 1º argumento.
  - veja no [preload.ts](src-electron/preload.ts#L7)
- Para utilizar algumas APIs como dialog é necessário acessar pelo `background.ts`, tentei a partir do `preload.ts` mas a API aparecia como `undefined`
  - pra utilizar ela foi utilizada no `ipcMain.on`(retorna void) e `ipcMain.handle`(retorna promise com algo). veja: [on](src-electron/src/events/dialogEvent.ts#L8) e o [handle](src-electron/src/events/dialogEvent.ts#L17)

---

</details>

<details>
  <summary>Build da aplicação</summary>

### **Build**

- ATENÇÃO: o build para determinado SO vai depender do SO que irá realizar o build. ou veja a documenatação de como realizar [build multiplataforma](https://www.electron.build/multi-platform-build)
- o plugin do vue que foi adicionado utiliza a ferramente `electron-builder` para realizar o build para o desktop

---

</details>

<br />

## Referências

- Electron
  - [APIs](https://www.electronjs.org/docs/latest/api/app)
  - [Entendendo o processo](https://www.electronjs.org/docs/latest/tutorial/process-model)
  - [typescript pro objeto window](https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript) (para utilizar tipagem dentro da aplicação vue quando tentasse acessar o window)
- Plugin do vue para electron
  - [configuração webpack](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#webpack-configuration) (foi para poder alterar o local do arquivo inicial do electron)
- [build multiplataforma com electron-builder](https://www.electron.build/multi-platform-build)
