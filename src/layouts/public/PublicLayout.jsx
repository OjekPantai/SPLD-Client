import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <header>Header PublicLayout</header>
      <Outlet />
      <footer>Footer PublicLayout</footer>
    </div>
  );
};

export default PublicLayout;
