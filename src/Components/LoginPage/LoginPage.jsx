import React, { useState } from "react";
import { Formik, Form, validateYupSchema } from "formik";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import TextField from "../Fields/TextField";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUserSlice } from "../../features/users/userSlice";
import { useHistory } from "react-router-dom";
function LoginPage() {
  const dispatch = useDispatch();
  const validate = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
  });
  const [error, setError] = useState("");
  const history = useHistory();
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
          const dataToSubmit = {
            email: values.email,
            password: values.password,
          };
          dispatch(loginUserSlice(dataToSubmit)).then((res) => {
            if (res.error && res.error.message) {
              setError("email or password is invalid");
            } else {
              history.push("/");
            }
          });
          resetForm();
        }}>
        {(formik) => (
          <div className="login">
            <section className="Form pt-4  mx-5">
              <div className="container">
                <div className="row no-gutters login-row">
                  <div className="col-lg-5">
                    <img
                      src="/images/signup.jpg"
                      className="img-fluid login-img"
                      alt="not found"
                    />
                  </div>
                  <div className="col-lg-7 px-5 py-5 login-form">
                    <h1 className="font-weight-bold py-3">SANTURNCUBE</h1>
                    <h3>Sign into your account</h3>
                    <Form>
                      <div className="form-row">
                        <div className="col-lg-7">
                          <TextField
                            type="email"
                            name="email"
                            placeholder="Email Address"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-lg-7">
                          <TextField
                            type="password"
                            name="password"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      {error && <span className="error">{error}</span>}
                      <div className="form-row">
                        <div className="col-lg-7">
                          <button type="submit" className="login-btn mt-3 mb-5">
                            Login
                          </button>
                        </div>
                      </div>
                      <p>
                        Don't have an account?
                        <Link to="/register"> Register Here</Link>
                      </p>
                    </Form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </Formik>
    </>
  );
}

export default LoginPage;
