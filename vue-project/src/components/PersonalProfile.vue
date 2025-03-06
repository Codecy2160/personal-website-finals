<template>
  <div id="app">
    <Navbar />
    <div id="logo">
      <img src="https://codecy2160.github.io/codecy/source/Logo.png" alt="logo" />
    </div>
    <button @click="scrollToAbout" class="main-button">About Me</button>
    <AboutSection ref="aboutSection" />
    <div class="comments-container">
      <CommentForm />
      <CommentList />
    </div>
    <FooterComponent />
  </div>
</template> 

<script>
import { ref } from 'vue';
import Navbar from './Navbar.vue';
import AboutSection from './AboutSection.vue';
import FooterComponent from './Footer.vue';
import CommentForm from './CommentForm.vue';
import CommentList from './CommentList.vue';

export default {
  name: 'PersonalProfile',
  components: {
    Navbar,
    AboutSection,
    FooterComponent,
    CommentForm,
    CommentList,
  },
  setup() {
    const aboutSection = ref(null);

    const scrollToAbout = () => {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const aboutSectionTop = aboutSection.value.$el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: aboutSectionTop - navbarHeight, behavior: 'smooth' });
    };

    return {
      aboutSection,
      scrollToAbout,
    };
  },
};
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap';

.comments-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  margin: 20px;
  width: 80%;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
}
</style>