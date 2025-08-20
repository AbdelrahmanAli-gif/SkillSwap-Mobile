import { useTranslation } from "react-i18next";
import { View, Text, Pressable } from "react-native";

export default function FilterBar({ selected, onFilterClick }) {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    const filters = [
        { label: t("SearchScreen.skillsOffered"), value: "Skills Offered" },
        { label: t("SearchScreen.skillsDesired"), value: "Skills Desired" },
    ];

    return (
        <View className="flex-row flex-wrap gap-2 mb-4">
            {filters.map((filter) => (
                <Pressable
                    key={filter.label}
                    onPress={() => onFilterClick(filter.value)}
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
