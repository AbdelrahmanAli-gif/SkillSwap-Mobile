import { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getOrCreateChatRoom, markMessagesAsRead, sendMessage, subscribeToMessages } from "../utils/chatUtils";
import { useAuth } from "../contexts/AuthContext";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import GradientBackground from "../components/GradientBackground";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ChatScreen() {
  const route = useRoute();
  const scrollRef = useRef();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { otherUser } = route.params;
  const currentUser = user.uid;
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

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
    <View className="flex-1 flex-row" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <GradientBackground />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl text-text-primary-light dark:text-text-primary-dark">{t("ChatScreen.loading")}</Text>
        </View>
      ) : (
        <View className="flex-1">
          <View className="p-4 border-b border-text-light-light dark:border-text-light-dark bg-input-bg-light dark:bg-input-bg-dark flex-row justify-between items-center">
            <Text className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
              {t("ChatScreen.title")} {otherUser.name}
            </Text>
          </View>
          <ImageBackground source={theme === "dark" ? require('../assets/images/chat-dark.jpg') : require('../assets/images/chat-light.jpeg')} className="flex-1">
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
        </View>
      )}
    </View>
  );
}
