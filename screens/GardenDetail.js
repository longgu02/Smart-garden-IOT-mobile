import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Dimensions,
	ScrollView,
	Animated,
	View,
	Alert,
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { Icon, LandArea, Product } from "../components/";
import { HeaderHeight } from "../constants/utils";
import { Images, materialTheme } from "../constants";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import products from "../constants/products";
import { Switch } from "react-native-gesture-handler";
import { BottomSheet } from "../components/BottomSheet";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../redux/features/counterSlice";
import { retrieveData } from "../services/asyncStorage";
import {
	fetchAvailableDevices,
	fetchZones,
	removeZone,
	setSelectedZone,
} from "../redux/features/gardenSlice";
import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";
const thumbMeasure = (width - 48 - 32) / 3;

export default function GardenDetail(props) {
	const { navigation } = props;
	// const [selectedArea, setSelectedZone] = useState({ index: -1 });
	const dispatch = useDispatch();
	const { selectedZone, zones, availableDevices } = useSelector(
		(state) => state.garden
	);
	const [areaData, setAreaData] = useState([]);
	const [createForm, setCreateForm] = useState({});
	const [isModalVisible, setModalVisible] = useState(false);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	const handleAddZone = () => {
		retrieveData("jwt")
			.then((jwt) => {
				const payload = {
					gardenId: "65977743884feab5659ece12",
					...createForm,
				};
				console.log(payload);
				fetch("http://192.168.2.6:3000/garden/zone", {
					method: "POST",
					headers: {
						Accept: "application/json",
						authorization: "Bearer " + jwt,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				})
					.then((res) => toggleModal())
					// .then((data) => {
					// 	// setAreaData(data);
					// 	// dispatch(fetchZones(data));
					// 	console.log(data);
					// })
					.catch((err) => console.error(err));
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		retrieveData("jwt").then((jwt) => {
			fetch("http://192.168.2.6:3000/garden/65977743884feab5659ece12/zone", {
				method: "GET",
				headers: {
					Accept: "application/json",
					authorization: "Bearer " + jwt,
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setAreaData(data);
					dispatch(fetchZones(data));
					console.log(data);
				})
				.catch((err) => console.error(err));
			fetch("http://192.168.2.6:3000/garden/65977743884feab5659ece12/device", {
				method: "GET",
				headers: {
					Accept: "application/json",
					authorization: "Bearer " + jwt,
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					dispatch(fetchAvailableDevices(data));
					console.log(data);
				})
				.catch((err) => console.error(err));
		});
		// const unsubscribe = navigation.addListener("focus", () => {
		// 	setSelectedZone(zones.find((item) => item._id == selectedZone._id));
		// 	//Put your Data loading function here instead of my loadData()
		// });

		// return unsubscribe;
	}, [navigation]);

	const handleRemoveZone = (index) => {
		console.log(`http://192.168.2.6:3000/garden/zone/${zones[index]._id}`);
		retrieveData("jwt").then((jwt) => {
			fetch(`http://192.168.2.6:3000/garden/zone/${zones[index]._id}`, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					authorization: "Bearer " + jwt,
					"Content-Type": "application/json",
				},
			}).catch((err) => console.error(err));
		});
		dispatch(removeZone(index));
	};

	const renderGardenDetail = () => {
		return (
			<Block>
				<ScrollView>
					<Block flex column>
						{zones.map((item, index) => {
							if (index % 3 == 0) {
								return (
									<Block flex row>
										<LandArea
											data={{ humid: 10, temp: 10, ...zones[index] }}
											focus={index == selectedZone.index}
											onLongPress={() => {
												Alert.alert(
													"Remove zone",
													"Do you want to permanently remove this zone?",
													[
														{
															text: "Cancel",
															style: "cancel",
														},
														{
															text: "OK",
															onPress: () => handleRemoveZone(index),
														},
													]
												);
											}}
											onPress={() =>
												selectedZone._id == index
													? dispatch(setSelectedZone(-1))
													: dispatch(
															setSelectedZone({
																index: index,
																humid: 10,
																temp: 10,
																...zones[index],
															})
													  )
											}
										/>
										{index + 1 < zones.length && (
											<LandArea
												data={zones[index + 1]}
												focus={index + 1 == selectedZone.index}
												onLongPress={() => {
													Alert.alert(
														"Remove zone",
														"Do you want to permanently remove this zone?",
														[
															{
																text: "Cancel",
																style: "cancel",
															},
															{
																text: "OK",
																onPress: () => handleRemoveZone(index + 1),
															},
														]
													);
												}}
												onPress={() =>
													selectedZone.index == index + 1
														? dispatch(setSelectedZone(-1))
														: dispatch(
																setSelectedZone({
																	index: index + 1,
																	humid: 10,
																	temp: 10,
																	...zones[index + 1],
																})
														  )
												}
											/>
										)}
										{index + 2 < zones.length && (
											<LandArea
												data={zones[index + 2]}
												focus={index + 2 == selectedZone.index}
												onLongPress={() => {
													Alert.alert(
														"Remove zone",
														"Do you want to permanently remove this zone?",
														[
															{
																text: "Cancel",
																style: "cancel",
															},
															{
																text: "OK",
																onPress: () => handleRemoveZone(index + 2),
															},
														]
													);
												}}
												onPress={() =>
													selectedZone.index == index + 2
														? dispatch(setSelectedZone(-1))
														: dispatch(
																setSelectedZone({
																	index: index + 2,
																	humid: 10,
																	temp: 10,
																	...zones[index + 2],
																})
														  )
												}
											/>
										)}
									</Block>
								);
							}
						})}
						{/* {availableDevices.map((item) => {
							if (index % 3 == 0) {
								return (
									<Block flex row>
										<LandArea
											data={{ humid: 10, temp: 10, ...zones[index] }}
											focus={index == selectedZone.index}
											onPress={() => {}}
										/>
										{index + 1 < zones.length && (
											<LandArea
												data={zones[index + 1]}
												focus={index + 1 == selectedZone.index}
												onPress={() => {}}
											/>
										)}
										{index + 2 < zones.length && (
											<LandArea
												data={zones[index + 2]}
												focus={index + 2 == selectedZone.index}
												onPress={() => {}}
											/>
										)}
									</Block>
								);
							}
						})} */}
					</Block>
					<Text
						style={styles.add}
						onPress={
							// navigation.navigate("Create zone");
							toggleModal
						}
					>
						Add zone
					</Text>
					<Modal
						isVisible={isModalVisible}
						style={{
							backgroundColor: "white",
							width: "90%",
							padding: 20,
							marginLeft: "auto",
							marginRight: "auto",
						}}
					>
						<View style={{ flex: 1 }}>
							<Text>Hello!</Text>
							<Input
								rounded
								placeholder="Plant"
								style={styles.input}
								onChangeText={(text) => {
									setCreateForm({ ...createForm, plant: text });
								}}
							/>
							<Block
								safe
								row
								space="between"
								style={{ flexWrap: "wrap", marginTop: 10 }}
							>
								<Text>Device (MAC Address):</Text>
								<RNPickerSelect
									style={{ color: "black" }}
									onValueChange={(value) =>
										setCreateForm({ ...createForm, deviceId: value })
									}
									items={availableDevices.map((item) => {
										return { label: item.macAddress, value: item._id };
									})}
								/>
							</Block>
							{/* <Button title="Hide modal"  /> */}
							<Block
								safe
								row
								space="around"
								style={{ flexWrap: "wrap", marginTop: 10 }}
							>
								<Button
									onPress={() => {
										// console.log("confirm");
										handleAddZone();
									}}
									color="#77DD77"
									style={{ padding: 0 }}
								>
									Confirm
								</Button>
								<Button onPress={toggleModal} color="#FAA0A0">
									Cancel
								</Button>
							</Block>
						</View>
					</Modal>
				</ScrollView>
			</Block>
		);
	};

	const renderOptions = () => {
		const dispatch = useDispatch();
		return (
			<BottomSheet
				show={selectedZone.index != -1}
				height={290}
				onOuterClick={() => dispatch(setSelectedZone({ index: -1 }))}
			>
				<Block fluid safe>
					<Block row space="between" style={{ padding: theme.SIZES.BASE }}>
						<Block middle>
							<Text bold size={16} style={{ marginBottom: 8 }}>
								{selectedZone.humid}%
							</Text>
							<Text muted size={16}>
								Humidity
							</Text>
						</Block>
						<Block middle>
							<Text bold size={16} style={{ marginBottom: 8 }}>
								{selectedZone.temp}℃
							</Text>
							<Text muted size={16}>
								Temperature
							</Text>
						</Block>
						<Block middle>
							<Text bold size={16} style={{ marginBottom: 8 }}>
								{selectedZone.index}
							</Text>
							<Text muted size={16}>
								Area
							</Text>
						</Block>
					</Block>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Block
							row
							space="between"
							style={{ paddingVertical: 16, alignItems: "baseline" }}
						>
							<Text size={20}>Action and Schedule</Text>
							<Text
								size={16}
								color={theme.COLORS.PRIMARY}
								onPress={() =>
									navigation.navigate("Garden Configuration", selectedZone)
								}
							>
								View All
							</Text>
						</Block>
						{/* <Button
							onPress={() => {
								dispatch(increment());
							}}
						>
							hehehe
						</Button>
						<Text>{count}</Text> */}
						<Block
							style={{ paddingBottom: -HeaderHeight * 2, marginBottom: 10 }}
						>
							<Block
								row
								space="between"
								style={{ flexWrap: "wrap", marginBottom: 10 }}
							>
								<Text size={16} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
									Watering Pump
								</Text>
								<Switch
									value={selectedZone.isWatering}
									onValueChange={() => {
										retrieveData("jwt").then((jwt) => {
											fetch(
												`http://192.168.2.6:3000/garden/65977743884feab5659ece12/zone/65977ba61d50b2d508da3875/water?turn=${
													selectedZone.isWatering ? "off" : "on"
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
										});
										dispatch(
											setSelectedZone({
												...selectedZone,
												isWatering: !selectedZone.isWatering,
											})
										);
									}}
								/>
							</Block>
							<Block
								row
								space="between"
								style={{ flexWrap: "wrap", marginBottom: 10 }}
							>
								<Text size={16} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
									Light
								</Text>
								<Switch
									value={selectedZone.isLightOn}
									onValueChange={() => {
										retrieveData("jwt").then((jwt) => {
											fetch(
												`http://192.168.2.6:3000/garden/65977743884feab5659ece12/zone/65977ba61d50b2d508da3875/light?turn=${
													selectedZone.isLightOn ? "off" : "on"
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
										});
										dispatch(
											setSelectedZone({
												...selectedZone,
												isWatering: !selectedZone.isWatering,
											})
										);
									}}
								/>
							</Block>
						</Block>
					</ScrollView>
				</Block>
			</BottomSheet>
		);
	};

	return (
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
					Garden Area - Wonderfarm
				</Text>
			</Block>
			{/* <Button title="Back" /> */}
			<Block flex>{renderGardenDetail()}</Block>
			{selectedZone.index >= 0 && renderOptions()}
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
	add: {
		// marginTop: -theme.SIZES.BASE * 7,
		marginRight: theme.SIZES.BASE / 2,
		textAlign: "right",
		// color: "primary",
		textDecorationLine: "underline",
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
	subView: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#FFFFFF",
		height: 100,
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
