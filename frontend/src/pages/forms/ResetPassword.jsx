import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import "./form.css";
import { useParams } from "react-router-dom";

import {
  useGetResetPassword,
  useResetPassword,
} from "../../contexts&apicalls/apiCalls/passwordApiCall";
import { Oval } from "react-loader-spinner";

const ResetPassword = () => {
  
  const {getResetPassword,invalidlink,loadingv} = useGetResetPassword();
  const {resetPassword,loading} = useResetPassword();

  const [password, setPassword] = useState("");

  const { userId, token } = useParams();

  useEffect(() => {
    getResetPassword(userId, token);
  }, []);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");
    resetPassword(password, { userId, token });
  };

  if(loadingv){
    return <Oval color="blue" height={50} width={50} />
  }

  return (
    <section className="form-container">
      { invalidlink ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <h1 className="form-title">Reset Password</h1>
          <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="form-btn" type="submit" disabled={loading}>
              {loading ? <Oval color="white" height={20} width={20} /> : "Submit"}
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
