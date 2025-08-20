import React, { use, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
const MilesoneContent = ({title,description,requestedSkill,state,setTheState,offeredCounter,requestedCounter}) => {
    const navigator=useNavigation()
    const[isChecked,setIsChecked]=useState(null)
    const deleteMileStone=()=>{
        const filterState=state.filter((s)=>s.title!=title)
        setTheState(filterState)
    }
    const updateIsComplete=(status)=>{
        const mileStone=state.map((m)=>{
            if(m.title===title){
                return {
                    ...m,
                    isCompleted:status
                }
            }
            return m
        })
        console.log(mileStone);
        setTheState(mileStone)
    }

    useEffect(() => {
        if (requestedSkill) {
          if (isChecked) {
            requestedCounter(prev => prev + 1);
            updateIsComplete(true);
          } else if (isChecked === false) {
            requestedCounter(prev => Math.max(prev - 1, 0));
            updateIsComplete(false);
          }
        } else {
          if (isChecked) {
            offeredCounter(prev => prev + 1);
            updateIsComplete(true);
          } else if (isChecked === false) {
            offeredCounter(prev => Math.max(prev - 1, 0));
            updateIsComplete(false);
          }
        }
      }, [isChecked]);
    return (
        <View className="w-full bg-[#2e221cd0] border min-h-20 rounded-lg flex-row mt-3 border-[#dd805580]">
            <View className="w-2/12 items-center justify-center">
                <CheckBox  tintColors={{true:"#D1643A"}} onValueChange={setIsChecked} value={isChecked}></CheckBox>
            </View>
            <View className="w-10/12">
                <View className="w-full">
                    <View className="w-full flex-row justify-between">
                    <Text className="font-bold text-white text-xl w-9/12">{title}</Text>
                    {
                        requestedSkill&&(<View className="flex-row w-2/12  items-center justify-between mr-2" >
                        <FontAwesome6Icon onPress={()=>{
                            navigator.navigate("UpdateMilestone",{state,setTheState:(updatedData)=>setTheState(updatedData),title})
                        }} color={"rgba(229,231,235,0.3)"} size={16} name='edit'/>
                        <FontAwesome6Icon onPress={(e)=>{
                            deleteMileStone()
                        }} color={"rgba(229,231,235,0.3)"} size={16} name='trash'/>
                    </View>)
                    }
              
                    </View>
                    <Text className="text-gray-200/30 w-11/12 mt-1 mb-2">
                       {description}
                    </Text>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default MilesoneContent;
