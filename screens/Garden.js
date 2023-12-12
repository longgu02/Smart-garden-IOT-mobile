import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Block, Text, Input, theme, Card } from "galio-framework";

import { Icon, Product } from "../components/";

const { width } = Dimensions.get("screen");
import products from "../constants/products";
import GardenCard from "../components/GardenCard";

export default class Garden extends React.Component {
	renderSearch = () => {
		const { navigation } = this.props;
		const iconCamera = (
			<Icon
				size={16}
				color={theme.COLORS.MUTED}
				name="zoom-in"
				family="material"
			/>
		);

		return (
			<Input
				right
				color="black"
				style={styles.search}
				iconContent={iconCamera}
				placeholder="HEHEHE?"
				onFocus={() => navigation.navigate("Pro")}
			/>
		);
	};

	renderTabs = () => {
		const { navigation } = this.props;

		return (
			<Block row style={styles.tabs}>
				<Button
					shadowless
					style={[styles.tab, styles.divider]}
					onPress={() => navigation.navigate("Pro")}
				>
					<Block row middle>
						<Icon name="grid" family="feather" style={{ paddingRight: 8 }} />
						<Text size={16} style={styles.tabTitle}>
							Haha
						</Text>
					</Block>
				</Button>
				<Button
					shadowless
					style={styles.tab}
					onPress={() => navigation.navigate("Pro")}
				>
					<Block row middle>
						<Icon
							size={16}
							name="camera-18"
							family="GalioExtra"
							style={{ paddingRight: 8 }}
						/>
						<Text size={16} style={styles.tabTitle}>
							Best Deals
						</Text>
					</Block>
				</Button>
			</Block>
		);
	};

	renderProducts = () => {
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				// contentContainerStyle={styles.products}
			>
				<GardenCard />
				<GardenCard />
				<GardenCard />
				<GardenCard />
				{/* <Block flex>
					<Product
						product={products[0]}
						full
						onPress={() => navigation.navigate("Garden Detail")}
					/>
					<Product product={products[1]} full />
					<Product product={products[0]} full />
					<Product product={products[0]} full />
					<Product product={products[0]} full />
					{/* <Block flex row>
						<Product
							product={products[1]}
							style={{ marginRight: theme.SIZES.BASE }}
						/>
						<Product product={products[2]} />
					</Block>
					<Product product={products[3]} horizontal />
					<Product product={products[4]} full />}
				</Block> */}
			</ScrollView>
		);
	};

	render() {
		return (
			<Block>
				{/* <Card
					title="day la title"
					caption="caption"
					location="location"
					image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
				/> */}
				{this.renderProducts()}
			</Block>
		);
	}
}

const styles = StyleSheet.create({
	home: {
		width: width,
	},
	search: {
		height: 48,
		width: width - 32,
		marginHorizontal: 16,
		borderWidth: 1,
		borderRadius: 3,
	},
	header: {
		backgroundColor: theme.COLORS.WHITE,
		shadowColor: theme.COLORS.BLACK,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 8,
		shadowOpacity: 0.2,
		elevation: 4,
		zIndex: 2,
	},
	tabs: {
		marginBottom: 24,
		marginTop: 10,
		elevation: 4,
	},
	tab: {
		backgroundColor: theme.COLORS.TRANSPARENT,
		width: width * 0.5,
		borderRadius: 0,
		borderWidth: 0,
		height: 24,
		elevation: 0,
	},
	tabTitle: {
		lineHeight: 19,
		fontWeight: "300",
	},
	divider: {
		borderRightWidth: 0.3,
		borderRightColor: theme.COLORS.MUTED,
	},
	products: {
		width: width - theme.SIZES.BASE * 2,
		paddingVertical: theme.SIZES.BASE * 2,
	},
});
