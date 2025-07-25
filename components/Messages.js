import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { getUserById } from "../utils/usersCollection";

const Messages = ({ chat }) => {
  const { userName, content, time, img } = chat;
  const [otherUser, setOtherUser] = useState(null);
  const { user } = useAuth();
  console.log("user", user);

  useEffect(() => {
    const getUser = async () => {
      const otherUserId = chat.participants.find((id) => id !== user.uid);
      const otherUser = await getUserById(otherUserId);
      setOtherUser(otherUser);
    };
    getUser();
  }, [chat]);

  console.log("otherUser", otherUser);

  return (
    <View className="w-full flex-row mt-5  ">
      <View className="w-9/12 flex-row">
        <View>
          <Image className="rounded-full w-[55px] h-[55px]" source={img ? require(`../assets/u1.png`) : require("../assets/icon.png")}></Image>
        </View>
        <View className="ml-3 flex">
          <Text className="font-medium text-lg">{userName}</Text>
          <Text numberOfLines={1} className="text-slate-500">{content}</Text>
        </View>
        <View className="w-1/12 ">
          <Text>{time}</Text>
        </View>
      </View>
    </View>
  );
};

export default Messages;
