import React, { useEffect, useState } from "react";
import "../stylesheet/Navbar.css";
import { AuthenticationButton } from "../login-button/AuthenticationButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useEnv } from "../context/env.context";

export default function NavBar() {
  const { user, isAuthenticated } = useAuth0();
  const { audience } = useEnv();
  const role = `${audience}/roles`;
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    let url = window.location.href;
    let path = url.substring(url.lastIndexOf("0/") + 1, url.length);
    setCurrentPath(path);
  }, []);

  return (
    <>
      <header className="header fixed-top">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center">
            <img src="./logo.png" alt="logo" />
            <span>Reado</span>
          </a>

          <nav className="navbar">
            <ul>
              <li>
                <a
                  className={
                    currentPath === "/"
                      ? "nav-link scrollto active"
                      : "nav-link scrollto"
                  }
                  href="/"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className={
                    currentPath === "/rental"
                      ? "nav-link scrollto active"
                      : "nav-link scrollto"
                  }
                  href="/rental"
                >
                  Rental
                </a>
              </li>
              <li className="dropdown">
                <a
                  href="/blog"
                  className={currentPath === "/blog" ? "active" : ""}
                >
                  <span>Blog</span>{" "}
                </a>
                <ul>
                  <li>
                    <a href="/">Drop Down 1</a>
                  </li>
                  <li>
                    <a href="/">Drop Down 2</a>
                  </li>
                  <li>
                    <a href="/">Drop Down 3</a>
                  </li>
                  <li>
                    <a href="/">Drop Down 4</a>
                  </li>
                </ul>
              </li>
              {isAuthenticated ? (
                user[role].length !== 0 ? (
                  <li className="dropdown">
                    <a
                      href="/auth/admin/calendar"
                      className={
                        currentPath.includes("auth") ? "active" : "right"
                      }
                    >
                      {" "}
                      <img
                        src={user.picture}
                        className="profile-pic"
                        alt="profile-pic"
                      />{" "}
                    </a>
                    <ul>
                      <li>
                        <a href="/auth/admin/calendar">Calendar</a>
                      </li>
                      <li>
                        <a href="/auth/admin/addHouse">Add House</a>
                      </li>
                      <li>
                        <a href="/auth/admin/addRentalHouses">Add Rental</a>
                      </li>
                      <li>
                        <a href="/auth/admin/viewRentalHouses">
                          View Rental House
                        </a>
                      </li>
                      <li>
                        <a href="/auth/admin/viewUsers">View users</a>
                      </li>
                      <li>
                        <a href="/auth/admin/payments">Payments</a>
                      </li>
                      <AuthenticationButton />
                    </ul>
                  </li>
                ) : (
                  <li className="dropdown">
                    <a
                      href="/auth/profile"
                      className={
                        currentPath.includes("auth") ? "active" : "right"
                      }
                    >
                      {" "}
                      <img
                        src={user.picture}
                        className="profile-pic"
                        alt="profile-pic"
                      />{" "}
                    </a>
                    <ul>
                      <li>
                        <a href="/auth/profile">Profile</a>
                      </li>
                      <li>
                        <a href="/auth/calendar">Calendar</a>
                      </li>
                      <li>
                        <a href="/auth/ViewRentalHouses">My Rental</a>
                      </li>
                      <li>
                        <a href="/auth/payments">Payments</a>
                      </li>
                      <AuthenticationButton />
                    </ul>
                  </li>
                )
              ) : (
                <li className="nav-link scrollto">
                  <AuthenticationButton />
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
