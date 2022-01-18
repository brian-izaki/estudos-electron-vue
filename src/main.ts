import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";

createApp(App)
  .use(PrimeVue)
  .component("Dialog", Dialog)
  .component("Button", Button)
  .use(router)
  .mount("#app");
