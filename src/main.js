import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import './registerServiceWorker'
//import { emit } from 'process';

let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.mount('#app')
