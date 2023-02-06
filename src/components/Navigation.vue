<template>
  <Disclosure as="nav" class="sticky top-0 bg-gray-600 z-40" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-14 items-center justify-between">
        <div class="flex items-center">
          <!-- <div class="flex-shrink-0">
            <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          </div> -->
          <div v-if="user" class="hidden md:block">
            <div class="flex items-baseline space-x-4 hover: cursor-pointer">
              <span v-for="item in navItems" :key="item.id" @click="getProducts(item)" :class="[item.category === route.params.category ? 'bg-gray-900 text-white' : 'text-gray-200 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-md font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</span>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <span v-if="user" class="text-gray-200 mr-4">{{ user.email }}</span>
            <button v-if="user" @click="goToSaved" type="button" class="p-1 text-gray-200 hover:text-white">
              <span class="sr-only">View notifications</span>
              <div class="flex">
                <HeartIcon class="w-6 h-6" :class="[route.name === 'Saved' ? 'text-blue-400' : '']"/>
                <span class="text-md">({{ userStore.savedItems.length || '0' }})</span>
              </div>
            </button>

            <button v-if="user" @click="openModals" type="button" class="p-1 text-gray-200 hover:text-white">
              <span class="sr-only">View notifications</span>
              <div class="flex">
                <ShoppingCartIcon class="w-6 h-6"/>
                <span class="text-md">({{ userStore.cartItems.length || '0' }})</span>
              </div>
            </button>

            <button v-if="user" @click="logout" type="button" class="-mr-4 ml-2 p-1 text-gray-200 hover:text-white">
              <span class="sr-only">View notifications</span>
              <div class="flex">
                <LogoutIcon class="w-6 h-6"/>
              </div>
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3 z-50">
              <div>
                <MenuButton class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span class="sr-only">Open user menu</span>
                  <!-- <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" /> -->
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    <span class="block px-4 py-2 text-sm text-gray-700">Your Profile</span>
                  </MenuItem>
                  <MenuItem>
                    <span class="block px-4 py-2 text-sm text-gray-700">Settings</span>
                  </MenuItem>
                  <MenuItem @click="logout" class="hover: cursor-pointer">
                    <span class="block px-4 py-2 text-sm text-gray-700">Logout</span>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        <DisclosureButton v-for="item in navItems" :key="item.id" @click="getProducts(item)" as="a" :href="item.href" :class="[item.category === route.params.category ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
      <div class="border-t border-gray-700 pt-4 pb-3">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <!-- <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" /> -->
          </div>
          <!-- <div class="ml-3">
            <div class="text-base font-medium leading-none text-white">{{ user.name }}</div>
            <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
          </div> -->
          <button @click="goToSaved" type="button" class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="sr-only">View notifications</span>
            <HeartIcon class="w-6 h-6" :class="[route.name === 'Saved' ? 'text-blue-400' : '']"/>
          </button>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">{{ item.name }}</DisclosureButton>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
    
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
import { useUserStore } from '../stores/userStore';
import { supabase } from '../supabase/init'
import { useRoute, useRouter } from "vue-router";
import { HeartIcon, ShoppingCartIcon, MenuIcon, XIcon, LogoutIcon } from "@heroicons/vue/outline";
import Cart from '../components/Cart.vue'
import CartEmpty from '../components/CartEmptyDialog.vue'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

// const user = supabase.auth.getSession()
const store = useAllProductsStore()
const userStore = useUserStore()
const router = useRouter();
const route = useRoute()
const isOpen = ref(false)
const isEmptyOpen = ref(false)
const isEmptyMessage = ref("")

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }
// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
//   { name: 'Reports', href: '#', current: false },
// ]
const userNavigation = [
  { name: 'Your Profile', href: '#', eventHandler: false },
  { name: 'Settings', href: '#', eventHandler: false },
  { name: 'Sign out', href: '#', eventHandler: true },
]

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
  if (userStore.cartItems.length > 0) {
    openModal()
  } else {
    isEmptyMessage.value = "Your Cart is Empty!"
    openEmptyModal()
  }
}

// route to saved items
const goToSaved = () => {
  if (userStore.savedItems.length > 0) {
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

watch(user, () => {
  // console.log(user.value.email)
  userStore.getCartItems()
  userStore.getSavedItems()
})
</script>