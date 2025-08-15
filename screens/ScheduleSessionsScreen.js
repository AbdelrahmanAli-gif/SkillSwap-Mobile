import { Text, TextInput, TouchableOpacity, Image, View, ScrollView } from "react-native"
import { useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useAuth } from "../contexts/AuthContext"
import { createRequest } from "../utils/requestsUtils"
import { useTheme } from "../contexts/ThemeContext"
import { theme as themeColors } from "../theme"
import Icon from "react-native-vector-icons/FontAwesome5"
import Toast from "react-native-toast-message"
import DropdownComponent from "../components/DropdownComponent"
import GradientBackground from "../components/GradientBackground"
import { useTranslation } from "react-i18next"
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6"

const ScheduleSessionsScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { otherUser } = route.params
  const { user } = useAuth()
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("trade")
  const [request, setRequest] = useState({
    requestedSkill: null,
    offeredSkill: null,
    payment: null,
  })
  const { theme } = useTheme()
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === "rtl"
  const colors = themeColors(theme)

  const handleScheduleSession = async () => {
    setError(null)
    try {
      if (
        (request.requestedSkill && request.offeredSkill) ||
        (request.requestedSkill && request.payment)
      ) {
        if (user.subscribtion.plan === "free" && user.subscribtion.activeTradeCount > 0) {
          Toast.show({ type: "error", text1: t("ScheduleSessionScreen.activeTradeCountError") })
        } else {
          await createRequest(request, user, otherUser)
          Toast.show({ type: "success", text1: "Request sent successfully" })
          navigation.goBack()
        }
      } else
        throw new Error("Please select a skill to learn and a skill to offer or a payment method")
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  const handleRequestChange = (key, value) => {
    const newRequest = { ...request }
    if (key === "payment") newRequest.offeredSkill = null
    else if (key === "offeredSkill") newRequest.payment = null
    setRequest({ ...newRequest, [key]: value })
  }

  return (
    <View className="flex-1" style={{ marginTop: 30 }}>
      <GradientBackground />
      <ScrollView className="flex-1">
        <View className="w-full items-center justify-center my-4">
          <View className="w-36 h-36 rounded-full bg-gray-300 items-center justify-center">
            {otherUser.profilePicture ? (
              <Image
                className="w-36 h-36 rounded-full"
                source={{ uri: otherUser.profilePicture }}
              />
            ) : (
              <Text className="text-7xl font-semibold text-gray-900">
                {otherUser.name.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
        </View>

        <View className="w-full items-center justify-center mb-4 relative">
          <View className="flex-row gap-2 items-center">
            <Text className="text-3xl font-bold text-main-color-light dark:text-main-color-dark capitalize text-center">
              {otherUser.name}
            </Text>
            {otherUser.subscribtion.plan === "pro" && (
              <FontAwesome6Icon
                name="certificate"
                size={16}
                color={colors.colors.main}
                className="mt-1"
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat", { otherUser })}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark items-center justify-center rounded-full"
          >
            <Icon size={18} color="white" name="comment-dots" />
          </TouchableOpacity>
        </View>

        <Text className="text-text-secondary-light dark:text-text-secondary-dark text-lg text-center px-4">
          {otherUser.bio}
        </Text>

        {error && <Text className="text-red-500 text-center px-4">{error}</Text>}

        {otherUser.hasSkills?.length > 0 && (
          <DropdownComponent
            onChange={handleRequestChange}
            skills={otherUser.hasSkills}
            placeholder={t("ScheduleSessionScreen.skillToLearn")}
            property="requestedSkill"
          />
        )}

        <View
          className={`w-full justify-center items-center px-6 gap-4 mb-4 mt-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
        >
          <TouchableOpacity
            className={`${activeTab === "trade" ? "bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark" : "bg-btn-submit-hover-light dark:bg-btn-submit-hover-dark"} w-1/2 rounded-xl items-center justify-center h-12`}
            onPress={() => setActiveTab("trade")}
          >
            <Text className="text-white text-lg">{t("ScheduleSessionScreen.trade")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`${activeTab === "pay" ? "bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark" : "bg-btn-submit-hover-light dark:bg-btn-submit-hover-dark"} w-1/2 rounded-xl items-center justify-center h-12`}
            onPress={() => setActiveTab("pay")}
          >
            <Text className="text-white text-lg">{t("ScheduleSessionScreen.payment")}</Text>
          </TouchableOpacity>
        </View>

        {activeTab === "trade" ? (
          <DropdownComponent
            onChange={handleRequestChange}
            skills={user.hasSkills}
            placeholder={t("ScheduleSessionScreen.skillToOffer")}
            property="offeredSkill"
          />
        ) : (
          <></>
        )}

        <View className="w-full mt-6 items-center h-36 px-4">
          <TextInput
            onChangeText={(e) => handleRequestChange("notes", e)}
            textAlignVertical="top"
            multiline={true}
            placeholderTextColor={colors.colors.textSecondary}
            placeholder={t("ScheduleSessionScreen.notes")}
            className="bg-input-bg-light dark:bg-input-bg-dark w-full h-full rounded-lg placeholder:text-lg placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark p-4 text-text-primary-light dark:text-text-primary-dark"
            style={{ borderColor: "gray", borderWidth: 0.5 }}
          />
        </View>

        <View className="px-4 items-center mt-8 mb-16">
          <TouchableOpacity
            onPress={handleScheduleSession}
            className="w-full bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark h-12 rounded-xl items-center justify-center"
          >
            <Text className="text-white font-normal text-xl">
              {t("ScheduleSessionScreen.button")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default ScheduleSessionsScreen
