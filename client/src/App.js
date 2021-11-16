import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import dotenv from "dotenv";

import { useDispatch } from "react-redux";

import Nav from "./components/utils/Nav";
import Footer from "./components/utils/footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import TourInfo from "./components/tours/pages/TourInfo";
import TourList from "./components/tours/components/TourList";

import "./index.css";
import MyProfile from "./components/user/pages/MyProfile";
import { useSelector } from "react-redux";
import LoadingSpinner from "./components/utils/LoadingSpinner";
import { tokenLogin } from "./components/reducers/authSlice";
import NotDefined from "./components/tours/pages/NotDefined";

dotenv.config();

console.log(process.env.REACT_APP_BACKEND_URL);

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(tokenLogin());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  const { user } = useSelector((state) => state.user);
  return (
    <Router>
      <Nav />
      <main className="main">
        <Route exact path="/">
          <TourList />
        </Route>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Register />
          </Route>
        </Switch>
        <Route exact path="/tours/:tourId">
          <TourInfo />
        </Route>
        <Route exact path="/bookTour">
          <NotDefined />
        </Route>
        {token && (
          <Route exact path="/myProfile">
            {user && user.loading ? <LoadingSpinner /> : <MyProfile />}
          </Route>
        )}
      </main>
      <Redirect to="/" />
      <Footer />
    </Router>
  );
}

export default App;
