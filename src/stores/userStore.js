import { defineStore } from 'pinia'
import axios from "axios";
import { supabase } from "../supabase/init";

export const useUserStore = defineStore({
  id: 'users',
  state: () => ({
    user: null,
    cartItems: [],
    savedItems: [],
    subTotal: 0.00
  }),
  actions: {
    setUser(payload) {
      this.user = payload ? payload.user : null
    },
        // retrieve cart items from Supabase database
    async getCartItems() {
      try {
        const { data: cartItems, error } = await supabase.from("cartItems").select("*");
        if (error) throw error
        if (this.user !== null) {
          const cartArray = cartItems.filter(item => item.email === this.user.email)
          this.cartItems = [...cartArray]
        }
      } catch(error) {
        console.warn(error.message)
      }
    },
    async getSavedItems() {
      try {
        const { data: savedItems, error } = await supabase.from("savedItems").select("*");
        if (error) throw error
        if (this.user !== null) {
          const savedArray = savedItems.filter(item => item.email === this.user.email)
          this.savedItems = [...savedArray]
        }
      } catch(error) {
        console.warn(error.message)
      }
    },
    async sumValue() {
      // call getCartItems() to repopulate this.cartItems
      await this.getCartItems()
      // create new array with price properties from cartItems
      const storedObjects = this.cartItems.map(elm => {
        return elm.price
      })
      const initialValue = 0;
      this.subTotal = storedObjects.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );
    },
    subtractValue(productPrice) {
      const initialValue = this.subTotal;
      this.subTotal = productPrice.reduce(
        (accumulator, currentValue) => accumulator - currentValue,
        initialValue
      );
    }
  }
})