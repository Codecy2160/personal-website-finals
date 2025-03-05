<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
            <a id="navbar-logo" href="https://codecy2160.github.io/codecy/index.html">
                <img src="https://codecy2160.github.io/codecy/source/Logo.png" alt="logo">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="https://codecy2160.github.io/codecy/index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://codecy2160.github.io/codecy/software.html">Software</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://codecy2160.github.io/codecy/design.html">Design</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="https://codecy2160.github.io/codecy/contact.html">Contact</a>
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