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
                bio: user.bio ? user.bio : null,
                createdAt: new Date().toISOString(),
                email: user.email,
                isAvailableForPaid: user.isAvailableForPaid ? user.isAvailableForPaid : null,
                isAvailableForTrade: user.isAvailableForTrade ? user.isAvailableForTrade : null,
                location: user.location ? user.location : { city: null, country: null },
                name: user.displayName,
                phone: user.phone ? user.phone : null,
                rating: user.rating ? user.rating : null,
                uid: user.uid,
                profilePicture: user.photoURL
            }
            await setDoc(userRef, userData);
        } else userData = docSnap.data();

        return { uid: user.uid, ...userData };
    } catch (error) {
        console.log(error);
        throw new Error('Google Sign-In error', error);
    }
};
