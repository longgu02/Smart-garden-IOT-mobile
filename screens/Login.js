import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Block, Button, Input, Text, GalioProvider } from "galio-framework";
import { retrieveData, storeData } from "../services/asyncStorage";

export default function Login(props) {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const { navigation } = props;

	const handleLogin = () => {
		console.log("hehe");
		fetch("http://192.168.2.6:3000/auth/log-in", {
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
