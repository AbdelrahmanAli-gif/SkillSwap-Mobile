import { View, Pressable, TextInput } from "react-native"
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import Icon from "react-native-vector-icons/Feather"
import { useTranslation } from "react-i18next";

export default function SearchInput({ searchFunction, placeholderText, inputState, setInputState }) {
  const { theme } = useTheme();
  const colors = themeColors(theme);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <View className="mt-4 mb-2 bg-input-bg-light dark:bg-input-bg-dark rounded-lg py-2 px-4 flex-row items-center justify-start">
      <Pressable onPress={searchFunction}>
        <Icon name="search" size={20} color={colors.colors.textSecondary} />
      </Pressable>
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor={colors.colors.textSecondary}
        className={`flex-1 text-text-primary-light dark:text-text-primary-dark ${isRTL ? 'text-right mr-4' : 'text-left ml-4'}`}
        value={inputState}
        onChangeText={setInputState}
      />
    </View>
  )
}
