import { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllOtherUsers } from '../utils/usersCollection';
import { logout } from '../utils/firebaseEmailAndPasswordAuth';
import { useAuth } from '../contexts/AuthContext';
import { generateFromGemini } from '../api/gemini';
import { skillMatch } from '../helpers/prompts';
import Toast from 'react-native-toast-message';
import MatchingUserCard from '../components/MatchingUserCard';

const MatchesScreen = () => {
    const [matches, setMatches] = useState([]);
    const navigation = useNavigation();
    const { user } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllOtherUsers(user.uid);
            const results = await generateFromGemini(skillMatch(user, users));
            setMatches(JSON.parse(results.replace("```json", "").replace("```", "")));
        };

        fetchUsers();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            Toast.show({
                type: 'success',
                text1: 'Logged out successfully',
            });
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Logout failed',
            });
        }
    };

    return (
        <View className="flex-1 px-5 pt-5">
            <TouchableOpacity onPress={handleLogout}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
            <Text className="text-3xl font-medium">Potential Matches</Text>
            <FlatList
                data={matches}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => <MatchingUserCard user={item} />}
            />
        </View>
    );

}

export default MatchesScreen;
