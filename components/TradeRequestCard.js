import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { theme as themeColors } from '../theme';
import { useTranslation } from 'react-i18next';
import { updateRequestStatus } from '../utils/requestsUtils';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TradeRequestCard = ({ request }) => {
    const { theme } = useTheme();
    const colors = themeColors(theme);
    const navigator = useNavigation();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    const handleAcceptTrade = async () => {
        await updateRequestStatus(request.requestId, "accepted");
        navigator.navigate("Milestones", { request });
    }

    const handleDeclineTrade = async () => {
        await updateRequestStatus(request.requestId, "declined");
    }

    return (
        <View className="p-3 rounded-lg my-2 bg-card-background-light dark:bg-gray-950/35" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <View className="flex-row items-center gap-3">
                {request.requestingUser.profilePicture ?
                    <Image className="rounded-full w-14 h-14" source={{ uri: request.requestingUser.profilePicture }} />
                    :
                    <View className="bg-gray-300 rounded-full w-14 h-14 items-center justify-center">
                        <Text className="text-3xl font-semibold text-gray-900">
                            {request.requestingUser.name?.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                }
                <View className="items-start justify-between">
                    <Text className="text-text-primary-light dark:text-text-primary-dark">{t("NotificationsScreen.tradeRequest")}
                        <Text className="font-bold">{request.requestingUser.name}</Text>
                    </Text>
                    <View className="flex-row items-center justify-between flex-wrap">
                        <Text className="font-semibold capitalize text-text-secondary-light dark:text-text-secondary-dark">{request.requestedSkill.skillName}</Text>
                        <FontAwesome style={{ marginHorizontal: 5 }} name="arrows-h" size={20} color={colors.colors.textSecondary} />
                        <Text className="font-semibold capitalize text-text-secondary-light dark:text-text-secondary-dark">{request.offeredSkill.skillName}</Text>
                    </View>
                </View>
            </View>
            {request.notes &&
                <Text className="text-text-secondary-light dark:text-text-secondary-dark mt-2">{request.notes}</Text>
            }
            {request.requestStatus === "pending" ? (
                <View className="flex-row items-center justify-center gap-2 mt-2">
                    <TouchableOpacity
                        className="flex-1 bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark rounded px-2 py-1"
                        onPress={handleAcceptTrade}
                    >
                        <Text className="text-white text-center">{t("NotificationsScreen.accept")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex-1 bg-btn-submit-hover-light dark:bg-btn-submit-hover-dark rounded px-2 py-1"
                        onPress={handleDeclineTrade}
                    >
                        <Text className="text-white text-center">{t("NotificationsScreen.decline")}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex-row items-center justify-center mt-2">
                    <Text className="text-text-secondary-light dark:text-text-secondary-dark font-bold capitalize">{request.requestStatus === "accepted" ? t("NotificationsScreen.accepted") : t("NotificationsScreen.declined")}{request.requestStatus === "accepted" ? "!" : "."}</Text>
                </View>
            )}
        </View>
    );
}

export default TradeRequestCard;
