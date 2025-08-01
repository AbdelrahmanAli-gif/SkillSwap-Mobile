import { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getOrCreateChatRoom, markMessagesAsRead, sendMessage, subscribeToMessages } from "../utils/chatUtils";
import { useAuth } from "../contexts/AuthContext";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import GradientBackground from "../components/GradientBackground";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const route = useRoute();
  const currentUser = user.uid;
  const { otherUser } = route.params;
  const scrollRef = useRef();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const id = await getOrCreateChatRoom(currentUser, otherUser.uid);
      setChatId(id);
      const unsubscribe = subscribeToMessages(id, setMessages);
      await markMessagesAsRead(id, currentUser);
      setLoading(false);
      return () => unsubscribe();
    };
    init();
  }, [currentUser, otherUser.uid]);

  const handleSend = (text) => {
    if (chatId) sendMessage(chatId, currentUser, text);
  };

  return (
    <View className="flex-1 flex-row">
      <GradientBackground />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl text-text-primary">Loading messages...</Text>
        </View>
      ) : (
        <>
          <ImageBackground source={require("../assets/images/chat.jpg")} className="flex-1">
            <View className="p-4 bg-black border-b border-text-light flex-row justify-between items-center">
              <Text className="text-lg font-semibold text-text-primary">
                Chat with {otherUser.name}
              </Text>
            </View>
            <View className="flex-1 px-5">
              <ScrollView
                className="py-7"
                contentContainerStyle={{ rowGap: 12 }}
                showsVerticalScrollIndicator={false}
                ref={scrollRef}
                onContentSizeChange={() => {
                  scrollRef.current?.scrollToEnd({ animated: true });
                }}
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
          </ImageBackground>
        </>
      )}
    </View>
  );
}
