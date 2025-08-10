import { View, Text, Pressable } from "react-native";

const filters = [
    { label: "Skills Offered" },
    { label: "Skills Desired" },
];

export default function FilterBar({ selected, onFilterClick }) {
    return (
        <View className="flex-row flex-wrap gap-2 mb-4">
            {filters.map((filter) => (
                <Pressable
                    key={filter.label}
                    onPress={() => onFilterClick(filter.label)}
                    className={`px-4 py-1 rounded-md ${selected === filter.label
                        ? "bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark"
                        : "bg-btn-submit-hover-light dark:bg-btn-submit-hover-dark"
                        }`}
                >
                    <Text className="text-white">{filter.label}</Text>
                </Pressable>
            ))}
        </View>
    );
}
