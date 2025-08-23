import React from "react"
import { View, Text, Pressable } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import { useTheme } from "../contexts/ThemeContext"
import { theme as themeColors } from "../theme"

export default function PaymentSuccess() {
  const navigation = useNavigation()
  const route = useRoute()
  const session = route.params?.session
  const { theme } = useTheme()
  const colors = themeColors(theme)

  return (
    <View className="flex-1 items-center justify-center px-6 bg-white dark:bg-[#20201c]">
      <Icon
        name="checkmark-circle"
        size={80}
        color={colors.colors.main}
        style={{ marginBottom: 24 }}
      />
      <Text className="text-3xl font-bold mb-4 text-main-color-light dark:text-main-color-dark text-center">
        Payment Successful!
      </Text>
      {session && (
        <>
          <Text className="text-xl text-text-primary-light dark:text-text-primary-dark mb-2 text-center">
            Amount: {(session.amount_total / 100).toFixed(2)} {session.currency?.toUpperCase()}
          </Text>
          <Text className="text-base text-text-secondary-light dark:text-text-secondary-dark mb-6 text-center">
            Status: {session.payment_status || session.status}
          </Text>
        </>
      )}
      <Pressable
        className="bg-main-color-light dark:bg-main-color-dark py-3 px-8 rounded-full"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-white font-bold text-lg">Back to App</Text>
      </Pressable>
    </View>
  )
}
