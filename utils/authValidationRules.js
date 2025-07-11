export const authValidationRules = {
    name: {
        required: 'Name is required',
    },
    email: {
        required: 'Email is required',
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Invalid email address',
        },
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
        },
    },
    'confirm-password': {
        required: 'Please confirm your password',
        validate: (value, getValues) =>
            value === getValues('password') || 'Passwords do not match',
    },
};
