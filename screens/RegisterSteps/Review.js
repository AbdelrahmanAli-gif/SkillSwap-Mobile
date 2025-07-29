import { Image, ScrollView, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Tag from '../../components/Tag';

const Review = ({ info }) => {
    const { user } = useAuth();

    return (
        <ScrollView className="flex-1 px-5">
            <View className="flex items-center justify-center py-2 px-4 rounded-xl mt-2">
                <Image source={require("../../assets/avatar.png")} className="w-28 h-28 rounded-full" />
                <Text className="text-2xl font-bold mt-2 text-main-color">{user.name}</Text>
            </View>
            <View className="my-2">
                <Text className="text-lg font-bold mt-2 text-text-primary">About</Text>
                <Text className="text-base text-text-secondary">
                    {info.bio}
                </Text>
            </View>
            {(info.skillsToLearn?.length > 0 || info.newSkillsToLearn?.length) > 0 && (
                <View className="my-2">
                    <Text className="text-lg font-bold mt-2 text-text-primary">Skills to learn</Text>
                    <View className="flex-row flex-wrap gap-2 mt-2">
                        {info.skillsToLearn?.map((skill) => (
                            <Tag key={skill.skillId}>
                                {skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1)}
                            </Tag>
                        ))}
                        {info.newSkillsToLearn?.map((skill, index) => (
                            <Tag key={index + skill.skillName}>
                                {skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1)}
                            </Tag>
                        ))}
                    </View>
                </View>
            )}
            {(info.skillsToTeach?.length > 0 || info.newSkillsToTeach?.length) > 0 && (
                <View className="my-2">
                    <Text className="text-lg font-bold mt-2 text-text-primary">Skills to teach</Text>
                    <View className="flex-row flex-wrap gap-2 mt-2">
                        {info.skillsToTeach?.map((skill) => (
                            <Tag key={skill.skillId} teaching={true} >
                                {skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1)}
                            </Tag>
                        ))}
                        {info.newSkillsToTeach?.map((skill, index) => (
                            <Tag key={index + skill.skillName} teaching={true}>
                                {skill.skillName.charAt(0).toUpperCase() + skill.skillName.slice(1)}
                            </Tag>
                        ))}
                    </View>
                </View>
            )}
            <View className="my-2">
                <Text className="text-lg font-bold mt-2 text-text-primary">Location</Text>
                <Text className="text-base text-text-secondary">{info.location}</Text>
            </View>
            <View className="my-2">
                <Text className="text-lg font-bold mt-2 text-text-primary">Phone number</Text>
                <Text className="text-base text-text-secondary">{info.phone}</Text>
            </View>
        </ScrollView>
    );
}

export default Review;