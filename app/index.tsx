import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowUpIcon from "../assets/images/arrow-up.svg";
import ChatContainer from "./components/ui/chat-container";
import type Chat from "./types/chat";
import { askGroq } from "./utils/groq";

const DEFAULT_MESSAGES: Chat[] = [
  {
    role: "assistant",
    content: "Halo aku adalah asisten matematika kamu bernama CoMath!",
  },
];

export default function Index() {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });
  const { height } = useReanimatedKeyboardAnimation();
  const [messages, setMesages] = useState<Chat[]>(DEFAULT_MESSAGES);
  const [text, setText] = useState<string>("");
  const scrollViewRef = useRef<ScrollView>(null);
  const [isSendActive, setIsSendActive] = useState<boolean>(false);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: height.value }],
  }));
  const inputWidth = useSharedValue(75);
  const animatedInputWrapper = useAnimatedStyle(() => ({
    width: withTiming(`${inputWidth.value}%`, { duration: 250 }),
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

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 80);
  }, [messages]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatList}
        contentContainerStyle={{ padding: 6, paddingBottom: 400, gap: 0 }}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg, idx) => (
          <ChatContainer key={idx} message={msg} />
        ))}
      </ScrollView>

      <Animated.View
        style={[styles.inputWrapper, animatedStyle, animatedInputWrapper]}
      >
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
          onFocus={() => {
            setTimeout(() => {
              scrollViewRef.current?.scrollToEnd({ animated: true });
              inputWidth.set(100);
            }, 80);
          }}
          onBlur={() => {
            if (text.trim().length === 0) {
              inputWidth.set(75);
            } else {
              inputWidth.set(100);
            }
          }}
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
  container: { flex: 1, backgroundColor: "#fff", fontFamily: "Inter" },
  chatList: {
    flex: 1,
    paddingHorizontal: 12,
  },
  inputWrapper: {
    paddingHorizontal: 14,
    borderColor: "#ccc",
    position: "relative",
    marginHorizontal: "auto",
    width: "100%",
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
    right: 17,
    bottom: 3.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
