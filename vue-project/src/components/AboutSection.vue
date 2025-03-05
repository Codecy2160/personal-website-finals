<template>
    <section id="about" class="container my-5">
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="display-4">About Me!</h1>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <h2 class="h3">Background</h2>
                <p class="lead"> Currently a student at Asia Pacific College, taking up Bachelor of Science in Computer Science, specializing in Software & Systems. I am a self-taught web developer and I am currently learning more about web development and programming. I am also a member of the Junior Philippine Computer Society of Asia Pacific College. </p>
            </div>
            <div class="col-md-6">
                <h2 class="h3">IT Experience</h2>
                <p class="lead"> I have experience in web development, specifically in HTML, CSS, and JavaScript. I have also worked with frameworks such as Bootstrap and React. I have also worked with databases such as MySQL and MongoDB. I have also worked with version control systems such as Git. I have also worked with web hosting services such as HostGator. </p>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <h2 class="h3">Hobbies and Interests</h2>
                <p class="lead"> I am interested in web development, programming, and technology. I am also interested in video games, music, and movies. I am also interested in reading books and watching TV shows. I am also interested in learning new things and gaining new experiences. </p>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <CarouselComponent :images="carouselImages" />
            </div>
        </div>
    </section>
</template>
  
<script>
    import CarouselComponent from './Carousel.vue';
    export default {
        name: "AboutSection",
        data() {
        return {
            carouselImages: [
            { src: "https://codecy2160.github.io/codecy/source/bug_of_some_kind.png" },
            { src: "https://codecy2160.github.io/codecy/source/hes_floating_around.png" },
            { src: "https://codecy2160.github.io/codecy/source/LETSGOOO.png" },
            { src: "https://codecy2160.github.io/codecy/source/OC_1_2.png" },
            { src: "https://codecy2160.github.io/codecy/source/OC_2_2.png" },
            ]
        }
    }
  }
</script>
  
<style scoped>
    @import '@/assets/styles.css';
</style>
  