import { View, Text, ScrollView } from 'react-native';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
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
            location: info.location || '',
            phone: info.phone || '',
        },
        mode: 'onChange',
    });

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

            {(info.skillsToLearn?.length > 0 || info.newSkillsToLearn?.length > 0) && (
                <View className="p-4 gap-2">
                    <Text className="text-lg font-bold mb-2">Skills to learn</Text>
                    {info.skillsToLearn?.map((skill, index) => (
                        <View key={skill.skillId} className="mb-4">
                            <Text className="mb-1 font-medium capitalize">{skill.skillName}</Text>
                            <Dropdown
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    paddingHorizontal: 12,
                                    height: 40,
                                }}
                                containerStyle={{ borderRadius: 8 }}
                                data={experienceLevels}
                                labelField="label"
                                valueField="value"
                                value={skill.experience || 'beginner'}
                                placeholder="Select experience"
                                onChange={(item) => {
                                    const updatedSkills = [...info.skillsToLearn];
                                    updatedSkills[index] = {
                                        ...updatedSkills[index],
                                        experience: item.value,
                                    };
                                    setInfo((prev) => ({
                                        ...prev,
                                        skillsToLearn: updatedSkills,
                                    }));
                                }}
                            />
                        </View>
                    ))}

                    {info.newSkillsToLearn?.map((skill, index) => (
                        <View key={index} className="mb-4">
                            <Text className="mb-1 font-medium capitalize">{skill.skillName}</Text>
                            <Dropdown
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    paddingHorizontal: 12,
                                    height: 40,
                                }}
                                containerStyle={{ borderRadius: 8 }}
                                data={experienceLevels}
                                labelField="label"
                                valueField="value"
                                value={skill.experience || 'beginner'}
                                placeholder="Select experience"
                                onChange={(item) => {
                                    const updatedNewSkills = [...info.newSkillsToLearn];
                                    updatedNewSkills[index] = {
                                        ...updatedNewSkills[index],
                                        experience: item.value,
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

            {(info.skillsToTeach?.length > 0 || info.newSkillsToTeach?.length) > 0 && (

                <View className="p-4 gap-2">
                    <Text className="text-lg font-bold mb-2">Skills to teach</Text>
                    {info.skillsToTeach?.map((skill, index) => (
                        <View key={skill.skillId} className="mb-4">
                            <Text className="mb-1 font-medium capitalize">{skill.skillName}</Text>
                            <Dropdown
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    paddingHorizontal: 12,
                                    height: 40,
                                }}
                                containerStyle={{ borderRadius: 8 }}
                                data={experienceLevels}
                                labelField="label"
                                valueField="value"
                                value={skill.experience || 'beginner'}
                                placeholder="Select experience"
                                onChange={(item) => {
                                    const updatedSkills = [...info.skillsToTeach];
                                    updatedSkills[index] = {
                                        ...updatedSkills[index],
                                        experience: item.value,
                                    };
                                    setInfo((prev) => ({
                                        ...prev,
                                        skillsToTeach: updatedSkills,
                                    }));
                                }}
                            />
                        </View>
                    ))}

                    {info.newSkillsToTeach?.map((skill, index) => (
                        <View key={index} className="mb-4">
                            <Text className="mb-1 font-medium capitalize">{skill.skillName}</Text>
                            <Dropdown
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 8,
                                    paddingHorizontal: 12,
                                    height: 40,
                                }}
                                containerStyle={{ borderRadius: 8 }}
                                data={experienceLevels}
                                labelField="label"
                                valueField="value"
                                value={skill.experience || 'beginner'}
                                placeholder="Select experience"
                                onChange={(item) => {
                                    const updatedNewSkills = [...info.newSkillsToTeach];
                                    updatedNewSkills[index] = {
                                        ...updatedNewSkills[index],
                                        experience: item.value,
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
