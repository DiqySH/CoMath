import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Navbar from "./components/nav-bar";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <Navbar />
      </View>
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70,
    position: "relative",
  },
});
