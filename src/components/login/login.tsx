import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from 'sonner';
import { LoginSchema } from "../../validation/validation";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwrite/appwrite";

const Login: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
                const loginPromise = account.createEmailPasswordSession(values.email, values.password);

                toast.promise(loginPromise, {
                    loading: "Logging In...",
                    error: "Login Failed",
                    success: "Login successful",
                });

                try {
                    await loginPromise;
                    navigate("/dashboard");
                } catch (error) {
                    console.error("Error in login:", error);
                }
            }}
        >
            <Form>
                <div className="flex flex-col gap-2 h-full w-[40vw] border-[1px] border-[black] mx-auto my-[8rem] p-2 rounded-lg">
                    <h1 className="text-3xl font-semibold">Login</h1>

                    <div className="flex flex-col text-start font-semibold">
                        <Label>Email</Label>
                        <Field
                            as={Input}
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-400"
                        />
                    </div>

                    <div className="flex flex-col text-start font-semibold">
                        <Label>Password</Label>
                        <Field
                            as={Input}
                            type="password"
                            name="password"
                            placeholder="Enter Your Password"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-400"
                        />
                    </div>

                    <Button type="submit" className="w-[10vw] h-[5vh]">
                        Log In
                    </Button>
                    <div className="flex justify-start gap-6">
                        <p>Don't have an account?</p>
                        <Button variant={"destructive"} className="bg-blue-600 h-[5vh]" onClick={() => navigate("/register")}>
                            Sign Up
                        </Button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default Login;
