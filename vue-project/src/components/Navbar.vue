<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
            <router-link id="navbar-logo" to="/">
                <img src="https://codecy2160.github.io/codecy/source/Logo.png" alt="logo">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/software">Software</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/design">Design</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact">Contact</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar',
    };   
</script>

<style>
    @import '@/assets/styles.css';
</style>