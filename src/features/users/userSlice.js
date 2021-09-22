import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../axios/axios";
// upload image
export const uploadImageSlice = createAsyncThunk(
  "/users/upload",
  async (data) => {
    const uploadImage = await axiosRequest
      .post("/upload", data)
      .then((res) => res.data);
    return uploadImage;
  }
);

// login user
export const loginUserSlice = createAsyncThunk("users/login", async (data) => {
  const loginUser = await axiosRequest
    .post("/login", data, { withCredentials: true })
    .then((res) => res.data);
  return loginUser;
});

// register user
export const registerUserSlice = createAsyncThunk(
  "users/register",
  async (data) => {
    const registerUser = await axiosRequest
      .post("/register", data)
      .then((res) => res.data);
    return registerUser;
  }
);

// check auth
export const checkAuthSlice = createAsyncThunk("users/auth", async (data) => {
  const checkAuth = await axiosRequest
    .get("/auth", data)
    .then((res) => res.data);
  return checkAuth;
});

// get all users
export const getAllUsersSlice = createAsyncThunk("users/getUsers", async () => {
  const getAllUsers = await axiosRequest
    .get("/getUsers")
    .then((res) => res.data);
  return getAllUsers;
});

// get single user
export const getSingleUserSlice = createAsyncThunk(
  "users/getUserById",
  async (id) => {
    const getSingleUser = await axiosRequest
      .get(`/getUserById/${id}`)
      .then((res) => res.data);
    return getSingleUser;
  }
);

// update user
export const updateUserSlice = createAsyncThunk(
  "users/update",
  async (data) => {
    const { id, ...fields } = data;
    const upateUser = await axiosRequest
      .put(`/update/${id}`, fields)
      .then((res) => res.data);
    return upateUser;
  }
);

// logout
export const logoutSlice = createAsyncThunk("users/logout", async () => {
  const logoutUser = await axiosRequest
    .post(`/logout`, { data: "name" }, { withCredentials: true })
    .then((res) => res.data);
  return logoutUser;
});
export const userSlice = createSlice({
  name: "users",
  initialState: {
    uploadImage: {},
    loginUser: {},
    registerUser: {},
    checkAuth: {},
    getUsers: {},
    singleUser: {},
    updateUser: {},
    logoutUser: {},
  },
  reducers: {},
  extraReducers: {
    [uploadImageSlice.fulfilled]: (state, { payload }) => {
      state.uploadImage = payload;
    },
    [loginUserSlice.fulfilled]: (state, { payload }) => {
      state.loginUser = payload;
    },
    [registerUserSlice.fulfilled]: (state, { payload }) => {
      state.registerUser = payload;
    },
    [checkAuthSlice.fulfilled]: (state, { payload }) => {
      state.checkAuth = payload;
    },
    [getAllUsersSlice.fulfilled]: (state, { payload }) => {
      state.getUsers = payload;
    },
    [getSingleUserSlice.fulfilled]: (state, { payload }) => {
      state.singleUser = payload;
    },
    [updateUserSlice.fulfilled]: (state, { payload }) => {
      state.updateUser = payload;
    },
    [logoutSlice.fulfilled]: (state, { payload }) => {
      state.logoutUser = payload;
    },
  },
});
export const user = ({ users }) => users;
export default userSlice.reducer;
