import { Image, Text, View } from 'react-native';

const FeaturedSkillCard = ({ type, title, description, image }) => {
    return (
        <View className="flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm my-2">
            <View className="flex-1 pr-4">
                <Text className="text-sm text-gray-500">{type}</Text>
                <Text className="text-lg font-bold text-gray-800">{title}</Text>
                <Text className="text-sm text-gray-500 mt-1">
                    {description}
                </Text>
            </View>
            <Image source={{ uri: image }} className="w-1/3 h-full rounded-lg" resizeMode="cover" />
        </View>
    );
}

export default FeaturedSkillCard;