import { StyleSheet } from "react-native";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import ChatScreen from "./ChatScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <ChatScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});
