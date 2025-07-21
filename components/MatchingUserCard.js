import { Image, Text, View } from 'react-native';
import Button from './Button';

const MatchingUserCard = ({ user }) => {
    return (
        <View className="flex-row items-center bg-white rounded-xl shadow p-4 w-full self-center mt-4">
            <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center">
                {user.profilePicture ?
                    <Image className="w-16 h-16 rounded-full" source={{ uri: user.profilePicture }} />
                    : <Text className="text-2xl font-semibold text-gray-900">{user.name.charAt(0).toUpperCase()}</Text>}

            </View>

            <View className="flex-1 ml-4">
                <Text className="text-lg font-medium text-gray-900">{user.name}</Text>
                {user.needSkills &&
                    <Text className="text-sm text-gray-500">
                        <Text className="font-medium">Wants: </Text>
                        <Text>{user.needSkills.map((skill) => skill.skillName).join(', ')}</Text>
                    </Text>
                }
                {user.hasSkills &&
                    <Text className="text-sm text-gray-500">
                        <Text className="font-medium">Offers: </Text>
                        <Text>{user.hasSkills.map((skill) => skill.skillName).join(', ')}</Text>
                    </Text>
                }
            </View>

            <Button text={"Connect"} />
        </View>
    );
}

export default MatchingUserCard;
