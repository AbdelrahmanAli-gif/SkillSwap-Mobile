import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { getOrCreateChatRoom, sendMessage, subscribeToMessages } from "../utils/chatUtils";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

export default function ChatScreen() {
  const currentUser = "mzDsZPF6pveVcKqG2WOCyydhWzF3";
  const otherUser = "b547GyxjpdVsTPgmz9bAFYHRtTP2"; // Can be replaced with user object later
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    const init = async () => {
      const id = await getOrCreateChatRoom(currentUser, otherUser);
      setChatId(id);
      const unsub = subscribeToMessages(id, setMessages);
      return () => unsub();
    };
    init();
  }, []);

  const handleSend = (text) => {
    if (chatId) sendMessage(chatId, currentUser, text);
  };

  if (!currentUser) return <Text>Loading current user...</Text>;
  if (!otherUser) return <Text>Loading chat partner...</Text>;

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
