import { Image, Pressable, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import * as ImagePicker from "expo-image-picker"
import Toast from "react-native-toast-message"
import { useNavigation } from "@react-navigation/native"

export default function PictureBio() {
  const [photo, setPhoto] = useState(null)
  const navigation = useNavigation()
  const [bio, setBio] = useState("")

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setPhoto(result.assets[0].uri)
    }
  }

  return (
    <View className="bg-[#F7FAFC] flex-1 p-6 relative">
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
        value={bio}
        onChangeText={setBio}
      ></TextInput>

      <Pressable
        className="absolute bottom-6 bg-[#3B82F6] p-4 rounded-full w-full left-6 flex items-center"
        // onPress={() => navigation.navigate("")}
      >
        <Text className="text-white font-bold text-lg">Continue</Text>
      </Pressable>
    </View>
  )
}
