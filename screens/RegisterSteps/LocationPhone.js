import { View, Text, ScrollView } from 'react-native';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from "../../contexts/ThemeContext";
import { theme as themeColors } from "../../theme";
import LocationInput from '../../components/LocationInput';
import PhoneInput from '../../components/PhoneInput';

const experienceLevels = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
];

const LocationPhone = ({ info, setInfo, setIsStepValid }) => {
    const {
        control,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            location: info.location.city && info.location.country ? `${info.location.city}, ${info.location.country}` : info.location || '',
            phone: info.phone || '',
        },
        mode: 'onChange',
    });
    const { theme } = useTheme();
    const colors = themeColors(theme);

    useEffect(() => {
        setIsStepValid(isValid);
    }, [isValid]);

    useEffect(() => {
        const subscription = watch((values) => {
            setInfo((prev) => ({ ...prev, ...values }));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <ScrollView className="gap-3">
            <Controller
                control={control}
                name="location"
                rules={{ required: 'Location is required' }}
                render={({ field: { onChange, value } }) => (
                    <LocationInput value={value} onChange={onChange} />
                )}
            />
            {errors.location && <Text className="text-red-500 ml-4 -mt-1">Location is required</Text>}

            <Controller
                control={control}
                name="phone"
                rules={{ required: 'Phone is required' }}
                render={({ field: { onChange, value } }) => (
                    <PhoneInput value={value} onChange={onChange} />
                )}
            />
            {errors.phone && <Text className="text-red-500 ml-4 -mt-1">Phone is required</Text>}

            {(info.needSkills?.length > 0 || info.newSkillsToLearn?.length > 0) && (
                <View className="p-4 gap-2">
                    <Text className="text-lg font-bold mb-2 text-main-color-light dark:text-main-color-dark">Skills to learn</Text>
                    {info.needSkills?.map((skill, index) => (
                        <View key={skill.skillId} className="mb-4">
                            <Text className="mb-1 font-medium capitalize text-text-secondary-light dark:text-text-secondary-dark">{skill.skillName}</Text>
                            <Dropdown
                                style={{
                                    backgroundColor: colors.colors.inputBg,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    paddingHorizontal: 12,
                                    height: 40,
                                }}
                                placeholderStyle={{
                                    color: colors.colors.textSecondary,
                                    fontSize: 14,
                                }}
                                selectedTextStyle={{
                                    color: colors.colors.textPrimary,
                                    fontSize: 14,
                                }}
                                data={experienceLevels}
                                labelField="label"
                                valueField="value"
                                value={skill.skillLevel || 'beginner'}
                                placeholder="Select experience"
                                onChange={(item) => {
                                    const updatedSkills = [...info.needSkills];
                                    updatedSkills[index] = {
                                        ...updatedSkills[index],
                                        skillLevel: item.value,
                                    };
                                    setInfo((prev) => ({
                                        ...prev,
                                        needSkills: updatedSkills,
                                    }));
                                }}
                            />
                        </View>
                    ))}

                    {info.newSkillsToLearn?.map((skill, index) => (
                        <View key={index} className="mb-4">
                            <Text className="mb-1 font-medium capitalize text-text-secondary-light dark:text-text-secondary-dark">{skill.skillName}</Text>
                            <Dropdown
                                style={{
                                    backgroundColor: colors.colors.inputBg,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    paddingHorizontal: 12,
                                    height: 40,
                                }}
                                placeholderStyle={{
                                    color: colors.colors.textSecondary,
                                    fontSize: 14,
                                }}
                                selectedTextStyle={{
                                    color: colors.colors.textPrimary,
                                    fontSize: 14,
                                }}
                                data={experienceLevels}
                                labelField="label"
                                valueField="value"
                                value={skill.skillLevel || 'beginner'}
                                placeholder="Select experience"
                                onChange={(item) => {
                                    const updatedNewSkills = [...info.newSkillsToLearn];
                                    updatedNewSkills[index] = {
                                        ...updatedNewSkills[index],
                                        skillLevel: item.value,
                                    };
                                    setInfo((prev) => ({
                                        ...prev,
                                        newSkillsToLearn: updatedNewSkills,
                                    }));
                                }}
                            />
                        </View>
                    ))}
                </View>
            )}

            {(info.hasSkills?.length > 0 || info.newSkillsToTeach?.length) > 0 && (

                <View className="p-4 gap-2">
                    <Text className="text-lg font-bold mb-2 text-main-color-light dark:text-main-color-dark">Skills to teach</Text>
                    {info.hasSkills?.map((skill, index) => (
                        <View key={skill.skillId} className="mb-4">
                            <Text className="mb-1 font-medium capitalize text-text-secondary-light dark:text-text-secondary-dark">{skill.skillName}</Text>
                            <Dropdown
                                style={{
                                    backgroundColor: colors.colors.inputBg,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    paddingHorizontal: 12,
                                    height: 40,
                                }}
                                placeholderStyle={{
                                    color: colors.colors.textSecondary,
                                    fontSize: 14,
                                }}
                                selectedTextStyle={{
                                    color: colors.colors.textPrimary,
                                    fontSize: 14,
                                }}
                                containerStyle={{ borderRadius: 8 }}
                                data={experienceLevels}
                                labelField="label"
                                valueField="value"
                                value={skill.skillLevel || 'beginner'}
                                placeholder="Select experience"
                                onChange={(item) => {
                                    const updatedSkills = [...info.hasSkills];
                                    updatedSkills[index] = {
                                        ...updatedSkills[index],
                                        skillLevel: item.value,
                                    };
                                    setInfo((prev) => ({
                                        ...prev,
                                        hasSkills: updatedSkills,
                                    }));
                                }}
                            />
                        </View>
                    ))}

                    {info.newSkillsToTeach?.map((skill, index) => (
                        <View key={index} className="mb-4">
                            <Text className="mb-1 font-medium capitalize text-text-secondary-light dark:text-text-secondary-dark">{skill.skillName}</Text>
                            <Dropdown
                                style={{
                                    backgroundColor: colors.colors.inputBg,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    paddingHorizontal: 12,
                                    height: 40,
                                }}
                                placeholderStyle={{
                                    color: colors.colors.textSecondary,
                                    fontSize: 14,
                                }}
                                selectedTextStyle={{
                                    color: colors.colors.textPrimary,
                                    fontSize: 14,
                                }}
                                containerStyle={{ borderRadius: 8 }}
                                data={experienceLevels}
                                labelField="label"
                                valueField="value"
                                value={skill.skillLevel || 'beginner'}
                                placeholder="Select experience"
                                onChange={(item) => {
                                    const updatedNewSkills = [...info.newSkillsToTeach];
                                    updatedNewSkills[index] = {
                                        ...updatedNewSkills[index],
                                        skillLevel: item.value,
                                    };
                                    setInfo((prev) => ({
                                        ...prev,
                                        newSkillsToTeach: updatedNewSkills,
                                    }));
                                }}
                            />
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

export default LocationPhone;
