import React, { useState } from "react";
import { StyleSheet, Dimensions, ScrollView, Animated } from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { Icon, LandArea, Product } from "../components/";
import { HeaderHeight } from "../constants/utils";
import { Images, materialTheme } from "../constants";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import products from "../constants/products";
import { Switch } from "react-native-gesture-handler";
import { BottomSheet } from "../components/BottomSheet";

const thumbMeasure = (width - 48 - 32) / 3;

export default function GardenDetail(props) {
	const { navigation } = props;
	const [selectedArea, setSelectedArea] = useState({ index: -1 });

	const TEST_GARDEN = [
		{
			humid: 10,
			temp: 30,
			isLightOn: true,
			isPumpOn: false,
			isWateringScheduleOn: false,
			isLightScheduleOn: true,
		},
		{
			humid: 10,
			temp: 32,
			isLightOn: true,
			isPumpOn: true,
			isWateringScheduleOn: false,
			isLightScheduleOn: true,
		},
		{
			humid: 10,
			temp: 40,
			isLightOn: true,
			isPumpOn: false,
			isWateringScheduleOn: false,
			isLightScheduleOn: true,
		},
		{
			humid: 10,
			temp: 60,
			isLightOn: true,
			isPumpOn: false,
			isWateringScheduleOn: false,
			isLightScheduleOn: true,
		},
		{
			humid: 10,
			temp: 90,
			isLightOn: false,
			isPumpOn: true,
			isWateringScheduleOn: false,
			isLightScheduleOn: true,
		},
		{
			humid: 10,
			temp: 70,
			isLightOn: true,
			isPumpOn: false,
			isWateringScheduleOn: false,
			isLightScheduleOn: true,
		},
		{
			humid: 10,
			temp: 50,
			isLightOn: false,
			isPumpOn: false,
			isWateringScheduleOn: false,
			isLightScheduleOn: true,
		},
		{
			humid: 10,
			temp: 40,
			isLightOn: false,
			isPumpOn: true,
			isWateringScheduleOn: false,
			isLightScheduleOn: true,
		},
		{
			humid: 10,
			temp: 20,
			isLightOn: true,
			isPumpOn: false,
			isWateringScheduleOn: false,
			isLightScheduleOn: true,
		},
	];

	const renderGardenDetail = () => {
		return (
			<Block>
				<ScrollView>
					<Block flex column>
						{TEST_GARDEN.map((item, index) => {
							if (index % 3 == 0) {
								return (
									<Block flex row>
										<LandArea
											data={TEST_GARDEN[index]}
											focus={index == selectedArea.index}
											onPress={() =>
												selectedArea.index == index
													? setSelectedArea(-1)
													: setSelectedArea({
															index: index,
															...TEST_GARDEN[index],
													  })
											}
										/>
										{index + 1 < TEST_GARDEN.length && (
											<LandArea
												data={TEST_GARDEN[index + 1]}
												focus={index + 1 == selectedArea.index}
												onPress={() =>
													selectedArea.index == index + 1
														? setSelectedArea(-1)
														: setSelectedArea({
																index: index + 1,
																...TEST_GARDEN[index + 1],
														  })
												}
											/>
										)}
										{index + 2 < TEST_GARDEN.length && (
											<LandArea
												data={TEST_GARDEN[index + 2]}
												focus={index + 2 == selectedArea.index}
												onPress={() =>
													selectedArea.index == index + 2
														? setSelectedArea(-1)
														: setSelectedArea({
																index: index + 2,
																...TEST_GARDEN[index + 2],
														  })
												}
											/>
										)}
									</Block>
								);
							}
						})}
					</Block>
				</ScrollView>
			</Block>
		);
	};

	const renderOptions = () => {
		return (
			<BottomSheet
				show={selectedArea.index != -1}
				height={290}
				onOuterClick={() => setSelectedArea({ index: -1 })}
			>
				<Block fluid safe>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Block row space="between" style={{ padding: theme.SIZES.BASE }}>
							<Block middle>
								<Text bold size={16} style={{ marginBottom: 8 }}>
									{selectedArea.humid}%
								</Text>
								<Text muted size={16}>
									Humidity
								</Text>
							</Block>
							<Block middle>
								<Text bold size={16} style={{ marginBottom: 8 }}>
									{selectedArea.temp}℃
								</Text>
								<Text muted size={16}>
									Temperature
								</Text>
							</Block>
							<Block middle>
								<Text bold size={16} style={{ marginBottom: 8 }}>
									{selectedArea.index}
								</Text>
								<Text muted size={16}>
									Area
								</Text>
							</Block>
						</Block>
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
									navigation.navigate("Garden Configuration", selectedArea)
								}
							>
								View All
							</Text>
						</Block>
						<Block
							style={{ paddingBottom: -HeaderHeight * 2, marginBottom: 10 }}
						>
							<Block
								row
								space="between"
								style={{ flexWrap: "wrap", marginBottom: 10 }}
							>
								<Text size={16} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
									Watering Schedule
								</Text>
								<Switch
									value={selectedArea.isWateringScheduleOn}
									onValueChange={() =>
										setSelectedArea((prev) => {
											return {
												...prev,
												isWateringScheduleOn:
													!selectedArea.isWateringScheduleOn,
											};
										})
									}
								/>
							</Block>
							<Block
								row
								space="between"
								style={{ flexWrap: "wrap", marginBottom: 10 }}
							>
								<Text size={16} style={{ marginBottom: theme.SIZES.BASE / 2 }}>
									Light Schedule
								</Text>
								<Switch
									value={selectedArea.isLightScheduleOn}
									onValueChange={() =>
										setSelectedArea((prev) => {
											return {
												...prev,
												isLightScheduleOn: !selectedArea.isLightScheduleOn,
											};
										})
									}
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
			{selectedArea.index >= 0 && renderOptions()}
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
