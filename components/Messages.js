import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { getUserById } from "../utils/usersCollection";
import { useNavigation } from "@react-navigation/native";

const Messages = ({ chat, unreadCount }) => {
  const [otherUser, setOtherUser] = useState({});
  const { user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      const otherUserId = chat.participants.find((id) => id !== user.uid);
      const otherUser = await getUserById(otherUserId);
      setOtherUser(otherUser);
    };
    getUser();
  }, [chat]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Chat", { otherUser })}
      className="w-full flex-row mt-5 py-2 bg-gray-950/35 rounded-full"
    >
      <View className="flex-row justify-between items-center w-full">
        <View className="flex-row items-center">
          {otherUser.profilePicture ? (
            <Image
              className="rounded-full w-[55px] h-[55px]"
              source={{ uri: otherUser.profilePicture }}
            />
          ) : (
            <View className="bg-gray-400 rounded-full w-[55px] h-[55px] items-center justify-center">
              <Text className="text-white text-center text-3xl">
                {otherUser.name?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View className="ml-3">
            <Text className="font-medium text-lg text-text-primary">{otherUser.name}</Text>
            <Text numberOfLines={1} className="text-text-secondary max-w-[200px]">
              {chat.lastMessage?.text}
            </Text>
          </View>
        </View>

        {unreadCount > 0 && (
          <View className="bg-red-500 rounded-full w-6 h-6 items-center justify-center mr-2">
            <Text className="text-white text-xs font-bold">{unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Messages;
