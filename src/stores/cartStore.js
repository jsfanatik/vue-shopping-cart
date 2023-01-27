import { defineStore } from 'pinia'
import axios from "axios";
import { supabase } from "../supabase/init";

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    // checkBoxItems: [],
    cartItems: [],
    subTotal: 0.00,
  }),
  actions: {
    async getCartItems() {
      const { data: cartItems, error } = await supabase.from("cartItems").select("*");
      this.cartItems = [...cartItems]
    },
    // calculates total value in cart
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
      // console.log(this.subTotal)
    },
    // calculates total value after item is removed from cart
    subtractValue(productPrice) {
      // console.log(productPrice)
      const initialValue = this.subTotal;
      // console.log(initialValue)
      this.subTotal = productPrice.reduce(
        (accumulator, currentValue) => accumulator - currentValue,
        initialValue
      );
    }
  }
})