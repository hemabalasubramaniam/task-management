import React, { useContext, useState } from "react";
import './login.css';
import { Button, Form, FormInput, Header, Message, MessageHeader } from "semantic-ui-react";
import { loginUser } from "../../firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const data = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, showError] = useState(false);

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is Required")
          .email("Provide a valid Email Id"),
    password: Yup.string().required("Password is Required")
              .min(7, "Must be at least 7 characters long"),
  });

  const { loggedIn, loginAction } = data;

  const handleFormSubmit = async (values) => {
    const {email, password} = values;
    if (!loggedIn) {
      try {
        await loginUser(email, password);
        toast.success("Login Successfull !!!")
        showError(false);
        await loginAction(true);
        navigate("/dashboard");
      } catch (error) {
        showError(true);
      }
    }
  }


  return(
    <>
    <ToastContainer />
      <div className="loginLayout">
        <Header as="h1" className="heading">Task Management App</Header>
        <Header as="h2" className="loginHead">Login</Header>
        <div className="formWrapper">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
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
                  error={touched.email && errors.email}
                />
                <FormInput 
                  type="password"
                  placeholder='Enter Password'
                  label="Password"
                  name="password" 
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                />
                <div>
                  <Button className="loginBtn" primary type='submit'>Login</Button>
                </div>
                <div className="link">
                  <a href="/register">Link to Registration</a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        {error && (
          <Message negative>
            <MessageHeader>Invalid Credentials !!!</MessageHeader>
            <p>Provide a valid Email and Password</p>
          </Message>
        )}
      </div>
    </>
  );
}

export default Login;
