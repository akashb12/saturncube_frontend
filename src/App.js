import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Auth from "./ProtectedRoutes/ProtectedRoutes";
import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import RegisterPage from "./Components/RegisterPage/RegisterPage";
import DetailPage from "./Components/DetailPage/DetailPage";
import UpdatePage from "./Components/UpdatePage/UpdatePage";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Auth(HomePage, true)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/detail/:id" component={Auth(DetailPage, true)} />
          <Route path="/update" component={Auth(UpdatePage, true)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
