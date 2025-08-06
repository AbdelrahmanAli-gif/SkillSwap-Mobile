import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

const SkillsIoffer = ({skillType,skill,user}) => {
    const navigation=useNavigation()
    return (
        <View className="w-[94%] flex-row justify-between items-center h-[60]">
            <Text className="text-xl">{skill}</Text>
            <TouchableOpacity>
            <FontAwesome6Icon onPress={()=>{
            navigation.navigate("UpdateSkills",{...user,skillShouldBeUpdated:skill,skillType:skillType})
            }} size={20} name='pencil'/>
            </TouchableOpacity>
           
        </View>
    );
}

const styles = StyleSheet.create({})

export default SkillsIoffer;
