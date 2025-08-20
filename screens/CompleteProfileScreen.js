import { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createSkillDoc } from '../utils/skillsCollections';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { uploadImage } from '../api/cloudinary';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { theme as themeColors } from '../theme';
import PictureBio from './RegisterSteps/PictureBio';
import MySkills from './RegisterSteps/MySkills';
import LocationPhone from './RegisterSteps/LocationPhone';
import Review from './RegisterSteps/Review';
import GradientBackground from '../components/GradientBackground';

const CompleteProfileScreen = ({ navigationRoute }) => {
    const [steps, setSteps] = useState(0);
    const [isStepValid, setIsStepValid] = useState(true);
    const { user, setUser } = useAuth();
    const [info, setInfo] = useState(user);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir() === 'rtl';
    const { theme } = useTheme();
    const colors = themeColors(theme);

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
            setLoading(true);
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

            if (info.profilePicture && info.profilePicture.slice(0, 4) !== "http") {
                const profilePictureUrl = await uploadImage(info.profilePicture);
                info.profilePicture = profilePictureUrl;
            }

            const location = info.location.split(",");
            const userRef = doc(db, "users", user.uid);
            const userData = {
                bio: info.bio,
                location: { city: location[0]?.trim(), country: location[1]?.trim() },
                phone: info.phone,
                profilePicture: info.profilePicture ? info.profilePicture : null,
            };

            if (info.needSkills?.length > 0)
                userData.needSkills = info.needSkills;

            if (updatedNewSkillsToLearn?.length > 0)
                userData.needSkills = userData.needSkills ? [...userData.needSkills, ...updatedNewSkillsToLearn] : updatedNewSkillsToLearn;

            if (info.hasSkills?.length > 0)
                userData.hasSkills = info.hasSkills;

            if (updatedNewSkillsToTeach?.length > 0)
                userData.hasSkills = userData.hasSkills ? [...userData.hasSkills, ...updatedNewSkillsToTeach] : updatedNewSkillsToTeach;

            await updateDoc(userRef, userData);
            const updatedUserSnap = await getDoc(userRef);
            setUser({ uid: user.uid, ...updatedUserSnap.data() });

            if (navigationRoute) navigation.replace(navigationRoute, { user: { uid: user.uid, ...updatedUserSnap.data() } });
            else navigation.replace("App");
        } catch (error) {
            console.error("Error updating user profile:", error);
        } finally {
            setLoading(false);
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
        <View className="flex-1 px-5 py-5" style={{ direction: isRTL ? 'rtl' : 'ltr', marginTop: 30 }}>
            <GradientBackground />
            {getProfileStep()}
            <View className="flex-row justify-between items-center p-6">
                {steps > 0 ? (
                    <>
                        <TouchableOpacity
                            className="bg-btn-submit-hover-light dark:bg-btn-submit-hover-dark px-4 py-2 rounded-lg"
                            onPress={() => handleChangeSteps(-1)}
                        >
                            <Text className="text-white">{t("CompleteProfileScreen.previous")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`px-4 py-2 rounded-lg ${isStepValid ? 'bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark' : 'bg-gray-400'}`}
                            disabled={!isStepValid}
                            onPress={steps < 3 ? () => handleChangeSteps(1) : updateUserProfile}
                        >
                            <Text className="text-white">{steps === 3 ? t("CompleteProfileScreen.finish") : t("CompleteProfileScreen.next")}</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View className="flex-1 items-end">
                        <TouchableOpacity
                            className={`px-4 py-2 rounded-lg ${isStepValid ? 'bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark' : 'bg-gray-400'}`}
                            disabled={!isStepValid}
                            onPress={() => handleChangeSteps(1)}
                        >
                            <Text className="text-white">{t("CompleteProfileScreen.next")}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {loading && (
                <Modal transparent={true} animationType="fade">
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <ActivityIndicator size="large" color={colors.colors.main} />
                        <Text className="text-white mt-4">{t("CompleteProfileScreen.updatingProfile")}</Text>
                    </View>
                </Modal>
            )}
        </View>
    );
}

export default CompleteProfileScreen;