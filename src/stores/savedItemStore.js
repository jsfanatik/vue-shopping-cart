import { defineStore } from 'pinia'
import { supabase } from "../supabase/init";

export const useSavedItemsStore = defineStore({
  id: 'savedItems',
  state: () => ({
    savedItems: [],
  }),
  actions: {
    // retrieve saved items from Supabase database
    async getSavedItems() {
      const { data: savedItems, error } = await supabase.from("savedItems").select("*");

      const newArray = []

      for (let i = 0; i < savedItems.length; i++) {
        // inject id from top level object into nested savedItems object
        savedItems[i].savedItems[0]["top_id"] = savedItems[i].id
        // push savedItems object into "newArray"
        newArray.push(savedItems[i].savedItems[0])
        // deconstruct newArray and save to this.savedItems
        this.savedItems = [...newArray]
      }
      // console.log(this.savedItems)
    },
    // delete selected saved item
    async deleteSavedItem(item) {
      try {
        const { error } = await supabase
          .from("savedItems")
          .delete()
          .eq("id", item.top_id);
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