import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Background pattern */}
      <View style={styles.topBg} />

      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Image source={logo} style={styles.logo} />
        </View>

        {/* Title */}
        <Text style={styles.title}>CoMath AI</Text>

        {/* Description */}
        <Text style={styles.desc}>
          AI cerdas untuk menjawab pertanyaan dan membantu berbagai kebutuhanmu
          secara cepat dan akurat.
        </Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/chat")}
        >
          <Text style={styles.buttonText}>START CHAT →</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>CoMath AI</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f6cd3",
    justifyContent: "space-between",
  },

  topBg: {
    position: "absolute",
    top: 0,
    height: "55%",
    width: "100%",
    backgroundColor: "#2969b0",
    opacity: 0.3,
  },

  content: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 20,
  },

  logoWrapper: {
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
  },

  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
  },

  desc: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    width: "85%",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#003f91",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 4,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  footer: {
    textAlign: "center",
    paddingBottom: 20,
    color: "white",
    fontWeight: "700",
  },
});
