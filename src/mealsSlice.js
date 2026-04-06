// mealsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const mealsSlice = createSlice({
  name: 'meals',
  initialState: [ // Step 1: Set the initial state
    {
      name: 'Breakfast', cost: 50, selected: false
    },
    {
      name: 'High Tea', cost: 25, selected: false
    },
    {
      name: 'Lunch', cost: 65, selected: false
    },
    {
      name: 'Dinner', cost: 70, selected: false
    },
  ],
  reducers: { // Step 2: Define reducers to manage the state change
    /**The toggleMeanSelection function toggles the selected
     * property of a specific item in the state. It takes
     * the current state and an action object, using
     * action.payload to identify the item to update. It then
     * switches the selected status of that item from false
     * to true or vice versa.
     */
    toggleMealSelection: (state, action) => {
      state[action.payload].selected = !state[state[action.payload].selected];
    },
    // Step 3: Provide the reducers to the store @store.js
  },
});

export const { toggleMealSelection } = mealsSlice.actions;

export default mealsSlice.reducer;
