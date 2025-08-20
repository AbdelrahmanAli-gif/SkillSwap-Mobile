import { useEffect, useState } from 'react';
import { StyleSheet, View,ScrollView, Image, Text, TouchableOpacity,TextInput, ActivityIndicator } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import * as Progress from "react-native-progress";
import MilesoneContent from '../components/MilesoneContent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { generateFromGemini } from '../api/gemini';
import { generateMilestonesPrompt } from '../helpers/prompts';
import{collection,addDoc} from "firebase/firestore"
import { db } from '../services/firebase';
const MilestoneScreen = () => {
    const[offeredSkillState,setOfferedSkillState]=useState([])
    const[requstedSkillState,setRequestedSkillState]=useState([])
    const[completedOfferMileStone,setCompletedOfferMileStone]=useState(0)
    const[completeRequestedMileStone,setCompletedRequestedMilestone]=useState(0)
    const router =useRoute()
    const navigator=useNavigation()
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
            const trade={
                milestoneA:jsonA,
                milestoneB:jsonB
            }
            addMilestoneWithID(trade)
            setOfferedSkillState(jsonA);
            setRequestedSkillState(jsonB);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      
      }, []);
      

    return (
        <ScrollView className="flex-1 bg-[#1a1a17] w-full relative">
            <GradientBackground/>
            <View className=" w-full  items-center mt-4">
                <View className="w-full flex-row justify-evenly">
                    <View className="w-[55] h-[55]  ">
                        <Image className="w-full h-full rounded-full" source={require("../assets/sief.jpg")}></Image>
                    </View>
                    <View className="w-6/12 justify-center   ">
                        <Text className="font-bold text-xl text-white ml-2">Ethan carter</Text>
                        <View className="w-10/12 bg-orange-300/20 items-center  rounded-full mt-2">
                        <Text className="text-white ">Teaching : Photography</Text>
                        </View>
                    </View>
                    <View className="w-3/12  justify-center">
                    <TouchableOpacity activeOpacity={0.8} className="w-full  items-center justify-center flex-row h-[40] bg-[#D1643A] rounded-2xl">
                        <View className=" items-center ">
                            <FontAwesome6Icon solid size={16} color={"white"} name='message'></FontAwesome6Icon>
                        </View>
                        <View className="w-9/12  items-center  ">
                            <Text className="text-white font-bold text-lg ">Message</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className="h-4/12 w-full  items-center mt-3">
                <View className="w-full flex-row justify-evenly">
                    <View className="w-[55] h-[55]  ">
                        <Image className="w-full h-full rounded-full" source={require("../assets/sief.jpg")}></Image>
                    </View>
                    <View className="w-6/12 justify-center   ">
                        <Text className="font-bold text-xl text-white ml-2">Ethan carter</Text>
                        <View className="w-10/12 bg-orange-300/20 items-center  rounded-full mt-2">
                        <Text className="text-white ">Teaching : Photography</Text>
                        </View>
                    </View>
                    <View className="w-3/12  justify-center">
                    <TouchableOpacity activeOpacity={0.8} className="w-full  items-center justify-center flex-row h-[40] bg-[#D1643A] rounded-2xl">
                        <View className=" items-center ">
                            <FontAwesome6Icon solid size={16} color={"white"} name='message'></FontAwesome6Icon>
                        </View>
                        <View className="w-9/12  items-center  ">
                            <Text className="text-white font-bold text-lg">Message</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className="mt-6 w-full items-center">
                <View className="w-11/12 h-fit items-center border border-[#dd805580] rounded-xl ">
                    <View className="w-full bg-[#2E2622] flex-row justify-between h-[50] items-center rounded-tr-xl rounded-tl-xl">
                        <View className="w-fit ml-3">
                            <Text className="text-white text-xl font-bold">Skill I'm learning: Cooking</Text>
                        </View>
                        <View className="w-3/12 bg-[#241c18c1] items-center rounded-full mr-1">
                            <Text className="text-white">Beginner</Text>
                        </View>
                    </View>
                    <View className="items-center w-11/12 flex-row justify-between mt-2">
                        <Text className="text-gray-200/30 text-base">Progress</Text>
                        <Text className="text-white">{completedOfferMileStone}/{offeredSkillState.length} milestones</Text>
                    </View>
                    <View className="w-11/12">
                        <Progress.Bar className="mt-3" progress={offeredSkillState.length>0? (completedOfferMileStone/offeredSkillState.length):0} color='#D1643A' width={350}></Progress.Bar>
                    </View>
                    <View className="w-11/12 mt-3">
                        <Text className="text-gray-200/30 text-base">Milestone to learn</Text>
                    </View>
                    <View className="w-11/12 items-center mt-2">
                    { offeredSkillState?.length>0 ?(<View className="w-full min-h-36">
                        {
                            offeredSkillState.map((s)=><MilesoneContent offeredCounter={setCompletedOfferMileStone}  setTheState={setOfferedSkillState} state={offeredSkillState} key={s.id} title={s.title} description={s.description}/>)
                        }
                            <View className="h-4"/>
                        </View>):(<ActivityIndicator color={"#D1643A"}/> ) }
                    </View>
                </View>
            </View>
            <View className="mt-6 w-full items-center  ">
                <View className="w-11/12 h-fit items-center border border-[#dd805580] rounded-xl ">
                    <View className="w-full bg-[#2E2622] flex-row justify-between h-[50] items-center rounded-tr-xl rounded-tl-xl">
                        <View className="w-fit ml-3">
                            <Text className="text-white text-xl font-bold">Skill I'm Teaching: Cooking</Text>
                        </View>
                        <View className="w-3/12 bg-[#241c18c1] items-center rounded-full mr-1">
                            <Text className="text-white">Beginner</Text>
                        </View>
                    </View>
                    <View className="items-center w-11/12 flex-row justify-between mt-2">
                        <Text className="text-gray-200/30 text-base">Progress</Text>
                        <Text className="text-white">{completeRequestedMileStone}/{requstedSkillState.length} milestones</Text>
                    </View>
                    <View className="w-11/12">
                        <Progress.Bar className="mt-3" progress={requstedSkillState.length>0? (completeRequestedMileStone/ requstedSkillState.length) :0} color='#D1643A' width={350}></Progress.Bar>
                    </View>
                    <View className="w-11/12 mt-3">
                        <Text className="text-gray-200/30 text-base">Milestone to Teach</Text>
                    </View>
                    <View className="w-11/12 items-center mt-2">
                        { requstedSkillState?.length>0 ?(<View className="w-full min-h-36">
                        {
                            requstedSkillState.map((s)=><MilesoneContent requestedCounter={setCompletedRequestedMilestone} state={requstedSkillState} setTheState={setRequestedSkillState}  requestedSkill={true} key={s.id} title={s.title} description={s.description}/>)
                        }
                            <View className="h-4"/>
                        </View>):(<ActivityIndicator color={"#D1643A"}/> ) }
                            <View className="h-4"/>
                    </View>
                    {
                   requstedSkillState.length > 0 ? (
                      <>
                         <TouchableOpacity 
                                onPress={(e) => {
                                    navigator.navigate("AddMilestone",{setRequestedSkillState:(updatedData)=>setRequestedSkillState([...requstedSkillState,updatedData])})
                            }} 
                       className="w-11/12 items-center rounded-lg border border-green-200/30 h-12 justify-center"
                       >
                          <Text className="text-gray-200/30 text-lg ">Add New Milestone</Text>
                  </TouchableOpacity>
                     <View className="h-4"></View>
                     </>
  ) : (
    <View></View>
  )
}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default MilestoneScreen;
