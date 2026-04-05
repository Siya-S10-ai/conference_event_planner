import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
    {
      img: "",
      name: "Projectors",
      cost: 200,
      quantity: 0,
    },
    {
      img: "",
      name: "Speaker",
      cost: 35,
      quantity: 0,
    },
    {
      img: "",
      name: "Microphones",
      cost: 45,
      quantity: 0,
    },
    {
      img: "",
      name: "Whiteboards",
      cost: 80,
      quantity: 0,
    },
    {
      img: "",
      name: "Signage",
      cost: 80,
      quantity: 0,
    },
    
  ],


  reducers: {
    /**The incrementAvQuantity() reducer function increments the
     * quantity of a specific item in the state.
     * It takes two parameters: state and action.
     */
    incrementAvQuantity: (state, action) => {
      /** The action.payload object contains the identifier of
       * the item to increment.
       * The reducer retrives the item from the state using 
       * state[action.payload]*/
      const item = state[action.payload];
      // If the item exists, it increments its quantity property by 1.
      if (item) {
        item.quantity++;
      }
    },
    decrementAvQuantity: (state, action) => {
     
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

export default avSlice.reducer;
