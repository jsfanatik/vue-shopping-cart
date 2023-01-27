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