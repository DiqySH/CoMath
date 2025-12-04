import { Tabs } from "expo-router";
import { Bot, Calculator, Home } from "lucide-react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function TabLayout() {
  return (
    <KeyboardProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { borderTopColor: "rgba(0, 0, 0, 0.1)" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => (
              <Home color={color} size={size} strokeWidth={1.5} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => (
              <Bot color={color} size={size} strokeWidth={1.5} />
            ),
          }}
        />
        <Tabs.Screen
          name="calculator"
          options={{
            title: "",
            tabBarIcon: ({ color, size }) => (
              <Calculator color={color} size={size} strokeWidth={1.5} />
            ),
          }}
        />
      </Tabs>
    </KeyboardProvider>
  );
}
