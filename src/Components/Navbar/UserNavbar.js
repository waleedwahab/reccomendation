import React, { useState } from "react";
import styles from "./UserNavbar.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import NotificationsIcon from "@mui/icons-material/Notifications"; // Import the NotificationsIcon from MUI
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, userActions } from "./../Redux/user-slice";
import UserProfile from "../Authentication/userProfile";

function UserNavbar() {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false); // State for showing/hiding notifications

  const handleLogout = () => {
    dispatch(setUserInfo({}));
    navigate("/");
  };

  const handleNotificationsClick = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <>
      <div className={styles.Main}>
        <h3>Property Recommender</h3>
        <div className={styles.icons}>
          <span>Welcome, {user.name}!</span>
          <Link to="/userProfile">
            <PermIdentityIcon style={{ fontSize: "25px" }} />
          </Link>
          <div
            className={styles.notificationButton}
            onClick={handleNotificationsClick}
          >
            <NotificationsIcon className={styles.notificationIcon} />
            {user.unreadMessages > 0 && (
              <span className={styles.notificationCount}>
                {user.unreadMessages}
              </span>
            )}
          </div>
          <LogoutIcon className={styles.logout} onClick={handleLogout} />
        </div>
      </div>
      <div className={styles.subNavbar}>
        <NavLink
          style={{ textDecoration: "none" }}
          to="/UserDashboard"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Buy
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          to={"/Sell"}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Sell
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          to="/Rent"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Rent
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          to="/AboutUs"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          About US
        </NavLink>        <NavLink
          style={{ textDecoration: "none" }}
          to="/ContactUs"
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Contact US
        </NavLink>
      </div>
      {showNotifications && (
        <div className={styles.notificationDropdown}>
          <div className={styles.notificationItem}>
            <Link to="/messages">New message from John Doe</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default UserNavbar;
