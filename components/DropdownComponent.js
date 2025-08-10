import { useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from "../theme";
import { useTranslation } from 'react-i18next';

const DropdownComponent = ({ skills, placeholder, onChange, property }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { theme } = useTheme();
  const colors = themeColors(theme);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text className={`${theme === 'dark' ? "bg-[#1a1a17]" : "bg-[#f3eae5]"} absolute top-1 ${isRTL ? "right-8 text-right" : "left-8 text-left"} z-10 px-2 text-text-primary-light dark:text-text-primary-dark`}>
          {placeholder}
        </Text>
      );
    }
    return null;
  };

  return (
    <View className="p-4" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {renderLabel()}

      <Dropdown
        className="px-4 py-2 border border-gray-300 rounded-lg"
        style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, padding: 15, backgroundColor: colors.colors.inputBg, }}
        placeholderStyle={{ color: colors.colors.textSecondary }}
        selectedTextStyle={{ color: colors.colors.textPrimary }}
        containerStyle={{ marginRight: isRTL ? 28 : 0, }}
        iconStyle={{ width: 20, height: 20 }}
        data={skills}
        maxHeight={300}
        labelField="skillName"
        valueField="skillName"
        placeholder={!isFocus ? placeholder : ''}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          const { _index, ...cleanItem } = item;
          onChange(property, cleanItem);
          setValue(item.skillName);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;
