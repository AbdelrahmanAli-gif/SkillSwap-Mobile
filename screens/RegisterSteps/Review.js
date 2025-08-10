import { Image, ScrollView, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Tag from '../../components/Tag';

const Review = ({ info }) => {
    const { user } = useAuth();

    return (
        <ScrollView className="flex-1 px-5">
            <View className="flex items-center justify-center py-2 px-4 rounded-xl mt-2">
                {info.profilePicture ?
                    <Image source={{ uri: info.profilePicture }} className="w-20 h-20 rounded-full" />
                    :
                    <View className="w-20 h-20 bg-amber-800 rounded-full items-center justify-center">
                        <Text className="text-4xl font-semibold text-white">{info.name.charAt(0).toUpperCase()}</Text>
                    </View>
                }
                <Text className="text-2xl font-bold mt-2 text-main-color-light dark:text-main-color-dark">{user.name}</Text>
            </View>
            <View className="my-2">
                <Text className="text-lg font-bold mt-2 text-text-primary-light dark:text-text-primary-dark">About</Text>
                <Text className="text-base text-text-secondary-light dark:text-text-secondary-dark">
                    {info.bio}
                </Text>
            </View>
            {(info.needSkills?.length > 0 || info.newSkillsToLearn?.length) > 0 && (
                <View className="my-2">
                    <Text className="text-lg font-bold mt-2 text-text-primary-light dark:text-text-primary-dark">Skills to learn</Text>
                    <View className="flex-row flex-wrap gap-2 mt-2">
                        {info.needSkills?.map((skill) => (
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
            {(info.hasSkills?.length > 0 || info.newSkillsToTeach?.length) > 0 && (
                <View className="my-2">
                    <Text className="text-lg font-bold mt-2 text-text-primary-light dark:text-text-primary-dark">Skills to teach</Text>
                    <View className="flex-row flex-wrap gap-2 mt-2">
                        {info.hasSkills?.map((skill) => (
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
                <Text className="text-lg font-bold mt-2 text-text-primary-light dark:text-text-primary-dark">Location</Text>
                <Text className="text-base text-text-secondary-light dark:text-text-secondary-dark">{info.location}</Text>
            </View>
            <View className="my-2">
                <Text className="text-lg font-bold mt-2 text-text-primary-light dark:text-text-primary-dark">Phone number</Text>
                <Text className="text-base text-text-secondary-light dark:text-text-secondary-dark">{info.phone}</Text>
            </View>
        </ScrollView>
    );
}

export default Review;