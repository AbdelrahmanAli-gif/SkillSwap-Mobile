import { View, Pressable, TextInput } from "react-native"
import Icon from "react-native-vector-icons/Feather"

export default function SearchInput({
  searchFunction,
  placeholderText,
  inputState,
  setInputState,
}) {
  return (
    <View className="mt-6 bg-[#E8EDF5] rounded-lg p-2 px-4 flex-row items-center justify-start">
      <Pressable onPress={searchFunction}>
        <Icon name="search" size={30} color="#4A709C"></Icon>
      </Pressable>
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor="#4A709C"
        className="flex-1 ml-4 text-xl text-black"
        value={inputState}
        onChangeText={setInputState}
      ></TextInput>
    </View>
  )
}
