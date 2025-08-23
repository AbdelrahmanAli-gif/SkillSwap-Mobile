import { addDoc, collection, doc, onSnapshot, or, query, updateDoc, where } from "firebase/firestore";
import { db } from "../services/firebase";

export const subscribeToUserRequests = (userId, callback) => {
    const q = query(
        collection(db, "requests"),
        where("requestedUser.uid", "==", userId)
    );

    return onSnapshot(q, (snapshot) => {
        const requests = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(requests);
    });
};

export const subscribeToUserTrades = (userId, callback) => {
    const q = query(
        collection(db, "trades"),
        or(
            where("userA", "==", userId),
            where("userB", "==", userId)
        )
    );

    return onSnapshot(q, (snapshot) => {
        const trades = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(trades);
    });
};

export const updateTrade = async (tradeId, key, data) => {
    try {
        const tradeDocRef = doc(db, "trades", tradeId);
        await updateDoc(tradeDocRef, {
            [key]: data,
        });
    } catch (error) {
        console.error("Error updating trade:", error);
    }
};

export const addTrade = async (request, milestones) => {
    try {
        const trade = {
            createdAt: new Date(),
            milestonesA: milestones.milestonesA,
            milestonesB: milestones.milestonesB,
            skillA: request.requestedSkill.skillName,
            skillB: request.offeredSkill.skillName,
            skillALevel: request.requestedSkill.skillLevel,
            skillBLevel: request.offeredSkill.skillLevel,
            userA: request.requestedUser.uid,
            userB: request.requestingUser.uid
        }
        const docRef = await addDoc(collection(db, "trades"), trade);
        return { id: docRef.id, ...trade };
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};