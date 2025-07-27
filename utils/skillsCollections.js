import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { generateFromGemini } from "../api/gemini";
import { getSkillCategory, translateSkillToArabic } from "../helpers/prompts";

export const fetchSkillsList = async () => {
  const qSnap = await getDocs(collection(db, "skills"));
  return qSnap.docs.map((doc) => ({
    skillId: doc.id,
    ...doc.data(),
  }));
};

export const createSkillDoc = async (skillName) => {  
  try {
    const category = await generateFromGemini(getSkillCategory(skillName, await getSkillCategories()));
    const skillNameArabic = await generateFromGemini(translateSkillToArabic(skillName));
    
    const skillDocRef = addDoc(collection(db, "skills"), {
      skillName: skillName,
      skillNameArabic: skillNameArabic,
      createdAt: new Date(),
      category: category,
    })
  } catch (error) {
    console.error("Error creating skill document:", error);
  }
}

export const getSkillCategories = async () => {
  const skills = await fetchSkillsList();
  const categories = new Set(skills.map(skill => skill.category));
  return Array.from(categories);
}