import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import router from './router'
import "bootstrap"
import mitt from 'mitt'
import { applyStyles } from '@popperjs/core'

const app = createApp(App);
app.config.globalProperties.emitter = mitt();
app.use(router).mount('#app')
