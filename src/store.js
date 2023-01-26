import { defineStore } from 'pinia'
import axios from "axios";
import { supabase } from "./supabase/init";

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    user: null,
    category: "",
    checkBoxItems: [],
    topLevelSavedItems: [],
    savedItems: [],
    isSaved: [],
    storeData: [],
    preview: [],
    subTotal: 0.00,
    loading: false
  }),
  getters: {
    //
  },
  actions: {
    setUser(payload) {
      this.user = payload ? payload.user : null
    },
    // get all products
    async getProducts() {
      try {
        this.loading = true
        const res = await axios.get(
        `https://fakestoreapi.com/products`
        )
        // for (let i = 0; i < res.data.length; i++) {
        //   res.data[i]['saved'] = false
        //   this.storeData = res.data
        // }
        this.storeData = res.data
        // console.log(this.storeData)
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
    },
    // retrieve saved items from Supabase database
    async getSavedItems() {
      const { data: workouts, error } = await supabase.from("workouts").select("*");
      this.topLevelSavedItems = [...workouts]
      const newArray = []
      for (let i = 0; i < workouts.length; i++) {
        newArray.push(workouts[i].savedItems[0])
        
        //TODO: push top level "workouts" into newArray
        // newArray.push(workouts[i])
        this.savedItems = [...newArray]
      }
      console.log(this.savedItems)
    },
    // calculates total value in cart
    sumValue(storedObjects) {
      const initialValue = 0;
      this.subTotal = storedObjects.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
    },
    // calculates total value after item is removed from cart
    subtractValue(productPrice) {
      console.log(productPrice)
      const initialValue = this.subTotal;
      console.log(initialValue)
      this.subTotal = productPrice.reduce(
        (accumulator, currentValue) => accumulator - currentValue,
        initialValue
      );
    }
  }
})