import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { signIn } from '../utils/googleTest';

const Test = () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function handleAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <>
                <Text>Login</Text>
                <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={signIn} />
            </>
        );
    }

    return (
        <View>
            <Text>Welcome {user.email}</Text>
            <TouchableOpacity onPress={() => getAuth().signOut()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Test;