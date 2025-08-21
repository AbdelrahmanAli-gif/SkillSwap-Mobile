import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { getUserById } from '../utils/usersCollection';
import { useTheme } from '../contexts/ThemeContext';
import { theme as themeColors } from '../theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const TradeCard = ({ item }) => {
    const [firstUser, setFirstUser] = useState(null);
    const [secondUser, setSecondUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const { user } = useAuth();
    const navigator = useNavigation();
    const colors = themeColors(theme);

    useEffect(() => {
        const fetchUsers = async () => {
            const firstUser = await getUserById(item.userA);
            const secondUser = await getUserById(item.userB);
            setFirstUser(firstUser);
            setSecondUser(secondUser);
            setLoading(false);
        };
        fetchUsers();
    }, [item.userA, item.userB]);

    return (
        <TouchableOpacity
            className="bg-card-background-light dark:bg-gray-950/35 my-2 p-3 rounded-lg"
            onPress={() => (user.uid === item.userA || user.uid === item.userB) && navigator.navigate("Milestones", { trade: { ...item, userA: firstUser, userB: secondUser } })}
        >
            {loading ?
                <Text>Loading...</Text>
                :
                <View className="flex-row items-center gap-2 justify-between">
                    <View className="flex-row flex-1 items-center gap-1">
                        {firstUser.profilePicture ?
                            <Image className="w-14 h-14 rounded-full" source={{ uri: firstUser.profilePicture }} />
                            : <View className="bg-gray-400 rounded-full w-14 h-14 items-center justify-center">
                                <Text className="text-2xl font-semibold text-gray-900">{firstUser.name.charAt(0).toUpperCase()}</Text>
                            </View>
                        }
                        <View className="flex-1">
                            <Text
                                className="text-text-primary-light dark:text-text-primary-dark text-lg"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {firstUser?.name}
                            </Text>
                            <Text className="font-bold capitalize"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {item.skillA}
                            </Text>
                        </View>
                    </View>
                    <FontAwesome style={{ marginHorizontal: 10 }} name="arrows-h" size={20} color={colors.colors.textPrimary} />
                    <View className="flex-row flex-1 items-center gap-1">
                        {secondUser.profilePicture ?
                            <Image className="w-14 h-14 rounded-full" source={{ uri: secondUser.profilePicture }} />
                            : <View className="bg-gray-400 rounded-full w-14 h-14 items-center justify-center">
                                <Text className="text-2xl font-semibold text-gray-900">{secondUser.name.charAt(0).toUpperCase()}</Text>
                            </View>
                        }
                        <View className="flex-1">
                            <Text
                                className="text-text-primary-light dark:text-text-primary-dark text-lg"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {secondUser?.name}
                            </Text>
                            <Text
                                className="font-bold capitalize"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {item.skillB}
                            </Text>
                        </View>
                    </View>
                </View>
            }
        </TouchableOpacity>
    );
}

export default TradeCard;
