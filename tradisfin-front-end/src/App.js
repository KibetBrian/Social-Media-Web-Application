import HomePage from "./homepage/HomePage";
import Login from './login/Login';
import RegisterPage from './Register/RegisterPage';
import Profile from './profile/Profile';
import Messenger from "./components/messenger/Messenger";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import ResetPassword from "./Pages/ForgotPassword/ResetPassword/ResetPassword";
import RightBar from "./components/rightbar/RightBar";
import AddPost from "./Pages/AddPost/AddPost";
import Notifications from "./Pages/Notifications/Notifications";


function App() {
  const {user} = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path = "/">
            {user ? <HomePage />: <RegisterPage/> }
          </Route>

          <Route path = "/login">
          {user ? <Redirect to = '/' />: <Login/> }
          </Route>

          <Route path = "/register">
          {user ? <Redirect to = '/' />: <RegisterPage/> }
          </Route>

          <Route path = "/profile/:username">
            <Profile />
          </Route>

          <Route path = "/messenger">
             {!user ? <Redirect to = '/' /> : <Messenger />}
          </Route>
          
          <Route exact path ={"/forgot-password"}>
              <ForgotPassword />
          </Route>

          <Route exact path ={"/forgot-password/reset-password/:id/:token"}>
              <ResetPassword />
          </Route>
          <Route exact path ={"/trending"}>
              <RightBar />
          </Route>
          <Route exact path ={"/add-post"}>
              <AddPost />
          </Route>
          <Route exact path ={"/notifications"}>
              <Notifications />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
