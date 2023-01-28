<template>
  <nav class="sticky top-0 bg-gray-300 border-gray-200 px-2 sm:px-4 py-1.5 z-40">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <a href="https://flowbite.com/" class="flex items-center">
        <img src="https://static.thenounproject.com/png/91211-200.png" class="h-10 mr-3 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center text-black text-xl font-semibold whitespace-nowrap">HipStore</span>
      </a>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
        <ul v-if="user" class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-300 dark:border-gray-700">
          <li v-for="item in navItems" :key="item.id" @click="getProducts(item)">
            <a href="#" :class="[item.category === route.params.category ? 'text-blue-700' : 'text-gray-700']" class="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0" aria-current="page">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="flex md:order-2 hover:cursor-pointer">
        <div v-if="user" class="flex">
          <div @click="goToSaved" class="flex">
              <HeartIcon class="w-7 h-7" :class="[route.name === 'Saved' ? 'text-blue-700' : '']"/>
              <span class=" text-black text-xl">({{ savedItemsStore.savedItems.length || '0' }})</span>
          </div>
          <div @click="openModals" class="flex">
              <ShoppingCartIcon class="w-7 h-7"/>
              <span class=" text-black text-xl">({{ cartStore.cartItems.length || '0' }})</span>
          </div>
          <div class="flex">
              <span @click="logout" class="ml-2 text-xl text-black text-md">Logout</span>
          </div>
        </div>
        <!-- <div v-if="!user">
          <div class="flex">
            <router-link class="cursor-pointer text-black text-xl" :to="{name: 'Login'}">Login</router-link>
          </div>
        </div> -->
      </div>
      
    </div>
  </nav>
    
  <Cart @closeModal="closeModal" :isOpen="isOpen"/>

  <CartEmpty 
    @closeEmptyModal="closeEmptyModal" 
    :isEmptyOpen="isEmptyOpen" 
    :isEmptyMessage="isEmptyMessage"
  />
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useAllProductsStore } from '../stores/allProductsStore';
import { useSavedItemsStore } from '../stores/savedItemStore';
import { useCartStore } from '../stores/cartStore';
import { useUserStore } from '../stores/userStore';
import { supabase } from '../supabase/init'
import { useRoute, useRouter } from "vue-router";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/vue/outline";
import Cart from '../components/Cart.vue'
import CartEmpty from '../components/CartEmptyDialog.vue'

const store = useAllProductsStore()
const savedItemsStore = useSavedItemsStore()
const cartStore = useCartStore()
const userStore = useUserStore()
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

const user = computed(() => userStore.user)

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
  if (cartStore.cartItems.length > 0) {
    openModal()
  } else {
    isEmptyMessage.value = "Your Cart is Empty!"
    openEmptyModal()
  }
}

// route to saved items
const goToSaved = () => {
  if (savedItemsStore.savedItems.length > 0) {
    router.push({ name: 'Saved' })
  } else {
    isEmptyMessage.value = "You Have NO Saved Items!"
    openEmptyModal()
  }
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