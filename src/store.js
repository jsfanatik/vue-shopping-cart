import { defineStore } from 'pinia'
import axios from "axios";

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    category: "",
    checkBoxItems: [],
    savedItems: [],
    storeData: [],
    preview: [],
    subTotal: 0.00,
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
        // res.data.forEach((item) => {
        //   item['saved'] = false
        //   this.storeData.push(item)
        // })
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