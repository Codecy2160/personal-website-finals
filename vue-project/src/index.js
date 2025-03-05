import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue'; // Import your components
import AboutPage from '@/views/AboutPage.vue';
import ContactPage from '@/views/ContactPage.vue';

const routes = [
  {
    path: '/', 
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/software',
    name: 'Software Portfolio',
    component: AboutPage,
  },
  {
    path: '/design',
    name: 'Design Portfolio',
    component: AboutPage,
  },
  {
    path: '/contact',
    name: 'Contact Me',
    component: ContactPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;