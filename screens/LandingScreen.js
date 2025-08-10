import { ImageBackground, ScrollView, Text, TouchableOpacity, View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import GradientBackground from "../components/GradientBackground";
import Card from "../components/Card";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const LandingScreen = () => {
  const navigate = useNavigation();
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const colors = themeColors(theme);
  const isRTL = i18n.dir() === 'rtl';

  const howWorks = [
    {
      title: t("HowWorksCards.card1.title"),
      description: t("HowWorksCards.card1.description"),
      icon: <Feather name="users" size={26} color={theme === 'dark' ? "black" : "white"} />,
    },
    {
      title: t("HowWorksCards.card2.title"),
      description: t("HowWorksCards.card2.description"),
      icon: <FontAwesome6 name="lightbulb" size={26} color={theme === 'dark' ? "black" : "white"} />,
    },
    {
      title: t("HowWorksCards.card3.title"),
      description: t("HowWorksCards.card3.description"),
      icon: <FontAwesome6 name="handshake" size={26} color={theme === 'dark' ? "black" : "white"} />,
    }
  ]

  const successStories = [
    {
      title: t("SuccessStoriesCards.card1.title"),
      description: t("SuccessStoriesCards.card1.description"),
      image: require("../assets/images/success-1.png")
    },
    {
      title: t("SuccessStoriesCards.card2.title"),
      description: t("SuccessStoriesCards.card2.description"),
      image: require("../assets/images/success-2.png")
    },
    {
      title: t("SuccessStoriesCards.card3.title"),
      description: t("SuccessStoriesCards.card3.description"),
      image: require("../assets/images/success-3.png")
    },
    {
      title: t("SuccessStoriesCards.card4.title"),
      description: t("SuccessStoriesCards.card4.description"),
      image: require("../assets/images/success-4.jpg")
    },
    {
      title: t("SuccessStoriesCards.card5.title"),
      description: t("SuccessStoriesCards.card5.description"),
      image: require("../assets/images/success-5.jpg")
    },
    {
      title: t("SuccessStoriesCards.card6.title"),
      description: t("SuccessStoriesCards.card6.description"),
      image: require("../assets/images/success-6.jpg")
    }
  ]

  return (
    <ScrollView style={{ flex: 1 }}>
      <GradientBackground />
      <View className="w-full" style={{ height: 350 }}>
        <ImageBackground
          source={require("../assets/images/landing.jpeg")}
          className="w-full h-full"
          resizeMode="cover"
        >
          <View className="flex-1 w-full h-full bg-black/55 px-4 py-4">
            <View className="flex-1 items-center justify-center">
              <Text className="font-normal text-center text-neutral-400 dark:text-text-primary-dark text-xl">
                {t("HeroSection.description")}
              </Text>
            </View>

            <View className="w-full items-center">
              <TouchableOpacity onPress={() => navigate.navigate("Matches")} className="bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark mb-10 w-32 h-10 items-center justify-center rounded-lg">
                <Text className="text-white">{t("HeroSection.button")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View className="w-full p-2">
        <Text className={`font-medium text-2xl m-3 text-main-color-light dark:text-main-color-dark ${isRTL ? 'text-right' : 'text-left'}`}>{t("HowWorkSection.title")}</Text>
        <Text className={`text-text-secondary-light dark:text-text-secondary-dark ml-3 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t("HowWorkSection.description")}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {howWorks.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </ScrollView>
      </View>

      <View className="w-full p-2 mb-3">
        <Text className={`font-medium text-2xl m-3 text-main-color-light dark:text-main-color-dark ${isRTL ? 'text-right' : 'text-left'}`}>{t("SuccessStoriesSection.title")}</Text>
        <Text className={`text-text-secondary-light dark:text-text-secondary-dark ml-3 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t("SuccessStoriesSection.description")}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {successStories.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </ScrollView>
      </View>

    </ScrollView>
  );
};

export default LandingScreen;
