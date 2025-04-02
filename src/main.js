// main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import { createHead } from "@vueuse/head";
import "./style.css";

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);
app.mount("#app");
