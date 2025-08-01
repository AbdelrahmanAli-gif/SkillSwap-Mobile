import { ImageBackground, ScrollView, Text, TouchableOpacity, View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GradientBackground from "../components/GradientBackground";
import Card from "../components/Card";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const howWorks = [
  {
    title: "Connect with Experts",
    description: "Find skilled individuals ready to share their knowledge in various fields.",
    icon: <Feather name="users" size={26} color="black" />,
  },
  {
    title: "Explore Diverse Skills",
    description: "From coding to cooking, discover a wide range of skills to learn and master.",
    icon: <FontAwesome6 name="lightbulb" size={26} color="black" />,
  },
  {
    title: "Collaborate and Grow",
    description: "Engage in collaborative learning experiences that foster growth and development.",
    icon: <FontAwesome6 name="handshake" size={26} color="black" />,
  }
]

const successStories = [
  {
    title: "Photography Enthusiast",
    description: "Sarah, a passionate photographer, taught her skills to aspiring artists and gained new perspectives .",
    image: require("../assets/images/success-1.png")
  },
  {
    title: "Coding Mentor",
    description: "Mark, an experienced software developer, mentored beginners and enhanced his teaching.",
    image: require("../assets/images/success-2.png")
  },
  {
    title: "Yoga Instructor",
    description: "Emily, a certified yoga instructor, expanded her reach and connected with students globally.",
    image: require("../assets/images/success-3.png")
  },
  {
    title: "Painting Passion",
    description: "Layla shared her love for watercolor painting, helping beginners express themselves creatively.",
    image: require("../assets/images/success-4.jpg")
  },
  {
    title: "Guitar Guru",
    description: "Omar offered beginner guitar lessons to fellow learners and got free singing tips from vocalists .",
    image: require("../assets/images/success-5.jpg")
  },
  {
    title: "Swimming Coach",
    description: "Kareem taught swimming techniques online and received nutritional coaching in exchange.",
    image: require("../assets/images/success-6.jpg")
  }
]

const LandingScreen = () => {
  const navigate = useNavigation();
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
              <Text className="font-normal text-center text-text-primary text-xl">
                Join our community of learners and experts to exchange skills,
                discover new passion, and achieve your goals
              </Text>
            </View>

            <View className="w-full items-center">
              <TouchableOpacity onPress={() => navigate.navigate("Matches")} className="bg-btn-submit-bg mb-10 w-32 h-10 items-center justify-center rounded-lg">
                <Text className="text-white">Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View className="w-full p-2">
        <Text className="font-medium text-2xl m-3 text-main-color">How Swapoo Works</Text>
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
        <Text className="font-medium text-2xl m-3 text-main-color">Success Stories</Text>
        <Text className="text-text-secondary ml-3 mb-3">See how SkillSwap has transformed lives by enabling skill sharing and personal growth.</Text>
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
