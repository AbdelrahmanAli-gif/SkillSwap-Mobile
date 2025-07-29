import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { theme } from "../theme";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <View className="flex-row bg-input-bg rounded-full items-center mb-4 px-4 py-2 shadow-md">
      <TextInput
        className="flex-1 text-base text-text-primary"
        placeholder="Type a message..."
        placeholderTextColor={theme.colors.textSecondary}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity
        className="bg-main-color rounded-full p-2"
        onPress={handleSubmit}
      >
        <Feather name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
