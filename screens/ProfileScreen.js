import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  ProgressBarAndroidBase,
} from "react-native";
import SkillsIoffer from "../components/SkillsIoffer";
import { useAuth } from "../contexts/AuthContext";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import * as Progress from "react-native-progress";
import Reviews from "../components/Reviews";
import { doc, getDoc, getFirestore } from "firebase/firestore";
const ProfileScreen = () => {
  const [userState, setUserState] = useState({});
  const { user } = useAuth();
  const fiveStarsReview=(user.reviews.filter((r)=> r.rating==5).length/user.reviews.length)*100
  const fourStarsReview=(user.reviews.filter((r)=> r.rating==4).length/user.reviews.length)*100
  const threeStartReview=(user.reviews.filter((r)=> r.rating==3).length/user.reviews.length)*100
  const twoStarReview=(user.reviews.filter((r)=> r.rating==2).length/user.reviews.length)*100
  const oneStarReview=(user.reviews.filter((r)=> r.rating==1).length/user.reviews.length)*100
  useEffect(() => {
    const fetchUser = async () => {
      const db = getFirestore();
      const userId = user.uid;
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      setUserState(userSnap.data());
    };
    fetchUser();
  }, []);

  return (
    <ScrollView className="flex-1 bg-[#F7FBFD] relative ">
      <View className="h-[300] justify-evenly ">
        <View className="w-full h-[40%] items-center ">
          <View className="w-[30%] items-center h-[100%]">
            <Image
              className="rounded-full w-full h-full"
              source={{uri:userState.profilePicture}}
            ></Image>
          </View>
        </View>
        <View className="w-full items-center ">
          <Text className="font-bold text-2xl">{userState.name}</Text>
          <Text className="text-[#6185A8] text-lg">Skill Trader</Text>
        </View>
        <View className="w-full items-center ">
          <Text className="w-[80%] text-xl text-center font-normal">
            {userState.bio}
          </Text>
        </View>
      </View>
      <View className="pl-3 w-full mt-2">
        <Text className="text-2xl font-semibold">Skills I Offer</Text>
      </View>
      <View className="w-full items-center mt-5 ">
        {userState.hasSkills?.map((s) => (
          <SkillsIoffer
            user={user}
            key={s.skillId}
            skill={s.skillName}
            skillType={true}
          />
        ))}
      </View>
      <View className="pl-3 w-full mt-2">
        <Text className="text-2xl font-semibold">Skills I Want to Learn</Text>
      </View>
      <View className="w-full items-center mt-5 ">
        {userState.needSkills?.map((s) => (
          <SkillsIoffer
            user={user}
            key={s.skillId}
            skill={s.skillName}
            skillType={false}
          />
        ))}
      </View>
      <View className="pl-3 w-full mt-2">
        <Text className="text-2xl font-semibold">Ratings & Reviews</Text>
      </View>
      <View className="w-full mt-5 flex-row justify-between">
        <View className="w-4/12 ">
          <View className="w-full items-center">
            <Text className="text-3xl font-semibold">
              {userState.rating ? userState.rating : 0}
            </Text>
          </View>
          {userState.rating == 5 ? (
            <View className="w-full flex-row justify-evenly ml-2 mt-2">
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
            </View>
          ) : userState.rating < 5 && userState.rating >= 4 ? (
            <View className="w-full flex-row justify-evenly ml-2 mt-2">
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
            </View>
          ) : userState.rating < 4 && userState.rating >= 3 ? (
            <View className="w-full flex-row justify-evenly ml-2 mt-2">
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
            </View>
          ) : userState.rating < 3 && userState.rating >= 2 ? (
            <View className="w-full flex-row justify-evenly ml-2 mt-2">
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
            </View>
          ) : userState.rating < 2 && userState.rating >= 1 ? (
            <View className="w-full flex-row justify-evenly ml-2 mt-2">
              <FontAwesome6Icon
                solid
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
            </View>
          ) : (
            <View className="w-full flex-row justify-evenly ml-2 mt-2">
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
              <FontAwesome6Icon
                size={15}
                color={"#6185A8"}
                name="star"
              ></FontAwesome6Icon>
            </View>
          )}

          <View className="w-full items-center mt-2">
            <Text className="text-lg font-normal">
              {userState.reviews?.length} Reviews
            </Text>
          </View>
        </View>
        <View className="w-8/12  ">
          <View className="w-full flex-row justify-evenly  ">
            <Text className="mr-1">5</Text>
            <Progress.Bar
              className="h-[10] mt-1"
              height={10}
              width={150}
              progress={fiveStarsReview/100}
            />
            <Text>{fiveStarsReview}</Text>
          </View>
          <View className="w-full flex-row justify-evenly mt-2 ">
            <Text className="mr-1">4</Text>
            <Progress.Bar
              className="h-[10] mt-1"
              height={10}
              width={150}
              progress={fourStarsReview/100}
            />
            <Text>{fourStarsReview}</Text>
          </View>
          <View className="w-full flex-row justify-evenly mt-2 ">
            <Text className="mr-1">3</Text>
            <Progress.Bar
              className="h-[10] mt-1"
              height={10}
              width={150}
              progress={threeStartReview/100}
            />
            <Text>{threeStartReview}</Text>
          </View>
          <View className="w-full flex-row justify-evenly mt-2 ">
            <Text className="mr-1">2</Text>
            <Progress.Bar
              className="h-[10] mt-1"
              height={10}
              width={150}
              progress={twoStarReview/100}
            />
            <Text>{twoStarReview}</Text>
          </View>
          <View className="w-full flex-row justify-evenly mt-2 ">
            <Text className="mr-1">1</Text>
            <Progress.Bar
              className="h-[10] mt-1"
              height={10}
              width={150}
              progress={oneStarReview/100}
            />
            <Text>{oneStarReview}</Text>
          </View>
        </View>
      </View>
      <View className="w-ful mt-4">
        {userState.reviews?.map((r) => {
         return <Reviews
            key={r.reviewId}
            name={r.authorName}
            content={r.text}
            rating={r.rating}
          />;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
