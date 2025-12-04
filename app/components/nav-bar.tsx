import { router, usePathname } from "expo-router";
import { Bot, Calculator, Home } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <View style={[styles.nav, { paddingBottom: 24 }]}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Home opacity={0.7} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/chat")}>
        <Bot />
      </TouchableOpacity>
      <TouchableOpacity>
        <Calculator />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    borderTopWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 12,
  },
});
