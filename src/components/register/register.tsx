import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignupSchema } from "../../validation/validation";
import {toast} from 'sonner'
import { useNavigate } from "react-router-dom";
import { account } from "../../appwrite/appwrite";


function Register() {

    const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async(values) => {
        const registerpromise = account.create("unique()", values.email, values.password, `${values.firstName} ${values.lastName}`);
       
        toast.promise(registerpromise, {
            loading:"Registering user...",
            error:"Ragistration Failed",
            success:"Register successful",
        });

        try{
            await registerpromise;
            navigate("/");
        }catch(error){
            console.error("Error in register:", error);
        }

        
      }}
    >
      <Form>
        <div className="flex flex-col gap-3 h-full w-[38vw] border-[1px] border-[black] mx-auto my-2 p-2 rounded-lg">
          <h1 className="text-3xl font-semibold">Register</h1>

          <div className="flex flex-col text-start font-medium">
            <Label>First Name</Label>
            <Field
              as={Input}
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-400"
            />
          </div>

          <div className="flex flex-col text-start font-semibold">
            <Label>Last Name</Label>
            <Field
              as={Input}
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-400"
            />
          </div>

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

          <div className="flex flex-col text-start font-semibold">
            <Label>Confirm Password</Label>
            <Field
              as={Input}
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-400"
            />
          </div>

          <Button type="submit" className="w-[10vw] h-[5vh]">
            Sign Up
          </Button>
          <div className="flex justify-start gap-6">
            <p>Do have an account?</p>
            <Button variant={"destructive"} className="bg-blue-600 h-[5vh]" onClick={() => navigate("/")}>
              Log In
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default Register;