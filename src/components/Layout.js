import React from 'react';


const Layout = ({ children }) => {
  return (
    <div>
      {/* <header>
        <Link to="/">Home</Link>
        <Link to="/leads">Leads</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </header> */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
