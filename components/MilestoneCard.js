import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { theme as themeColors } from '../theme';
import { v4 as uuid } from 'uuid';
import * as Progress from "react-native-progress";
import MilestoneContent from './MilestoneContent';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const MilestoneCard = ({ tradeId, teaching, skill, skillLevel, milestonesState, setMilestonesState }) => {
    const [adding, setAdding] = useState(false);
    const [newMilestone, setNewMilestone] = useState({});
    const { theme } = useTheme();
    const colors = themeColors(theme);
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';
    const completedMilestones = milestonesState.reduce((total, milestone) => total += milestone.isCompleted ? 1 : 0, 0)

    const handleCancel = () => {
        setAdding(false);
        setNewMilestone({});
    }

    const handleAdd = () => {
        setMilestonesState([...milestonesState, { AI: false, isCompleted: false, price: 0, id: uuid(), ...newMilestone }]);
        setAdding(false);
        setNewMilestone({});
    }

    return (
        <View className="mt-6 items-center border border-main-color-light/50 dark:border-main-color-dark/50 rounded-lg" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <View className="flex-row items-center justify-between w-full h-14 px-2 bg-card-background-light dark:bg-gray-950/35 border-b border-text-secondary-light dark:border-text-secondary-dark">
                <Text className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold text-center">{teaching ? t("MilestoneScreen.skillTeaching") : t("MilestoneScreen.skillLearning")}: {skill}</Text>
                <Text className="text-text-primary-light dark:text-text-primary-dark font-bold">{skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)}</Text>
            </View>
            <View className="items-center justify-between w-full px-2 mt-2">
                <View className="flex-row items-center justify-between w-full">
                    <Text className="text-text-secondary-light dark:text-text-secondary-dark text-center">{t("MilestoneScreen.progress")}</Text>
                    <Text className="text-text-secondary-light dark:text-text-secondary-dark font-bold">{completedMilestones}/{milestonesState.length} {t("MilestoneScreen.milestones")}</Text>
                </View>
                <Progress.Bar className="mt-3" progress={milestonesState.length > 0 ? (completedMilestones / milestonesState.length) : 0} color={colors.colors.main} width={340} />
            </View>
            <View className="flex-row w-full px-4 items-center justify-between mt-2">
                <Text className="text-text-secondary-light dark:text-text-secondary-dark font-bold">{t("MilestoneScreen.milestones")}</Text>
                <FontAwesome onPress={() => setAdding(true)} name="plus" size={16} color={colors.colors.textSecondary} />
            </View>
            {adding &&
                <View className="bg-card-background-light dark:bg-gray-950/35 w-[95%] rounded-lg p-4 gap-2 mt-2">
                    <TextInput onChangeText={(title) => setNewMilestone({ ...newMilestone, title })} placeholder='Title' className="bg-input-bg-light dark:bg-input-bg-dark text-text-primary-light dark:text-text-primary-dark p-2 rounded" />
                    <TextInput onChange={(e) => setNewMilestone({ ...newMilestone, description: e.nativeEvent.text })} multiline textAlignVertical='top' placeholder='Description' className="h-32 bg-input-bg-light dark:bg-input-bg-dark text-text-primary-light dark:text-text-primary-dark p-2 rounded" />
                    <View className="flex-row items-center gap-2 justify-end">
                        <TouchableOpacity
                            onPress={handleAdd}
                            className="bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark px-3 py-1 rounded-lg self-start"
                        >
                            <Text className="text-white">Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleCancel}
                            className="bg-btn-submit-hover-light dark:bg-btn-submit-hover-dark px-3 py-1 rounded-lg self-start"
                        >
                            <Text className="text-white">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            <View className="items-center my-2">
                {milestonesState?.length > 0 ? (
                    milestonesState.map((milestone) =>
                        <MilestoneContent
                            setMilestonesState={setMilestonesState}
                            milestonesState={milestonesState}
                            key={milestone.id}
                            milestone={milestone}
                            teaching={teaching}
                        />
                    )
                ) : (
                    <ActivityIndicator color={colors.colors.main} />
                )}
            </View>
        </View>
    );
}

export default MilestoneCard;
