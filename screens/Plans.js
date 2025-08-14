import { View, Text, Pressable, ScrollView } from "react-native"
import React from "react"
import GradientBackground from "../components/GradientBackground"
import { useTranslation } from "react-i18next"
import { useTheme } from "../contexts/ThemeContext"
import { theme as themeColors } from "../theme"
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6"
import PlanFeature from "../components/PlanFeature"
import PlanFAQ from "../components/PlanFAQ"

export default function Plans() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === "rtl"
  const { theme } = useTheme()
  const colors = themeColors(theme)

  return (
    <View className="flex-1 pb-8 mt-[30px]" style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <GradientBackground></GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4">
        <Text className="text-text-light-light dark:text-text-light-dark font-bold text-center text-4xl mt-8 mb-2">
          {t("PlansScreen.chooseYourPlan")}
        </Text>
        <Text className="text-text-primary-light dark:text-text-primary-dark text-center text-lg mb-2">
          {t("PlansScreen.startFreeOrPro")}
        </Text>

        <View className="border border-card-content-border-light dark:border-card-border-dark rounded-lg my-4">
          <View className="p-6 border-b border-b-card-content-border-light dark:border-b-card-border-dark">
            <View className="flex-row justify-between items-center">
              <Text className="text-text-light-light dark:text-text-light-dark font-bold text-2xl">
                {t("PlansScreen.free")}
              </Text>
              <Text className="rounded-full bg-input-bg-light dark:bg-input-bg-dark text-text-primary-light dark:text-text-primary-dark py-2 px-4 text-sm font-semibold">
                {t("PlansScreen.default")}
              </Text>
            </View>
            <Text className="text-text-light-light dark:text-text-light-dark text-4xl my-4 font-bold">
              $0{" "}
              <Text className="text-xl font-medium text-text-primary-light dark:text-text-primary-dark">
                {t("PlansScreen.perMonth")}
              </Text>
            </Text>
            <Text className="text-text-primary-light dark:text-text-primary-dark text-xl">
              {t("PlansScreen.freeDescription")}
            </Text>
          </View>

          <View className="p-6 border-b border-b-card-content-border-light dark:border-b-card-border-dark">
            <View className="flex-row gap-2 items-center mb-4">
              <FontAwesome6Icon name="list-check" size={16} color={colors.colors.main} />
              <Text className="text-text-light-light dark:text-text-light-dark text-xl font-bold">
                {t("PlansScreen.features")}
              </Text>
            </View>

            <PlanFeature text={t("PlansScreen.selectUpTo2SkillsToLearn")}></PlanFeature>
            <PlanFeature text={t("PlansScreen.selectUpTo2SkillsToTeach")}></PlanFeature>
            <PlanFeature text={t("PlansScreen.commissionOnPaidSkillTrades")}></PlanFeature>
            <PlanFeature text={t("PlansScreen.oneActiveSkillTrade")}></PlanFeature>
            <PlanFeature text={t("PlansScreen.noProBadge")} notIncluded={true}></PlanFeature>
          </View>

          <View className="p-6 justify-center items-center">
            <Pressable className="w-full bg-input-bg-light dark:bg-input-bg-dark rounded-lg py-3 px-4">
              <Text className="text-text-secondary-light dark:text-text-secondary-dark text-center">
                {t("PlansScreen.stayOnFreePlan")}
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="border border-card-content-border-light dark:border-card-border-dark rounded-lg my-4">
          <View className="p-6 border-b border-b-card-content-border-light dark:border-b-card-border-dark">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <Text className="text-text-light-light dark:text-text-light-dark font-bold text-2xl">
                  {t("PlansScreen.pro")}
                </Text>
                <FontAwesome6Icon name="star" size={16} color={colors.colors.main} solid />
              </View>
              <View className="rounded-full bg-main-color-light dark:bg-main-color-dark py-2 px-4 flex-row items-center gap-2">
                <FontAwesome6Icon name="award" size={16} color={colors.colors.textDark} />
                <Text className="text-text-dark-light-light dark:text-text-dark-dark text-sm font-bold">
                  {t("PlansScreen.bestValue")}
                </Text>
              </View>
            </View>
            <Text className="text-text-light-light dark:text-text-light-dark text-4xl my-4 font-bold">
              $9.99{" "}
              <Text className="text-xl font-medium text-text-primary-light dark:text-text-primary-dark">
                {t("PlansScreen.perMonth")}
              </Text>
            </Text>
            <Text className="text-text-primary-light dark:text-text-primary-dark text-xl">
              {t("PlansScreen.proDescription")}
            </Text>
          </View>

          <View className="p-6 border-b border-b-card-content-border-light dark:border-b-card-border-dark">
            <View className="flex-row gap-2 items-center mb-4">
              <FontAwesome6Icon name="rocket" size={16} color={colors.colors.main} />
              <Text className="text-text-light-light dark:text-text-light-dark text-xl font-bold">
                {t("PlansScreen.proFeatures")}
              </Text>
            </View>

            <PlanFeature
              text={t("PlansScreen.skillsToLearn")}
              bold={t("PlansScreen.unlimited")}
            ></PlanFeature>
            <PlanFeature
              text={t("PlansScreen.skillsToTeach")}
              bold={t("PlansScreen.unlimited")}
            ></PlanFeature>
            <PlanFeature
              text={t("PlansScreen.onPaidTrades")}
              bold={t("PlansScreen.noCommissions")}
            ></PlanFeature>
            <PlanFeature
              text={t("PlansScreen.activeSkillTrades")}
              bold={t("PlansScreen.unlimited")}
            ></PlanFeature>
            <PlanFeature bold={t("PlansScreen.proVerificationBadge")} badge={true}></PlanFeature>
          </View>

          <View className="p-6 justify-center items-center">
            <Pressable className="w-full bg-main-color-light dark:bg-main-color-dark rounded-lg py-3 px-4">
              <Text className="text-text-light-light dark:text-text-light-dark text-center font-bold">
                {t("PlansScreen.upgradeToPro")}
              </Text>
            </Pressable>
          </View>
        </View>

        <Text className="text-text-light-light dark:text-text-light-dark font-bold text-center text-3xl mt-8 mb-2">
          {t("PlansScreen.planComparison")}
        </Text>

        <View className="border border-card-border-light dark:border-card-border-dark my-4 py-6 rounded-lg">
          <View className="flex-row items-center px-6">
            <Text
              className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold"
              style={{ flexBasis: "50%" }}
            >
              {t("PlansScreen.feature")}
            </Text>
            <Text
              className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold text-center"
              style={{ flexBasis: "25%" }}
            >
              {t("PlansScreen.free")}
            </Text>
            <Text
              className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold text-center"
              style={{ flexBasis: "25%" }}
            >
              {t("PlansScreen.pro")}
            </Text>
          </View>

          <View className="flex-row items-center border-t border-t-card-content-border-light dark:border-t-card-border-dark pt-4 mt-4 px-6">
            <Text
              className="text-text-light-light dark:text-text-light-dark text-xl font-bold"
              style={{ flexBasis: "50%" }}
            >
              {t("PlansScreen.skillsToLearn")}
            </Text>
            <Text
              className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold text-center"
              style={{ flexBasis: "25%" }}
            >
              2
            </Text>
            <Text
              className="text-main-color-light dark:text-main-color-dark text-xl font-medium text-center"
              style={{ flexBasis: "25%" }}
            >
              {t("PlansScreen.unlimited")}
            </Text>
          </View>

          <View className="flex-row items-center border-t border-t-card-content-border-light dark:border-t-card-border-dark pt-4 mt-4 px-6">
            <Text
              className="text-text-light-light dark:text-text-light-dark text-xl font-bold"
              style={{ flexBasis: "50%" }}
            >
              {t("PlansScreen.skillsToTeach")}
            </Text>
            <Text
              className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold text-center"
              style={{ flexBasis: "25%" }}
            >
              2
            </Text>
            <Text
              className="text-main-color-light dark:text-main-color-dark text-xl font-medium text-center"
              style={{ flexBasis: "25%" }}
            >
              {t("PlansScreen.unlimited")}
            </Text>
          </View>

          <View className="flex-row items-center border-t border-t-card-content-border-light dark:border-t-card-border-dark pt-4 mt-4 px-6">
            <Text
              className="text-text-light-light dark:text-text-light-dark text-xl font-bold"
              style={{ flexBasis: "50%" }}
            >
              {t("PlansScreen.commissionRate")}
            </Text>
            <Text
              className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold text-center"
              style={{ flexBasis: "25%" }}
            >
              20%
            </Text>
            <Text
              className="text-main-color-light dark:text-main-color-dark text-xl font-medium text-center"
              style={{ flexBasis: "25%" }}
            >
              0%
            </Text>
          </View>

          <View className="flex-row items-center border-t border-t-card-content-border-light dark:border-t-card-border-dark pt-4 mt-4 px-6">
            <Text
              className="text-text-light-light dark:text-text-light-dark text-xl font-bold"
              style={{ flexBasis: "50%" }}
            >
              {t("PlansScreen.activeTrades")}
            </Text>
            <Text
              className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold text-center"
              style={{ flexBasis: "25%" }}
            >
              1
            </Text>
            <Text
              className="text-main-color-light dark:text-main-color-dark text-xl font-medium text-center"
              style={{ flexBasis: "25%" }}
            >
              {t("PlansScreen.unlimited")}
            </Text>
          </View>

          <View className="flex-row items-center border-t border-t-card-content-border-light dark:border-t-card-border-dark pt-4 mt-4 px-6">
            <Text
              className="text-text-light-light dark:text-text-light-dark text-xl font-bold"
              style={{ flexBasis: "50%" }}
            >
              {t("PlansScreen.proBadge")}
            </Text>
            <FontAwesome6Icon
              name="xmark"
              size={16}
              color={colors.colors.textPrimary}
              style={{ flexBasis: "25%" }}
              className="text-center"
            ></FontAwesome6Icon>
            <FontAwesome6Icon
              name="check"
              size={16}
              color={colors.colors.main}
              style={{ flexBasis: "25%" }}
              className="text-center"
            ></FontAwesome6Icon>
          </View>
        </View>

        <Text className="text-text-light-light dark:text-text-light-dark font-bold text-center text-3xl mt-8 mb-2">
          {t("PlansScreen.faq")}
        </Text>

        <PlanFAQ
          question={t("PlansScreen.faqSwitchQuestion")}
          answer={t("PlansScreen.faqSwitchAnswer")}
        ></PlanFAQ>

        <PlanFAQ
          question={t("PlansScreen.faqCommissionQuestion")}
          answer={t("PlansScreen.faqCommissionAnswer")}
        ></PlanFAQ>

        <PlanFAQ
          question={t("PlansScreen.faqLimitQuestion")}
          answer={t("PlansScreen.faqLimitAnswer")}
        ></PlanFAQ>
      </ScrollView>
    </View>
  )
}
