import React, { Fragment } from "react";
import "./home.scss";
import LandingPage from "../landing/landing";
import Spinner from "../layouts/spinner/spinner";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Home = ({ isAuthenticated, isLoading, history }) => {
  return (
    <Fragment>
      {isLoading
        ? <Spinner />
        : !isAuthenticated ? <LandingPage /> : history.push("/dashboard")}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.authStates.isAuthenticated,
  isLoading: state.authStates.isLoading
});

export default connect(mapStateToProps, null)(withRouter(Home));
