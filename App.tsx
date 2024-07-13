import useMascotAnimation from "@hooks/useMascotAnimation";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  View,
  Text,
} from "react-native";
import Logo from "./src/assets/logo.png";
import MascotImage from "./src/assets/mascot.png"; // Assuming your mascot image path is correct
import { HomeScreen } from "@screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "@components/drawer/DrawerNavigator";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default function App() {
  const [animationCompleted, setAnimationCompleted] = useState<boolean>(false);

  const onAnimationComplete = () => {
    setAnimationCompleted(true);
  };

  const translateYAnim = useMascotAnimation(onAnimationComplete);

  return (
    <View style={styles.containerWrapper}>
      {!animationCompleted && (
        <View style={styles.container}>
          <Animated.Image
            source={MascotImage}
            style={[
              styles.mascotImage,
              {
                transform: [{ translateY: translateYAnim }],
              },
            ]}
          />
          <Image source={Logo} style={[styles.image, { width: width * 0.8 }]} />
        </View>
      )}
      {animationCompleted && (
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerWrapper: {
    flex: 1,
  },
  mascotImage: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: "contain",
  },
  image: {
    height: 200,
    resizeMode: "contain", // Set a fixed height
  },
});
