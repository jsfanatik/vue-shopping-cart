<template>
  <div class="flex min-h-full items-center justify-center py-36 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8 rounded-lg border-solid border-2 p-12 border-indigo-600">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">The Store</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</a>
        </p>
      </div>
      <form @submit.prevent="login" class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="space-y-6 rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required="" class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>

          <div class="text-sm">
            <!-- <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a> -->
            <router-link class="font-medium text-indigo-600 hover:text-indigo-500" :to="{ name: 'Register' }">Need an account?</router-link>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { supabase } from '../supabase/init'
import { useRouter } from 'vue-router'

// Create data / vars
const router = useRouter()
const email = ref(null)
const password = ref(null)
const errorMsg = ref(null)

// Login function
const login = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if(error) throw error;
    router.push({ name: 'Catalog', params: { category: 'all' } })
  } catch(error) {
    errorMsg.value = `Error: ${error.message}`
    setTimeout(() => {
      errorMsg.value = null
    }, 5000)
  }
}
</script>
