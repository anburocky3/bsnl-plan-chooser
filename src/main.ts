import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/index.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./routers";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia); // pinia store
app.use(router); // routers

app.mount("#app");
