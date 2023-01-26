<template>
  <div v-if="store.loading === true" class="flex items-center justify-center py-36">
    <div class="w-96 h-96 m-2">
      <div class="justify-center items-center w-full h-full p-8 text-9xl">
        <div v-if="store.loading === true" role="status" class="flex justify-center items-center py-16">
          <svg aria-hidden="true" class="w-36 h-36 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
        <div v-if="store.loading === true" role="status" class="flex justify-center items-center -mt-8 text-lg">
          <span>Loading...</span>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="mx-auto max-w-2xl py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      <div v-for="item in store.storeData" :key="item.id" class="group relative shadow-xl bg-gray-200 p-4 rounded-md">
        <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
          <img :src="item.image" @click="openPreview(item)" class="h-full w-full object-cover object-center lg:h-full lg:w-full hover:cursor-pointer" />
        </div>
        <div class="relative">
          <h3 class="mt-4 text-xs text-gray-700">{{ item.title.length > 48 ? item.title.slice(0, 48) + '…' : item.title }}</h3>
          <p class="mt-1 text-md font-medium text-gray-900">{{ formatter.format(item.price) }}</p>
          <div class="absolute bottom-0 right-0">
            <HeartIcon @click="saveItem(item)" class="w-7 h-7 font-bold text-gray-400 hover:cursor-pointer hover:text-indigo-600"/>
            <!-- <input type="checkbox" :value="item" v-model="store.savedItems" class="w-4 h-4"> -->
          </div>
        </div>
      </div>
    </div>

    <CartEmpty 
    @closeEmptyModal="closeEmptyModal" 
    :isEmptyOpen="isEmptyOpen" 
    :isEmptyMessage="isEmptyMessage"
  />

    <ProductPreview :isPreviewOpen="isPreviewOpen" @closePreview="closePreview" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { uid } from "uid";
import { useRoute, useRouter } from "vue-router";
import { useStore } from '../store';
import { supabase } from "../supabase/init";
import ProductPreview from '../components/ProductPreview.vue';
import CartEmpty from '../components/CartEmptyDialog.vue'
import { HeartIcon } from "@heroicons/vue/outline";
import { stringifyExpression } from '@vue/compiler-core';
import { Switch } from '@headlessui/vue'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const router = useRouter()
const route = useRoute()
const store = useStore()
const isPreviewOpen = ref(false)
const isEmptyOpen = ref(false)
const isEmptyMessage = ref("")
const savedItem = ref(false)
const savedItems = ref([])
const data = ref(null)
// const isActive = ref(false)
// const enabled = ref(false)

const emit = defineEmits(['update', 'updateSubTotal'])

const openPreview = (item) => {
  isPreviewOpen.value = true
  store.preview = item
}

const closePreview = () => {
  isPreviewOpen.value = false
  store.preview = []
}

const openEmptyModal = () => {
  isEmptyOpen.value = true
}

const closeEmptyModal = () => {
  isEmptyOpen.value = false
}

const saveItem = async (item) => {
  console.log(item.description)
  savedItems.value.push({
    id: uid(),
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      rating: item.rating
  })
  try {
    await supabase.from("workouts").insert([
      {
      savedItems: savedItems.value
    }
  ]);
  } catch(error) {
    console.log(error)
  }
}

const getData = async () => {
  try {
    const { data: workouts, error } = await supabase
      .from("workouts")
      .select("*")
    if (error) throw error;
    data.value = workouts;
    console.log(data.value)
  } catch (error) {
    console.log(error)
  }
}

// const saveItem = async (item) => {

//   const allItems = []

//   allItems.push(item)

//   // prevents duplicate items in store.savedItems
//   allItems.forEach((val) => {
//     if(!store.savedItems.find(e => e.title === val.title)) {
//       val.saved = true
//       // store.savedItems.unshift(val)
//     } else {
//       isEmptyMessage.value = "You Already Saved this Item!"
//       openEmptyModal()
//     }
//   })
// }

onMounted(() => {
  getData()
  // savedItem.value = store.isSaved
  // console.log(savedItem.value)
})
</script>