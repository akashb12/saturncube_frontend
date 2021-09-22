import { configureStore } from "@reduxjs/toolkit";
import users from "../features/users/userSlice";
const store = configureStore({
  reducer: {
    users: users,
  },
});
export default store;
