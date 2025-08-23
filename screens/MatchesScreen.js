import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { getAllOtherUsersFiltered } from '../utils/usersCollection';
import { useAuth } from '../contexts/AuthContext';
import { generateFromGemini } from '../api/gemini';
import { skillMatch } from '../helpers/prompts';
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import { useTranslation } from 'react-i18next';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MatchingUserCard from '../components/MatchingUserCard';
import GradientBackground from '../components/GradientBackground';
import { useNavigation } from '@react-navigation/native';


const MatchesScreen = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { user } = useAuth();
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';
    const colors = themeColors(theme);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(false);
            const users = await getAllOtherUsersFiltered(user.uid);
            generateFromGemini(skillMatch(user, users)).then((res) => {
                res = res.replace("```json", "").replace("```", "");
                setMatches(JSON.parse(res));
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.log(err);
            });
        };

        fetchUsers();
    }, [user.uid]);

    return (
        <View className="flex-1 px-5 pt-5" style={{ marginTop: 30 }}>
            <GradientBackground />
            <View className="flex-row items-center justify-between">
                <Text className={`text-3xl font-medium mb-2 text-main-color-light dark:text-main-color-dark ${isRTL ? "text-right" : "text-left"}`}>{t("MatchesScreen.title")}</Text>
                <FontAwesome onPress={() => navigation.navigate("Search")} name="search" size={20} color={colors.colors.textSecondary} />
            </View>
            <Text className={`text-sm text-text-secondary-light dark:text-text-secondary-dark ${isRTL ? "text-right" : "text-left"}`}>{t("MatchesScreen.description")}</Text>
            {error ? (
                <View className="flex-1 items-center justify-center p-4">
                    <Text className={`text-2xl text-center font-medium my-2 text-main-color-light dark:text-main-color-dark ${isRTL ? "text-right" : "text-left"}`}>{t("MatchesScreen.error")}</Text>
                </View>
            ) : loading ?
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.colors.main} />
                </View>
                :
                matches.length > 0 ? (
                    <FlatList
                        data={matches}
                        keyExtractor={(item) => item.uid}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <MatchingUserCard user={item} />}
                    />
                ) : (
                    <View className="flex-1 items-center justify-center p-4">
                        <Text className={`text-2xl text-center font-medium my-2 text-main-color-light dark:text-main-color-dark ${isRTL ? "text-right" : "text-left"}`}>{t("MatchesScreen.noMatches")}</Text>
                    </View>
                )}
        </View>
    );
}

export default MatchesScreen;
