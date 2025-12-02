import Constants from "expo-constants";
import Groq from "groq-sdk";
import type Chat from "../types/chat";

const apiKey = Constants.expoConfig?.extra?.GROQ_API_KEY;

export const groq = new Groq({ apiKey });

const askGroq = async (messages: Chat[]) => {
  const chatCompletion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: messages,
  });

  return chatCompletion.choices[0].message;
};

export default askGroq;
