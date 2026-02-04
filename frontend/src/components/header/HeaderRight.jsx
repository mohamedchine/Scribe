import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts&apicalls/contexts/authContext";
import { useAuthActions } from "../../contexts&apicalls/apiCalls/authApiCall";

const HeaderRight = () => {
  const { user } = useAuth();
  const { logoutUser } = useAuthActions();
  const [dropdown, setDropdown] = useState(false);

  // Logout Handler
  const logoutHandler = () => {
    setDropdown(false);
    logoutUser();
  }

  return (
    <div className="header-right">
      {user ? (
        <>
          <div className="header-right-user-info">
            <span
              onClick={() => setDropdown((prev) => !prev)}
              className="header-right-username"
            >
              {user?.fullname.trim()}
            </span>
            <img
              onClick={() => setDropdown((prev) => !prev)}
              src={user?.profilePic?.url }
              alt="user photo"
              className="header-right-user-photo"
              style={{ cursor: "pointer" }}
            />
            {dropdown && (
              <div className="header-right-dropdown">
                <Link
                  to={`/profile/${user?._id}`}
                  className="header-dropdown-item"
                  onClick={() => setDropdown(false)}
                >
                  <i className="bi bi-person-circle"></i>
                  <span>Profile</span>
                </Link>
                <div onClick={logoutHandler} className="header-dropdown-item">
                  <i className="bi bi-power"></i>
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Link to="/login" className="header-right-link">
            <i className="bi bi-key-fill"></i>
            <span>Login</span>
          </Link>
          <Link to="/register" className="header-right-link">
            <i className="bi bi-person-plus-fill"></i>
            <span>Register</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
