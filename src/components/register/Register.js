import React, { useContext } from "react";
import './register.css';
import { Button, Form, FormInput, Header } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { registerUser } from "../../firebase/auth";
import { Formik } from "formik";
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {

    const data = useContext(AuthContext);
    const navigate = useNavigate();
    const { loggedIn } = data;

    const initialValues = {
        email: '',
        password: ''
      }
    
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is Required")
              .email("Provide a valid Email Id"),
        password: Yup.string().required("Password is Required")
                  .min(7, "Must be atleast 7 characters long"),
    })

    const handleFormSubmit = async (values) => {
        const {email, password} = values;
        toast.success("User Registered Successfully !!!")
        if(!loggedIn){
          await registerUser(email, password);
          navigate("/");
        }
      }
    return(
        <>
        <ToastContainer />
        <div className="loginLayout">
            <Header as="h2" className="loginHead">Register Here</Header>
            <div className="formWrapper">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {
                  ({
                    handleChange,
                    handleBlur,
                    touched,
                    values,
                    errors,
                    handleSubmit
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormInput 
                        placeholder='Enter Email'
                        label="Email"
                        name="email" 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={(touched.email && errors.email) && errors.email}
                      />
                      <FormInput 
                        type="password"
                        placeholder='Enter Password'
                        label="Password"
                        name="password" 
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={(touched.password && errors.password) && errors.password}
                      />
                      <div>
                          <Button className="loginBtn" primary type='submit'>Register</Button>
                      </div>
                    </Form>
                  )
                }
              </Formik>
            </div>
        </div>
        </>
    );
}

export default Register;