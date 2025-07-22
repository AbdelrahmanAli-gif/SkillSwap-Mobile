import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PictureBio from './RegisterSteps/PictureBio';
import MySkills from './RegisterSteps/MySkills';
import Review from './RegisterSteps/Review';

const CompleteProfileScreen = () => {
    const [steps, setSteps] = useState(0);
    const [info, setInfo] = useState({});
    console.log(info);

    const handleChangeSteps = (value) => {
        if (steps + value < 0 || steps + value > 2) return;
        setSteps(steps + value);
    }

    const getProfileStep = () => {
        switch (steps) {
            case 0: return <PictureBio info={info} setInfo={setInfo} />;
            case 1: return <MySkills info={info} setInfo={setInfo} />;
            case 2: return <Review info={info} />;
        }
    }

    return (
        <View className="flex-1 px-5 py-5">
            {getProfileStep()}
            <View className="flex-row justify-between items-center p-6">
                {steps > 0 ? (
                    <>
                        <TouchableOpacity
                            className="bg-gray-200 px-4 py-2 rounded-lg"
                            onPress={() => handleChangeSteps(-1)}
                        >
                            <Text>Previous</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-[#3D99F5] px-4 py-2 rounded-lg"
                            onPress={() => handleChangeSteps(1)}
                        >
                            <Text className="text-white">{steps === 2 ? "Finish" : "Next"}</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View className="flex-1 items-end">
                        <TouchableOpacity
                            className="bg-[#3D99F5] px-4 py-2 rounded-lg"
                            onPress={() => handleChangeSteps(1)}
                        >
                            <Text className="text-white">Next</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

export default CompleteProfileScreen;