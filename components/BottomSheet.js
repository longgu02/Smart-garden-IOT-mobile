import * as React from "react";
import {
	Animated,
	Easing,
	Pressable,
	StyleSheet,
	useWindowDimensions,
	View,
	ScrollView,
} from "react-native";
import { HeaderHeight } from "../constants/utils";
import { Switch } from "react-native-gesture-handler";

import { Button, Block, Text, Input, theme } from "galio-framework";

const DEFAULT_HEIGHT = 300;

function useAnimatedBottom(show, height = DEFAULT_HEIGHT) {
	const animatedValue = React.useRef(new Animated.Value(0));

	const bottom = animatedValue.current.interpolate({
		inputRange: [0, 1],
		outputRange: [-height, 0],
	});

	React.useEffect(() => {
		if (show) {
			Animated.timing(animatedValue.current, {
				toValue: 1,
				duration: 350,
				// Accelerate then decelerate - https://cubic-bezier.com/#.28,0,.63,1
				easing: Easing.bezier(0.28, 0, 0.63, 1),
				useNativeDriver: false, // 'bottom' is not supported by native animated module
			}).start();
		} else {
			Animated.timing(animatedValue.current, {
				toValue: 0,
				duration: 250,
				// Accelerate - https://easings.net/#easeInCubic
				easing: Easing.cubic,
				useNativeDriver: false,
			}).start();
		}
	}, [show]);

	return bottom;
}
export function BottomSheet({
	children,
	show,
	height = DEFAULT_HEIGHT,
	onOuterClick,
}) {
	const { height: screenHeight } = useWindowDimensions();

	const bottom = useAnimatedBottom(show, height);

	return (
		<>
			{/* Outer semitransparent overlay - remove it if you don't want it */}
			{show && (
				<Pressable
					onPress={onOuterClick}
					style={[styles.outerOverlay, { height: screenHeight }]}
				>
					<View />
				</Pressable>
			)}
			<Animated.View style={[styles.options, { height, bottom }]}>
				{children}
				{/* <Block fluid safe>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Block row space="between" style={{ padding: theme.SIZES.BASE }}>
							<Block middle>
								<Text bold size={12} style={{ marginBottom: 8 }}>
									{15}%
								</Text>
								<Text muted size={12}>
									Humidity
								</Text>
							</Block>
							<Block middle>
								<Text bold size={12} style={{ marginBottom: 8 }}>
									{15}℃
								</Text>
								<Text muted size={12}>
									Temperature
								</Text>
							</Block>
							<Block middle>
								<Text bold size={12} style={{ marginBottom: 8 }}>
									{15}
								</Text>
								<Text muted size={12}>
									Area
								</Text>
							</Block>
						</Block>
						<Block
							row
							space="between"
							style={{ paddingVertical: 16, alignItems: "baseline" }}
						>
							<Text size={16}>Action and Schedule</Text>
							<Text
								size={12}
								color={theme.COLORS.PRIMARY}
								onPress={() => navigation.navigate("Garden Configuration")}
							>
								View All
							</Text>
						</Block>
						<Block style={{ paddingBottom: -HeaderHeight * 2 }}>
							<Block row space="between" style={{ flexWrap: "wrap" }}>
								<Text>Watering Schedule</Text>
								<Switch
									value={true}
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
							<Block row space="between" style={{ flexWrap: "wrap" }}>
								<Text>Light Schedule</Text>
								<Switch
									value={true}
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
				</Block> */}
			</Animated.View>
		</>
	);
}

const styles = StyleSheet.create({
	outerOverlay: {
		position: "absolute",
		width: "100%",
		zIndex: 1,
		backgroundColor: "black",
		opacity: 0.3,
	},
	bottomSheet: {
		position: "absolute",
		width: "100%",
		zIndex: 1,
		// Here you can set a common style for all bottom sheets, or nothing if you
		// want different designs
		backgroundColor: "dodgerblue",
		borderRadius: 16,
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
});
