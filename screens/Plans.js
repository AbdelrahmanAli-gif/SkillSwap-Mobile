import { View, Text, Pressable } from "react-native"
import React from "react"
import GradientBackground from "../components/GradientBackground"
import { useTranslation } from "react-i18next"
import { useTheme } from "../contexts/ThemeContext"
import { theme as themeColors } from "../theme"
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import PlanFeature from "../components/PlanFeature"


export default function Plans() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === "rtl"
  const { theme } = useTheme()
  const colors = themeColors(theme)

  return (
    <View className="flex-1 pb-8 mt-[30px]" style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <GradientBackground></GradientBackground>
      <View className="flex-1 px-4">
        <Text className="text-text-light-light dark:text-text-light-dark font-bold text-center text-4xl mt-8 mb-2">
          Choose Your Plan
        </Text>
        <Text className="text-text-primary-light dark:text-text-primary-dark text-center text-lg mb-2">
          Start free or go Pro for the ultimate Skill Trade experience.
        </Text>

        <View className="border border-card-content-border-light dark:border-card-border-dark rounded-lg my-4">
          <View className="p-6 border-b border-b-card-content-border-light dark:border-b-card-border-dark">
            <View className="flex-row justify-between items-center">
              <Text className="text-text-light-light dark:text-text-light-dark font-bold text-2xl">
                Free
              </Text>
              <Text className="rounded-full bg-input-bg-light dark:bg-input-bg-dark text-text-primary-light dark:text-text-primary-dark py-2 px-4 text-sm font-semibold">
                Default
              </Text>
            </View>
            <Text className="text-text-light-light dark:text-text-light-dark text-4xl my-4 font-bold">
              $0 <Text className="text-xl font-medium text-text-primary-light dark:text-text-primary-dark">/month</Text>
            </Text>
            <Text className="text-text-primary-light dark:text-text-primary-dark text-xl">Perfect for getting started with skill trading</Text>
          </View>

          <View className="p-6 border-b border-b-card-content-border-light dark:border-b-card-border-dark">
            <View className="flex-row gap-2 items-center mb-4">
              <FontAwesome6Icon name="list-check" size={16} color={colors.colors.main} />
              <Text className="text-text-light-light dark:text-text-light-dark text-xl font-bold">
                Features
              </Text>
            </View>

            <PlanFeature text={"Select up to 2 skills to learn"}></PlanFeature>
            <PlanFeature text={"Select up to 2 skills to teach"}></PlanFeature>
            <PlanFeature text={"20% commission on paid skill trades"}></PlanFeature>
            <PlanFeature text={"1 active skill trade at a time"}></PlanFeature>
            <PlanFeature text={"No Pro badge"} notIncluded={true}></PlanFeature>
          </View>

          <View className="p-6 justify-center items-center">
            <Pressable className="w-full bg-input-bg-light dark:bg-input-bg-dark rounded-lg py-3 px-4">
              <Text className="text-text-secondary-light dark:text-text-secondary-dark text-center">Stay on Free Plan</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}
