import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { reviewUser } from '../utils/usersCollection';
import GradientBackground from '../components/GradientBackground';
import RatingStars from '../components/RatingStars';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

const otherUser = {
    availability: true,
    bio: "test test test",
    email: "test@gmail.com",
    hasSkills: [],
    isAvailableForPaid: false,
    isAvailableForTrade: true,
    location: { city: "Bad Tennstedt", country: "Germany" },
    name: "test",
    needSkills: [],
    phone: "+49 66666666",
    profilePicture: "https://res.cloudinary.com/dplcc4igl/image/upload/v1754859375/profile_pictures/vyebwvdvrtksgrnwygos.jpg",
    rating: 0,
    reviews: [],
    totalSessions: 0,
    uid: "8GDuZiIZ09RSl1dV2nPFbKRr8yn2",
}

const ReviewUserScreen = () => {
    const route = useRoute();
    // const { otherUser } = route.params;
    const { user } = useAuth();
    const [review, setReview] = useState({});
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    const handleReview = async () => {
        try {
            await reviewUser(otherUser.uid, user, review);
            Toast.show({ type: 'success', text1: t("feedback.reviewSuccess") });
            navigation.navigate("App");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View className="flex-1" style={{ marginTop: 30, direction: isRTL ? 'rtl' : 'ltr' }}>
            <GradientBackground />
            <View className="p-6">
                <Text className="font-bold text-3xl text-main-color-light dark:text-main-color-dark my-2">{t("ReviewScreen.title")}</Text>
                <Text className="text-xl text-text-primary-light dark:text-text-primary-dark my-2">
                    {t("ReviewScreen.description")} {" "}
                    <Text className="font-bold text-xl text-main-color-light dark:text-main-color-dark">{otherUser.name}</Text>
                </Text>

                <View className="my-2 flex-row items-center">
                    <Text className="text-lg font-bold mt-2 text-text-primary-light dark:text-text-primary-dark">{t("ReviewScreen.overall")}: </Text>
                    <RatingStars setReview={setReview} label="rating" />
                </View>

                <Text className="text-xl font-bold mt-2 text-text-primary-light dark:text-text-primary-dark">{t("ReviewScreen.ascpects")}</Text>

                <View className="my-2 flex-row items-center">
                    <Text className="text-lg font-bold mt-2 text-text-primary-light dark:text-text-primary-dark">{t("ReviewScreen.teaching")}: </Text>
                    <RatingStars setReview={setReview} label="teachingSkill" />
                </View>

                <View className="my-2 flex-row items-center">
                    <Text className="text-lg font-bold mt-2 text-text-primary-light dark:text-text-primary-dark">{t("ReviewScreen.communication")}: </Text>
                    <RatingStars setReview={setReview} label="communication" />
                </View>

                <View className="my-2 flex-row items-center">
                    <Text className="text-lg font-bold mt-2 text-text-primary-light dark:text-text-primary-dark">{t("ReviewScreen.punctuality")}: </Text>
                    <RatingStars setReview={setReview} label="punctuality" />
                </View>

                <TextInput
                    className="mt-4 p-2 bg-input-bg-light dark:bg-input-bg-dark rounded-lg text-text-primary-light dark:text-text-primary-dark h-40 placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark"
                    placeholder={t("ReviewScreen.textPlaceholder")}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                    textAlign={isRTL ? "right" : "left"}
                    onChangeText={(text) => setReview({ ...review, text })}
                />

                <TouchableOpacity
                    disabled={!review.rating || !review.teachingSkill || !review.communication || !review.punctuality}
                    className={`w-full p-4 rounded-lg mt-4 ${!review.rating || !review.teachingSkill || !review.communication || !review.punctuality ? "bg-gray-400" : "bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark"}`}
                    onPress={handleReview}
                >
                    <Text className="text-white text-lg font-bold text-center">
                        {t("ReviewScreen.button")}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default ReviewUserScreen;
