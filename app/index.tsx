import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowUpIcon from "../assets/images/arrow-up.svg";
import ChatContainer from "./components/ui/chat-container";
import type Chat from "./types/chat";
import askGroq from "./utils/groq";

const DEFAULT_MESSAGES: Chat[] = [
  {
    role: "assistant",
    content: "Halo aku adalah asisten matematika kamu bernama CoMath!",
  },
];

export default function Index() {
  const { height } = useReanimatedKeyboardAnimation();
  const [messages, setMesages] = useState<Chat[]>(DEFAULT_MESSAGES);
  const [text, setText] = useState<string>("");
  const [isSendActive, setIsSendActive] = useState<boolean>(false);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: height.value }],
  }));

  const handleSend = async () => {
    setText(() => {
      setIsSendActive(false);
      return "";
    });
    const userMsg: Chat = { role: "user", content: text };
    const newHistory = [...messages, userMsg];
    setMesages(newHistory);
    const aiReply = await askGroq(newHistory);
    setMesages((prev) => [...prev, aiReply as Chat]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <ChatContainer message={item} />}
        style={styles.chatList}
        contentContainerStyle={{ gap: 8, paddingBottom: 400 }}
      />
      <Animated.View style={[styles.inputWrapper, animatedStyle]}>
        <TextInput
          value={text}
          onChangeText={(value) => {
            setText(value);
            if (!value.trim() || value === "") {
              setIsSendActive(false);
              return;
            }
            setIsSendActive(true);
          }}
          style={styles.input}
          placeholder="Ask math questions..."
        />
        <TouchableOpacity
          onPress={handleSend}
          style={isSendActive ? styles.button : { width: 0, height: 0 }}
        >
          <ArrowUpIcon />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  chatList: {
    flex: 1,
    paddingHorizontal: 12,
  },
  inputWrapper: {
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    position: "relative",
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 9999,
    fontSize: 16,
  },
  button: {
    borderRadius: 9999,
    backgroundColor: "#0A80FF",
    position: "absolute",
    width: 41,
    height: 41,
    right: 15.5,
    bottom: 3.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
