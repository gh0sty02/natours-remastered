import React from "react";
import { Link } from "react-router-dom";

import { IoSettingsOutline, IoBriefcase, IoStar, IoMap } from "react-icons/io5";
import { GoCreditCard } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";

const SideNav = () => {
  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <li className="side-nav--active">
          <Link to="">
            <IoSettingsOutline />
            Settings
          </Link>
        </li>
        <li>
          <Link to="">
            <IoBriefcase />
            My bookings
          </Link>
        </li>
        <li>
          <Link to="">
            <IoStar />
            My reviews
          </Link>
        </li>
        <li>
          <Link to="">
            <GoCreditCard />
            Billing
          </Link>
        </li>
      </ul>
      <div className="admin-nav">
        <h5 className="admin-nav__heading">Admin</h5>
        <ul className="side-nav">
          <li>
            <Link to="">
              <IoMap />
              Manage tours
            </Link>
          </li>
          <li>
            <Link to="">
              <AiOutlineUser />
              Manage users
            </Link>
          </li>
          <li>
            <Link to="">
              <IoStar />
              Manage reviews
            </Link>
          </li>
          <li>
            <Link to="">
              <svg>
                <use xlinkHref="../../img/icons.svg#icon-briefcase"></use>
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideNav;
