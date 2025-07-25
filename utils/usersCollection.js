import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

export const getAllOtherUsers = async (userId) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));

        const otherUsers = [];

        querySnapshot.forEach((doc) => {
            if (doc.id !== userId) {
                otherUsers.push({ id: doc.id, ...doc.data() });
            }
        });

        return otherUsers;
    } catch (error) {
        console.error('Error getting other users:', error);
        throw error;
    }
};

export const getUserById = async (userId) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        return { id: userDoc.id, ...userDoc.data() };
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error;
    }
}