import React from "react";
import {
  Button,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native";
import { StyleSheet, View } from "react-native";
import DropdownComponent from "../components/DropdownComponent";

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
        <TouchableOpacity
          activeOpacity={0.5}
          className="bg-blue-500 w-5/12 rounded-full items-center justify-center h-12"
        >
          <Text className="text-white font-normal text-lg">Trade a skill</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          className="bg-gray-300 w-5/12 rounded-3xl items-center justify-center h-12"
        >
          <Text className="text-black font-bold text-lg">Pay for a lesson</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-3 ">
        <DropdownComponent></DropdownComponent>
      </View>
      <View className="w-full mt-3 items-center h-[7%]">
        <View className="w-[94%]  items-center h-full">
          <TextInput
            placeholderTextColor={"#7593B4"}
            placeholder="Propose a time"
            className="bg-gray-100 w-full rounded-lg border  h-full border-[#7593B4] placeholder:text-xl"
          ></TextInput>
        </View>
      </View>
      <View className="w-full mt-6 items-center h-[20%] ">
        <View className="w-[94%]  items-center h-full">
          <TextInput
            textAlignVertical="top"
            multiline={true}
            placeholderTextColor={"#7593B4"}
            placeholder="Add a note"
            className="bg-gray-100 w-full rounded-lg border  h-full border-[#7593B4] placeholder:text-xl "
          ></TextInput>
        </View>
      </View>
      <View className="w-[100%] items-center h-[6%] mt-9 ">
        <TouchableOpacity  activeOpacity={0.6} className="w-[94%] bg-blue-500 rounded-full items-center h-full justify-center">
          <Text className="text-white font-normal text-lg">Send Trade Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});

export default ScheduleSessionsScreen;
