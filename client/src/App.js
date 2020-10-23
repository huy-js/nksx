import React, { Component } from "react";
import {
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  withRouter,
} from "react-router-dom";

import Home from "./components/home/Home";
import Auth from "./components/login-register/Auth/Auth";
import Footer from "./components/navigation/footer/Footer";
import { connect } from "react-redux";
import { checkUserLogin } from "./trainRedux/action/auth"; // kiem tra dau vao ra result
import { checkLogin } from "./components/helpers/checkLogin"; // lay data checkUserLogin thuc thi chuyen nhanh'
import { authLogout } from "./trainRedux/action/auth";
import { authCheckState } from "./trainRedux/action/auth";

class App extends Component {
  componentDidMount() {
    this.props.checkUserLogin();
  }
  render() {
    let isLogin = this.props.isLogin;
    let role = this.props.role;
    console.log(this.props.displayRegister);
    let logButton;
    let showManage;
    if (isLogin) {
      logButton = <li className="nav-item" role="presentation">
        <NavLink to={"/"} className="nav-link" onClick={this.props.authLogout}>
          Logout
        </NavLink>
      </li>;
    } else {
      logButton = <li className="nav-item" role="presentation">
        <NavLink to={"/login"} className="nav-link">
          Login
        </NavLink>
      </li>;
    }

    switch (role) {
      case "admin":
        showManage = (
          <li className="nav-item" role="presentation">
            <Link to={"/list-user"} className="nav-link">
              LIST-USER
            </Link>
          </li>
        );
        break;
      case "customer":
        showManage = (
          <li className="nav-item" role="presentation">
            <Link to={"/manager-farmer"} className="nav-link">
              MANAGER-FARMER
            </Link>
          </li>
        );
        break;
      default:
        showManage = "";
    }

    return (
      <div>
        <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
          <div className="container">
            <span className="navbar-brand logo">
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item" role="presentation">
                  <Link to={"/profile"} className="nav-link">
                    {this.props.currentUser.username}
                  </Link>
                </li>
              </ul>
            </span>
            <button
              data-toggle="collapse"
              className="navbar-toggler"
              data-target="#navcol-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item" role="presentation">
                  <Link to={"/"} className="nav-link">
                    Home
                  </Link>
                </li>
                <p style={{ display: this.props.display }}>
                  {showManage}
                </p>
                {logButton}
                <li
                  className="nav-item"
                  role="presentation"
                  style={{ display: this.props.displayRegister }}
                >
                  <NavLink to={"/register"} className="nav-link">
                    Register
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route
            path="/login"
            component={() => ( this.props.isLogin ? <Redirect to="/" /> : <Auth />)}
          />
          <Route exact path="/" component={() => <Home />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
    isLogin: state.authReducer.isLogin,
    display: state.authReducer.display,
    displayRegister: state.authReducer.displayRegister,
    role : state.authReducer.currentUser.role
  };
};
const mapDispatchToProps = (dispatch) => ({
  checkUserLogin: () => dispatch(checkUserLogin()),
  authLogout: () => dispatch(authLogout()),
  // authCheckState: () => dispatch(authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
