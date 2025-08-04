import React from "react";
import { StyleSheet, View, Image, Text,ScrollView, ProgressBarAndroidBase } from "react-native";
import SkillsIoffer from "../components/SkillsIoffer";
import { useAuth } from "../contexts/AuthContext";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import * as Progress from 'react-native-progress';
import Reviews from "../components/Reviews";
const ProfileScreen = () => {
  const{user}=useAuth()
  return (
    <ScrollView className="flex-1 bg-[#F7FBFD] relative ">
      <View className="h-[300] justify-evenly ">
        <View className="w-full h-[40%] items-center ">
          <View className="w-[30%] items-center h-[100%]">
            <Image
              className="rounded-full w-full h-full"
              source={require("../assets/sief.jpg")}
            ></Image>
          </View>
        </View>
        <View className="w-full items-center ">
          <Text className="font-bold text-2xl">Ethan Carter</Text>
          <Text className="text-[#6185A8] text-lg">Skill Trader</Text>
        </View>
        <View className="w-full items-center ">
          <Text className="w-[80%] text-xl text-center font-normal">
            Passionate about learning and sharing knowledge. Open to new
            experiences and collaborations.
          </Text>
        </View>
      </View>
      <View className="pl-3 w-full mt-2">
        <Text className="text-2xl font-semibold">Skills I Offer</Text>
      </View>
      <View className="w-full items-center mt-5 ">
        <SkillsIoffer/>
        <SkillsIoffer/>
        <SkillsIoffer/>
        <SkillsIoffer/> 
        <SkillsIoffer/>  
        <SkillsIoffer/>
        <SkillsIoffer/> <SkillsIoffer/>
        <SkillsIoffer/>
      </View>
      <View className="pl-3 w-full mt-2">
        <Text className="text-2xl font-semibold">Skills I Want to Learn</Text>
      </View>
      <View className="w-full items-center mt-5 ">
        <SkillsIoffer skillType={false} />
        <SkillsIoffer skillType={false}/>
        <SkillsIoffer skillType={false}/>
        <SkillsIoffer skillType={false} /> 
        <SkillsIoffer skillType={false}/>  
        <SkillsIoffer skillType={false}/>
        <SkillsIoffer skillType={false}/> 
        <SkillsIoffer skillType={false}/>
      </View>
      <View className="pl-3 w-full mt-2">
        <Text className="text-2xl font-semibold">Ratings & Reviews</Text>
      </View>
      <View className="w-full mt-5 flex-row justify-between">
        <View className="w-4/12 ">
          <View className="w-full items-center">
            <Text className="text-3xl font-semibold">4.8</Text>
          </View>
          {/* {
            user.rating==5?(
              <View className="w-full flex-row justify-evenly ml-2 mt-2">
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
            </View>
          ):user.rating<5&&user.rating>=4 ? (
                <View className="w-full flex-row justify-evenly ml-2 mt-2">
                <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
                <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
                <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
                <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
                <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              </View>
            ) : user.rating<4&&user.rating>=3 ? (
              <View className="w-full flex-row justify-evenly ml-2 mt-2">
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
            </View>
          ):user.rating<3&&user.rating>=2 ? (
            <View className="w-full flex-row justify-evenly ml-2 mt-2">
            <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
            <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
            <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
            <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
            <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
          </View>
        ):user.rating<2&&user.rating>=1 ? (
          <View className="w-full flex-row justify-evenly ml-2 mt-2">
          <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
          <FontAwesome6Icon   size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
          <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
          <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
          <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
        </View>
      ):(
        <View className="w-full flex-row justify-evenly ml-2 mt-2">
        <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
        <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
        <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
        <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
        <FontAwesome6Icon  size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
      </View>
    )
          } */}
            <View className="w-full flex-row justify-evenly ml-2 mt-2">
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
              <FontAwesome6Icon solid size={15} color={"#6185A8"} name="star"></FontAwesome6Icon>
            </View>
          <View className="w-full items-center mt-2">
            <Text className="text-lg font-normal">
              25 Reviews
            </Text>
          </View>
        </View>
        <View className="w-8/12  ">
          <View className="w-full flex-row justify-evenly  ">
            <Text className="mr-1">5</Text>
          <Progress.Bar  className="h-[10] mt-1" height={10}  width={150} progress={0.7}/>
          <Text >70%</Text>
          </View>
          <View className="w-full flex-row justify-evenly mt-2 ">
            <Text className="mr-1">4</Text>
          <Progress.Bar  className="h-[10] mt-1" height={10}  width={150} progress={0.2}/>
          <Text >20%</Text>
          </View>
          <View className="w-full flex-row justify-evenly mt-2 ">
            <Text className="mr-1">3</Text>
          <Progress.Bar  className="h-[10] mt-1" height={10}  width={150} progress={0.06}/>
          <Text >20%</Text>
          </View>
          <View className="w-full flex-row justify-evenly mt-2 ">
            <Text className="mr-1">2</Text>
          <Progress.Bar  className="h-[10] mt-1" height={10}  width={150} progress={0.05}/>
          <Text >20%</Text>
          </View>
          <View className="w-full flex-row justify-evenly mt-2 ">
            <Text className="mr-1">1</Text>
          <Progress.Bar  className="h-[10] mt-1" height={10}  width={150} progress={0.02}/>
          <Text >20%</Text>
          </View>
         
        </View>
      </View>
      <View className="w-ful mt-4">
        {/* {
          user.reviews.map((r)=>{
            <Reviews key={r.reviewId} name={r.authorName} content={r.text} rating={r.rating}/>
          })
        } */}
        <Reviews rating={1}></Reviews>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
