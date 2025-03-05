<template>
    <footer class="footer">
        <div class="container">
            <p>&copy; {{ currentYear }} {{ siteName }}. All rights reserved.</p>
            <nav class="footer-nav">
                <a v-for="(link, index) in footerLinks" :key="index" :href="link.url" target="_blank">
                    {{ link.text }}
                </a>
            </nav>
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
                footerLinks: [{
                    text: "Privacy Policy",
                    url: "/privacy-policy"
                }, {
                    text: "Terms of Service",
                    url: "/terms-of-service"
                }, {
                    text: "Contact Us",
                    url: "/contact"
                }, ],
            };
        },
    };
</script>

<style scoped>
    @import '@/assets/styles.css';
</style>