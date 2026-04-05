// venueSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const venueSlice = createSlice({
  name: "venue",
  initialState: [
    {
      img: "https://pixabay.com/images/download/chairs-2181916_640.jpg",
      name: "Conference Room (Capacity:15)",
      cost: 3500,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/event-venue-1597531_640.jpg",
      name: "Auditorium Hall (Capacity:200)",
      cost: 5500,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/convention-center-3908238_640.jpg",
      name: "Presentation Room (Capacity:50)",
      cost: 700,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/chairs-2181916_640.jpg",
      name: "Large Meeting Room (Capacity:10)",
      cost: 900,
      quantity: 0,
    },
    {
      img: "https://pixabay.com/images/download/laptops-593296_640.jpg",
      name: "Small Meeting Room (Capacity:5)",
      cost: 1100,
      quantity: 0,
    },
  
  ],
  /**The file includes reducer functions incrementQuantity
   * and decrementQuantity to manage the number of venue items
   * in the state.
   */
  reducers: {
   /**This function handles incrementing the quantity of a venue
    * item in the state.
    */
    incrementQuantity: (state, action) => {
      const { payload: index } = action; // It receives an action containing the index of the item to be incremented.
      /**It first checks if the item exists in the state at the provided index.
       */
      if (state[index]) {
        /**If the item exists and it's an Auditorium Hall with 
         * a quanitity greater than or equal to 3, it returns
         * early without modifying the state
         */
        if (state[index].name === " Auditorium Hall (Capacity:200)" && state[index].quantity >= 3) {
          return;        }
          // Otherwise, it increments the quantity of the item by one.
        state[index].quantity++;
      }
    },
    /**This function handles decrementing the quantity of a 
     * venue item in the state.
     */
    decrementQuantity: (state, action) => {
      const { payload: index } = action; // It receives an action containing the index of the item to be decremented.
      /**It first checks if the item exists in the state at the
       * provided index and if its quantity is greater than zero.
       */
      if (state[index] && state[index].quantity > 0) {
        /**If both conditions are met, the quantity of the item will be 
         * decreased by one.
         */
        state[index].quantity--;
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = venueSlice.actions;

export default venueSlice.reducer;
