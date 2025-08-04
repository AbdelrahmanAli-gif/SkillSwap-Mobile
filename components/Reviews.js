import React from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
const Reviews = ({name,rating,content,img}) => {
  return (
    <View className="h-fit w-full mt-4 ">
      <View className="w-full flex-row">
        <View className="w-[50] h-[50] rounded-3xl ml-2">
          <Image
            className=" rounded-full w-full h-full "
            source={require("../assets/sief.jpg")}
          ></Image>
        </View>
        <View className="ml-2">
          <Text className="font-bold">Sophie bernat</Text>
          <Text className="mt-1 text-gray-600">2 weeks ago</Text>
        </View>
      </View>
      {
        rating==5?(
          <View className="w-3/12 flex-row justify-evenly ml-3 mt-2">
          <FontAwesome6Icon
            solid
            size={16}
            color={"#6185A8"}
            name="star"
          ></FontAwesome6Icon>
          <FontAwesome6Icon
            solid
            size={16}
            color={"#6185A8"}
            name="star"
          ></FontAwesome6Icon>
          <FontAwesome6Icon
            solid
            size={16}
            color={"#6185A8"}
            name="star"
          ></FontAwesome6Icon>
          <FontAwesome6Icon
            solid
            size={16}
            color={"#6185A8"}
            name="star"
          ></FontAwesome6Icon>
          <FontAwesome6Icon
            solid
            size={16}
            color={"#6185A8"}
            name="star"
          ></FontAwesome6Icon>
        </View>
        )
        :rating<5&&rating>=4 ? (
            <View className="w-3/12 flex-row justify-evenly ml-3 mt-2">
            <FontAwesome6Icon
              solid
              size={16}
              color={"#6185A8"}
              name="star"
            ></FontAwesome6Icon>
            <FontAwesome6Icon
              solid
              size={16}
              color={"#6185A8"}
              name="star"
            ></FontAwesome6Icon>
            <FontAwesome6Icon
              solid
              size={16}
              color={"#6185A8"}
              name="star"
            ></FontAwesome6Icon>
            <FontAwesome6Icon
              solid
              size={16}
              color={"#6185A8"}
              name="star"
            ></FontAwesome6Icon>
            <FontAwesome6Icon
              size={16}
              color={"#6185A8"}
              name="star"
            ></FontAwesome6Icon>
          </View>
        ) : rating<4&&rating>=3 ? (
          <View className="w-3/12 flex-row justify-evenly ml-3 mt-2">
          <FontAwesome6Icon
            solid
            size={16}
            color={"#6185A8"}
            name="star"
          ></FontAwesome6Icon>
          <FontAwesome6Icon
            solid
            size={16}
            color={"#6185A8"}
            name="star"
          ></FontAwesome6Icon>
          <FontAwesome6Icon
            solid
            size={16}
            color={"#6185A8"}
            name="star"
          ></FontAwesome6Icon>
          <FontAwesome6Icon
            size={16}
            color={"#6185A8"}
            name="star"
          ></FontAwesome6Icon>
          <FontAwesome6Icon
            size={16}
            color={"#6185A8"}
            name="star"
          ></FontAwesome6Icon>
        </View>
      ):rating<3&&rating>=2 ? (
        <View className="w-3/12 flex-row justify-evenly ml-3 mt-2">
        <FontAwesome6Icon
          solid
          size={16}
          color={"#6185A8"}
          name="star"
        ></FontAwesome6Icon>
        <FontAwesome6Icon
          solid
          size={16}
          color={"#6185A8"}
          name="star"
        ></FontAwesome6Icon>
        <FontAwesome6Icon
          size={16}
          color={"#6185A8"}
          name="star"
        ></FontAwesome6Icon>
        <FontAwesome6Icon
          size={16}
          color={"#6185A8"}
          name="star"
        ></FontAwesome6Icon>
        <FontAwesome6Icon
          size={16}
          color={"#6185A8"}
          name="star"
        ></FontAwesome6Icon>
      </View>
    ):rating<2&&rating>=1 ? (
      <View className="w-3/12 flex-row justify-evenly ml-3 mt-2">
      <FontAwesome6Icon
        solid
        size={16}
        color={"#6185A8"}
        name="star"
      ></FontAwesome6Icon>
      <FontAwesome6Icon
        size={16}
        color={"#6185A8"}
        name="star"
      ></FontAwesome6Icon>
      <FontAwesome6Icon
        size={16}
        color={"#6185A8"}
        name="star"
      ></FontAwesome6Icon>
      <FontAwesome6Icon
        size={16}
        color={"#6185A8"}
        name="star"
      ></FontAwesome6Icon>
      <FontAwesome6Icon
        size={16}
        color={"#6185A8"}
        name="star"
      ></FontAwesome6Icon>
    </View>
  ):(
    <View className="w-3/12 flex-row justify-evenly ml-3 mt-2">
    <FontAwesome6Icon
      size={16}
      color={"#6185A8"}
      name="star"
    ></FontAwesome6Icon>
    <FontAwesome6Icon
      size={16}
      color={"#6185A8"}
      name="star"
    ></FontAwesome6Icon>
    <FontAwesome6Icon
      size={16}
      color={"#6185A8"}
      name="star"
    ></FontAwesome6Icon>
    <FontAwesome6Icon
      size={16}
      color={"#6185A8"}
      name="star"
    ></FontAwesome6Icon>
    <FontAwesome6Icon
      size={16}
      color={"#6185A8"}
      name="star"
    ></FontAwesome6Icon>
  </View>
)
      }
     
      <View className="pl-4 mt-2">
        <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Reviews;
