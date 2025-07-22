import { Image, Pressable, Text, TextInput, View } from "react-native"
import { useState } from "react"
import * as ImagePicker from "expo-image-picker"
import Toast from "react-native-toast-message"

export default function PictureBio({ info, setInfo }) {
  const [photo, setPhoto] = useState(null)

  const pickImage = async () => {
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permissionResult.granted) {
      Toast.show({
        type: "error",
        text1: "Permission required",
        text2: "Permission to access gallery is required!",
      })
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setPhoto(result.assets[0].uri)
      setInfo((prev) => ({ ...prev, photo: result.assets[0].uri }));
    }
  }

  const handleBioChange = (text) => {
    setInfo((prev) => ({ ...prev, bio: text }));
  }

  return (
    <View className="bg-[#F7FAFC] flex-1 p-6">
      <Pressable className="flex-row items-center justify-start gap-6" onPress={pickImage}>
        <Image source={require("../../assets/avatar.png")} className="w-16 h-16"></Image>
        <Text className="text-xl font-normal">Upload a profile picture</Text>
      </Pressable>

      <TextInput
        className="mt-6 p-4 bg-[#E8EDF5] rounded-lg text-base h-48 text-black overflow-y-scroll"
        multiline
        placeholder="Write a bio"
        placeholderTextColor={"#46586D"}
        textAlignVertical="top"
        value={info.bio}
        onChangeText={(text) => handleBioChange(text)}
      ></TextInput>
    </View>
  )
}
