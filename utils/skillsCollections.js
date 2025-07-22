import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export const fetchSkillsList = async () => {
  const qSnap = await getDocs(collection(db, "skills"));
  return qSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};