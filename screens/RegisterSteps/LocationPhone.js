import { View } from 'react-native';
import LocationInput from '../../components/LocationInput';
import PhoneInput from '../../components/PhoneInput';

const LocationPhone = () => {
    return (
        <View>
            <LocationInput />
            <PhoneInput />
        </View>
    );
}

export default LocationPhone;