import axios from "axios";

const sendChatRequest = async (message) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPEN_API_KEY}`,
        },
      }
    );

    return response?.data?.choices[0]?.message?.content;
  } catch (error) {
    console.error("Error sending chat request:", error);
  }
};
export default sendChatRequest;
