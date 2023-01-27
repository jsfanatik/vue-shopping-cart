import { defineStore } from 'pinia'
import { supabase } from "../supabase/init";

export const useSavedItemsStore = defineStore({
  id: 'savedItems',
  state: () => ({
    savedItems: []
  }),
  actions: {
    // retrieve saved items from Supabase database
    async getSavedItems() {
      const { data: savedItems, error } = await supabase.from("savedItems").select("*");
      this.savedItems = [...savedItems]
    },
    // delete selected saved item
    async deleteSavedItem(item) {
      try {
        const { error } = await supabase
          .from("savedItems")
          .delete()
          .eq("id", item.id);
          this.getSavedItems()
          console.log(this.savedItems)
        if (error) throw error;
      } catch (error) {
        console.log(error)
        setTimeout(() => {
        }, 5000);
      }
    }
  }
})