import { View, Text, StyleSheet } from 'react-native';

export default function ChatMessage({ message, isCurrentUser, otherUserName }) {
  return (
    <View style={[
      styles.container,
      isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
    ]}>
      {/* Display name */}
      <Text style={styles.userName}>
        {isCurrentUser ? "You" : otherUserName || "User"}
      </Text>

      {/* Message bubble */}
      <View style={[
        styles.messageBubble,
        isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
      ]}>
        <Text style={isCurrentUser ? styles.currentUserText : styles.otherUserText}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  currentUserContainer: {
    alignItems: 'flex-end',
  },
  otherUserContainer: {
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: 12,
    color: '#6b7280', // equivalent to text-gray-500
    marginBottom: 4,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    maxWidth: '70%',
    backgroundColor:"red"
  },
  currentUserBubble: {
    backgroundColor: 'red', // Replace with your actual color
  },
  otherUserBubble: {
    backgroundColor: 'var(--color-skill-learn-bg)', // Replace with your actual color
  },
  currentUserText: {
    color: 'white', // Assuming light text on your teach background
  },
  otherUserText: {
    color: 'black',
  },
});