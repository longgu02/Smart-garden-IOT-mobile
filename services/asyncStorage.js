import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeData = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		// Error saving data
		console.log(error);
	}
};
export const retrieveData = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			// We have data!!
			return JSON.parse(value);
			// console.log(JSON.parse(value));
		}
	} catch (error) {
		// Error retrieving data
		console.log(error);
	}
};
