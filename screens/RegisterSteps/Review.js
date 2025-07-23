import { Image, ScrollView, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';

const Review = ({ info }) => {
    const { user } = useAuth();

    return (
        <ScrollView className="flex-1 px-5">
            <View className="flex items-center justify-center py-2 px-4 rounded-xl mt-2">
                <Image source={require("../../assets/avatar.png")} className="w-28 h-28 rounded-full" />
                <Text className="text-2xl font-bold mt-2">{user.name}</Text>
            </View>
            <View className="my-2">
                <Text className="text-lg font-bold mt-2">About</Text>
                <Text className="text-base">
                    {info.bio}
                </Text>
            </View>
            <View className="my-2">
                <Text className="text-lg font-bold mt-2">Skills to learn</Text>
                <View className="flex-row flex-wrap gap-2 mt-2">
                    {info.learnSkills?.map((skill) => (
                        <Button key={skill.id} text={skill.skillName} />
                    ))}
                </View>
            </View>
            <View className="my-2">
                <Text className="text-lg font-bold mt-2">Skills to teach</Text>
                <View className="flex-row flex-wrap gap-2 mt-2">
                    {info.learnSkills?.map((skill) => (
                        <Button key={skill.id} text={skill.skillName} />
                    ))}
                </View>
            </View>
            <View className="my-2">
                <Text className="text-lg font-bold mt-2">Location</Text>
                <Text>{info.location}</Text>
            </View>
            <View className="my-2">
                <Text className="text-lg font-bold mt-2">Phone number</Text>
                <Text>{info.phone}</Text>
            </View>
        </ScrollView>
    );
}

export default Review;