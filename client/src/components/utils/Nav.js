import React, { useEffect, Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import decodeJWT from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { getUserByUserId } from "../reducers/userSlice";
import { logout } from "../reducers/authSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [image, setImage] = useState();

  let { token, isLoggedIn } = auth;
  if (!token) {
    token = localStorage.getItem("token");
  }
  //////////////////////////////

  useEffect(() => {
    if (token) {
      const { user } = decodeJWT(token);
      dispatch(getUserByUserId(user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  ////////////////////////////////
  const logoutHandler = () => {
    localStorage.removeItem("token");
    history.push("/login");
    dispatch(logout());
  };

  if (user.user && !!user.user.image) {
    const imageLink = user.user.image.split("/");
    const imageUrl = [imageLink[2], imageLink[3]].join("\\");
    console.log(imageUrl);
  }

  const authLinks = (
    <Fragment>
      {user && user.user && (
        <Link to="/myProfile" className="nav__el">
          <img
            src={`${process.env.REACT_APP_ASSESTS_URL}${user.user.image}`}
            alt={user.user.name.split(" ")[0]}
            className="nav__user-img"
          />
          <span>{user.user.name.split(" ")[0]}</span>
        </Link>
      )}
      <button onClick={logoutHandler} className="nav__el">
        Log out
      </button>
    </Fragment>
  );

  const publicLinks = (
    <Fragment>
      <Link className="nav__el" to="/login">
        Log In
      </Link>

      <Link className="nav__el nav__el--cta " to="/signup">
        Signup
      </Link>
    </Fragment>
  );

  return (
    <header className="header">
      <div className="heading__ham">
        <svg className="heading-box__ham">
          <use xlinkHref="../../img/icons.svg#icon-menu"></use>
        </svg>
      </div>
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">
          All tours
        </Link>
      </nav>
      <div className="header__logo">
        <img
          src={`${process.env.REACT_APP_ASSESTS_URL}img/logo-white.png`}
          alt="Natours logo"
        />
      </div>
      <nav className="nav nav--user">
        {user?.user && isLoggedIn ? authLinks : publicLinks}
      </nav>
    </header>
  );
};

export default Nav;
