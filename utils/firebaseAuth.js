import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../services/firebase";

export const register = async (email, password, name) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        await updateProfile(user, { displayName: name });
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

export const logout = () => {
    return signOut(auth);
}