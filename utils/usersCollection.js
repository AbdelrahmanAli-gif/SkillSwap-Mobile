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

export const getAllOtherUsersFiltered = async (userId) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));

        const usersFiltered = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            const isNotCurrentUser = doc.id !== userId;
            const hasBio = data.bio && data.bio.trim() !== "";

            if (isNotCurrentUser && hasBio) {
                usersFiltered.push({ id: doc.id, ...data });
            }
        });

        return usersFiltered;
    } catch (error) {
        console.error('Error getting users with bio:', error);
        throw error;
    }
}

export const getUserById = async (userId) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        return { id: userDoc.id, ...userDoc.data() };
    } catch (error) {
        console.error('Error getting user by ID:', error);
        throw error;
    }
}