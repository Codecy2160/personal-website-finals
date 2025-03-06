<template>
    <footer class="footer">
        <div class="container">
            <p>&copy; {{ currentYear }} {{ siteName }}. All rights reserved.</p>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "FooterComponent",
        data() {
            return {
                currentYear: new Date().getFullYear(),
                siteName: "Codecy",
            };
        },
    };
</script>

<style scoped>
    @import '@/assets/styles.css';
</style>