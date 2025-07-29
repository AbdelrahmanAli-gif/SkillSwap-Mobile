import { View, Pressable, TextInput } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { theme } from "../theme"

export default function SearchInput({
  searchFunction,
  placeholderText,
  inputState,
  setInputState,
}) {
  return (
    <View className="mt-4 mb-2 bg-input-bg rounded-lg py-2 px-4 flex-row items-center justify-start">
      <Pressable onPress={searchFunction}>
        <Icon name="search" size={20} color={theme.colors.textSecondary} />
      </Pressable>
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor={theme.colors.textSecondary}
        className="flex-1 ml-4 text-text-primary"
        value={inputState}
        onChangeText={setInputState}
      />
    </View>
  )
}
