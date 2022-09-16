import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "vue-query";
import axios from "axios";
import VueAxios from "vue-axios";
// @ts-ignore
import App from "@/App.vue";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(VueAxios, axios);
app.use(VueQueryPlugin);

app.mount("#app");
