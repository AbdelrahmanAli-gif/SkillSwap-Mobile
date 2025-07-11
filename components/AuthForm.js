import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const AuthForm = ({ inputs, buttonText, onSubmit, validationRules, submitError }) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm();

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
                                <TextInput
                                    className="rounded-lg bg-[#E8EDF5] p-5 h-[50px]"
                                    placeholder={input.placeholder}
                                    keyboardType={input.keyboardType}
                                    secureTextEntry={input.secureTextEntry}
                                    value={value}
                                    onChangeText={onChange}
                                />
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
        </View>
    );
};

export default AuthForm;
