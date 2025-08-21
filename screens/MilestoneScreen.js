import { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { generateFromGemini } from '../api/gemini';
import { generateMilestonesPrompt } from '../helpers/prompts';
import { collection, addDoc } from "firebase/firestore"
import { db } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import GradientBackground from '../components/GradientBackground';
import UserSkillCard from '../components/UserSkillCard';
import MilestoneCard from '../components/MilestoneCard';

const MilestoneScreen = () => {
    const router = useRoute();
    const { user } = useAuth();
    const { trade } = router.params
    const [milestonesA, setMilestonesA] = useState(trade.milestonesA || []);
    const [milestonesB, setMilestonesB] = useState(trade.milestonesB || []);

    const addMilestoneWithID = async (trade) => {
        try {
            const docRef = await addDoc(collection(db, "trades"), trade);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const [resultsA, resultsB] = await Promise.all([
    //                 generateFromGemini(generateMilestonesPrompt("egyptian dancing", "Advanced")),
    //                 generateFromGemini(generateMilestonesPrompt("valorant", "Beginner"))
    //             ]);
    //             const cleanedA = resultsA.replace("```json", "").replace("```", "");
    //             const cleanedB = resultsB.replace("```json", "").replace("```", "");
    //             const jsonA = JSON.parse(cleanedA);
    //             const jsonB = JSON.parse(cleanedB);
    //             const trade = {
    //                 milestoneA: jsonA,
    //                 milestoneB: jsonB
    //             }
    //             addMilestoneWithID(trade)
    //             setMilestonesA(jsonA);
    //             setMilestonesB(jsonB);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    return (
        <View className="flex-1 mt-[30px]">
            <GradientBackground />
            <ScrollView className="flex-1 p-5">
                <UserSkillCard user={trade.userA} skill={trade.skillA} />
                <UserSkillCard user={trade.userB} skill={trade.skillB} />

                <MilestoneCard tradeId={trade.id} teaching={trade.userA.id === user.uid} skill={trade.skillA} skillLevel={trade.skillALevel} milestonesState={milestonesA} setMilestonesState={setMilestonesA} />
                <MilestoneCard tradeId={trade.id} teaching={trade.userB.id === user.uid} skill={trade.skillB} skillLevel={trade.skillBLevel} milestonesState={milestonesB} setMilestonesState={setMilestonesB} />
                <View className="mt-12" />
            </ScrollView>
        </View>
    );
}

export default MilestoneScreen;
