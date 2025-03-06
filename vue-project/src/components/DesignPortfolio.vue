<template>
    <div class="masonry-gallery">
        <div class="grid-sizer"></div>
        <div class="gutter-sizer"></div>
        <div class="grid-sizer"></div>
        <div class="masonry-item">
            <h2>Design Portfolio</h2>
            <img src="https://codecy2160.github.io/codecy/source/portfolio/StrimSched.png" alt="Photo 1">
        </div>
        <div class="masonry-item">
            <img src="https://codecy2160.github.io/codecy/source/portfolio/strela.png" alt="Photo 2">
        </div>
        <div class="masonry-item">
            <img src="https://codecy2160.github.io/codecy/source/portfolio/sevencent.png" alt="Photo 3">
        </div>
        <div class="masonry-item">
            <img src="https://codecy2160.github.io/codecy/source/portfolio/Schedule.png" alt="Photo 4">
        </div>
        <div class="masonry-item">
            <img src="https://codecy2160.github.io/codecy/source/portfolio/ricochet.png" alt="Photo 5">
        </div>
        <div class="masonry-item">
            <img src="https://codecy2160.github.io/codecy/source/portfolio/kofi1.png" alt="Photo 6">
        </div>
        <div class="masonry-item">
            <img src="https://codecy2160.github.io/codecy/source/portfolio/JustChatting_prev.png" alt="Photo 7">
        </div>
        <div class="masonry-item">
            <img src="https://codecy2160.github.io/codecy/source/portfolio/IntroCard.png" alt="Photo 8">
        </div>
        <div class="masonry-item"> 
            <img src="https://codecy2160.github.io/codecy/source/portfolio/chowdhury.png" alt="Photo 9">
        </div>
    </div>
    <FooterComponent/>
</template>

<script>
import FooterComponent from './Footer.vue';

export default {
    name: 'DesignPortfolio',
    components: {
        FooterComponent,
    }
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap';
</style>
