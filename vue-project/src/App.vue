<script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from './lib/supabaseClient'
  import PersonalProfile from './components/PersonalProfile.vue';
  import Navbar from './components/Navbar.vue';

  const instruments = ref([])

  async function getInstruments() {
      const { data } = await supabase.from('instruments').select()
      instruments.value = data
    }

  onMounted(() => {
      getInstruments()
    })
</script>

<template>
  <Navbar />
  <ul>
    <li v-for="instrument in instruments" :key="instrument.id">{{ instrument.name }}</li>
  </ul>
  <router-view />
</template>

<style></style>