import type Chat from "@/app/types/chat";
import { StyleSheet, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";

export default function ChatContainer({ message }: { message: Chat }) {
  return (
    <View style={styles[`${message.role}Container`]}>
      {message.role === "assistant" ? (
        <Markdown style={markdownStyles}>{message.content}</Markdown>
      ) : (
        <Text style={styles.userText}>{message.content}</Text>
      )}
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
    paddingHorizontal: 14,
  },
  userText: {
    color: "#fff",
    fontSize: 16,
  },
  assistantContainer: {
    padding: 12,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    marginRight: "auto",
  },
  assistantText: {
    color: "#000",
    fontSize: 16,
  },
});

// 🎉 Variable ini kamu declare di sini
const markdownStyles: Record<string, any> = {
  body: {
    color: "#000",
    fontSize: 16,
  },
  strong: {
    fontWeight: "bold",
  },
  em: {
    fontStyle: "italic",
  },
  code_block: {
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 8,
    fontFamily: "monospace",
  },
  code_inline: {
    backgroundColor: "#EEE",
    padding: 4,
    borderRadius: 6,
    fontFamily: "monospace",
  },
};
