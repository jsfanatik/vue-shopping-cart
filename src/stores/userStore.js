import { defineStore } from 'pinia'
import axios from "axios";
import { supabase } from "../supabase/init";

export const useUserStore = defineStore({
  id: 'users',
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(payload) {
      this.user = payload ? payload.user : null
    }
  }
})