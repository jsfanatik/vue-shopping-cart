import { defineStore } from 'pinia'
import axios from "axios";
import { supabase } from "../supabase/init";

export const useAllProductsStore = defineStore({
  id: 'products',
  state: () => ({
    category: "",
    // checkBoxItems: [],
    storeData: [],
    preview: [],
    // subTotal: 0.00,
    loading: false
  }),
  getters: {
    //
  },
  actions: {
    // get all products
    async getProducts() {
      try {
        this.loading = true
        const res = await axios.get(
        `https://fakestoreapi.com/products`
        )
        this.storeData = res.data
        this.loading = false
      } catch (error) {
          console.log(error, 'error found!')
      }
    },
    // load products based on category, 
    async getProductsByCategory(category) {
      try {
        this.loading = true
        const res = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
        )
        this.storeData = res.data
        this.loading = false
      } catch (error) {
        console.log(error, 'error found!')
      }
    }
  }
})