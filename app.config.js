import "dotenv/config";

export default {
  expo: {
    name: "CoMath",
    slug: "CoMath",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "comath",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    extra: {
      GROQ_API_KEY: process.env.GROQ_API_KEY,
      eas: {
        projectId: "893f1dd3-d844-4068-a682-d2de70d8aa95",
      },
    },

    ios: {
      supportsTablet: true,
      infoPlist: {
        NSMicrophoneUsageDescription:
          "Aplikasi membutuhkan akses mikrofon untuk voice input.",
      },
    },

    android: {
      package: "com.diqyyahmad.CoMath",
      permissions: ["RECORD_AUDIO"],
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },

    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      "expo-font",
    ],

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
