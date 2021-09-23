import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsersSlice, logoutSlice } from "../../features/users/userSlice";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
function HomePage() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsersSlice()).then((res) => setUsers(res.payload.data));
  }, []);
  return (
    <>
      <div className="home-page">
        <h1>All Employees</h1>
        <div>
          <Link to="/Update" className="btn btn-primary update">
            Update Profile
          </Link>
          <button
            onClick={() => {
              dispatch(logoutSlice()).then((res) => history.push("/login"));
            }}
            className="btn btn-primary update">
            Logout
          </button>
        </div>
        {!users.length ? (
          <div>
            <img style={{ height: "300px" }} src="/images/empty.jpg" />
          </div>
        ) : (
          <table className="table">
            <thead
              className="thead-dark"
              style={{ color: "white", background: "black" }}>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Link
                          to={`/detail/${user._id}`}
                          className="btn btn-primary">
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default HomePage;
