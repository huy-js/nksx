import React from "react";
import { NavLink } from "react-router-dom";

// import classes from "./NavigationItem.css";

const navigationItem = (props) => (
  <li className="nav-item" role="presentation">
    <NavLink
      to={props.link}
      exact={props.exact}
    //   activeClassName={classes.active}
      className="nav-link"
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
