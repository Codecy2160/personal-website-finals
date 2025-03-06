<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from './lib/supabaseClient'
  import Navbar from './components/Navbar.vue';

  const comments = ref([]);

  async function getComments() {
    const { data, error } = await supabase.from('comments').select('*');
    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      comments.value = data;
    }
  }

  onMounted(() => {
    getComments();
  });
</script>

<template>
  <Navbar />
  <ul>
    <li v-for="comment in comments" :key="comment.id">{{ comment.message }}</li>
  </ul>
  <router-view />
</template>

<style></style>