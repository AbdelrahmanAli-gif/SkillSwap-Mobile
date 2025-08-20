import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const RatingStars = ({ setReview, label }) => {
    const [rate, setRate] = useState(0);

    const handleRate = (rate) => {
        setRate(rate);
        setReview((prevReview) => ({ ...prevReview, [label]: rate }));
    };

    return (
        <View>
            <View className="flex-row gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => handleRate(star)}>
                        <Text className={`text-2xl ${star <= rate ? "text-yellow-500" : "text-gray-300 dark:text-white"}`}>
                            ★
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View >
    );
};

export default RatingStars;
