import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/index.css";
import { createPinia } from "pinia";
import router from "./routers";
import "nprogress/nprogress.css";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia); // pinia store
app.use(router); // routers

app.mount("#app");
