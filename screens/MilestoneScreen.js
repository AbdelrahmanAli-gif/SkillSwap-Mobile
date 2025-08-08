import React from 'react';
import { StyleSheet, View,ScrollView, Image } from 'react-native';
import GradientBackground from '../components/GradientBackground';

const MilestoneScreen = () => {
    return (
        <ScrollView className="flex-1 w-full">
            <GradientBackground/>
            <View className="h-4/12 w-full  items-center mt-3">
                <View className="w-11/12">
                    <View className="w-[55] h-[55] ">
                        <Image className="w-full h-full rounded-full" source={require("../assets/sief.jpg")}></Image>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default MilestoneScreen;
