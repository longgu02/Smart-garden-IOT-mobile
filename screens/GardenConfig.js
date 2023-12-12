import React, { useState } from "react";
import { StyleSheet, Dimensions, ScrollView, View } from "react-native";
import {
	Button,
	Block,
	Text,
	Input,
	theme,
	Slider,
	DeckSwiper,
	Accordion,
} from "galio-framework";
import { Icon, LandArea, Product } from "../components/";
import { HeaderHeight } from "../constants/utils";
import { Images, materialTheme } from "../constants";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import products from "../constants/products";
import { Switch } from "react-native-gesture-handler";
import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { BottomSheet } from "../components/BottomSheet";
const thumbMeasure = (width - 48 - 32) / 3;

export default function GardenConfig(props) {
	const { route, navigation } = props;
	const [isOpenLightDatePicker, setOpenLightDatePicker] = useState(false);
	const [isOpenWaterDatePicker, setOpenWaterDatePicker] = useState(false);
	const [lightDate, setLightDate] = useState(new Date());
	const [waterDate, setWaterDate] = useState(new Date());
	const elements = [
		<View style={{ backgroundColor: "#B23AFC", height: 250, width: 250 }}>
			<Text>You wanna see a cool component?</Text>
			<Text>Galio has this cool Deck Swiper</Text>
		</View>,
		<View style={{ backgroundColor: "#FE2472", height: 250, width: 250 }}>
			<Text>What did you expect?</Text>
			<Text>This React Native component works perfectly</Text>
		</View>,
		<View style={{ backgroundColor: "#FF9C09", height: 250, width: 250 }}>
			<Text>Maybe you want to build the next Tinder</Text>
		</View>,
		<View style={{ backgroundColor: "#45DF31", height: 250, width: 250 }}>
			<Text>or maybe you just want a nice deck swiper component</Text>
			<Text>Galio has everything sorted out for you</Text>
		</View>,
	];

	const ConfigPanel = ({ title, children }) => {
		return (
			<Block
				style={{
					backgroundColor: "#FFFFFF",
					borderRadius: 15,
					padding: 20,
					marginBottom: 15,
				}}
			>
				<Text
					size={24}
					style={{ marginBottom: theme.SIZES.BASE / 2, textAlign: "center" }}
				>
					{title}
				</Text>
				<Block style={{ paddingBottom: -HeaderHeight * 2 }}>{children}</Block>
			</Block>
		);
	};

	const renderScheduling = () => {
		return (
			<Block style={styles.group}>
				<Text bold size={16} style={styles.title}>
					Inputs
				</Text>
				<Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
					<Input
						right
						placeholder="icon right"
						placeholderTextColor={materialTheme.COLORS.DEFAULT}
						style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
						iconContent={
							<Icon
								size={16}
								color={theme.COLORS.ICON}
								name="camera-18"
								family="GalioExtra"
							/>
						}
					/>
				</Block>
			</Block>
		);
	};

	const data = [
		{
			title: "Scheduling",
			content: renderScheduling(),
			icon: {
				name: "keyboard-arrow-up",
				family: "material",
				size: 16,
			},
		},
		{
			title: "2nd Chapter",
			content: renderScheduling(),
		},
		{ title: "3rd Chapter", content: "Lorem ipsum dolor sit amet" },
	];

	return (
		<Block>
			<ScrollView>
				<Block flex style={styles.profile}>
					<Text>Settings</Text>
					<Text>{route.params.humid}</Text>
					{/* ----------------- Status ---------------------- */}
					<ConfigPanel title="Status">
						<Block
							safe
							row
							space="between"
							style={{ flexWrap: "wrap", marginBottom: 10 }}
						>
							<Text size={18} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
								Turn on pump
							</Text>
							<Switch
								value={route.params.isWateringScheduleOn}
								onValueChange={() =>
									setSelectedArea((prev) => {
										return {
											...prev,
											isWateringScheduleOn: !route.params.isWateringScheduleOn,
										};
									})
								}
							/>
						</Block>
						<Block row space="between" style={{ flexWrap: "wrap" }}>
							<Text size={18} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
								Humidity
							</Text>
							<Switch
								value={route.params.isLightScheduleOn}
								onValueChange={() =>
									setSelectedArea((prev) => {
										return {
											...prev,
											isLightScheduleOn: !route.params.isLightScheduleOn,
										};
									})
								}
							/>
						</Block>
					</ConfigPanel>
					{/* ----------------- Action ---------------------- */}
					<ConfigPanel title="Action">
						<Block
							safe
							row
							space="between"
							style={{ flexWrap: "wrap", marginBottom: 10 }}
						>
							<Text size={18} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
								Turn on pump
							</Text>
							<Switch
								value={route.params.isWateringScheduleOn}
								onValueChange={() =>
									setSelectedArea((prev) => {
										return {
											...prev,
											isWateringScheduleOn: !route.params.isWateringScheduleOn,
										};
									})
								}
							/>
						</Block>
						<Block row space="between" style={{ flexWrap: "wrap" }}>
							<Text size={18} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
								Turn on light
							</Text>
							<Switch
								value={route.params.isLightScheduleOn}
								onValueChange={() =>
									setSelectedArea((prev) => {
										return {
											...prev,
											isLightScheduleOn: !route.params.isLightScheduleOn,
										};
									})
								}
							/>
						</Block>
					</ConfigPanel>
					{/* ---------------------- Schedule --------------------------- */}
					<ConfigPanel title="Schedule">
						<Text size={20} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
							Light Scheduling
						</Text>
						<Block flex style={styles.group}>
							<Text bold size={16} style={styles.title}>
								Time:
							</Text>
							<Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
								<Input
									right
									// placeholder="icon right"
									value={`${
										lightDate.getHours().length == 1
											? "0" + lightDate.getHours()
											: lightDate.getHours()
									}: ${
										lightDate.getMinutes().length == 1
											? "0" + lightDate.getMinutes()
											: lightDate.getMinutes()
									}`}
									color="black"
									style={{
										borderRadius: 3,
										borderColor: materialTheme.COLORS.INPUT,
									}}
									iconContent={
										<Icon
											size={16}
											color={theme.COLORS.ICON}
											name="clockcircleo"
											family="AntDesign"
											onPress={() =>
												setOpenLightDatePicker(!isOpenLightDatePicker)
											}
										/>
									}
								/>
							</Block>
						</Block>
						{isOpenLightDatePicker && (
							<RNDateTimePicker
								mode="time"
								value={lightDate || new Date()}
								onChange={(date) => {
									console.log(date);
									setLightDate(new Date(date.nativeEvent.timestamp));
									Platform.OS === "android" && setOpenLightDatePicker(false);
								}}
								display="spinner"
							/>
						)}
						<Text size={20} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
							Watering Scheduling
						</Text>
						<Block flex style={styles.group}>
							<Text bold size={16} style={styles.title}>
								Time:
							</Text>
							<Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
								<Input
									right
									value={`${
										waterDate.getHours().length == 1
											? "0" + waterDate.getHours()
											: waterDate.getHours()
									}: ${
										waterDate.getMinutes().length == 1
											? "0" + waterDate.getMinutes()
											: waterDate.getMinutes()
									}`}
									color="black"
									style={{
										borderRadius: 3,
										borderColor: materialTheme.COLORS.INPUT,
									}}
									iconContent={
										<Icon
											size={16}
											color={theme.COLORS.ICON}
											name="clockcircleo"
											family="AntDesign"
											onPress={() =>
												setOpenWaterDatePicker(!isOpenWaterDatePicker)
											}
										/>
									}
								/>
							</Block>
						</Block>
						{isOpenWaterDatePicker && (
							<RNDateTimePicker
								mode="time"
								value={waterDate || new Date()}
								onChange={(date) => {
									console.log(date);
									setWaterDate(new Date(date.nativeEvent.timestamp));
									Platform.OS === "android" && setOpenWaterDatePicker(false);
								}}
								display="spinner"
							/>
						)}
					</ConfigPanel>
				</Block>
			</ScrollView>
			{/* ---------------------- Threshold --------------------------- */}
			<ConfigPanel title="Threshold">
				<Block
					safe
					row
					space="between"
					style={{ flexWrap: "wrap", marginBottom: 10 }}
				>
					<Text size={18} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
						Turn on pump
					</Text>
					<Switch
						value={route.params.isWateringScheduleOn}
						onValueChange={() =>
							setSelectedArea((prev) => {
								return {
									...prev,
									isWateringScheduleOn: !route.params.isWateringScheduleOn,
								};
							})
						}
					/>
				</Block>
				<Block row space="between" style={{ flexWrap: "wrap" }}>
					<Text size={18} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
						Humidity
					</Text>
					<Switch
						value={route.params.isLightScheduleOn}
						onValueChange={() =>
							setSelectedArea((prev) => {
								return {
									...prev,
									isLightScheduleOn: !route.params.isLightScheduleOn,
								};
							})
						}
					/>
				</Block>
			</ConfigPanel>
		</Block>
	);
}

const styles = StyleSheet.create({
	profile: {
		// marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
		// marginBottom: -HeaderHeight * 2,
	},
	profileImage: {
		width: width * 1.1,
		height: "auto",
	},
	profileContainer: {
		width: width,
		height: height / 2,
	},
	profileDetails: {
		paddingTop: theme.SIZES.BASE * 4,
		justifyContent: "flex-end",
		position: "relative",
	},
	profileTexts: {
		paddingHorizontal: theme.SIZES.BASE * 2,
		paddingVertical: theme.SIZES.BASE * 2,
		zIndex: 2,
	},
	pro: {
		backgroundColor: materialTheme.COLORS.LABEL,
		paddingHorizontal: 6,
		marginRight: theme.SIZES.BASE / 2,
		borderRadius: 4,
		height: 19,
		width: 38,
	},
	seller: {
		marginRight: theme.SIZES.BASE / 2,
	},
	options: {
		position: "relative",
		height: 250,
		padding: theme.SIZES.BASE,
		marginHorizontal: 5,
		marginTop: -theme.SIZES.BASE * 7,
		borderTopLeftRadius: 13,
		borderTopRightRadius: 13,
		backgroundColor: theme.COLORS.WHITE,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 8,
		shadowOpacity: 0.2,
		zIndex: 2,
	},
	thumb: {
		borderRadius: 4,
		marginVertical: 4,
		alignSelf: "center",
		width: thumbMeasure,
		height: thumbMeasure,
	},
	gradient: {
		zIndex: 1,
		left: 0,
		right: 0,
		bottom: 0,
		height: "30%",
		position: "absolute",
	},
});
