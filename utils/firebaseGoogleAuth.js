import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';

export const signIn = async () => {
    GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });

    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResult = await GoogleSignin.signIn();

        console.log("Google Sign-In result:", signInResult);

        let idToken = signInResult?.idToken || signInResult?.data?.idToken;
        if (!idToken) {
            throw new Error('No ID token found');
        }

        const googleCredential = GoogleAuthProvider.credential(idToken);
        return signInWithCredential(getAuth(), googleCredential);
    } catch (error) {
        console.error("Google Sign-In error", error);
    }
};