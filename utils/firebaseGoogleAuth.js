import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';

export const signIn = async () => {
    GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });

    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResult = await GoogleSignin.signIn();

        const idToken = signInResult?.idToken || signInResult?.data?.idToken;
        if (!idToken) {
            throw new Error('No ID token found');
        }

        const googleCredential = GoogleAuthProvider.credential(idToken);
        const authResult = await signInWithCredential(getAuth(), googleCredential);

        const user = authResult.user;

        if (!user.displayName) {
            await user.updateProfile({ displayName: signInResult.data.user.name });
        }

        return authResult;
    } catch (error) {
        console.error("Google Sign-In error", error);
    }
};
