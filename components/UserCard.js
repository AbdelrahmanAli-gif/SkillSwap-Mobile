import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function UserCard({ user }) {
    const navigation = useNavigation();

    return (
        <View className="rounded-lg p-4 mb-4 bg-gray-950/50">
            <View className="flex-row gap-4 items-center">
                <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center">
                    {user.profilePicture ?
                        <Image className="w-16 h-16 rounded-full" source={{ uri: user.profilePicture }} />
                        : <Text className="text-2xl font-semibold text-gray-900">{user.name.charAt(0).toUpperCase()}</Text>}
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-text-primary capitalize">{user.name}</Text>
                    {user.location && (
                        <Text className="text-sm text-text-secondary">
                            📍 {user.location.city}, {user.location.country}
                        </Text>
                    )}
                    {user.hasSkills?.length > 0 && (
                        <Text className="text-sm text-text-secondary mt-1 capitalize">
                            <Text className="font-bold">Offering: </Text>
                            {user.hasSkills.map((s) => s.skillName).join(", ")}
                        </Text>
                    )}

                    {user.needSkills?.length > 0 && (
                        <Text className="text-sm text-text-secondary mt-1 capitalize">
                            <Text className="font-bold">Desiring: </Text>
                            {user.needSkills.map((s) => s.skillName).join(", ")}
                        </Text>
                    )}
                </View>
            </View>

            <TouchableOpacity className="mt-3 bg-btn-submit-bg rounded-md p-2" onPress={() => navigation.navigate("Profile", { user })}>
                <Text className="text-white text-center">View Profile</Text>
            </TouchableOpacity>
        </View>
    );
}
