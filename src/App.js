import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Auth from "./ProtectedRoutes/ProtectedRoutes";
const LoginPage = lazy(() => import("./Components/LoginPage/LoginPage"));
const RegisterPage = lazy(() =>
  import("./Components/RegisterPage/RegisterPage")
);
const HomePage = lazy(() => import("./Components/HomePage/HomePage"));
const DetailPage = lazy(() => import("./Components/DetailPage/DetailPage"));
const UpdatePage = lazy(() => import("./Components/UpdatePage/UpdatePage"));

// import HomePage from "./Components/HomePage/HomePage";
// import LoginPage from "./Components/LoginPage/LoginPage";
// import RegisterPage from "./Components/RegisterPage/RegisterPage";
// import DetailPage from "./Components/DetailPage/DetailPage";
// import UpdatePage from "./Components/UpdatePage/UpdatePage";
function App() {
  return (
    <div className="App">
      <Router>
        <Suspense
          fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Auth(HomePage, true)} />
            <Route path="/register" component={Auth(RegisterPage, false)} />
            <Route path="/login" component={Auth(LoginPage, false)} />
            <Route path="/detail/:id" component={Auth(DetailPage, true)} />
            <Route path="/update" component={Auth(UpdatePage, true)} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
