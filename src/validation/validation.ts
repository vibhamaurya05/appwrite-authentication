import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
});

export const LoginSchema = Yup.object().shape({
  
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .required('Required'),
});
