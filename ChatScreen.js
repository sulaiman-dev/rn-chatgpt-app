import React, { useState, useRef } from "react";
import {
  ScrollView,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  View,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import sendChatRequest from "./sendChatRequest";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const scrollViewRef = useRef();

  const sendChatMessage = async () => {
    // Add user message to the conversation
    setConversation((prevConversation) => [
      ...prevConversation,
      { role: "user", content: message },
    ]);

    // Send the user message to ChatGPT API
    const response = await sendChatRequest(message);

    if (response) {
      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "assistant", content: response },
      ]);
    }
    // Clear the input field
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
        style={styles.chatArea}
      >
        {conversation.map((msg, index) => (
          <Card
            key={index}
            style={msg.role === "user" ? styles.userMessage : styles.botMessage}
          >
            <Card.Content>
              <Title>{msg.role}</Title>
              <Paragraph>{msg.content}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendChatMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatArea: {
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginRight: 16,
    padding: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  userMessage: {
    textAlign: "right",
    color: "blue",
    marginBottom: 8,
  },
  botMessage: {
    textAlign: "left",
    color: "green",
    marginBottom: 8,
  },
});

export default ChatScreen;
