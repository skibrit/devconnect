import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../../../actions/auth";
import "./navbar.scss";

const NavBar = ({ location, isAuthenticated, logout, isLoading }) => {
  const { pathname } = location;

  const memberLinks = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <i className="fas fa-user" />
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/developers" className="nav-link">
            <i className="fas fa-user-friends" />
            Developer
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link"
            onClick={e => {
              e.preventDefault();
              logout();
            }}
          >
            <i className="fas fa-sign-out-alt" />
            LogOut
          </Link>
        </li>
      </ul>
    );
  };

  const guestLinks = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <i className="fas fa-user-friends" />
            Developer
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <i className="fas fa-sign-in-alt" />
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            <i className="fas fa-user-friends" />
            Register
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <nav
      className={
        pathname === "/"
          ? "navbar navbar-expand-lg navbar-dark fixed-top nav-transparent"
          : "navbar navbar-expand-lg navbar-dark nav-fill"
      }
      id="mainNav"
    >
      <Link to="/" className="navbar-brand" href="#">
        <img
          className="nav-logo"
          src={require("../../../assets/images/connect.png")}
          alt="logo"
        />
        DevConnect
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse " id="navbarColor01">
        {!isLoading &&
          <Fragment>
            {isAuthenticated ? memberLinks() : guestLinks()}
          </Fragment>}
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authStates.isAuthenticated,
  isLoading: state.authStates.isLoading
});

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
