/*!

 =========================================================
 * Material Kit React Native - v1.10.1
 =========================================================
 * Product Page: https://demos.creative-tim.com/material-kit-react-native/
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit-react-native/blob/master/LICENSE)
 =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect, useCallback } from "react";
import { Platform, StatusBar, Image, Alert } from "react-native";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Images, products, materialTheme } from "./constants/";
import Screens from "./navigation/Screens";
import { Provider } from "react-redux";
import PushController from "./services/pushNoti";
// for RN >= 0.63
// in your entry file (eg. App.tsx)

import { LogBox } from "react-native";
// ignore warnings that start in a string that matchs any of
// the ones in the array
LogBox.ignoreLogs(["Require cycle:"]);
// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
import store from "./redux/store";
import { messaging } from "react-native-firebase";
enableScreens();

// cache app images
const assetImages = [
	Images.Pro,
	Images.Profile,
	Images.Avatar,
	Images.Onboarding,
];

// cache product images
products.map((product) => assetImages.push(product.image));

function cacheImages(images) {
	return images.map((image) => {
		if (typeof image === "string") {
			return Image.prefetch(image);
		} else {
			return Asset.fromModule(image).downloadAsync();
		}
	});
}

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	const requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;
		if (enabled) {
			console.log("Authorization status: ", authStatus);
		}
	};

	useEffect(() => {
		async function prepare() {
			try {
				//Load Resources
				await _loadResourcesAsync();
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}
		prepare();
	}, []);

	useEffect(() => {
		if (requestUserPermission()) {
			messaging()
				.getToken()
				.then((token) => {
					console.log(token);
				});
		} else {
			console.log("Failed token status", authStatus);
		}
		messaging()
			.getInitialNotification()
			.then(async (remoteMessage) => {
				if (remoteMessage) {
					console.log(
						"Notification caused app to open from quit state:",
						remoteMessage.notification
					);
				}
			});
		messaging().onNotificationOpenedApp((remoteMessage) => {
			console.log(
				"Notification caused app to open from background state:",
				remoteMessage.notification
			);
		});
		messaging().setBackgroundMessageHandler(async (remoteMessage) => {
			console.log("Message handled in the background!", remoteMessage);
		});
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
		});
		return unsubscribe;
	}, []);

	const _loadResourcesAsync = async () => {
		return Promise.all([...cacheImages(assetImages)]);
	};

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<NavigationContainer onReady={onLayoutRootView}>
			<Provider store={store}>
				<GalioProvider theme={materialTheme}>
					<Block flex>
						{Platform.OS === "ios" && <StatusBar barStyle="default" />}
						<Screens />
					</Block>
				</GalioProvider>
			</Provider>
			{/* <PushController /> */}
		</NavigationContainer>
	);
}
