import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Block, Button, Input, Text, GalioProvider } from "galio-framework";
import { retrieveData, storeData } from "../services/asyncStorage";
import { useDispatch } from "react-redux";
import { updateGardenId } from "../redux/features/gardenSlice";
import { ipAddress } from "../services/client";

export default function Login(props) {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const dispatch = useDispatch();
	const { navigation } = props;

	const handleLogin = () => {
		console.log("hehe");
		fetch(`http://${ipAddress}:3000/auth/log-in`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then((res) => res.text()) // Use the text() method here
			.then((data) => {
				// AsyncStorage.setItem("jwt", data);
				storeData("jwt", data);
				console.log(data); // Log the response data
				console.log("item", retrieveData("jwt"));
				fetch(`http://${ipAddress}:3000/garden/my-garden`, {
					method: "GET",
					headers: {
						Accept: "application/json",
						authorization: "Bearer " + data,
						"Content-Type": "application/json",
					},
				})
					.then((res) => res.json())
					.then((data) => {
						console.log("hehehe", data);
						dispatch(updateGardenId(data._id));
					})
					.catch((err) => console.error(err));
				navigation.navigate("App");
				// const item = AsyncStorage.getItem("jwt");
				// console.log("item", item);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<GalioProvider>
			<Block flex middle style={styles.container}>
				<Text h4 style={{ marginBottom: 25 }}>
					Login
				</Text>
				<Input
					rounded
					placeholder="Username"
					style={styles.input}
					onChangeText={(text) => setUsername(text)}
				/>
				<Input
					rounded
					placeholder="Password"
					password
					viewPass
					style={styles.input}
					onChangeText={(text) => setPassword(text)}
				/>
				<Text onPress={() => navigation.navigate("Signup")}>Register</Text>
				<Button
					round
					color="primary"
					style={styles.button}
					onPress={handleLogin}
				>
					Login
				</Button>
			</Block>
		</GalioProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		justifyContent: "center",
	},
	input: {
		marginBottom: 20,
	},
	button: {
		marginTop: 20,
	},
});
