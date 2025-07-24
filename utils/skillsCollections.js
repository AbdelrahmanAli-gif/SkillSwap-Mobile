import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export const fetchSkillsList = async () => {
  const qSnap = await getDocs(collection(db, "skills"));
  return qSnap.docs.map((doc) => ({
    skillId: doc.id,
    ...doc.data(),
  }));
};

export const createSkillDoc = async (skill) => {
  try {
    const skillDocRef = addDoc(collection(db, "skills"), {
      skillName: skill.skillName,
      skillLevel: skill.skillLevel,
    })
  } catch (error) {
    console.error("Error creating skill document:", error);
  }
}