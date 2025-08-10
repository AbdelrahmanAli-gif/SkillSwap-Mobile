import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const MatchingUserCard = ({ user }) => {
    const navigation = useNavigation();

    return (
        <View className="flex-row items-center bg-card-background-light dark:bg-gray-950/35 rounded-xl p-4 w-full self-center mt-4">
            <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center">
                {user.profilePicture ?
                    <Image className="w-16 h-16 rounded-full" source={{ uri: user.profilePicture }} />
                    : <Text className="text-2xl font-semibold text-gray-900">{user.name.charAt(0).toUpperCase()}</Text>}
            </View>

            <View className="flex-1 ml-4">
                <Text className="text-lg font-medium text-text-primary-light dark:text-text-primary-dark capitalize">{user.name}</Text>
                {user.needSkills.length > 0 &&
                    <Text className="text-sm text-text-secondary-light dark:text-text-secondary-dark capitalize">
                        <Text className="font-medium">Wants: </Text>
                        <Text>{user.needSkills.map((skill) => skill.skillName).join(', ')}</Text>
                    </Text>
                }
                {user.hasSkills.length > 0 &&
                    <Text className="text-sm text-text-secondary-light dark:text-text-secondary-dark capitalize">
                        <Text className="font-medium">Offers: </Text>
                        <Text>{user.hasSkills.map((skill) => skill.skillName).join(', ')}</Text>
                    </Text>
                }
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('ScheduleSession', { otherUser: user })} className="bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark px-3 py-1 rounded-lg">
                <Text className="text-white text-sm font-medium">Connect</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MatchingUserCard;
