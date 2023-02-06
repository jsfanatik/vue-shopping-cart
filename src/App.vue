<template>
  <div>
    <Navigation />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from './stores/userStore';
import { supabase } from './supabase/init'
import Navigation from './components/Navigation.vue'

// const appReady = ref(null)
// const user = supabase.auth.getSession()
const userStore = useUserStore()

// if (!user) {
//   appReady.value = true
// }
// Runs when there is a auth state change
// if user is logged in, this will fire
supabase.auth.onAuthStateChange((_, session) => {
  userStore.setUser(session);
  // appReady.value = true
})

onMounted(async () => {
  userStore.getSavedItems()
  userStore.getCartItems()
  // userStore.sumValue()
})
</script>

