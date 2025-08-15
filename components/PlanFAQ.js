import { View, Text, Pressable } from "react-native"
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6"
import { useTheme } from "../contexts/ThemeContext"
import { theme as themeColors } from "../theme"
import { useState } from "react"

export default function PlanFAQ({ question, answer }) {
  const { theme } = useTheme()
  const colors = themeColors(theme)
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <View className="border border-card-border-light dark:border-card-border-dark rounded-lg p-5 mt-4">
      <Pressable onPress={() => setShowAnswer(!showAnswer)}>
        <View className="flex-row justify-between items-center">
          <Text className="text-text-light-light dark:text-text-light-dark font-bold text-lg">
            {question}
          </Text>
          <FontAwesome6Icon
            name={`${showAnswer ? 'angle-up' : 'angle-down'}`}
            size={16}
            color={colors.colors.textPrimary}
          ></FontAwesome6Icon>
        </View>
      </Pressable>
      {showAnswer && (
        <Text className="text-text-primary-light dark:text-text-primary-dark mt-4 text-lg leading-[1.6rem]">
          {answer}
        </Text>
      )}
    </View>
  )
}
