import { Image, Text, View } from "react-native";
import { theme } from "../theme";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

const Reviews = ({ name, rating, content, img }) => {
  return (
    <View className="w-full mt-2 bg-gray-950/35 rounded-lg p-4 mb-2">
      <View className="w-full flex-row">
        <View className="w-16 h-16 rounded-full bg-gray-300 mb-2 items-center justify-center">
          {img ?
            <Image className="w-16 h-16 rounded-full" source={{ uri: img }} />
            : <Text className="text-3xl font-semibold text-gray-900">{name.charAt(0).toUpperCase()}</Text>}
        </View>
        <View className="flex-1 ml-4 gap-1">
          <Text className="font-bold text-text-primary">{name}</Text>
          <Text className="text-text-secondary">2 weeks ago</Text>
          <View className="flex-row gap-1 items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <FontAwesome6Icon
                key={index}
                solid={index < rating}
                size={12}
                color={theme.colors.main}
                name={rating - index > 0 && rating - index < 1 ? "star-half-alt" : "star"}
              />
            ))}
          </View>
        </View>
      </View>
      <Text className="mt-1 mx-4 text-text-primary">
        {content}
      </Text>
    </View>
  );
};

export default Reviews;
