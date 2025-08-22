import { useEffect, useState } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { generateFromGemini } from '../api/gemini';
import { generateMilestonesPrompt } from '../helpers/prompts';
import { updateTrade, addTrade } from '../utils/tradesUtils';
import { getUserById, updateUserById } from '../utils/usersCollection';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { theme as themeColors } from '../theme';
import GradientBackground from '../components/GradientBackground';
import UserSkillCard from '../components/UserSkillCard';
import MilestoneCard from '../components/MilestoneCard';

const MilestoneScreen = () => {
    const router = useRoute();
    const { user } = useAuth();
    const { theme } = useTheme();
    const [firstUser, setFirstUser] = useState(null);
    const [secondUser, setSecondUser] = useState(null);
    const { trade: tradeParam, request } = router.params
    const [loading, setLoading] = useState(true);
    const [trade, setTrade] = useState(tradeParam || null);
    const [milestonesA, setMilestonesA] = useState(trade?.milestonesA || []);
    const [milestonesB, setMilestonesB] = useState(trade?.milestonesB || []);
    const colors = themeColors(theme);

    const updateMilestonesA = async (newMilestones) => {
        await updateTrade(trade.id, "milestonesA", newMilestones);
        setMilestonesA(newMilestones);
    };

    const updateMilestonesB = async (newMilestones) => {
        await updateTrade(trade.id, "milestonesB", newMilestones);
        setMilestonesB(newMilestones);
    };

    useEffect(() => {
        const createTrade = async () => {
            if (!request) {
                setLoading(true);
                const firstUser = await getUserById(trade.userA);
                const secondUser = await getUserById(trade.userB);
                setFirstUser(firstUser);
                setSecondUser(secondUser);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const requestedSkillName = request.requestedSkill.skillName;
                const requestedSkillLevel = request.requestedSkill.skillLevel;
                const offeredSkillName = request.offeredSkill.skillName;
                const offeredSkillLevel = request.offeredSkill.skillLevel;
                const [resultsA, resultsB] = await Promise.all([
                    generateFromGemini(generateMilestonesPrompt(requestedSkillName, requestedSkillLevel)),
                    generateFromGemini(generateMilestonesPrompt(offeredSkillName, offeredSkillLevel))
                ]);
                const milestones = {
                    milestonesA: JSON.parse(resultsA.replace("```json", "").replace("```", "")),
                    milestonesB: JSON.parse(resultsB.replace("```json", "").replace("```", ""))
                };
                const newTrade = await addTrade(request, milestones);
                const firstUser = await getUserById(newTrade.userA);
                const secondUser = await getUserById(newTrade.userB);
                await updateUserById(newTrade.userA, { ...firstUser, subscribtion: { ...firstUser.subscribtion, activeTradeCount: firstUser.subscribtion.activeTradeCount + 1 } });
                await updateUserById(newTrade.userB, { ...secondUser, subscribtion: { ...secondUser.subscribtion, activeTradeCount: secondUser.subscribtion.activeTradeCount + 1 } });
                setTrade(newTrade);
                setFirstUser(firstUser);
                setSecondUser(secondUser);
                setMilestonesA(milestones.milestonesA);
                setMilestonesB(milestones.milestonesB);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        createTrade();
    }, []);

    return (
        <View className="flex-1 mt-[30px]">
            <GradientBackground />
            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color={colors.colors.main} />
                </View>
            ) : !trade ? (
                <View className="flex-1 items-center justify-center">
                    <Text>
                        Trade not found
                    </Text>
                </View>
            ) :
                <ScrollView className="flex-1 p-5">
                    <UserSkillCard user={firstUser} skill={trade.skillA} />
                    <UserSkillCard user={secondUser} skill={trade.skillB} />

                    <MilestoneCard teaching={firstUser.id === user.uid} skill={trade.skillA} skillLevel={trade.skillALevel} milestonesState={milestonesA} setMilestonesState={updateMilestonesA} />
                    <MilestoneCard teaching={secondUser.id === user.uid} skill={trade.skillB} skillLevel={trade.skillBLevel} milestonesState={milestonesB} setMilestonesState={updateMilestonesB} />
                    <View className="mt-12" />
                </ScrollView>
            }
        </View>
    );
}

export default MilestoneScreen;
