import { Link } from "react-router-dom";
import { useAuth } from "../../contexts&apicalls/contexts/authContext";

const Navbar = ({ toggle, setToggle }) => {
  const { user } = useAuth();

  return (
    <nav
      style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="navbar"
    >
      <ul className="nav-links">
        <Link to="/" onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-house-door-fill"></i> Home
        </Link>
        <Link to="/posts" onClick={() => setToggle(false)} className="nav-link">
          <i className="bi bi-newspaper"></i> Posts
        </Link>
        {
          user && (
            <Link to="/posts/create-post" onClick={() => setToggle(false)} className="nav-link">
              <i className="bi bi-plus-circle-fill"></i> Create
           </Link>
          )
        }
        {
          user?.isAdmin && (
            <Link to="/admin-dashboard" onClick={() => setToggle(false)} className="nav-link">
             <i className="bi bi-gear-fill"></i> Admin Dashboard
           </Link>
          )
        }
      </ul>
    </nav>
  );
};

export default Navbar;
