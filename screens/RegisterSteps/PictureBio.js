import { Image, Pressable, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "../../contexts/ThemeContext";
import { theme as themeColors } from "../../theme";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

export default function PictureBio({ info, setInfo, setIsStepValid }) {
  const [photo, setPhoto] = useState(info.profilePicture || null);
  const { control, formState: { errors, isValid } } = useForm({
    defaultValues: { bio: info.bio || "" },
    mode: "onChange",
  });
  const { theme } = useTheme();
  const colors = themeColors(theme);

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
      setInfo((prev) => ({ ...prev, profilePicture: result.assets[0].uri }));
    }
  };

  return (
    <View className="flex-1 p-6">
      <Pressable className="flex-row items-center justify-start gap-6" onPress={pickImage}>
        {photo ?
          <Image source={{ uri: photo }} className="w-16 h-16 rounded-full" />
          :
          <View className="w-16 h-16 bg-amber-800 rounded-full items-center justify-center">
            <Text className="text-4xl font-semibold text-white">{info.name.charAt(0).toUpperCase()}</Text>
          </View>
        }
        <Text className="text-xl font-normal text-text-primary-light dark:text-text-primary-dark">Upload a profile picture</Text>
      </Pressable>

      <Controller
        control={control}
        name="bio"
        rules={{ required: "Bio is required." }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="mt-6 p-4 bg-input-bg-light dark:bg-input-bg-dark rounded-lg text-base h-48 text-text-primary-light dark:text-text-primary-dark"
            multiline
            placeholder="Write a bio"
            placeholderTextColor={colors.colors.textSecondary}
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
