import { Text, Image, View } from "react-native";

const Card = ({ title, description, image, icon }) => {
    return (
        <View className="w-72 bg-gray-950/35 rounded-2xl m-2 p-4">
            {icon ? (
                <View className="w-14 h-14 rounded-full bg-btn-submit-bg mb-2 items-center justify-center">
                    {icon}
                </View>
            ) : (
                <Image
                    className="w-full h-64 rounded-lg mb-2"
                    resizeMode="cover"
                    source={image}
                />
            )}
            {!!title && (
                <Text className="text-lg font-semibold text-text-primary mb-1">
                    {title}
                </Text>
            )}
            {!!description && (
                <Text className="text-text-secondary text-base">
                    {description}
                </Text>
            )}
        </View>
    );
};

export default Card;
