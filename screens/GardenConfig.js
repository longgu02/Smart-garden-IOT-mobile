import React, { useState } from "react";
import { StyleSheet, Dimensions, ScrollView, View } from "react-native";
import { Button, Block, Text, Input, theme, Slider } from "galio-framework";
import { Icon, LandArea, Product } from "../components/";
import { HeaderHeight } from "../constants/utils";
import { Images, materialTheme } from "../constants";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import { Switch } from "react-native-gesture-handler";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { retrieveData } from "../services/asyncStorage";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedZone, updateZone } from "../redux/features/gardenSlice";
const thumbMeasure = (width - 48 - 32) / 3;

export default function GardenConfig(props) {
	const { route, navigation } = props;
	const { selectedZone } = useSelector((state) => state.garden);
	const [isAutoLight, setAutoLight] = useState(selectedZone.isAutoLight);
	const [isAutoWater, setAutoWater] = useState(selectedZone.isAutoWater);
	const [isOpenLightDatePicker, setOpenLightDatePicker] = useState(false);
	const [isOpenWaterDatePicker, setOpenWaterDatePicker] = useState(false);
	const [lightDate, setLightDate] = useState(new Date());
	const [waterDate, setWaterDate] = useState(new Date());
	const dispatch = useDispatch();

	const handleScheduleSwitch = (type) => {
		retrieveData("jwt")
			.then((jwt) => {
				if (type == "water") {
					fetch(
						`http://192.168.2.6:3000/garden/65977743884feab5659ece12/zone/6598fb895793d345eaaaf566/water-schedule?turn=${
							selectedZone.isAutoWater ? "off" : "on"
						}`,
						{
							method: "POST",
							headers: {
								Accept: "application/json",
								authorization: "Bearer " + jwt,
								"Content-Type": "application/json",
							},
						}
					).catch((err) => console.error(err));
				} else if (type == "light") {
					fetch(
						`http://192.168.2.6:3000/garden/65977743884feab5659ece12/zone/6598fb895793d345eaaaf566/light-schedule?turn=${
							selectedZone.isAutoLight ? "off" : "on"
						}`,
						{
							method: "POST",
							headers: {
								Accept: "application/json",
								authorization: "Bearer " + jwt,
								"Content-Type": "application/json",
							},
						}
					).catch((err) => console.error(err));
				}
			})
			.catch((err) => console.error(err));
	};

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

	const renderSchedulingSection = () => {
		return (
			<ConfigPanel title="Schedule">
				<Block safe row space="between" style={{ flexWrap: "wrap" }}>
					<Text size={20}>Light Scheduling</Text>
					<Switch
						value={selectedZone.isAutoLight}
						onValueChange={() => {
							handleScheduleSwitch("light");
							console.log(selectedZone);
							dispatch(
								updateZone({
									...route.params,
									isAutoLight: !isAutoLight,
								})
							);
							dispatch(
								setSelectedZone({
									...selectedZone,
									isAutoLight: !selectedZone.isAutoLight,
								})
							);
						}}
					/>
				</Block>
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
									onPress={() => setOpenLightDatePicker(!isOpenLightDatePicker)}
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
				<Block safe row space="between" style={{ flexWrap: "wrap" }}>
					<Text size={20}>Water Scheduling</Text>
					<Switch
						value={selectedZone.isAutoWater}
						onValueChange={() => {
							handleScheduleSwitch("water");
							dispatch(
								updateZone({
									...route.params,
									isAutoWater: !isAutoWater,
								})
							);
							dispatch(
								setSelectedZone({
									...selectedZone,
									isAutoWater: !selectedZone.isAutoWater,
								})
							);
						}}
					/>
				</Block>
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
									onPress={() => setOpenWaterDatePicker(!isOpenWaterDatePicker)}
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
		);
	};

	const renderActionSection = () => {
		return (
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
						value={route.params.isAutoWater}
						onValueChange={
							() => {}
							// setSelectedArea((prev) => {
							// 	return {
							// 		...prev,
							// 		isAutoWater: !route.params.isAutoWater,
							// 	};
							// })
						}
					/>
				</Block>
				<Block row space="between" style={{ flexWrap: "wrap" }}>
					<Text size={18} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
						Turn on light
					</Text>
					<Switch
						value={route.params.isAutoLight}
						onValueChange={() =>
							setSelectedArea((prev) => {
								return {
									...prev,
									isAutoLight: !route.params.isAutoLight,
								};
							})
						}
					/>
				</Block>
			</ConfigPanel>
		);
	};

	const renderStatusSection = () => {
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
					value={route.params.isAutoWater}
					onValueChange={() =>
						setSelectedArea((prev) => {
							return {
								...prev,
								isAutoWater: !route.params.isAutoWater,
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
					value={route.params.isAutoLight}
					onValueChange={() => {
						// 	setSelectedArea((prev) => {
						// 	return {
						// 		...prev,
						// 		isAutoLight: !route.params.isAutoLight,
						// 	};
						// })
					}}
				/>
			</Block>
		</ConfigPanel>;
	};

	const renderThresholdSection = () => {
		return (
			<ConfigPanel title="Threshold">
				<Block
					safe
					row
					space="between"
					style={{ flexWrap: "wrap", marginBottom: 10 }}
				>
					<Text size={18} bold style={{ marginBottom: theme.SIZES.BASE / 2 }}>
						Humidity
					</Text>
				</Block>
				<Text size={18}>Current Index: 10</Text>
				<Slider
					maximumValue={30}
					minimumValue={0}
					value={10}
					onSlidingcomplete={() => {}}
				/>
				<Block
					safe
					row
					space="between"
					style={{ flexWrap: "wrap", marginBottom: 10 }}
				>
					<Input
						placeholder="0"
						color={theme.COLORS.THEME}
						type="number-pad"
						style={{ borderColor: theme.COLORS.THEME, width: 70 }}
						placeholderTextColor={theme.COLORS.THEME}
					/>
					<Input
						placeholder="30"
						color={theme.COLORS.THEME}
						style={{ borderColor: theme.COLORS.THEME, width: 70 }}
						placeholderTextColor={theme.COLORS.THEME}
					/>
				</Block>
				<Text size={18} bold style={{ marginBottom: theme.SIZES.BASE / 2 }}>
					Temperature
				</Text>
				<Text size={18}>Current Index: 10</Text>
				<Slider
					maximumValue={30}
					minimumValue={0}
					value={10}
					onSlidingcomplete={() => {}}
				/>
				<Block
					safe
					row
					space="between"
					style={{ flexWrap: "wrap", marginBottom: 10 }}
				>
					<Input
						placeholder="0"
						color={theme.COLORS.THEME}
						type="number-pad"
						style={{ borderColor: theme.COLORS.THEME, width: 70 }}
						placeholderTextColor={theme.COLORS.THEME}
					/>
					<Input
						placeholder="30"
						color={theme.COLORS.THEME}
						style={{ borderColor: theme.COLORS.THEME, width: 70 }}
						placeholderTextColor={theme.COLORS.THEME}
					/>
				</Block>
			</ConfigPanel>
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
					<Block fluid row style={{ paddingBottom: 5 }}>
						<Ionicons
							name="arrow-back-outline"
							size={24}
							color="black"
							onPress={() => navigation.goBack()}
							style={{ marginLeft: 20, marginTop: 10 }}
						/>
						<Text style={{ marginLeft: 20, marginTop: 9, fontSize: 20 }}>
							Zone Configuration
						</Text>
					</Block>
					{/* <Text>Settings</Text>
					<Text>{route.params.humid}</Text> */}
					{/* ----------------- Status ---------------------- */}
					{renderStatusSection()}
					{/* ----------------- Action ---------------------- */}
					{/* {renderActionSection()} */}
					{/* ---------------------- Schedule --------------------------- */}
					{renderSchedulingSection()}
					{/* ---------------------- Threshold --------------------------- */}
					{renderThresholdSection()}
				</Block>
			</ScrollView>
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
