import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesome } from '@expo/vector-icons';
import { signIn } from '../utils/firebaseGoogleAuth';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from "../contexts/ThemeContext";
import { theme as themeColors } from '../theme';
import Toast from 'react-native-toast-message';

const AuthForm = ({ inputs, buttonText, onSubmit, validationRules, submitError, children, showGoogle = true }) => {
    const [visibility, setVisibility] = useState(false);
    const { setUser } = useAuth();
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm();
    const { theme } = useTheme();
    const colors = themeColors(theme);
    const isRTL = i18n.dir() === 'rtl';

    const toggleVisibility = (id) => {
        setVisibility((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const onGoogleSubmit = async () => {
        try {
            const user = await signIn();
            setUser(user);
            if (user.bio === null) navigation.navigate('Complete Profile');
            else navigation.navigate('App');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t("feedback.googleSignInFailed"),
            });
        }
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
                                <View View className="relative">
                                    <TextInput
                                        className={`rounded-lg bg-input-bg-light dark:bg-input-bg-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark text-text-primary-light dark:text-text-primary-dark p-5 h-[50px] ${i18n.language === 'ar' ? 'pl-12' : 'pr-12'}`}
                                        placeholder={input.placeholder}
                                        keyboardType={input.keyboardType}
                                        secureTextEntry={input.secureTextEntry && !visibility[input.id]}
                                        value={value}
                                        onChangeText={onChange}
                                        textAlign={i18n.language === 'ar' ? 'right' : 'left'}
                                    />
                                    {input.secureTextEntry && (
                                        <TouchableOpacity
                                            className={`absolute ${i18n.language === 'ar' ? 'left-4' : 'right-4'} top-[14px]`}
                                            onPress={() => toggleVisibility(input.id)}
                                        >
                                            <FontAwesome
                                                name={visibility[input.id] ? 'eye-slash' : 'eye'}
                                                size={20}
                                                color={colors.colors.textPrimary}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )
                            }
                        />
                        {
                            errors[input.id] && (
                                <Text className="text-red-500 text-sm mt-1 px-2">
                                    {errors[input.id]?.message}
                                </Text>
                            )
                        }
                    </View>
                );
            })}

            <TouchableOpacity
                className="bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark rounded-lg h-[50px] flex items-center justify-center"
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.6 : 1 }}
            >
                <Text className="text-lg font-bold text-white">{isSubmitting ? 'Loading...' : buttonText}</Text>
            </TouchableOpacity>

            {children}

            {showGoogle && (
                <>
                    <View className="flex-row items-center my-4">
                        <View className="flex-1 ml-2 h-[1px] bg-text-secondary-light dark:bg-text-secondary-dark"></View>
                        <Text className="mx-4 text-text-secondary-light dark:text-text-secondary-dark">{t('or')}</Text>
                        <View className="flex-1 mr-2 h-[1px] bg-text-secondary-light dark:bg-text-secondary-dark"></View>
                    </View>

                    <View className="flex-col items-center justify-center">
                        <TouchableOpacity
                            className="relative bg-btn-submit-bg-light dark:bg-btn-submit-bg-dark w-full flex-row items-center justify-center rounded-lg h-[50px]"
                            onPress={onGoogleSubmit}
                        >
                            <View className={`absolute h-[50px] w-12 bg-white flex items-center justify-center ${isRTL ? 'rounded-r-lg right-0' : 'rounded-l-lg left-0'}`}>
                                <Image
                                    source={{ uri: 'https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw' }}
                                    className="w-8 h-8"
                                    resizeMode="center"
                                />
                            </View>
                            <Text className="font-bold text-white">
                                {t('google')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View >
    );
};

export default AuthForm;
