# 📘 Co Math AI

Aplikasi pembelajaran matematika berbasis **AI** yang dibangun dengan
**React Native (Expo)**.\
Aplikasi ini membantu pengguna mengerjakan soal matematika dengan cepat
menggunakan teknologi AI, sekaligus memberikan langkah-langkah
penyelesaian yang mudah dipahami.

## ✨ Fitur Utama

- 🔢 **Solve Math Problem** -- Pengguna dapat memasukkan soal
  matematika dan AI akan memberikan jawabannya.
- 🧠 **Penjelasan Langkah demi Langkah** -- Aplikasi menampilkan cara
  pengerjaan.
- 📷 **Scan Soal (optional)** -- Jika diimplementasikan.
- ⚡ **UI Sederhana & Cepat** -- Dibangun dengan React Native dan
  Expo.

## 🛠️ Teknologi yang Digunakan

- React Native (Expo)
- JavaScript / TypeScript
- Expo Router
- OpenAI / Gemini / API AI lainnya
- Axios / fetch API

## 🚀 Cara Menjalankan Project

### 1️⃣ Clone Repository

    git clone https://github.com/username/comath-ai.git
    cd comath-ai

### 2️⃣ Install Dependencies

    npm install

### 3️⃣ Jalankan Expo

    npx expo start

### 4️⃣ Scan QR Code

Gunakan aplikasi **Expo Go** di Android/iOS.

## 🔑 Setup API Key

Buat file `.env`:

    AI_API_KEY=YOUR_API_KEY_HERE

## 📂 Struktur Folder

    comath-ai/
    │── app/
    │── components/
    │── hooks/
    │── services/
    │── assets/
    │── .env
    │── App.tsx
    │── package.json

## 📡 Contoh Request ke API

```js
import axios from "axios";

export async function solveMath(question) {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a math solver AI." },
        { role: "user", content: `Solve this math problem: ${question}` },
      ],
    },
    {
      headers: { Authorization: `Bearer ${process.env.AI_API_KEY}` },
    }
  );

  return response.data.choices[0].message.content;
}
```

## 🧑‍🏫 Tujuan Pembuatan

Project ini dibuat untuk tugas sekolah, sebagai media pembelajaran AI
dan React Native.

## 📄 Lisensi

Bebas digunakan dan dimodifikasi.
