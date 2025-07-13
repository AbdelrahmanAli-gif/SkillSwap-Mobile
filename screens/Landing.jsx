import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Review from "../components/Review";
const Landing = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Ethan",
      job: "Software Engineer",
      content: "SkillSwap helped me learn to code in just a few weeks!",
      img: "u1.png",
    },
    {
      id: 2,
      name: "Sophia",
      job: "Youga Enthusiast",
      content: "I found an amazing yoga instructor through SkillSwap.",
      img: "u1.png",
    },
    {
      id: 3,
      name: "Sophia",
      job: "Youga Enthusiast",
      content: "I found an amazing yoga instructor through SkillSwap.",
      img: "u1.png",
    },
    {
      id: 4,
      name: "Sophia",
      job: "Youga Enthusiast",
      content: "I found an amazing yoga instructor through SkillSwap.",
      img: "u1.png",
    },
  ]);
  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="relative w-full" style={{ height: 450 }}>
        <Image
          className="w-full h-full"
          resizeMode="cover"
          source={require("../assets/aloo.png")}
        />

        <View className="absolute inset-0 items-center justify-center">
          <View className="w-full h-[95%] justify-evenly items-center">
            <View className="items-center">
              <Text className="text-center w-full font-extrabold text-white text-5xl">
                Unlock Your{" "}
              </Text>
              <Text className="text-center w-full font-extrabold text-white text-5xl">
                Potential : Trade{" "}
              </Text>
              <Text className="text-center w-full font-extrabold text-white text-5xl">
                Skill , Connect , and
              </Text>
              <Text className="text-center w-full font-extrabold text-white text-5xl">
                Grow{" "}
              </Text>
            </View>

            <View className="w-full items-center">
              <Text className="font-normal text-white">
                Join our community of learners and experts to
              </Text>
              <Text className="font-normal text-white">
                exchange skills, discover new passion, and achieve
              </Text>
              <Text className="font-normal text-white">your goals</Text>
            </View>

            <TouchableOpacity className="bg-blue-500 w-32 h-10 items-center justify-center rounded-lg">
              <Text className="text-white">Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <Text className="font-medium text-2xl m-3">Testimonials</Text>
      </View>
      <FlatList
        className="w-full "
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={reviews}
        renderItem={({ item }) => (
          <Review
            name={item.name}
            job={item.job}
            content={item.content}
            img={item.img}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View>
        <Text className="font-medium text-2xl m-3">Popular skills</Text>
      </View>
      <View className="w-[80%]">
        <View className="w-[90%] flex-row flex-wrap pl-4 justify-between">
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] rounded-md"><Text>Coding</Text></TouchableOpacity>
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] ml-4 rounded-md"><Text>Yoga</Text></TouchableOpacity>
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] ml-4 rounded-md"><Text>Cooking</Text></TouchableOpacity>
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] rounded-md"><Text>Photograph</Text></TouchableOpacity>
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] ml-4 rounded-md"><Text>Writing</Text></TouchableOpacity>
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] ml-4 rounded-md"><Text>Music</Text></TouchableOpacity>
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] rounded-md"><Text>Coding</Text></TouchableOpacity>
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] ml-4 rounded-md"><Text>Yoga</Text></TouchableOpacity>
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] ml-4 rounded-md"><Text>Cooking</Text></TouchableOpacity>
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] rounded-md"><Text>Photograph</Text></TouchableOpacity>
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] ml-4 rounded-md"><Text>Writing</Text></TouchableOpacity>
          <TouchableOpacity className=" items-center mt-2 w-3/12 h-[20] bg-[#c6cedb] ml-4 rounded-md"><Text>Music</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Landing;
