import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';

// export const signIn = async () => {
//     GoogleSignin.configure({
//         webClientId: '65966315424-uuj9dka43rs58jcs8g7sot6hcdrh226n.apps.googleusercontent.com',
//     });

//     try {
//         // Check if your device supports Google Play
//         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//         // Get the users ID token
//         const signInResult = await GoogleSignin.signIn();
//         console.log(signInResult);
//         // Try the new style of google-sign in result, from v13+ of that module
//         idToken = signInResult.data?.idToken;
//         if (!idToken) {
//             // if you are using older versions of google-signin, try old style result
//             idToken = signInResult.idToken;
//         }
//         if (!idToken) {
//             throw new Error('No ID token found');
//         }

//         // Create a Google credential with the token
//         // const googleCredential = GoogleAuthProvider.credential(signInResult.data.idToken);
//         const googleCredential = GoogleAuthProvider.credential(idToken);

//         // Sign-in the user with the credential
//         return signInWithCredential(getAuth(), googleCredential);
//     } catch (error) {
//         if (isErrorWithCode(error)) {
//             switch (error.code) {
//                 case statusCodes.IN_PROGRESS:
//                     // operation (eg. sign in) already in progress
//                     break;
//                 case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
//                     // Android only, play services not available or outdated
//                     break;
//                 default:
//                 // some other error happened
//             }
//         } else {
//             // an error that's not related to google sign in occurred
//         }
//     }
// };

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