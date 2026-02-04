import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";
import { useAuthActions } from "../../contexts&apicalls/apiCalls/authApiCall";
import { Oval } from "react-loader-spinner";
import { useAuth } from "../../contexts&apicalls/contexts/authContext";
const Register = () => {
    useEffect(()=>{
        document.body.classList.add("show");
       return ()=>{document.body.classList.remove("show");}
      },[])
    const {registerUser} = useAuthActions();
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const {loading} = useAuth();
    const navigate = useNavigate();

    
    const formSubmitHandler = async(e) => {
        e.preventDefault();

        if (name.trim() === "") return toast.error("First name is required");
        if (lastname.trim() === "") return toast.error("Last name is required");
        
        if (email.trim() === "") return toast.error("Email is required");
        if (password.trim() === "") return toast.error("Password is required");

        await registerUser({ name, lastname, email, password },()=>navigate("/login"));
    };

    return (
        <section className="form-container">
            <h1 className="form-title">Create new account</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        id="name"
                        placeholder="Enter your first name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastname" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        id="lastname"
                        placeholder="Enter your last name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>

               
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-input"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-input"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="form-btn" type="submit" disabled={loading.register}>
                    {loading.register ? <Oval color="white" height={20} width={20} /> : "Register"}
                </button>
            </form>

            <div className="form-footer">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </section>
    );
};

export default Register;
