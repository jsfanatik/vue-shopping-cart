<template>
  <div v-if="appReady">
    <Navigation />
    <router-view></router-view>
  </div>
  
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useAllProductsStore } from './stores/allProductsStore';
import { useSavedItemsStore } from './stores/savedItemStore';
import { useUserStore } from './stores/userStore';
import { supabase } from './supabase/init'
import Navigation from './components/Navigation.vue'

const appReady = ref(null)
const user = supabase.auth.user()

const store = useAllProductsStore()
const savedItemsStore = useSavedItemsStore()
const userStore = useUserStore()

if (!user) {
  appReady.value = true
}

// Runs when there is a auth state change
// if user is logged in, this will fire
supabase.auth.onAuthStateChange((_, session) => {
  console.log('hello')
  userStore.setUser(session);
  appReady.value = true
})

onMounted(() => {
  savedItemsStore.getSavedItems()
})
</script>

