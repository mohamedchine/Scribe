import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./form.css";
import { useAuthActions } from "../../contexts&apicalls/apiCalls/authApiCall";
import { useAuth } from "../../contexts&apicalls/contexts/authContext";
import { Oval } from "react-loader-spinner";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loginUser} =useAuthActions();
    const {loading} = useAuth();
  useEffect(()=>{
    document.body.classList.add("show");
   return ()=>{document.body.classList.remove("show");}
  },[])
    // Form Submit Handler
    const formSubmitHandler = async(e) => {
        e.preventDefault();
        if(email.trim() === "") return toast.error("Email is required");
        if(password.trim() === "") return toast.error("Password is required");
        
        await loginUser({email , password});
    }


    return ( 
        <section className="form-container">
            <h1 className="form-title">Login to your account</h1>
            <form onSubmit={formSubmitHandler} className="form">
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
                <button className="form-btn" type="submit" disabled={loading.login}>
                    
                    {loading.login ? <Oval color="white" height={12} width={12} /> : "Login"} 
                </button>
            </form>
            <div className="form-footer">
                Did you forgot your password ? 
                <Link to="/forgot-password">Frogot Password</Link>
            </div>
        </section>
     );
}
 
export default Login;