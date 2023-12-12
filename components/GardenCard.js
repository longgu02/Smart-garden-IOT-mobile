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
import { Block, Card, Icon, Text, theme } from "galio-framework";

import materialTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

class GardenCard extends React.Component {
	render() {
		const { navigation } = this.props;
		return (
			<Block card flex style={[styles.product, styles.shadow]}>
				{/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { product: product })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: product.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback> */}
				<TouchableWithoutFeedback
					onPress={() => navigation.navigate("Garden Detail")}
				>
					<Card
						flex
						borderless
						style={styles.card}
						title="Wonder Farm"
						caption="16 km²"
						location="Số 1 Đại Cồ Việt"
						avatar="https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt3125544effd09308/639f60c65d0ea95c1ee0e6c3/GettyImages-1450106798.jpg?auto=webp&format=pjpg&width=3840&quality=60"
						imageStyle={styles.cardImageRadius}
						imageBlockStyle={{ padding: theme.SIZES.BASE / 12 }}
						image="https://i.ytimg.com/vi/heTxEsrPVdQ/maxresdefault.jpg"
					/>
				</TouchableWithoutFeedback>
			</Block>
		);
	}
}

export default withNavigation(GardenCard);

const styles = StyleSheet.create({
	product: {
		backgroundColor: theme.COLORS.WHITE,
		marginVertical: theme.SIZES.BASE,
		borderWidth: 0,
		minHeight: 114,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		// backgroundColor: "#e0d6ff",
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
