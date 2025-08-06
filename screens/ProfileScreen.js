import { View, Image, Text, ScrollView } from "react-native";
import { theme } from "../theme";
import { useRoute } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import Reviews from "../components/Reviews";
import GradientBackground from "../components/GradientBackground";
import Tag from "../components/Tag";

const ProfileScreen = () => {
  const route = useRoute();
  const { user } = route.params;
  const reviewsCount = user.reviews.length;
  const reviewsPercentage = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const userRating = user.rating ? user.rating : 0;

  if (reviewsCount !== 0) {
    user.reviews.forEach((review) => {
      if (reviewsPercentage[review.rating]) reviewsPercentage[review.rating] += 1;
      else reviewsPercentage[review.rating] = 1;
    });
  }

  console.log(reviewsPercentage);

  return (
    <View className="flex-1 pb-8">
      <GradientBackground />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full items-center p-4">
          <View className="w-32 h-32 rounded-full bg-gray-300 mb-2 items-center justify-center">
            {user.profilePicture ?
              <Image className="w-32 h-32 rounded-full" source={{ uri: user.profilePicture }} />
              : <Text className="text-6xl font-semibold text-gray-900">{user.name.charAt(0).toUpperCase()}</Text>}
          </View>
          <Text className="font-bold text-2xl capitalize text-text-primary">{user.name}</Text>
          <Text className="text-xl text-center font-normal text-text-secondary">{user.bio}</Text>
        </View>

        {user.location && (
          <View className="w-full px-4 py-2">
            <Text className="text-xl font-semibold text-text-primary">Location: {" "}
              <Text className="text-base text-text-secondary">{user.location.city}, {user.location.country}</Text>
            </Text>
          </View>
        )}

        {user.phone && (
          <View className="w-full px-4 py-2">
            <Text className="text-xl font-semibold text-text-primary">Phone: {" "}
              <Text className="text-base text-text-secondary">{user.phone}</Text>
            </Text>
          </View>
        )}

        {user.hasSkills?.length > 0 && (
          <View className="w-full gap-2 px-4 py-2">
            <Text className="text-xl font-semibold text-text-primary">Skills I Offer</Text>
            {user.hasSkills?.map((s) => (
              <Tag key={s.skillId} teaching={true}>{s.skillName}</Tag>
            ))}
          </View>
        )}

        {user.needSkills?.length > 0 && (
          <View className="w-full gap-2 px-4 py-2">
            <Text className="text-xl font-semibold text-text-primary">Skills I Want to Learn</Text>
            {user.needSkills?.map((s) => (
              <Tag key={s.skillId}>{s.skillName}</Tag>
            ))}
          </View>
        )}

        <View className="w-full px-4 py-2">
          <Text className="text-xl font-semibold text-text-primary">Ratings & Reviews</Text>
          <View className="w-full flex-row justify-center items-center mt-2">
            <View className="flex-1 gap-2 items-center justify-center">
              <Text className="text-3xl font-bold text-text-primary">{userRating}</Text>
              <View className="flex-row gap-1 justify-center items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <FontAwesome6Icon
                    key={index}
                    solid={index < userRating}
                    size={18}
                    color={theme.colors.main}
                    name={userRating - index > 0 && userRating - index < 1 ? "star-half-alt" : "star"}
                  />
                ))}
              </View>
              <Text className="text-lg text-text-secondary">{user.reviews?.length} Reviews</Text>
            </View>
            <View className="flex-1">
              {[5, 4, 3, 2, 1].map((key) => (
                <View key={key} className="flex-row items-center mb-2">
                  <Text className="w-4 text-text-primary text-sm">{key}</Text>
                  <Progress.Bar
                    height={10}
                    width={150}
                    progress={reviewsPercentage[key] / reviewsCount}
                    color={theme.colors.main}
                    unfilledColor="transparent"
                    borderColor={theme.colors.main}
                    borderWidth={1}
                    className="mx-2"
                  />
                  <Text className="text-text-secondary text-sm">{reviewsPercentage[key]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="w-full px-4 py-2">
          {user.reviews?.map((review) => {
            return <Reviews
              key={review.reviewId}
              name={review.authorName}
              content={review.text}
              rating={review.rating}
            />
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
