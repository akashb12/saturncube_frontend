import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import TextField from "../Fields/TextField";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import "./UpdatePage.css";
import {
  getSingleUserSlice,
  updateUserSlice,
  uploadImageSlice,
} from "../../features/users/userSlice";
function UpdatePage(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    profilePic: "",
    dob: "",
    doj: "",
  });
  const validate = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    phone: Yup.number().required(),
    doj: Yup.string().required(),
    dob: Yup.string().required(),
  });
  useEffect(() => {
    if (props.user.data) {
      dispatch(getSingleUserSlice(props.user.data?.id)).then(
        (res) =>
          setInfo({
            firstName: res.payload?.data.first_name,
            lastName: res.payload?.data.last_name,
            phone: res.payload?.data.phone,
            profilePic: res.payload?.data.profile_pic,
            dob: res.payload?.data.dob.split("T")[0],
            doj: res.payload?.data.doj.split("T")[0],
          })
        //   console.log(res.payload)
      );
    }
  }, [props.user]);
  return (
    <>
      <Formik
        initialValues={{
          firstName: info?.firstName,
          lastName: info.lastName,
          phone: info.phone,
          doj: info.doj,
          dob: info.dob,
        }}
        enableReinitialize
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
          const dataToSubmit = {
            id: props.user.data?.id,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            profile: info.profilePic,
            doj: values.doj,
            dob: values.dob,
          };
          dispatch(updateUserSlice(dataToSubmit)).then((res) => {
            console.log(res);
            // setInfo({
            //   name: res.payload.data.name,
            //   authorName: res.payload.data.author,
            //   description: res.payload.data.description,
            // });
          });
          //   resetForm();
        }}>
        {(formik) => (
          <Form className="update-form">
            <h1>Update Profile</h1>
            <div className="form-group">
              <TextField
                type="text"
                name="firstName"
                aria-describedby="nameHelp"
                placeholder="First Name"
              />
            </div>
            <div className="form-group">
              <TextField
                type="text"
                name="lastName"
                aria-describedby="nameHelp"
                placeholder="Last Name"
              />
            </div>
            <div className="form-group">
              <TextField
                type="number"
                name="phone"
                aria-describedby="nameHelp"
                placeholder="Phone"
              />
            </div>
            <div className="form-group">
              {loading ? (
                <div class="spinner-border" role="status">
                  <span class="sr-only"></span>
                </div>
              ) : (
                <img
                  src={info.profilePic}
                  alt=""
                  className="img-fluid"
                  style={{ height: "100px" }}
                />
              )}
            </div>
            <div className="form-group">
              <TextField
                type="file"
                name="file"
                placeholder="Profile Pic"
                onChange={(event) => {
                  const fileList = event.currentTarget.files[0];
                  const formData = new FormData();
                  formData.append("file", fileList);
                  setLoading(true);
                  dispatch(uploadImageSlice(formData)).then((res) => {
                    setInfo({ ...info, profilePic: res.payload.data });
                    setLoading(false);
                  });
                }}
                aria-describedby="nameHelp"
              />
            </div>

            <div className="form-group">
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
            <div className="form-group">
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

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <Link
                style={{ margin: "10px" }}
                className="btn btn-primary"
                to="/">
                Home
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default UpdatePage;
