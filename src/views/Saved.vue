<template>
  <div v-if="allProductsStore.loading === true" class="flex items-center justify-center py-36">
    <div class="w-96 h-96 m-2">
      <div class="justify-center items-center w-full h-full p-8 text-9xl">
        <div v-if="allProductsStore.loading === true" role="status" class="flex justify-center items-center py-16">
          <svg aria-hidden="true" class="w-36 h-36 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
        <div v-if="allProductsStore.loading === true" role="status" class="flex justify-center items-center -mt-8 text-lg">
          <span>Loading...</span>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      <div v-for="item in userStore.savedItems" :key="item.id" class="group relative bg-gray-200 shadow-xl p-6 rounded-md">
        <div class="relative pb-4">
          <TrashIcon @click="deleteSavedItem(item)" class="w-6 h-6 hover:cursor-pointer"/>
        </div>
        <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img :src="item.image" @click="openPreview(item)" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        </div>
        <div class="relative">
          <h3 class="mt-4 text-xs text-gray-700">{{ item.title.length > 48 ? item.title.slice(0, 48) + '…' : item.title }}</h3>
          <p class="mt-1 text-md font-medium text-gray-900">{{ formatter.format(item.price) }}</p>
        </div>
      </div>
    </div>

    <ProductPreview :isPreviewOpen="isPreviewOpen" @closePreview="closePreview" />

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { useAllProductsStore } from '../stores/allProductsStore';
import { useUserStore } from '../stores/userStore';
import { supabase } from "../supabase/init";
import axios from "axios";
import { TrashIcon } from "@heroicons/vue/outline";
import ProductPreview from '../components/ProductPreview.vue';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const router = useRouter()
const route = useRoute()
const allProductsStore = useAllProductsStore()
const userStore = useUserStore()
const isPreviewOpen = ref(false)

const openPreview = (item) => {
  isPreviewOpen.value = true
  allProductsStore.preview = item
}

const closePreview = () => {
  isPreviewOpen.value = false
  allProductsStore.preview = []
}

watch(userStore, () => {
  if (userStore.savedItems < 1) {
    router.push({ name: 'Catalog', params: { category: 'all' } })
  }
})

const deleteSavedItem = async (item) => {
  try {
    const { error } = await supabase
      .from("savedItems")
      .delete()
      .eq("id", item.id);
      userStore.getSavedItems()
    if (error) throw error;
  } catch (error) {
    console.log(error)
    setTimeout(() => {
    }, 5000);
  }
}

onMounted(() => {
  userStore.getSavedItems()
})
</script>