import React from "react";
import {
	ImageBackground,
	StyleSheet,
	StatusBar,
	Dimensions,
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import materialTheme from "../constants/Theme";
import Images from "../constants/Images";

export default class Onboarding extends React.Component {
	render() {
		const { navigation } = this.props;

		return (
			<Block flex style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Block flex center>
					<ImageBackground
						source={{
							uri: "https://cdn.pixabay.com/photo/2021/03/15/17/35/garden-6097539_1280.png",
						}}
						style={{
							height: height,
							width: width,
							// marginTop: "-55%",
							opacity: 0.6,
							zIndex: 1,
						}}
					/>
				</Block>
				<Block flex space="between" style={styles.padded}>
					<Block flex space="around" style={{ zIndex: 2 }}>
						<Block>
							<Block>
								<Text color="white" size={60}>
									Gard
								</Text>
							</Block>
							{/* <Block row>
								<Text color="white" size={60}>
									Garden
								</Text>
							</Block> */}
							<Text size={16} color="rgba(255,255,255,0.6)">
								Smart gardening assistant.
							</Text>
						</Block>
						<Block center>
							<Button
								shadowless
								style={styles.button}
								onPress={() => navigation.navigate("App")}
							>
								GET STARTED
							</Button>
						</Block>
					</Block>
				</Block>
			</Block>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "black",
	},
	padded: {
		paddingHorizontal: theme.SIZES.BASE * 2,
		position: "relative",
		bottom: theme.SIZES.BASE,
	},
	button: {
		backgroundColor: "#2F4C39",
		width: width - theme.SIZES.BASE * 4,
		height: theme.SIZES.BASE * 3,
		shadowRadius: 0,
		shadowOpacity: 0,
	},
});
