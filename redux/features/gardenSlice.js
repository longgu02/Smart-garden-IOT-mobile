import { createSlice } from "@reduxjs/toolkit";

export const gardenSlice = createSlice({
	name: "Garden",
	gardenId: "",
	initialState: {
		name: null,
		zones: [],
		selectedZone: {},
		availableDevices: [],
	},
	reducers: {
		fetchZones: (state, action) => {
			state.zones = action.payload;
			// console.log("inc");
		},
		updateZone: (state, action) => {
			let matched = state.zones.find((item) => item._id == action.payload._id);
			matched = action.payload;
		},
		setSelectedZone: (state, action) => {
			state.selectedZone = action.payload;
		},
		fetchAvailableDevices: (state, action) => {
			state.availableDevices = action.payload;
		},
		removeZone: (state, action) => {
			state.zones.splice(action.payload, 1);
		},
		updateGardenId: (state, action) => {
			state.gardenId = action.payload;
		},
		updateZoneSensorData: (state, action) => {
			console.log("pay1", action.payload);

			let matched = state.zones.find((item) => item._id == action.payload.id);
			matched.humid = action.payload.humidity;
			matched.temp = action.payload.temperature;
			// state.zones[index]["humid"] = action.payload.humidity;
			// state.zones[index]["temp"] = action.payload.temperature;
		},
		updatePumpLightStatus: (state, action) => {
			console.log("pay2", action.payload);
			let matched = state.zones.find((item) => item._id == action.payload.id);
			if (action.payload.type == "water") {
				matched.isWatering = action.payload.turn == "on" ? true : false;
			} else if (action.payload.type == "light") {
				matched.isLightOn = action.payload.turn == "on" ? true : false;
			}
			console.log("final", matched);
			// state.zones[index]["humid"] = action.payload.humidity;
			// state.zones[index]["temp"] = action.payload.temperature;
		},
		// decrement: (state) => {
		// 	state.value -= 1;
		// 	console.log("dec");
		// },
		// incrementByAmount: (state, action) => {
		// 	state.value += action.payload;
		// },
	},
});

// Action creators are generated for each case reducer function
export const {
	fetchAvailableDevices,
	setSelectedZone,
	fetchZones,
	updateZone,
	removeZone,
	updateGardenId,
	updateZoneSensorData,
	updatePumpLightStatus,
} = gardenSlice.actions;

export default gardenSlice.reducer;
