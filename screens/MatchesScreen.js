import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { getAllOtherUsers } from '../utils/usersCollection';
import { useAuth } from '../contexts/AuthContext';
import { generateFromGemini } from '../api/gemini';
import { skillMatch } from '../helpers/prompts';
import { theme } from '../theme';
import MatchingUserCard from '../components/MatchingUserCard';
import GradientBackground from '../components/GradientBackground';

const MatchesScreen = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const users = await getAllOtherUsers(user.uid);
            const results = await generateFromGemini(skillMatch(user, users));
            setMatches(JSON.parse(results.replace("```json", "").replace("```", "")));
            setLoading(false);
        };

        fetchUsers();
    }, []);

    return (
        <View className="flex-1 px-5 pt-5">
            <GradientBackground />
            <Text className="text-3xl font-medium my-2 text-text-primary">Potential Matches</Text>
            {loading ?
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={theme.colors.main} />
                </View>
                :
                <FlatList
                    data={matches}
                    keyExtractor={(item) => item.uid}
                    renderItem={({ item }) => <MatchingUserCard user={item} />}
                />
            }
        </View>
    );

}

export default MatchesScreen;
