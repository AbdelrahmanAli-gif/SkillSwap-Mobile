import { collection, onSnapshot, or, query, where } from "firebase/firestore";
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