import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export const signIn = async () => {
    GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });

    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        await GoogleSignin.signOut();

        const signInResult = await GoogleSignin.signIn();

        const idToken = signInResult?.idToken || signInResult?.data?.idToken;
        if (!idToken) throw new Error('No ID token found');

        const googleCredential = GoogleAuthProvider.credential(idToken);
        const authResult = await signInWithCredential(getAuth(), googleCredential);

        const user = authResult.user;

        if (!user.displayName) await user.updateProfile({ displayName: signInResult.data.user.name });

        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        let userData;
        if (!docSnap.exists()) {
            userData = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                createdAt: new Date().toISOString(),
                profilePicture: user.photoURL,
                bio: user.bio ? user.bio : null,
                phone: user.phone ? user.phone : null,
                location: user.location ? user.location : { city: null, country: null },
                availability: true,
                isAvailableForTrade: user.isAvailableForTrade ? user.isAvailableForTrade : true,
                isAvailableForPaid: user.isAvailableForPaid ? user.isAvailableForPaid : true,
                rating: user.rating ? user.rating : null,
                reviews: user.reviews ? user.reviews : [],
                totalSessions: user.totalSessions ? user.totalSessions : 0,
                hasSkills: user.hasSkills ? user.hasSkills : [],
                needSkills: user.needSkills ? user.needSkills : [],
                subscribtion: user.subscribtion ? user.subscribtion : { plan: "free", activeTradeCount: 0 },
            }
            await setDoc(userRef, userData);
        } else userData = docSnap.data();

        return { uid: user.uid, ...userData };
    } catch (error) {
        console.log(error);
        throw new Error('Google Sign-In error', error);
    }
};
