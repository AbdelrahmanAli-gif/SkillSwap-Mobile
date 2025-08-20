import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import { useNavigation, useRoute } from '@react-navigation/native';
import 'react-native-get-random-values';
const UpdateMilestoneScreen = () => {
    const[newMilestone,setNewMilestone]=useState({ Ai:"false",isCompleted:"false",price:0})
    const router=useRoute()
    const navigator=useNavigation()
    const{state,setTheState,title}=router.params
    const UpdateMileStone=()=>{
        const updatedState = state.map((m) => {
            if (m.title === title) {
              return {
                ...m,
                title: newMilestone.title,
                description: newMilestone.description,
              };
            }
            return m;
          });
        
          setTheState(updatedState);
    }
    return (
        <View className="flex-1 w-full" >
            <GradientBackground/>
            <View className="w-full pl-2 mt-3">
                <View className="items-start ">
                <Text className="mb-1 text-lg text-gray-200/30">Milestone Header</Text>
                </View>
                <View className="w-11/12 ">
                   <TextInput onChangeText={(e)=>{
                    setNewMilestone({...newMilestone,title:e})
                   }} className="text-white border rounded-lg border-[#dd805580] "/>
                </View>
            </View>
            <View className="w-full pl-2 mt-3">
                <View className="items-start ">
                <Text className="mb-1 text-lg text-gray-200/30">Milestone Description</Text>
                </View>
                <View className="w-11/12 ">
                   <TextInput onChangeText={(e)=>{
                    setNewMilestone({...newMilestone,description:e})

                   }} className="text-white border rounded-lg border-[#dd805580] "/>
                </View>
            </View>
            <View className="w-11/12 items-center">
            <TouchableOpacity onPress={()=>{
                if(newMilestone.description && newMilestone.title){
                    UpdateMileStone()
                    navigator.goBack()
                }
            }} activeOpacity={0.8} className="items-center mt-8 rounded-lg bg-[#D1643A] w-4/12 h-8 justify-center">
                <Text className="text-white font-medium text-lg">Update</Text>
            </TouchableOpacity>
            </View>
    
        </View>
    );
}

const styles = StyleSheet.create({})

export default UpdateMilestoneScreen;
