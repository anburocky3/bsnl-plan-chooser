import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/index.css";
import { createPinia } from "pinia";
import router from "./routers";

const app = createApp(App);

app.use(createPinia()); // pinia store
app.use(router); // routers

app.mount("#app");
