import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
import axios from 'axios'

const funcMixin = {
  inject: ['server_addr'],
  methods: {
    async HTTP(method, addr, body) {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        this.GoToLogin()
      }

      try {
        let headobj = {
          headers: {
            'Authorization': localStorage.accessToken,
            'Content-Type': 'application/json'
          }
        }
        let response
        if (method === 'get' || method === 'GET') {
          response = await axios.get(this.server_addr+addr, headobj)
        } else {
          response = await axios.post(this.server_addr+addr, body, headobj)
        }      
        return response.data
      } catch(err) {
        if (err.response.data.msg_txt !== undefined) {
          return {
            success: false,
            msg_txt: err.response.data.msg_txt,
          }
        } else {
          return {
            success: false,
            msg_txt: err.response.data.msg_txt,
          }
        }        
      }
    }
  }
}

const app = createApp(App)

app.use(router)
app.use(contextmenu)
app.mixin(funcMixin)

// const currentUrl = window.location.href;
// const parsedUrl = new URL(currentUrl);

// let prefix = parsedUrl.protocol + '//' + parsedUrl.hostname;
// if (parsedUrl.port) {
//   prefix += ':' + parsedUrl.port;
// }

// app.provide('server_addr', prefix)
//app.provide('server_addr', 'http://127.0.0.1:985')
app.provide('server_addr', 'http://192.168.1.177:985')

app.mount('#app')
