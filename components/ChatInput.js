import { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import { useTranslation } from "react-i18next";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const { theme } = useTheme();
  const colors = themeColors(theme);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const handleSubmit = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <View className="flex-row bg-input-bg-light dark:bg-input-bg-dark rounded-full items-center mb-4 px-4 py-2 shadow-md">
      <TextInput
        className="flex-1 text-base text-text-primary-light dark:text-text-primary-dark"
        placeholder={t("ChatScreen.input")}
        placeholderTextColor={colors.colors.textSecondary}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity
        className="bg-main-color-light dark:bg-main-color-dark rounded-full p-2"
        onPress={handleSubmit}
      >
        <Feather name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
