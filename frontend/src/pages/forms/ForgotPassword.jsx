import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./form.css";
import { useForgotPassword } from "../../contexts&apicalls/apiCalls/passwordApiCall";
import { Oval } from "react-loader-spinner";

const FrogotPassword = () => {
    const {forgotPassword,loading} = useForgotPassword();
    
    const [email, setEmail] = useState("");
    useEffect(()=>{
        document.body.classList.add("show");
       return ()=>{document.body.classList.remove("show");}
      },[])
    // Form Submit Handler
    const formSubmitHandler = async(e) => {
        e.preventDefault();
        if(email.trim() === "") return toast.error("Email is required");

        await forgotPassword(email);
    }


    return ( 
        <section className="form-container">
            <h1 className="form-title">Forgot Password</h1>
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
                <button className="form-btn" type="submit" disabled={loading}>
                        {loading ? <Oval color="#fff" height={12} width={12} /> : "Submit"}
                </button>
            </form>
        </section>
     );
}
 
export default FrogotPassword;