// store.js
import { configureStore } from '@reduxjs/toolkit'; // Creates the Redux store with the configStore() function from @reduxjs/toolkit.
import venueReducer from './venueSlice'; // The store.js contains a reducer called venue(), imported from venuSlice.js.
/**This code creates a global Redux store using the @reduxjs/toolkit&#96;
 * configureStore() function so all components in the application
 * can access the state managed by the venueReducer().
 */
export default configureStore({
  reducer: {
    venue: venueReducer,
  },
});
