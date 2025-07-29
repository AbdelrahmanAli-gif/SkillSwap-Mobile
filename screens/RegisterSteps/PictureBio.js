import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { theme } from "../../theme";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

export default function PictureBio({ info, setInfo, setIsStepValid }) {
  const [photo, setPhoto] = useState(info.photo || null);
  const { control, formState: { errors, isValid } } = useForm({
    defaultValues: { bio: info.bio || "" },
    mode: "onChange", // allows real-time validation feedback
  });

  useEffect(() => {
    setIsStepValid(isValid);
  }, [isValid]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Toast.show({
        type: "error",
        text1: "Permission required",
        text2: "Permission to access gallery is required!",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setInfo((prev) => ({ ...prev, photo: result.assets[0].uri }));
    }
  };

  return (
    <View className="flex-1 p-6">
      <Pressable className="flex-row items-center justify-start gap-6" onPress={pickImage}>
        <Image source={require("../../assets/avatar.png")} className="w-16 h-16" />
        <Text className="text-xl font-normal text-text-primary">Upload a profile picture</Text>
      </Pressable>

      <Controller
        control={control}
        name="bio"
        rules={{ required: "Bio is required." }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="mt-6 p-4 bg-input-bg rounded-lg text-base h-48 text-text-primary"
            multiline
            placeholder="Write a bio"
            placeholderTextColor={theme.colors.textSecondary}
            textAlignVertical="top"
            value={value}
            onChangeText={(text) => {
              onChange(text);
              setInfo((prev) => ({ ...prev, bio: text }));
            }}
          />
        )}
      />
      {errors.bio && (
        <Text className="text-red-500 mt-2">{errors.bio.message}</Text>
      )}
    </View>
  );
}
