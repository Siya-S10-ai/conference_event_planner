import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
    {
      img: "",
      name: "",
      cost: 0,
      quantity: 0,
    },
    {
      img: "",
      name: "",
      cost: 0,
      quantity: 0,
    },
    {
      img: "",
      name: "",
      cost: 0,
      quantity: 0,
    },
    {
      img: "",
      name: "",
      cost: 0,
      quantity: 0,
    },
    {
      img: "",
      name: "",
      cost: 0,
      quantity: 0,
    },
    
  ],


  reducers: {
    incrementAvQuantity: (state, action) => {
      
    },
    decrementAvQuantity: (state, action) => {
     
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

export default avSlice.reducer;
