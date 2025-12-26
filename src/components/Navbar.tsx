import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-teal-400 fixed-top z-30">
      <div className="container-fluid">
        <NavLink className="navbar-brand font-bold text-white" to="/">
          Buyora
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
