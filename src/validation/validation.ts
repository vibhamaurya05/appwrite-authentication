import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Enter your first name'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Enter your last name'),
    email: Yup.string().email('Invalid email').required('Enter your email'),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required('Enter your password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
});

export const LoginSchema = Yup.object().shape({
  
  email: Yup.string().email('Invalid email').required('Enter your email'),
  password: Yup.string()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .required('Enter your password'),
});
