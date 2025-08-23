import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
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

export const reviewUser = async (otherUserId, user, review) => {
    try {
        const userRef = doc(db, "users", otherUserId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        const reviews = userData.reviews;
        const newReview = {
            authorName: user.name,
            authorPhoto: user.profilePicture,
            communication: review.communication,
            createdAt: new Date().toISOString(),
            punctuality: review.punctuality,
            rating: review.rating,
            reviewId: `${user.uid}_${Date.now()}`,
            reviewerId: user.uid,
            teachingSkill: review.teachingSkill,
            text: review.text ? review.text : ""
        };
        reviews.push(newReview);
        const totalRatings = reviews.length;
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings;
        await updateDoc(userRef, {
            rating: averageRating,
            totalSessions: totalRatings,
            reviews: reviews
        });
    } catch (error) {
        console.error("Error submitting rating:", error);
        throw error;
    }
}

export async function updateUserById(uid, newData) {
  const ref = doc(db, "users", uid);
  // If you want to merge top-level keys:
  await setDoc(ref, newData, { merge: true });
  // OR update specific fields:
  // await updateDoc(ref, { "subscribtion.plan": "free" })
  // return updated doc or just true
}