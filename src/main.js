import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";

const app = createApp(App)

app.use(router)
app.use(contextmenu)

const currentUrl = window.location.href;
const parsedUrl = new URL(currentUrl);

let prefix = parsedUrl.protocol + '//' + parsedUrl.hostname;
if (parsedUrl.port) {
  prefix += ':' + parsedUrl.port;
}

app.provide('server_addr', prefix)
//app.provide('server_addr', 'http://127.0.0.1:985')

app.mount('#app')
