import { createRouter, createWebHistory } from 'vue-router';
import PersonalProfile from './components/PersonalProfile.vue';
import SoftwarePortfolio from './components/SoftwarePortfolio.vue';
import DesignPortfolio from './components/DesignPortfolio.vue';
import ContactPage from './components/ContactPage.vue';

const routes = [
  {
    path: '/', 
    name: 'Home',
    component: PersonalProfile,
  },
  {
    path: '/software',
    name: 'Software Portfolio',
    component: SoftwarePortfolio,
  },
  {
    path: '/design',
    name: 'Design Portfolio',
    component: DesignPortfolio,
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