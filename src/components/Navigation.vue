<template>
    <div>
        <nav class="sticky top-0 bg-gray-300 border-gray-200 px-2 sm:px-4 py-1.5 z-40">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
            <a href="https://flowbite.com/" class="flex items-center">
            <img src="https://static.thenounproject.com/png/91211-200.png" class="h-10 mr-3 sm:h-9" alt="Flowbite Logo" />
            <span class="self-center text-black text-xl font-semibold whitespace-nowrap">HipStore</span>
            </a>
            <div class="flex md:order-2 hover:cursor-pointer">
                <div v-if="user" class="flex">
                    <div @click="goToSaved" class="flex">
                        <HeartIcon class="w-7 h-7" :class="[route.name === 'Saved' ? 'text-blue-700' : '']"/>
                        <!-- <span class=" text-black text-xl">({{ store.savedItems.length || '0' }})</span> -->
                    </div>
                    <div @click="openModals" class="flex">
                        <svg class="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>         
                        <span class=" text-black text-xl">({{ store.checkBoxItems.length || '0' }})</span>
                    </div>
                    <div class="flex">
                        <span @click="logout" class="ml-2 text-xl text-black text-md">Logout</span>
                    </div>
                </div>
                <div v-if="!user">
                    <div class="flex">
                        <!-- <span class=" text-black text-md">Login</span> -->
                        <router-link class="cursor-pointer text-black text-xl" :to="{name: 'Login'}">Login</router-link>
                    </div>
                    <!-- <div class="flex">
                        <span class=" text-black text-xl">({{ store.checkBoxItems.length || '0' }})</span>
                    </div> -->
                </div>
                        
            </div>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
              <ul v-if="user" class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-300 dark:border-gray-700">
                  <li v-for="item in navItems" :key="item.id" @click="getProducts(item)">
                    <a href="#" :class="[item.category === route.params.category ? 'text-blue-700' : 'text-gray-700']" class="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0" aria-current="page">{{ item.name }}</a>
                  </li>
              </ul>
            </div>
        </div>
        </nav>
        
        <Cart @closeModal="closeModal" :isOpen="isOpen"/>

    <CartEmpty 
      @closeEmptyModal="closeEmptyModal" 
      :isEmptyOpen="isEmptyOpen" 
      :isEmptyMessage="isEmptyMessage"
    />
    </div>

</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from '../store';
import { supabase } from '../supabase/init'
import { useRoute, useRouter } from "vue-router";
import { HeartIcon } from "@heroicons/vue/outline";
import Cart from '../components/Cart.vue'
import CartEmpty from '../components/CartEmptyDialog.vue'

// const appReady = ref(null)
// const user = supabase.auth.user()

const store = useStore()
const router = useRouter();
const route = useRoute()
const isOpen = ref(false)
const isEmptyOpen = ref(false)
const isEmptyMessage = ref("")

const navItems = [
  { name: "All", category: "all"},
  { name: "Men", category: "men's clothing"},
  { name: "Women", category: "women's clothing"},
  { name: "Electronics", category: "electronics"},
  { name: "Jewelery", category: "jewelery"},
]

const user = computed(() => store.user)

const logout = async () => {
    await supabase.auth.signOut()
    router.push({ name: 'Login' })
}

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const openEmptyModal = () => {
  isEmptyOpen.value = true
}

const closeEmptyModal = () => {
  isEmptyOpen.value = false
}

const getProducts = (item) => {
  router.push({ name: 'Catalog', params: { category: item.category } })
}

// open sidebar shopping cart
const openModals = () => {
  if (store.checkBoxItems.length > 0) {
    openModal()
  } else {
    isEmptyMessage.value = "Your Cart is Empty!"
    openEmptyModal()
  }
}

// route to saved items
const goToSaved = () => {
  router.push({ name: 'Saved' })
  // if (store.savedItems.length > 0) {
  //   router.push({ name: 'Saved' })
  // } else {
  //   isEmptyMessage.value = "You Have NO Saved Items!"
  //   openEmptyModal()
  // }
}

// watches for route change
// passes route param as argument to store functions
watch(route, () => {
  if (route.params.category === 'all') {
    store.getProducts()
  } else {
    store.getProductsByCategory(route.params.category)
  }
})


</script>