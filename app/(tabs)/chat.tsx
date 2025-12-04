import { useFonts } from "expo-font";
import { ArrowUpIcon } from "lucide-react-native";
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
import ChatContainer from "../components/ui/chat-container";
import type Chat from "../types/chat";
import { askGroq } from "../utils/groq";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const DEFAULT_MESSAGES: Chat[] = [
  {
    role: "assistant",
    content: "Halo aku adalah asisten matematika kamu bernama CoMath!",
  },
];

export default function ChatPage() {
  const [fontsLoaded] = useFonts({
    Inter: require("../../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });
  const { height } = useReanimatedKeyboardAnimation();
  const [messages, setMesages] = useState<Chat[]>(() => {
    return DEFAULT_MESSAGES;
  });
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
    if (text === "" || !text.trim()) return;
    const userMsg: Chat = { role: "user", content: text };
    setText("");
    setIsSendActive(false);

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
        contentContainerStyle={{ padding: 6, paddingBottom: 450, gap: 0 }}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((msg, idx) => (
          <ChatContainer key={idx} message={msg} />
        ))}
      </ScrollView>

      <Animated.View style={[styles.inputWrapper]}>
        <Animated.View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: "7.5%",
          }}
        >
          <AnimatedTextInput
            value={text}
            onChangeText={(value) => {
              setText(value);
              setIsSendActive(!!value.trim());
            }}
            style={[styles.input, animatedInputWrapper, animatedStyle]}
            placeholder="Ask math questions..."
            onFocus={() => {
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
                inputWidth.set(100);
              }, 80);
            }}
            onBlur={() => {
              inputWidth.set(text.trim().length === 0 ? 75 : 100);
            }}
          />

          <AnimatedTouchableOpacity
            onPress={handleSend}
            style={[styles.button, animatedStyle]}
          >
            <ArrowUpIcon color={"white"} size={18} />
          </AnimatedTouchableOpacity>
        </Animated.View>
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
    paddingTop: 12,
    borderColor: "rgba(0, 0, 0, 0.1)",
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.9,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 9999,
    fontSize: 16,
  },

  button: {
    borderRadius: 9999,
    backgroundColor: "#0A80FF",
    width: 40,
    height: 40,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
