import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import './style.css'
import { auth, db } from './firebase';

// Initialize Firebase
const app = createApp(App);
app.use(router);
app.use(vuetify).mount("#app");
