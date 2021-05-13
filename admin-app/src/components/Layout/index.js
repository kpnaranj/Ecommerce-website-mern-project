import React from "react";
import Header from "../Header/index";

function Layout({ children }) {
  return (
    <React.Fragment>
      <Header />
      {children}
      <h1>Footer</h1>
    </React.Fragment>
  );
}

export default Layout;
