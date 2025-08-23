import { View, Image, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import { useTranslation } from "react-i18next";
import { subscribeToUserTrades } from "../utils/tradesUtils";
import * as Progress from "react-native-progress";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import Reviews from "../components/Reviews";
import GradientBackground from "../components/GradientBackground";
import Tag from "../components/Tag";
import CompleteProfileScreen from "./CompleteProfileScreen";
import TradeCard from "../components/TradeCard";

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user: currentUser, setUser } = useAuth();
  const { user } = route.params;
  const [editing, setEditing] = useState(false);
  const [isClicked, setIsClicked] = useState("Info");
  const [trades, setTrades] = useState([]);
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const colors = themeColors(theme);

  useEffect(() => {
    const updateUserInterval = setInterval(async () => {
      if (user) {
        const u = await getUserById(user.uid)
        setUser(u)
      }
    }, 2000)

    return () => clearInterval(updateUserInterval)
  }, [])

  useEffect(() => {
    if (!user?.uid) return;
    let unsubscribe = subscribeToUserTrades(user.uid, setTrades);
    return () => unsubscribe && unsubscribe();
  }, [user?.uid]);

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
    <View className="flex-1 px-4 pb-8 relative" style={{ direction: isRTL ? "rtl" : "ltr", marginTop: 30 }}>
      <GradientBackground />

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
          {currentUser.subscribtion.plan === "pro" && <FontAwesome6Icon name="certificate" size={16} color={colors.colors.main} />}
        </View>
        <Text className="text-xl text-center font-normal text-text-secondary-light dark:text-text-secondary-dark">{user.bio}</Text>
      </View>

      <View className="w-full h-12 flex-row border-b-[1px] border-b-slate-500">
        <TouchableOpacity
          onPress={() => setIsClicked("Info")}
          className={isClicked === "Info" ? "ml-4 mr-4 h-full items-center justify-center border-b-[2px]" : "ml-4 mr-4 h-full items-center justify-center"}
        >
          <Text className={`font-bold text-lg ${isClicked === "Info" ? "text-main-color-light dark:text-main-color-dark" : "text-text-secondary-light dark:text-text-secondary-dark"}`}>
            {t("ProfileScreen.info")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsClicked("Trades")}
          className={isClicked === "Trades" ? " ml-4 mr-4 h-full items-center justify-center border-b-[2px]" : "ml-4 mr-4 h-full items-center justify-center "}
        >
          <Text className={`font-bold text-lg ${isClicked === "Trades" ? "text-main-color-light dark:text-main-color-dark" : "text-text-secondary-light dark:text-text-secondary-dark"}`}>
            {t("ProfileScreen.trades")}
          </Text>
        </TouchableOpacity>
      </View>
      {isClicked === "Info" ? (
        <ScrollView className="flex-1 mt-2" showsVerticalScrollIndicator={false}>
          {user.location.city && user.location.country && (
            <View className="w-full py-2">
              <Text className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">{t("ProfileScreen.location")}: {" "}
                <Text className="text-base text-text-secondary-light dark:text-text-secondary-dark">{user.location.city}, {user.location.country}</Text>
              </Text>
            </View>
          )}

          {user.phone && (
            <View className="w-full py-2">
              <Text className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">{t("ProfileScreen.phone")}: {" "}
                <Text className="text-base text-text-secondary-light dark:text-text-secondary-dark">{user.phone}</Text>
              </Text>
            </View>
          )}

          {user.subscribtion && (
            <>
              <Text className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">{t("ProfileScreen.subscription")}</Text>
              <View className="w-full flex-row items-center justify-between">
                <View className="items-start">
                  <Text className="text-base text-text-secondary-light dark:text-text-secondary-dark capitalize font-semibold">{currentUser.subscribtion.plan === "pro" ? t("ProfileScreen.proPlan") : t("ProfileScreen.freePlan")}</Text>
                  {currentUser.subscribtion.currentPeriodEnd && <Text className="text-base text-text-secondary-light dark:text-text-secondary-dark">{t("ProfileScreen.renewalDate")}: {new Date(currentUser.subscribtion.currentPeriodEnd).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</Text>}
                </View>
                {user.uid === currentUser.uid &&
                  <TouchableOpacity
                    className="bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark px-3 py-1 rounded"
                    onPress={() => navigation.navigate("Plans")}
                  >
                    <Text className="text-white font-semibold">{t("ProfileScreen.manage")}</Text>
                  </TouchableOpacity>
                }
              </View>
            </>
          )}

          {user.hasSkills?.length > 0 && (
            <View className="w-full gap-2 py-2">
              <Text className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">{t("ProfileScreen.skillsToOffer")}</Text>
              <View className="flex-row gap-2 flex-wrap">
                {user.hasSkills?.map((s) => (
                  <Tag key={s.skillId} teaching={true}>{s.skillName}</Tag>
                ))}
              </View>
            </View>
          )}

          {user.needSkills?.length > 0 && (
            <View className="w-full gap-2 py-2">
              <Text className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">{t("ProfileScreen.skillsToLearn")}</Text>
              <View className="flex-row gap-2 flex-wrap">
                {user.needSkills?.map((s) => (
                  <Tag key={s.skillId}>{s.skillName}</Tag>
                ))}
              </View>
            </View>
          )}

          <View className="w-full py-2">
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
                    <Text className="text-text-primary-light dark:text-text-primary-dark text-sm">{key}</Text>
                    <Progress.Bar
                      height={10}
                      width={150}
                      progress={reviewsPercentage[key] / reviewsCount}
                      color={colors.colors.main}
                      unfilledColor="transparent"
                      borderColor={colors.colors.main}
                      borderWidth={1}
                      className="mx-1"
                    />
                    <Text className="text-text-secondary-light text-sm">{reviewsPercentage[key]}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View className="w-full py-2">
            {user.reviews?.map((review) => {
              return <Reviews
                key={review.reviewId}
                name={review.authorName}
                content={review.text}
                rating={review.rating}
              />;
            })}
          </View>
        </ScrollView>
      ) : (
        <FlatList
          style={{ width: "100%" }}
          className="flex-1 mt-2"
          data={trades}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TradeCard item={item} />}
          ListEmptyComponent={
            <Text className="text-gray-400 mt-4 text-center">{t("ProfileScreen.noTrades")}</Text>
          }
        />
      )}
    </View>
  );
};

export default ProfileScreen;
