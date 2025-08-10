import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

export default function ChatMessage({ message, isCurrentUser, otherUserName }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const bubbleBase = "px-4 py-2 rounded-2xl max-w-[80%] shadow";
  const userBubble = isCurrentUser
    ? "bg-skill-learn-bg self-end rounded-tr-none"
    : "bg-gray-300 self-start rounded-tl-none";

  const textClass = isCurrentUser ? "text-white" : "text-gray-900";

  return (
    <View className={`flex ${isCurrentUser ? "items-end" : "items-start"}`}>
      <Text className="text-xs text-text-primary-light dark:text-text-primary-dark mb-1">
        {isCurrentUser ? t("ChatScreen.you") : otherUserName}
      </Text>
      <View className={`${bubbleBase} ${userBubble}`}>
        <Text className={`text-base ${textClass}`}>{message.text}</Text>
      </View>
    </View>
  );
}
