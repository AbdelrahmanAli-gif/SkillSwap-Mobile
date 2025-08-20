import { ActivityIndicator, Text, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { theme as themeColors } from '../theme';
import { useTranslation } from 'react-i18next';
import * as Progress from "react-native-progress";
import MilestoneContent from './MilestoneContent';

const MilestoneCard = ({ teaching = false, skill, skillLevel, milestonesState, setMilestonesState }) => {
    const { theme } = useTheme();
    const colors = themeColors(theme);
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';
    const completedMilestones = milestonesState.reduce((total, milestone) => total += milestone.isCompleted ? 1 : 0, 0)

    return (
        <View className="mt-6 items-center border border-main-color-light/50 dark:border-main-color-dark/50 rounded-lg" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <View className="flex-row items-center justify-between w-full h-14 px-2 bg-card-background-light dark:bg-gray-950/35 border-b border-text-secondary-light dark:border-text-secondary-dark">
                <Text className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold text-center">{teaching ? t("MilestoneScreen.skillTeaching") : t("MilestoneScreen.skillLearning")}: {skill}</Text>
                <Text className="text-text-primary-light dark:text-text-primary-dark font-bold">{skillLevel}</Text>
            </View>
            <View className="items-center justify-between w-full px-2 mt-2">
                <View className="flex-row items-center justify-between w-full">
                    <Text className="text-text-secondary-light dark:text-text-secondary-dark text-center">{t("MilestoneScreen.progress")}</Text>
                    <Text className="text-text-secondary-light dark:text-text-secondary-dark font-bold">{completedMilestones}/{milestonesState.length} {t("MilestoneScreen.milestones")}</Text>
                </View>
                <Progress.Bar className="mt-3" progress={milestonesState.length > 0 ? (completedMilestones / milestonesState.length) : 0} color={colors.colors.main} width={340} />
            </View>
            <Text className="text-text-secondary-light dark:text-text-secondary-dark mt-2 w-full px-2 font-bold">{t("MilestoneScreen.milestones")}</Text>
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
