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
    const [offeredSkillMilestones, setOfferedSkillMilestones] = useState([
        {
            AI: true,
            description: "Choose one popular front-end framework (React, Angular, or Vue) and learn its core concepts: components, data binding, routing, and state management. Build a small, interactive application like a to-do list or a simple calculator.",
            id: "b9c3d7e1-f2a3-4c4d-8e5f-6a8b7c9d0e111",
            isCompleted: false,
            price: 0,
            title: "Introduction to a Front-End Framework (React, Angular, or Vue)"
        },
        {
            AI: true,
            description: "Choose one popular front-end framework (React, Angular, or Vue) and learn its core concepts: components, data binding, routing, and state management. Build a small, interactive application like a to-do list or a simple calculator.",
            id: "b9c3d7e1-f2a3-4c4d-8e5f-6a8b7c9d0e112",
            isCompleted: false,
            price: 0,
            title: "Introduction to a Front-End Framework (React, Angular, or Vue)"
        },
        {
            AI: true,
            description: "Choose one popular front-end framework (React, Angular, or Vue) and learn its core concepts: components, data binding, routing, and state management. Build a small, interactive application like a to-do list or a simple calculator.",
            id: "b9c3d7e1-f2a3-4c4d-8e5f-6a8b7c9d0e113",
            isCompleted: false,
            price: 0,
            title: "Introduction to a Front-End Framework (React, Angular, or Vue)"
        },
    ],)
    const [requestedSkillMilestones, setRequestedSkillMilestones] = useState([
        {
            AI: true,
            description: "Choose one popular front-end framework (React, Angular, or Vue) and learn its core concepts: components, data binding, routing, and state management. Build a small, interactive application like a to-do list or a simple calculator.",
            id: "b9c3d7e1-f2a3-4c4d-8e5f-6a8b7c9d0e114",
            isCompleted: false,
            price: 0,
            title: "Introduction to a Front-End Framework (React, Angular, or Vue)"
        },
        {
            AI: true,
            description: "Choose one popular front-end framework (React, Angular, or Vue) and learn its core concepts: components, data binding, routing, and state management. Build a small, interactive application like a to-do list or a simple calculator.",
            id: "b9c3d7e1-f2a3-4c4d-8e5f-6a8b7c9d0e115",
            isCompleted: false,
            price: 0,
            title: "Introduction to a Front-End Framework (React, Angular, or Vue)"
        },
        {
            AI: true,
            description: "Choose one popular front-end framework (React, Angular, or Vue) and learn its core concepts: components, data binding, routing, and state management. Build a small, interactive application like a to-do list or a simple calculator.",
            id: "b9c3d7e1-f2a3-4c4d-8e5f-6a8b7c9d0e116",
            isCompleted: false,
            price: 0,
            title: "Introduction to a Front-End Framework (React, Angular, or Vue)"
        },
    ],)
    const { user } = useAuth();
    // const{request}=router.params
    // const offeredSkill=request.offeredSkill.skillName
    // const offeredSkillLevel=request.offeredSkill.skillLevel
    // const requestedSkill=request.requestedSkill.skillName
    // const requestedSkillLevel=request.requestedSkill.skillLevel

    const addMilestoneWithID = async (trade) => {
        try {
            const docRef = await addDoc(collection(db, "trades"), trade);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resultsA, resultsB] = await Promise.all([
                    generateFromGemini(generateMilestonesPrompt("egyptian dancing", "Advanced")),
                    generateFromGemini(generateMilestonesPrompt("valorant", "Beginner"))
                ]);
                const cleanedA = resultsA.replace("```json", "").replace("```", "");
                const cleanedB = resultsB.replace("```json", "").replace("```", "");
                const jsonA = JSON.parse(cleanedA);
                const jsonB = JSON.parse(cleanedB);
                const trade = {
                    milestoneA: jsonA,
                    milestoneB: jsonB
                }
                // addMilestoneWithID(trade)
                setOfferedSkillMilestones(jsonA);
                setRequestedSkillMilestones(jsonB);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <View className="flex-1 mt-[30px]">
            <GradientBackground />
            <ScrollView className="flex-1 p-5">
                <UserSkillCard image={user.profilePicture} name={user.name} skill="Photography" messaging={false} />
                <UserSkillCard name={user.name} skill="Cooking" messaging={true} />

                <MilestoneCard teaching={true} skill="Photography" skillLevel="Beginner" milestonesState={offeredSkillMilestones} setMilestonesState={setOfferedSkillMilestones} />
                <MilestoneCard skill="Cooking" skillLevel="Beginner" milestonesState={requestedSkillMilestones} setMilestonesState={setRequestedSkillMilestones} />
            </ScrollView>
        </View>
    );
}

export default MilestoneScreen;
