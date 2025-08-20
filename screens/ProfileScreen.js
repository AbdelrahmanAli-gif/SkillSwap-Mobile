import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme"; import * as Progress from "react-native-progress";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import Reviews from "../components/Reviews";
import GradientBackground from "../components/GradientBackground";
import Tag from "../components/Tag";
import CompleteProfileScreen from "./CompleteProfileScreen";
import { useTranslation } from "react-i18next";

const ProfileScreen = () => {
  const route = useRoute();
  const { user: currentUser } = useAuth();
  const { user } = route.params;
  const [editing, setEditing] = useState(false);
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const colors = themeColors(theme);
  const reviewsCount = user.reviews.length;
  const reviewsPercentage = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const userRating = user.rating ? user.rating : 0;

  if (reviewsCount !== 0) {
    user.reviews.forEach((review) => {
      if (reviewsPercentage[review.rating]) reviewsPercentage[review.rating] += 1;
      else reviewsPercentage[review.rating] = 1;
    });
  }

  if (editing) return <CompleteProfileScreen navigationRoute={"Profile"} />;

  return (
    <View className="flex-1 pb-8 relative" style={{ direction: isRTL ? 'rtl' : 'ltr', marginTop: 30 }}>
      <GradientBackground />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {currentUser.uid === user.uid && (
          <TouchableOpacity onPress={() => setEditing(true)} className="absolute top-4 right-4">
            <FontAwesome6Icon name="pencil" size={20} color={colors.colors.textPrimary} />
          </TouchableOpacity>
        )}
        <View className="w-full items-center p-4">
          <View className="w-32 h-32 rounded-full bg-gray-300 mb-2 items-center justify-center">
            {user.profilePicture ?
              <Image className="w-32 h-32 rounded-full" source={{ uri: user.profilePicture }} />
              : <Text className="text-6xl font-semibold text-gray-900">{user.name.charAt(0).toUpperCase()}</Text>}
          </View>
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="font-bold text-2xl capitalize text-main-color-light dark:text-main-color-dark">{user.name}</Text>
            {currentUser.subscribtion.plan === 'pro' && <FontAwesome6Icon name="certificate" size={16} color={colors.colors.main}/>}
          </View>
          <Text className="text-xl text-center font-normal text-text-secondary-light dark:text-text-secondary-dark">{user.bio}</Text>
        </View>

        {user.location.city && user.location.country && (
          <View className="w-full px-4 py-2">
            <Text className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">{t("ProfileScreen.location")}: {" "}
              <Text className="text-base text-text-secondary-light dark:text-text-secondary-dark">{user.location.city}, {user.location.country}</Text>
            </Text>
          </View>
        )}

        {user.phone && (
          <View className="w-full px-4 py-2">
            <Text className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">{t("ProfileScreen.phone")}: {" "}
              <Text className="text-base text-text-secondary-light dark:text-text-secondary-dark">{user.phone}</Text>
            </Text>
          </View>
        )}

        {user.hasSkills?.length > 0 && (
          <View className="w-full gap-2 px-4 py-2">
            <Text className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">{t("ProfileScreen.skillsToOffer")}</Text>
            {user.hasSkills?.map((s) => (
              <Tag key={s.skillId} teaching={true}>{s.skillName}</Tag>
            ))}
          </View>
        )}

        {user.needSkills?.length > 0 && (
          <View className="w-full gap-2 px-4 py-2">
            <Text className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">{t("ProfileScreen.skillsToLearn")}</Text>
            {user.needSkills?.map((s) => (
              <Tag key={s.skillId}>{s.skillName}</Tag>
            ))}
          </View>
        )}

        <View className="w-full px-4 py-2">
          <Text className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">{t("ProfileScreen.ratingsAndReviews")}</Text>
          <View className="w-full flex-row justify-center items-center mt-2">
            <View className="flex-1 gap-2 items-center justify-center">
              <Text className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">{userRating}</Text>
              <View className="flex-row gap-1 justify-center items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <FontAwesome6Icon
                    key={index}
                    solid={index < userRating}
                    size={18}
                    color={colors.colors.main}
                    name={userRating - index > 0 && userRating - index < 1 ? "star-half-alt" : "star"}
                  />
                ))}
              </View>
              <Text className="text-lg text-text-secondary-light">{user.reviews?.length} {t("ProfileScreen.reviews")}</Text>
            </View>
            <View className="flex-1">
              {[5, 4, 3, 2, 1].map((key) => (
                <View key={key} className="flex-row items-center mb-2">
                  <Text className="w-4 text-text-primary-light dark:text-text-primary-dark text-sm">{key}</Text>
                  <Progress.Bar
                    height={10}
                    width={150}
                    progress={reviewsPercentage[key] / reviewsCount}
                    color={colors.colors.main}
                    unfilledColor="transparent"
                    borderColor={colors.colors.main}
                    borderWidth={1}
                    className="mx-2"
                  />
                  <Text className="text-text-secondary-light text-sm">{reviewsPercentage[key]}</Text>
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
