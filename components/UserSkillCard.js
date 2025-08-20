import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5"

const UserSkillCard = ({ image = null, name, skill, messaging = false }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    return (
        <View className="flex-row items-center mt-4" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            {image ?
                <Image className="w-16 h-16 rounded-full" source={{ uri: image }} />
                :
                <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center">
                    <Text className="text-2xl font-semibold text-gray-900">
                        {name.charAt(0).toUpperCase()}
                    </Text>
                </View>
            }
            <View className={`${isRTL ? "mr-3" : "ml-3"}`}>
                <Text className="text-text-primary-light dark:text-text-primary-dark text-2xl font-bold">{name}</Text>
                <View className="bg-card-background-light dark:bg-gray-950/35 rounded-full mt-1 py-0.5 px-1.5 self-start">
                    <Text className="text-text-secondary-light dark:text-text-secondary-dark">
                        {t("MilestoneScreen.teaching")}: <Text className="font-bold">{skill}</Text>
                    </Text>
                </View>
            </View>
            {messaging &&
                <TouchableOpacity onPress={() => { }} className={`flex-row items-center gap-1 ${isRTL ? "mr-auto" : "ml-auto"} bg-main-color-light dark:bg-main-color-dark px-2 py-1 rounded-full`}>
                    <Icon size={18} color="white" name="comment-dots" />
                    <Text className="text-white">{t("MilestoneScreen.message")}</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

export default UserSkillCard;
