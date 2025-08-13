import { View, Text } from "react-native"
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6"
import { useTheme } from "../contexts/ThemeContext"
import { theme as themeColors } from "../theme"

export default function PlanFeature({ text, notIncluded }) {
  const { theme } = useTheme()
  const colors = themeColors(theme)

  return (
    <View className="flex-row gap-2 items-center mb-4">
      <FontAwesome6Icon
        name={`${notIncluded ? "xmark" : "check"}`}
        size={16}
        color={notIncluded ? colors.colors.textSecondary : colors.colors.main}
      />
      <Text
        className={`${notIncluded ? "text-text-secondary-light dark:text-text-secondary-dark" : "text-text-primary-light dark:text-text-primary-dark"} text-xl`}
      >
        {text}
      </Text>
    </View>
  )
}
