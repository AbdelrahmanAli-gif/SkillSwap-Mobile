import { useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createSkillDoc } from '../utils/skillsCollections';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import PictureBio from './RegisterSteps/PictureBio';
import MySkills from './RegisterSteps/MySkills';
import LocationPhone from './RegisterSteps/LocationPhone';
import Review from './RegisterSteps/Review';
import GradientBackground from '../components/GradientBackground';

const stepTitles = ["Tell us about yourself", "My Skills", "Additional Details", "Review your profile"];

const CompleteProfileScreen = () => {
    const [steps, setSteps] = useState(0);
    const [isStepValid, setIsStepValid] = useState(true);
    const [info, setInfo] = useState({});
    const { user, setUser } = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: stepTitles[steps],
        });
    }, [steps]);

    const handleChangeSteps = (value) => {
        if (steps + value < 0 || steps + value > 3) return;
        setSteps(steps + value);
    }

    const updateUserProfile = async () => {
        try {
            const { newSkillsToLearn, newSkillsToTeach } = info;
            let updatedNewSkillsToLearn = [], updatedNewSkillsToTeach = [];
            if (newSkillsToLearn?.length > 0) {
                updatedNewSkillsToLearn = await Promise.all(
                    newSkillsToLearn.map(async (skill) => {
                        const skillId = await createSkillDoc(skill.skillName);
                        return { ...skill, skillId };
                    })
                );
            }

            if (newSkillsToTeach?.length > 0) {
                updatedNewSkillsToTeach = await Promise.all(
                    newSkillsToTeach?.map(async (skill) => {
                        const skillId = await createSkillDoc(skill.skillName);
                        return { ...skill, skillId };
                    })
                );
            }

            const location = info.location.split(",");
            const userRef = doc(db, "users", user.uid);
            const userData = {
                bio: info.bio,
                location: { city: location[0]?.trim(), country: location[1]?.trim() },
                phone: info.phone,
                profilePicture: info.photo ? info.photo : null,
            };

            if (info.skillsToLearn?.length > 0)
                userData.needSkills = info.skillsToLearn;

            if (updatedNewSkillsToLearn?.length > 0)
                userData.needSkills = userData.needSkills ? [...userData.needSkills, ...updatedNewSkillsToLearn] : updatedNewSkillsToLearn;

            if (info.skillsToTeach?.length > 0)
                userData.hasSkills = info.skillsToTeach;

            if (updatedNewSkillsToTeach?.length > 0)
                userData.hasSkills = userData.hasSkills ? [...userData.hasSkills, ...updatedNewSkillsToTeach] : updatedNewSkillsToTeach;

            await updateDoc(userRef, userData);
            const updatedUserSnap = await getDoc(userRef);
            setUser({ uid: user.uid, ...updatedUserSnap.data() });

            navigation.replace("App");
        } catch (error) {
            console.error("Error updating user profile:", error);
        }
    }

    const getProfileStep = () => {
        switch (steps) {
            case 0:
                return <PictureBio info={info} setInfo={setInfo} setIsStepValid={setIsStepValid} />;
            case 1:
                return <MySkills info={info} setInfo={setInfo} setIsStepValid={setIsStepValid} />;
            case 2:
                return <LocationPhone info={info} setInfo={setInfo} setIsStepValid={setIsStepValid} />;
            case 3:
                return <Review info={info} />;
        }
    };

    return (
        <View className="flex-1 px-5 py-5">
            <GradientBackground />
            {getProfileStep()}
            <View className="flex-row justify-between items-center p-6">
                {steps > 0 ? (
                    <>
                        <TouchableOpacity
                            className="bg-btn-submit-hover px-4 py-2 rounded-lg"
                            onPress={() => handleChangeSteps(-1)}
                        >
                            <Text className="text-text-light">Previous</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`px-4 py-2 rounded-lg ${isStepValid ? 'bg-btn-submit-bg' : 'bg-gray-400'}`}
                            disabled={!isStepValid}
                            onPress={steps < 3 ? () => handleChangeSteps(1) : updateUserProfile}
                        >
                            <Text className="text-text-light">{steps === 3 ? "Finish" : "Next"}</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View className="flex-1 items-end">
                        <TouchableOpacity
                            className={`px-4 py-2 rounded-lg ${isStepValid ? 'bg-btn-submit-bg' : 'bg-gray-400'}`}
                            disabled={!isStepValid}
                            onPress={() => handleChangeSteps(1)}
                        >
                            <Text className="text-text-light">Next</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

export default CompleteProfileScreen;