import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";

createApp(App)
  .use(PrimeVue)
  .component("Dialog", Dialog)
  .component("Button", Button)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .use(router)
  .mount("#app");
