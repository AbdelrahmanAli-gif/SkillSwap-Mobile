import React from "react";
import { Button, Pressable, Text, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { StyleSheet, View } from "react-native";

const ScheduleSessionsScreen = ({ name, job, img }) => {
  return (
    <View className="flex-1">
      <View className="w-full h-[18%] items-center mt-4">
        <View className="w-4/12 items-center h-[100%]">
          <Image
            className="rounded-full w-full h-full"
            source={require("../assets/user.png")}
          ></Image>
        </View>
      </View>
      <View className="w-full items-center mt-2">
        <Text className="text-2xl font-bold">Ethan Carter</Text>
      </View>
      <View className="items-center">
        <Text className="text-[#7593B4]">Graphic Design , Photography</Text>
      </View>
      <View className="w-full flex-row justify-evenly mt-5">
        <TouchableOpacity activeOpacity={0.5} className="bg-blue-500 w-5/12 rounded-full items-center justify-center h-10">
          <Text className="text-white font-normal">Trade a skill</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} className="bg-gray-300 w-5/12 rounded-3xl items-center justify-center h-10">
          <Text className="text-black font-bold">Pay for a lesson</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default ScheduleSessionsScreen;
