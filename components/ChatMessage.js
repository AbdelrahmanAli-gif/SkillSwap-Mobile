import { View, Text } from "react-native";

export default function ChatMessage({ message, isCurrentUser, otherUserName }) {
  const bubbleBase = "px-4 py-2 rounded-2xl max-w-[80%] shadow";
  const userBubble = isCurrentUser
    ? "bg-skill-learn-bg self-end rounded-tr-none"
    : "bg-gray-300 self-start rounded-tl-none";
  // const userBubble = isCurrentUser
  //   ? "bg-gray-600/80 self-end rounded-tr-none"
  //   : "bg-gray-200 self-start rounded-tl-none";

  const textClass = isCurrentUser ? "text-white" : "text-gray-900";

  return (
    <View className={`flex ${isCurrentUser ? "items-end" : "items-start"}`}>
      <Text className="text-xs text-text-primary-light dark:text-text-primary-dark mb-1">
        {isCurrentUser ? "You" : otherUserName || "User"}
      </Text>
      <View className={`${bubbleBase} ${userBubble}`}>
        <Text className={`text-base ${textClass}`}>{message.text}</Text>
      </View>
    </View>
  );
}
