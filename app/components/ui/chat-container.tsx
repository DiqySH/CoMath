import type Chat from "@/app/types/chat";
import { StyleSheet, Text, View } from "react-native";

export default function ChatContainer({ message }: { message: Chat }) {
  return (
    <View style={styles[`${message.role}Container`]}>
      <Text style={styles[`${message.role}Text`]}>{message.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: "#0A80FF",
    maxWidth: "75%",
    marginLeft: "auto",
    padding: 12,
    borderRadius: 12,
    borderTopRightRadius: 0,
  },
  userText: {
    color: "#fff",
    fontSize: 16,
  },
  assistantContainer: {},
  assistantText: {
    color: "#000",
    fontSize: 16,
  },
});
