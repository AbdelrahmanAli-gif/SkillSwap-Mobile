import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { createSkillDoc } from "../utils/skillsCollections";
const UpdateSkillsScreen = () => {
  const Navigator=useNavigation()
  const router = useRoute();
  const db = getFirestore();
  const[isLoading,setIsLoading]=useState(false)
  const { uid, skillType, skillShouldBeUpdated } = router.params;
  const [newSkill, setNewSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  async function updateSkillIOffer(userId, updateSkill, skillShouldBeUpdated) {
    try {
      const skillsRef = collection(db, "skills");
      const skillQuery = query(
        skillsRef,
        where("skillName", "==", updateSkill)
      );
      const skillSnapshot = await getDocs(skillQuery);
      if (skillSnapshot.empty) {
        const skillRef = await createSkillDoc(updateSkill);
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          throw new Error("User not found");
        }
        const { hasSkills } = userSnap.data();
        const filterSkills = hasSkills.filter(
          (s) => s.skillName != skillShouldBeUpdated
        );
        filterSkills.push({
          skillName: updateSkill,
          skillId: skillRef,
          skillLevel: skillLevel,
          createdAt: new Date(),
        });
        await updateDoc(userRef, {
          hasSkills: filterSkills,
        });
        console.log("success");
      } else {
        await updateDoc(skillSnapshot.docs[0].ref, {
            skillName:updateSkill
        });
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          throw new Error("User not found");
        }
        const { hasSkills } = userSnap.data();

        const filterSkills = hasSkills.map((s) => {
            if (s.skillName === skillShouldBeUpdated) {
              return {
                skillId:skillSnapshot.docs[0].id,
                skillName: updateSkill, 
                skillLevel: skillLevel 
              };
            }
            return s; 
          });
        await updateDoc(userRef, {
          hasSkills: filterSkills,
        });
      }
      setIsLoading(false)
      Navigator.navigate("Profile")
    } catch (error) {
      console.error("Update failed:", error.message);
      return { success: false, error: error.message };
    }
  }
  async function updateSkillINeed(userId, updateSkill, skillShouldBeUpdated) {
    try {
      const skillsRef = collection(db, "skills");
      const skillQuery = query(
        skillsRef,
        where("skillName", "==", updateSkill)
      );
      const skillSnapshot = await getDocs(skillQuery);
      if (skillSnapshot.empty) {
        const skillRef = await createSkillDoc(updateSkill);
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          throw new Error("User not found");
        }
        const { needSkills } = userSnap.data();
        const filterSkills = needSkills.filter(
          (s) => s.skillName != skillShouldBeUpdated
        );
        filterSkills.push({
          skillName: updateSkill,
          skillId: skillRef,
          skillLevel: skillLevel,
          createdAt: new Date(),
        });
        await updateDoc(userRef, {
          needSkills: filterSkills,
        });
        console.log("success");
      } else {
        await updateDoc(skillSnapshot.docs[0].ref, {
            skillName:updateSkill
        });
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          throw new Error("User not found");
        }
        const { needSkills } = userSnap.data();

        const filterSkills = needSkills.map((s) => {
            if (s.skillName === skillShouldBeUpdated) {
              return {
                skillId:skillSnapshot.docs[0].id,
                skillName: updateSkill, 
                skillLevel: skillLevel 
              };
            }
            return s; 
          });
        await updateDoc(userRef, {
          needSkills: filterSkills,
        });
      }
      setIsLoading(false)
      Navigator.navigate("Profile")
    } catch (error) {
      console.error("Update failed:", error.message);
      return { success: false, error: error.message };
    }
  }
  return (
    <View className="flex-1 w-full">
      <Text className="w-full text-2xl mt-3 font-normal">
        Skill You Want to Update
      </Text>
      <TextInput
        className="border rounded-lg bg-slate-300"
        value={skillShouldBeUpdated}
        readOnly={true}
      ></TextInput>
      <Text className="w-full text-2xl mt-3 font-normal">
        Enter The New Skill
      </Text>
      <TextInput
        onChangeText={(e) => {
          setNewSkill(e);
        }}
        className="border rounded-lg"
      ></TextInput>
      <Text className="text-2xl mt-3">Choose Experience Level</Text>
      <View className="w-full h-10 flex-row justify-evenly mt-3">
        <TouchableOpacity
          onPress={() => {
            setSkillLevel("Beginner");
          }}
          activeOpacity={0.8}
          className={
            skillLevel == "Beginner"
              ? "w-3/12 border bg-blue-500  items-center rounded-lg h-[40] justify-center"
              : "w-3/12 border  items-center rounded-lg h-[40] justify-center"
          }
        >
          <Text
            className={
              skillLevel == "Beginner"
                ? "text-white text-xl"
                : "text-black text-xl"
            }
          >
            Beginner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSkillLevel("Intermidiate");
          }}
          activeOpacity={0.8}
          className={
            skillLevel == "Intermidiate"
              ? "w-3/12 border bg-blue-500  items-center rounded-lg h-[40] justify-center"
              : "w-3/12 border  items-center rounded-lg h-[40] justify-center"
          }
        >
          <Text
            className={
              skillLevel == "Intermidiate"
                ? "text-white text-xl"
                : "text-black text-xl"
            }
          >
            Intermidiate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSkillLevel("Advanced");
          }}
          activeOpacity={0.8}
          className={
            skillLevel == "Advanced"
              ? "w-3/12 border bg-blue-500  items-center rounded-lg h-[40] justify-center"
              : "w-3/12 border  items-center rounded-lg h-[40] justify-center"
          }
        >
          <Text
            className={
              skillLevel == "Advanced"
                ? "text-white text-xl"
                : "text-black text-xl"
            }
          >
            Advanced
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full items-center justify-center h-[20%] ">
        <TouchableOpacity
           
          onPress={() => {
            if(isLoading){
                setIsLoading(false)
            }
            else{
                setIsLoading(true)
            }
            if(skillType){
                updateSkillIOffer(
                    uid,
                    newSkill,
                    skillShouldBeUpdated
                  );
              
            }
            else{
                updateSkillINeed(uid,newSkill,skillShouldBeUpdated)
                
            }   
          }}
          activeOpacity={0.8}
          className="w-[200] bg-blue-500 items-center rounded-lg h-[40] justify-center"
        >
          <Text className="text-white text-xl">
          {
                isLoading?(<ActivityIndicator color={"white"}></ActivityIndicator>):(<Text>Update</Text>)
          }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UpdateSkillsScreen;
