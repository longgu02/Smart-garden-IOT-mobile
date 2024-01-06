import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import gardenReducer from "./features/gardenSlice";

export default configureStore({
	reducer: {
		counter: counterReducer,
		garden: gardenReducer,
	},
});
