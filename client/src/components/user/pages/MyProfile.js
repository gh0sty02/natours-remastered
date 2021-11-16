import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";
import AccountSettings from "../components/AccountSettings";
import PasswordChange from "../components/PasswordChange";
import SideNav from "../components/SideNav";
import { useSelector, useDispatch } from "react-redux";
import { getUserByUserId } from "../../reducers/userSlice";

const MyProfile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = jwtDecode(token);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserByUserId(user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);
  return (
    <main className="main">
      <div className="user-view">
        <span className="heading__ham-profile">
          <svg className="heading-box__ham-profile">
            <use xlinkHref="../../img/icons.svg#icon-menu"></use>
          </svg>
        </span>
        <SideNav />
        <div className="user-view__content">
          {userState.user && <AccountSettings userId={user.id} />}
          <div className="line">&nbsp;</div>
          {userState.user && <PasswordChange userId={user.id} />}
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
