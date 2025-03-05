<template>
    <div id="carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div v-for="(image, index) in images" :key="index" :class="['carousel-item', { active: index === 0 }]">
                <div class="carousel-image">
                <img :src="image.src" :alt="`Slide ${index + 1}`" />
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>
    export default {
        name: "CarouselComponent",
        props: {
            images: {
            type: Array,
            required: true,
            }
        }
    };
</script>

<style scoped>
    @import '@/assets/styles.css';
</style>
