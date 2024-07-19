
// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Label } from '@radix-ui/react-label';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { LoginSchema } from '../../validation/validation';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import { account } from '../../appwrite/appwrite';

// const Login: React.FC = () => {
//     const navigate = useNavigate();

//     return (
//         <Formik
//             initialValues={{
//                 email: '',
//                 password: '',
//             }}
//             validationSchema={LoginSchema}
//             onSubmit={async (values) => {
//                 const loginPromise = account.createEmailPasswordSession(values.email, values.password)

//                 toast.promise(loginPromise, {
//                     loading: 'Logging in...',
//                     error: 'Login Failed',
//                     success: 'Login successful',
//                 });

//                 try {
//                     await loginPromise;
//                     navigate('/');
//                 } catch (error) {
//                     console.error('Error in login:', error);
//                 }
//             }}
//         >
//             <Form>
//                 <div className="flex flex-col gap-3 h-full w-[38vw] border-[1px] border-[black] mx-auto my-2 p-2 rounded-lg">
//                     <h1 className="text-3xl font-semibold">Login</h1>
//                     <div className="flex flex-col text-start font-medium">
//                         <Label>Email</Label>
//                         <Field as={Input} type="email" name="email" placeholder="Enter Your Email" />
//                         <ErrorMessage name="email" component="div" className="text-red-400" />
//                     </div>
//                     <div className="flex flex-col text-start font-semibold">
//                         <Label>Password</Label>
//                         <Field as={Input} type="password" name="password" placeholder="Enter Your Password" />
//                         <ErrorMessage name="password" component="div" className="text-red-400" />
//                     </div>
//                     <Button type="submit" className="w-[10vw] h-[5vh]">Log In</Button>
//                     <div className="flex justify-start gap-6">
//                         <p>Don't have an account?</p>
//                         <Button variant="destructive" className="bg-blue-600 h-[5vh]" onClick={() => navigate('/register')}>Sign Up</Button>
//                     </div>
//                 </div>
//             </Form>
//         </Formik>
//     );
// };

// export default Login;


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LoginSchema } from '../../validation/validation';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { account } from '../../appwrite/appwrite';

const Login: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
                const loginPromise = account.createEmailPasswordSession(values.email, values.password);

                toast.promise(loginPromise, {
                    loading: 'Logging in...',
                    error: 'Login Failed',
                    success: 'Login successful',
                });

                try {
                    await loginPromise;
                    navigate('/');
                } catch (error) {
                    console.error('Error in login:', error);
                }
            }}
        >
            <Form className="flex flex-col items-center gap-4 mx-auto my-4 p-4 w-full max-w-lg border border-black rounded-lg">
                <h1 className="text-3xl font-semibold">Login</h1>
                <div className="flex flex-col w-full">
                    <Label>Email</Label>
                    <Field as={Input} type="email" name="email" placeholder="Enter Your Email" className="p-2 border border-gray-400 rounded" />
                    <ErrorMessage name="email" component="div" className="text-red-400" />
                </div>
                <div className="flex flex-col w-full">
                    <Label>Password</Label>
                    <Field as={Input} type="password" name="password" placeholder="Enter Your Password" className="p-2 border border-gray-400 rounded" />
                    <ErrorMessage name="password" component="div" className="text-red-400" />
                </div>
                <Button type="submit" className="w-full p-2 mt-4 text-white bg-blue-600 rounded">Log In</Button>
                <div className="flex justify-between w-full mt-4">
                    <p>Don't have an account?</p>
                    <Button variant="destructive" className="bg-blue-600" onClick={() => navigate('/register')}>Sign Up</Button>
                </div>
            </Form>
        </Formik>
    );
};

export default Login;
