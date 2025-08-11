import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { getAllOtherUsersFiltered } from '../utils/usersCollection';
import { useAuth } from '../contexts/AuthContext';
import { generateFromGemini } from '../api/gemini';
import { skillMatch } from '../helpers/prompts';
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import MatchingUserCard from '../components/MatchingUserCard';
import GradientBackground from '../components/GradientBackground';
import { useTranslation } from 'react-i18next';

const MatchesScreen = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { theme } = useTheme();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';
    const colors = themeColors(theme);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const users = await getAllOtherUsersFiltered(user.uid);
            const results = await generateFromGemini(skillMatch(user, users));
            setMatches(JSON.parse(results.replace("```json", "").replace("```", "")));
            setLoading(false);
        };

        fetchUsers();
    }, []);

    return (
        <View className="flex-1 px-5 pt-5" style={{ marginTop: 30 }}>
            <GradientBackground />
            <Text className={`text-3xl font-medium my-2 text-main-color-light dark:text-main-color-dark ${isRTL ? "text-right" : "text-left"}`}>{t("MatchesScreen.title")}</Text>
            <Text className={`text-sm text-text-secondary-light dark:text-text-secondary-dark ${isRTL ? "text-right" : "text-left"}`}>{t("MatchesScreen.description")}</Text>
            {loading ?
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.colors.main} />
                </View>
                :
                <FlatList
                    data={matches}
                    keyExtractor={(item) => item.uid}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <MatchingUserCard user={item} />}
                />
            }
        </View>
    );
}

export default MatchesScreen;
