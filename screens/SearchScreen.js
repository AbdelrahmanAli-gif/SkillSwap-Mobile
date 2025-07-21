import { ScrollView, Text, TextInput, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from '../components/Button';
import FeaturedSkillCard from '../components/FeaturedSkillCard';

const SearchScreen = () => {
    return (
        <ScrollView className="flex-1 px-5 pt-5">
            <View className="flex-row items-center bg-gray-200 rounded-xl px-4 mb-2">
                <MaterialIcons name="search" size={24} color="black" />
                <TextInput
                    placeholder="Search for skills"
                    placeholderTextColor="#6b7280"
                    className="ml-2 text-base text-gray-600 flex-1"
                />
            </View>
            <Text className="text-3xl font-medium my-3">Categories</Text>
            <View className="flex-row flex-wrap gap-4 mb-3">
                <Button text={"Music"} />
                <Button text={"Sports"} />
                <Button text={"Languages"} />
                <Button text={"Arts"} />
                <Button text={"Tech"} />
                <Button text={"Cooking"} />
            </View>
            <Text className="text-3xl font-medium my-3">Featured Skills</Text>
            <FeaturedSkillCard
                type={"Trending"}
                title={"Guitar Lessons"}
                description={"Learn to play guitar with experienced instructors."}
                image={"https://via.placeholder.com/150"}
            />
            <FeaturedSkillCard
                type={"Trending"}
                title={"Guitar Lessons"}
                description={"Learn to play guitar with experienced instructors."}
                image={"https://via.placeholder.com/150"}
            />
            <FeaturedSkillCard
                type={"Trending"}
                title={"Guitar Lessons"}
                description={"Learn to play guitar with experienced instructors."}
                image={"https://via.placeholder.com/150"}
            />
            <FeaturedSkillCard
                type={"Trending"}
                title={"Guitar Lessons"}
                description={"Learn to play guitar with experienced instructors."}
                image={"https://via.placeholder.com/150"}
            />
        </ScrollView>
    );
}

export default SearchScreen;