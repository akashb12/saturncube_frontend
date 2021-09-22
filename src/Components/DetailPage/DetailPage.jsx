import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleUserSlice } from "../../features/users/userSlice";
import "./DetailPage.css";
function DetailPage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleUserSlice(id)).then((res) => {
      console.log(res);
      setEmployee(res.payload.data);
      setDob(res.payload.data.dob);
      setDoj(res.payload.data.doj);
    });
  }, []);
  return (
    <div className="detail">
      <div class="card">
        <img
          class="card-img-top"
          src={employee.profile_pic}
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">
            {employee.first_name} {employee.last_name}
          </h5>
          <p class="card-text">{employee.email}</p>
          <p class="card-text">{employee.phone}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Date Of Birth: {dob.split("T")[0]}</li>

          <li class="list-group-item">Date Of Joining: {doj.split("T")[0]}</li>
        </ul>
        <div class="card-body">
          <Link to="/" class="btn btn-primary">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
