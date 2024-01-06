import React from "react";
import { StyleSheet } from "react-native";
import { Block, Button, Input, Text, GalioProvider } from "galio-framework";

export default function Signup(props) {
	const { navigation } = props;
	return (
		<GalioProvider>
			<Block flex middle style={styles.container}>
				<Text h4 style={{ marginBottom: 25 }}>
					Signup
				</Text>
				<Input rounded placeholder="Fullname" style={styles.input} />
				<Input rounded placeholder="Username" style={styles.input} />
				<Input
					rounded
					placeholder="Password"
					password
					viewPass
					style={styles.input}
				/>
				<Text onPress={() => navigation.navigate("Login")}>
					Already have account? Sign in
				</Text>
				<Button round color="primary" style={styles.button}>
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
