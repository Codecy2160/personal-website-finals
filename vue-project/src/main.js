import { createApp } from 'vue';
import App from './App.vue';
import router from './index.js'; // Import the router

createApp(App)
  .use(router) // Use the router
  .mount('#app');