import { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, StyleSheet, TextInput } from "react-native";
import {
  getOrCreateChatRoom,
  sendMessage,
  subscribeToMessages,
} from "../utils/chatUtils";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "./ChatInput";
export default function ChatScreen() {
 const currentUser="mzDsZPF6pveVcKqG2WOCyydhWzF3"
 const otherUser="b547GyxjpdVsTPgmz9bAFYHRtTP2"
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
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Chat with {otherUser.name}</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>🔙 Back</Text>
          </TouchableOpacity>
        </View>

        {/* Messages */}
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
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
    

        {/* Input */}
       <ChatInput onSend={handleSend} />
      </View>

      {/* Sidebar */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: 'var(--input-bg)', // Replace with actual color
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937', // gray-900 equivalent
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#d1d5db', // gray-300 equivalent
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  backButtonText: {
    color: 'var(--color-text-light)', // Replace with actual color
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 28,
  },
  scrollContent: {
    gap: 12,
  },
});