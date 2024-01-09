import React from "react";
import { withNavigation } from "@react-navigation/compat";
import {
	Ionicons,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
	StyleSheet,
	Dimensions,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import { Block, Icon, Text, theme } from "galio-framework";

import materialTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

function LandArea(props) {
	const { navigation, data, focus, onPress, onLongPress } = props;
	return (
		<Block
			card
			flex
			style={
				focus ? [styles.focus, styles.shadow] : [styles.product, styles.shadow]
			}
		>
			{/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { product: product })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: product.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback> */}
			<TouchableWithoutFeedback
				onLongPress={() => onLongPress()}
				onPress={() => onPress()}
			>
				<Block flex column middle>
					<Block>
						<Block row>
							<Ionicons
								name="md-water-sharp"
								family="Galio"
								size={18}
								color="#779ECB"
							/>
							<Text>
								{data.humid ? Number(data.humid).toFixed(2) : "--.--"}%
							</Text>
						</Block>
						<Block row>
							<FontAwesome5 name="temperature-high" size={18} color="#c23b22" />
							<Text>{data.temp ? Number(data.temp).toFixed(2) : "--.--"}℃</Text>
						</Block>
					</Block>
					<Block row>
						<MaterialCommunityIcons
							name="lightbulb"
							size={24}
							color={data.isLightOn ? "black" : "gray"}
						/>
						<MaterialCommunityIcons
							name="watering-can"
							size={24}
							color={data.isPumpOn ? "black" : "gray"}
						/>
					</Block>
				</Block>
			</TouchableWithoutFeedback>
		</Block>
	);
}

export default withNavigation(LandArea);

const styles = StyleSheet.create({
	product: {
		backgroundColor: theme.COLORS.WHITE,
		marginVertical: theme.SIZES.BASE,
		borderWidth: 0,
		minHeight: 114,
		margin: 10,
		backgroundColor: "#eeeeea",
	},
	focus: {
		backgroundColor: theme.COLORS.WHITE,
		marginVertical: theme.SIZES.BASE,
		borderWidth: 0,
		minHeight: 114,
		margin: 10,
		backgroundColor: "#C7DCA7",
	},
	productTitle: {
		flex: 1,
		flexWrap: "wrap",
		paddingBottom: 6,
	},
	productDescription: {
		padding: theme.SIZES.BASE / 2,
	},
	imageContainer: {
		elevation: 1,
	},
	image: {
		borderRadius: 3,
		marginHorizontal: theme.SIZES.BASE / 2,
		marginTop: -16,
	},
	horizontalImage: {
		height: 122,
		width: "auto",
	},
	fullImage: {
		height: 215,
		width: width - theme.SIZES.BASE * 3,
	},
	shadow: {
		shadowColor: theme.COLORS.BLACK,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.1,
		elevation: 2,
	},
});
