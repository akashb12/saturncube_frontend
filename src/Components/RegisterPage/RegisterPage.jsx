import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import TextField from "../Fields/TextField";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import "./RegisterPage.css";
import {
  registerUserSlice,
  uploadImageSlice,
} from "../../features/users/userSlice";
import { useHistory } from "react-router-dom";
function RegisterPage() {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const validate = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
    confPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    phone: Yup.number().required(),
    doj: Yup.string().required(),
    dob: Yup.string().required(),
  });
  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confPassword: "",
          phone: "",
          file: "",
          doj: "",
          dob: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
          const dataToSubmit = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            phone: values.phone,
            profile: image,
            doj: values.doj,
            dob: values.dob,
          };
          dispatch(registerUserSlice(dataToSubmit)).then((res) =>
            history.push("/login")
          );
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
                    <h1 className="font-weight-bold py-3">Sign Up</h1>
                    <Form>
                      <div style={{ height: "46vh", overflow: "auto" }}>
                        <div className="form-row">
                          <div className="col-lg-7">
                            <TextField
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-lg-7">
                            <TextField
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>
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
                        <div className="form-row">
                          <div className="col-lg-7">
                            <TextField
                              type="password"
                              name="confPassword"
                              placeholder="Confirm Password"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-lg-7">
                            <TextField
                              type="number"
                              name="phone"
                              placeholder="Phone Number"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-lg-7">
                            <input
                              id="file"
                              type="file"
                              name="file"
                              className="form-control p-3 my-3"
                              placeholder="Profile Pic"
                              onChange={(event) => {
                                const fileList = event.currentTarget.files[0];
                                const formData = new FormData();
                                formData.append("file", fileList);
                                dispatch(uploadImageSlice(formData)).then(
                                  (res) => setImage(res.payload.data)
                                );
                              }}
                            />
                            <ErrorMessage
                              component="div"
                              className="error"
                              name="file is required"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-lg-7">
                            <TextField
                              type="text"
                              onFocus={(e) => {
                                e.currentTarget.type = "date";
                                e.currentTarget.focus();
                              }}
                              name="dob"
                              placeholder="Date Of Birth"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-lg-7">
                            <TextField
                              type="text"
                              onFocus={(e) => {
                                e.currentTarget.type = "date";
                                e.currentTarget.focus();
                              }}
                              name="doj"
                              placeholder="Date Of Joining"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-lg-7">
                          <button type="submit" className="login-btn mt-3 mb-5">
                            Register
                          </button>
                        </div>
                      </div>
                      <p>
                        Already have an account?
                        <Link to="/login"> Login</Link>
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

export default RegisterPage;
