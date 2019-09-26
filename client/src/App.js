import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/home";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Navbar from "./components/layouts/navbar/navbar";
import Dashboard from "./components/dashboard/dashboard";
import Alert from "./components/layouts/alert/alert";
import PrivateRoute from "./components/privateRoute/privateRoute";
import CreateProfile from "./components/profile/profile-forms/createProfile";
import EditProfile from "./components/profile/profile-forms/editProfile";
import ProfileView from "./components/profile/profile-view/profileView";
import { authenticateUser } from "./actions/auth";
import ProfileList from "./components/profile/profile-list/profileList";
import Posts from "./components/posts/post-list/Posts";
import CreatePost from "./components/posts/post-form/CreatePost";
import PostView from "./components/posts/post-view/PostView";
import Footer from "./components/layouts/footer/Footer";
import "./App.scss";

//redux store
import { Provider } from "react-redux";
import Store from "./store";

function App() {
  useEffect(() => {
    Store.dispatch(authenticateUser());
  }, []);

  return (
    <Provider store={Store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Home} />
          <section className="container section-wrapper">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/createProfile"
                component={CreateProfile}
              />
              <PrivateRoute exact path="/editProfile" component={EditProfile} />
              <PrivateRoute path="/profile" component={ProfileView} />
              <PrivateRoute exact path="/developers" component={ProfileList} />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/createPost" component={CreatePost} />
              <PrivateRoute exact path="/post/:id" component={PostView} />
            </Switch>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
