import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Messages = ({ userName, img, content, time }) => {
  return (
    <View className="w-full flex-row mt-3  ">
      <View className="w-9/12 flex-row">
        <View >
            <Image className="rounded-full w-[55px] h-[55px]" source={img? require(`../assets/u1.png`):require("../assets/icon.png")}></Image>
        </View>
        <View className="ml-3 flex">
            <Text className="font-medium text-lg">{userName}</Text>
            <Text numberOfLines={2} className="text-slate-500">{content}</Text>
        </View>
        <View className="w-1/12 ">
        <Text>{time}</Text>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Messages;
