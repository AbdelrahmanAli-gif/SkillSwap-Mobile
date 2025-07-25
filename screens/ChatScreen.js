import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getOrCreateChatRoom, sendMessage, subscribeToMessages } from "../utils/chatUtils";
import { useAuth } from "../contexts/AuthContext";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const route = useRoute();
  const currentUser = user.uid;
  const { otherUser } = route.params;

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const id = await getOrCreateChatRoom(currentUser, otherUser.uid);
      setChatId(id);
      const unsubscribe = subscribeToMessages(id, setMessages);
      setLoading(false);
      return () => unsubscribe();
    };
    init();
  }, [currentUser, otherUser.uid]);

  const handleSend = (text) => {
    if (chatId) sendMessage(chatId, currentUser, text);
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 flex-row bg-white">
      <View className="flex-1 px-5">
        <View className="bg-gray-100 p-4 border-b border-gray-900 flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-black">
            Chat with {otherUser.name || "User"}
          </Text>
        </View>

        <ScrollView
          className="py-7"
          contentContainerStyle={{ rowGap: 12 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isCurrentUser={msg.senderId === currentUser}
              otherUserName={otherUser.name}
            />
          ))}
        </ScrollView>

        <ChatInput onSend={handleSend} />
      </View>
    </View>
  );
}
