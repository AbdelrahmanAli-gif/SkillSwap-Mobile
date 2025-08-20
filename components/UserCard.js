import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { View, Text, Image, TouchableOpacity } from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { theme as themeColors } from '../theme';
import { useTheme } from "../contexts/ThemeContext";

export default function UserCard({ user }) {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';
    const { theme, toggleTheme } = useTheme();
    const colors = themeColors(theme);
    

    return (
        <View className="rounded-lg p-4 mb-4 bg-card-background-light dark:bg-gray-950/35" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <View className="flex-row gap-4 items-center">
                <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center">
                    {user.profilePicture ?
                        <Image className="w-16 h-16 rounded-full" source={{ uri: user.profilePicture }} />
                        : <Text className="text-2xl font-semibold text-gray-900">{user.name.charAt(0).toUpperCase()}</Text>}
                </View>
                <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                        <Text className="font-bold text-text-primary-light dark:text-text-primary-dark capitalize">{user.name}</Text>
                        {user.subscribtion.plan === 'pro' && <FontAwesome6Icon name='certificate' size={12} color={colors.colors.main}></FontAwesome6Icon>}
                    </View>
                    {user.location.city && user.location.country && (
                        <Text className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                            📍 {user.location.city}, {user.location.country}
                        </Text>
                    )}
                    {user.hasSkills?.length > 0 && (
                        <Text className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 capitalize">
                            <Text className="font-bold">{t("SearchScreen.offering")}: </Text>
                            {user.hasSkills.map((s) => s.skillName).join(", ")}
                        </Text>
                    )}

                    {user.needSkills?.length > 0 && (
                        <Text className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 capitalize">
                            <Text className="font-bold">{t("SearchScreen.desiring")}: </Text>
                            {user.needSkills.map((s) => s.skillName).join(", ")}
                        </Text>
                    )}
                </View>
            </View>

            <TouchableOpacity className="mt-3 bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark rounded-md p-2" onPress={() => navigation.navigate("Profile", { user })}>
                <Text className="text-white text-center">{t("SearchScreen.viewProfile")}</Text>
            </TouchableOpacity>
        </View>
    );
}
