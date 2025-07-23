import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import LocationInput from '../../components/LocationInput';
import PhoneInput from '../../components/PhoneInput';

const LocationPhone = ({ info, setInfo, setIsStepValid }) => {
    const {
        control,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            location: info.location || '',
            phone: info.phone || '',
        },
        mode: 'onChange',
    });

    useEffect(() => {
        setIsStepValid(isValid);
    }, [isValid]);

    useEffect(() => {
        const subscription = watch((values) => {
            setInfo((prev) => ({ ...prev, ...values }));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <View className="gap-3">
            <Controller
                control={control}
                name="location"
                rules={{ required: 'Location is required' }}
                render={({ field: { onChange, value } }) => (
                    <LocationInput value={value} onChange={onChange} />
                )}
            />
            {errors.location && <Text className="text-red-500 ml-4 -mt-1">Location is required</Text>}

            <Controller
                control={control}
                name="phone"
                rules={{ required: 'Phone is required' }}
                render={({ field: { onChange, value } }) => (
                    <PhoneInput value={value} onChange={onChange} />
                )}
            />
            {errors.phone && <Text className="text-red-500 ml-4 -mt-1">Phone is required</Text>}
        </View>
    );
};

export default LocationPhone;
