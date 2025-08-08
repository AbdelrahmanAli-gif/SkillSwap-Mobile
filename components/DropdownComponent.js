import { useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { theme } from '../theme';

const DropdownComponent = ({ skills, placeholder, onChange, property }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text className={`bg-[#1a1a17] absolute top-1 left-8 z-10 px-2 text-text-primary`}>
          {placeholder}
        </Text >
      );
    }
    return null;
  };

  return (
    <View className="p-4">
      {renderLabel()}

      <Dropdown
        className="px-4 py-2 border border-gray-300 rounded-lg"
        style={{ borderColor: 'gray', borderWidth: 0.5, borderRadius: 8, padding: 15, backgroundColor: theme.colors.inputBg }}
        placeholderStyle={{ color: theme.colors.textSecondary }}
        selectedTextStyle={{ color: theme.colors.textPrimary }}
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
