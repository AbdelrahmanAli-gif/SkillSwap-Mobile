import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { theme as themeColors } from '../theme';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

const MilestoneContent = ({ milestone, teaching = false, milestonesState, setMilestonesState }) => {
    const [checked, setChecked] = useState(milestone.isCompleted);
    const [data, setData] = useState({ title: milestone.title, description: milestone.description });
    const [editing, setEditing] = useState(false);
    const { theme } = useTheme();
    const colors = themeColors(theme);
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';

    const deleteMilestone = () => {
        const filteredMilestones = milestonesState.filter((currentMilestone) => currentMilestone.id != milestone.id);
        setMilestonesState(filteredMilestones);
    }

    const editMilestone = () => {
        const updatedMilestones = milestonesState.map((currentMilestone) => {
            if (currentMilestone.id === milestone.id) {
                return { ...currentMilestone, ...data };
            }
            return currentMilestone;
        });
        setEditing(false);
        Toast.show({ type: 'success', text1: t("feedback.milestoneUpdate") });
        setMilestonesState(updatedMilestones);
    };

    const toggleChecked = (status) => {
        setChecked(status);
        const updatedMilestones = milestonesState.map((currentMilestone) => {
            if (currentMilestone.id === milestone.id)
                return { ...currentMilestone, isCompleted: status };
            return currentMilestone;
        })
        setMilestonesState(updatedMilestones);
    }

    return (
        <View className="w-full bg-card-background-light dark:bg-gray-950/35 rounded-lg flex-row mt-3 items-center gap-2" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <CheckBox tintColors={{ true: colors.colors.main }} onValueChange={toggleChecked} value={checked} />

            <View className="w-10/12">
                <View className="w-full flex-row justify-between">
                    {editing ? (
                        <TextInput
                            value={data.title}
                            onChangeText={(text) => setData({ ...data, title: text })}
                            multiline
                            className="flex-1 text-lg font-bold text-text-primary-light dark:text-text-primary-dark bg-input-bg-light rounded-md dark:bg-input-bg-dark px-2 py-1 mt-2"
                        />
                    ) : (
                        <Text
                            className="flex-1 font-bold text-text-primary-light dark:text-text-primary-dark text-lg mt-2"
                        >
                            {milestone.title}
                        </Text>
                    )}
                    {
                        teaching && (
                            <View className="flex-row w-2/12 items-center justify-around mx-2" >
                                {editing ? (
                                    <FontAwesome6Icon
                                        onPress={editMilestone}
                                        color={colors.colors.textSecondary}
                                        size={16}
                                        name="check"
                                    />
                                ) : (
                                    <FontAwesome6Icon
                                        onPress={() => setEditing(true)}
                                        color={colors.colors.textSecondary}
                                        size={16}
                                        name="edit"
                                    />
                                )}
                                <FontAwesome6Icon onPress={deleteMilestone} color={colors.colors.textSecondary} size={16} name='trash' />
                            </View>
                        )
                    }
                </View>
                {editing ? (
                    <TextInput
                        value={data.description}
                        onChangeText={(text) => setData({ ...data, description: text })}
                        multiline
                        className="text-text-secondary-light w-11/12 dark:text-text-secondary-dark my-2 bg-input-bg-light rounded-md dark:bg-input-bg-dark px-2 py-1"
                    />
                ) : (
                    <Text className="text-text-secondary-light w-11/12 dark:text-text-secondary-dark my-2">
                        {milestone.description}
                    </Text>
                )}
            </View>
        </View>
    );
}

export default MilestoneContent;
