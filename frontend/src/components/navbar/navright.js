import { Link } from "react-router-dom";
const Naright = (props) => {
    return ( 
        <div className="navbar-right">
        <Link to ="/login">
        <div className="login">
            <div className="icon"><i class="bi bi-box-arrow-in-right"></i></div>
            <div className="text">Login</div>
        </div>
        </Link>
        <Link to ="/register">
        <div className="register">
            <div className="icon"><i class="bi bi-stars"></i></div>
            <div className="text">Register</div>
        </div>
        </Link>
    </div>
     );
}
 
export default Naright;