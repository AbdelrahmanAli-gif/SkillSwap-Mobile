import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export const register = async (email, password, name) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        await updateProfile(user, { displayName: name });
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            email,
            createdAt: new Date().toISOString(),
            provider: "email",
        });
        signOut(auth);
    } catch (error) {
        throw error;
    }
}

export const login = (email, password) => {
    try {
        return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    return await signOut(auth);
}