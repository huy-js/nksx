import React from "react";

// import classes from './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className="nav navbar-nav ml-auto">
    <li className="nav-item" role="presentation">
      <NavigationItem link="/" exact>
        Farm Management
      </NavigationItem>
      {/* {props.isLogin ? (
        <NavigationItem link="/">Home</NavigationItem>
      ) : null} */}
      {/* {!props.isLogin ? (
        <NavigationItem link="/login">Authentication</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )} */}
      <NavigationItem link="/login">Authentication</NavigationItem>
    </li>
  </ul>
);

export default navigationItems;
