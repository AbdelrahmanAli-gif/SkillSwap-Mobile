import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesome } from '@expo/vector-icons';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { signIn } from '../utils/firebaseGoogleAuth';

const AuthForm = ({ inputs, buttonText, onSubmit, validationRules, submitError, children }) => {
    const [visibility, setVisibility] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm();

    const toggleVisibility = (id) => {
        setVisibility((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <View className="w-full p-5 mb-4">
            {submitError && (
                <Text className="text-red-500 text-sm text-center mb-2">{submitError}</Text>
            )}
            {inputs.map((input) => {
                const rules = validationRules?.[input.id];
                const processedRules =
                    typeof rules?.validate === 'function'
                        ? { ...rules, validate: (value) => rules.validate(value, getValues) }
                        : rules;

                return (
                    <View key={input.id} className="mb-4">
                        <Controller
                            control={control}
                            name={input.id}
                            rules={processedRules}
                            render={({ field: { onChange, value } }) => (
                                <View className="relative">
                                    <TextInput
                                        className="rounded-lg bg-[#E8EDF5] p-5 h-[50px] pr-12"
                                        placeholder={input.placeholder}
                                        keyboardType={input.keyboardType}
                                        secureTextEntry={input.secureTextEntry && !visibility[input.id]}
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                    {input.secureTextEntry && (
                                        <TouchableOpacity
                                            className="absolute right-4 top-[14px]"
                                            onPress={() => toggleVisibility(input.id)}
                                        >
                                            <FontAwesome
                                                name={visibility[input.id] ? 'eye-slash' : 'eye'}
                                                size={20}
                                                color="#555"
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        />
                        {errors[input.id] && (
                            <Text className="text-red-500 text-sm mt-1 px-2">
                                {errors[input.id]?.message}
                            </Text>
                        )}
                    </View>
                );
            })}

            <TouchableOpacity
                className="bg-[#3D99F5] rounded-lg h-[50px] flex items-center justify-center"
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.6 : 1 }}
            >
                <Text className="text-lg font-bold text-white">{isSubmitting ? 'Loading...' : buttonText}</Text>
            </TouchableOpacity>

            {children}

            <View className="flex-row items-center my-4">
                <View className="flex-1 ml-4 h-[1px] bg-gray-400"></View>
                <Text className="mx-4 text-gray-400">or</Text>
                <View className="flex-1 mr-4 h-[1px] bg-gray-400"></View>
            </View>

            <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={signIn} />
        </View>
    );
};

export default AuthForm;
