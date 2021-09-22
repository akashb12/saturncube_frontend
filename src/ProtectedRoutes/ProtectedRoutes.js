/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthSlice, user } from "../features/users/userSlice";
export default function (SpecificComponent, option) {
  function AuthenticationCheck(props) {
    const usersDetails = useSelector(user).checkAuth;
    const dispatch = useDispatch();
    useEffect(() => {
      //To know my current status, send Auth request
      dispatch(checkAuthSlice()).then((response) => {
        //Not Loggined in Status
        if (response.error) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (option === false) {
            props.history.push("/");
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={usersDetails} />;
  }
  return AuthenticationCheck;
}
