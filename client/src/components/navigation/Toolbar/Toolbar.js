import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
// import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
//   <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
//     <div className="container">
//       <span className="navbar-brand logo">
//         <ul className="nav navbar-nav ml-auto">
//           <li className="nav-item" role="presentation">
//             <Link to={"/profile"} className="nav-link">
//               {this.props.currentUser.username}
//             </Link>
//           </li>
//         </ul>
//       </span>
//       <button
//         data-toggle="collapse"
//         className="navbar-toggler"
//         data-target="#navcol-1"
//       >
//         <span className="sr-only">Toggle navigation</span>
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navcol-1">
//         <ul className="nav navbar-nav ml-auto">
//           <li className="nav-item" role="presentation">
//             <Link to={"/"} className="nav-link">
//               Home
//             </Link>
//           </li>
//           <p style={{ display: this.props.display }}>
//             <ShowManage role={this.props.currentUser.role} />
//           </p>
//           <Show
//             resultLogin={this.props.isLogin}
//             name={this.props.currentUser.email}
//           />
//           <li
//             className="nav-item"
//             role="presentation"
//             style={{ display: this.props.displayRegister }}
//           >
//             <Link to={"/register"} className="nav-link">
//               Register
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </nav>
        <nav >
            <NavigationItems isLogin={props.isLogin} />
        </nav>
);

export default toolbar;
