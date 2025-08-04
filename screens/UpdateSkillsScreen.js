import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getFirestore, doc, updateDoc, getDoc,addDoc, collection,getDocs } from "firebase/firestore";
const UpdateSkillsScreen = () => {
    const router=useRoute()
    const db=getFirestore()
    const{uid,skillType,skillShouldBeUpdated}=router.params;
    const[newSkill,setNewSkill]=useState("")
    const[skillLevel,setSkillLevel]=useState("")
    async function updateSkillIOffer(userId, updateSkill,skillShouldBeUpdated) {
        try {
          // 1. Check if new skill exists in skills collection
          const skillsRef = collection(db, "skills");
          const skillQuery = query(skillsRef, where("skillName", "==", updateSkill.newName));
          const skillSnapshot = await getDocs(skillQuery);
          
          if (skillSnapshot.empty) {
            const newSkillRef=await addDoc(skillsRef,addDoc({
                skillName:updateSkill,
                category:"Other",
                createdAt: new Date()
            }))
            const newSkillId=newSkill.id
            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef);
            
            if (!userSnap.exists()) {
              throw new Error("User not found");
            }
        
            // 3. Update user's skills
            const { hasSkills } = userSnap.data();
            
            const filterSkills = hasSkills.filter(skill => {
                skill.skillName!=skillShouldBeUpdated
            });
            const updatedSkills=filterSkills.push({
                skillName:updateSkill,
                category:"Other",
                createdAt: new Date()
            })
            // 4. Save updates
            await updateDoc(userRef, {
              hasSkills: updatedSkills,
              lastUpdated: new Date()
            });
        
            return { success: true, updatedSkills };
            
          }
      
          // 2. Get user document
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);
          
          if (!userSnap.exists()) {
            throw new Error("User not found");
          }
      
          // 3. Update user's skills
          const { hasSkills } = userSnap.data();
          
          const updatedSkills = hasSkills.map(skill => {
            if (skill.skillName === updateSkill.oldName) {
              return {
                ...skill,
                skillName: updateSkill.newName,
                skillLevel: updateSkill.newLevel || skill.skillLevel
              };
            }
            return skill;
          });
      
          // 4. Save updates
          await updateDoc(userRef, {
            hasSkills: updatedSkills,
            lastUpdated: new Date()
          });
      
          return { success: true, updatedSkills };
          
        } catch (error) {
          console.error("Update failed:", error.message);
          return { success: false, error: error.message };
        }
      }
    return (
        <View className="flex-1 w-full">
        <Text className="w-full text-2xl mt-3 font-normal">Skill You Want to Update</Text>
        <TextInput className="border rounded-lg bg-slate-300" value='Photography' readOnly={true}></TextInput>
        <Text className="w-full text-2xl mt-3 font-normal">Enter The New Skill</Text>
        <TextInput onChangeText={(e)=>{
            setNewSkill(e)
        }} className="border rounded-lg" ></TextInput>
        <Text className="text-2xl mt-3">Choose Experience Level</Text>
        <View className="w-full h-10 flex-row justify-evenly mt-3">
        <TouchableOpacity onPress={()=>{
            setSkillLevel("Beginner")
        }} activeOpacity={0.8} className={skillLevel=="Beginner"?"w-3/12 border bg-blue-500  items-center rounded-lg h-[40] justify-center":"w-3/12 border  items-center rounded-lg h-[40] justify-center"}>
                <Text className={skillLevel=="Beginner"? "text-white text-xl":"text-black text-xl"}>Beginner</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
            setSkillLevel("Intermidiate")
        }} activeOpacity={0.8} className={skillLevel=="Intermidiate"?"w-3/12 border bg-blue-500  items-center rounded-lg h-[40] justify-center":"w-3/12 border  items-center rounded-lg h-[40] justify-center"}>
                <Text className={skillLevel=="Intermidiate"? "text-white text-xl":"text-black text-xl"}>Intermidiate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
            setSkillLevel("Advanced")
        }} activeOpacity={0.8} className={skillLevel=="Advanced"?"w-3/12 border bg-blue-500  items-center rounded-lg h-[40] justify-center":"w-3/12 border  items-center rounded-lg h-[40] justify-center"}>
                <Text className={skillLevel=="Advanced"? "text-white text-xl":"text-black text-xl"}>Advanced</Text>
            </TouchableOpacity>
        </View>
        <View className="w-full items-center justify-center h-[20%] ">
            <TouchableOpacity onPress={  ()=>{
                updateSkillIOffer()
            }} activeOpacity={0.8} className="w-[200] bg-blue-500 items-center rounded-lg h-[40] justify-center">
                <Text className="text-white text-xl">Update</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default UpdateSkillsScreen;
