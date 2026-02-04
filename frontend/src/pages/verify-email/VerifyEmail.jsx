import "./verify-email.css";
import { Link,useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts&apicalls/contexts/authContext";
import { useAuthActions } from "../../contexts&apicalls/apiCalls/authApiCall";

const VerifyEmail = () => {
  const { isEmailVerified } = useAuth();
  const { verifyEmail } = useAuthActions();

  const { userId, token } = useParams();

  useEffect(() => {
    verifyEmail(userId, token);
  }, [userId, token]);

  return (
    <section className="verfiy-email">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check-fill verify-email-icon"></i>
          <h1 className="verfiy-email-title">
            Your email address has been successfully verified
          </h1>
          <Link to="/login" className="verify-email-link">
            Go To Login Page
          </Link>
        </>
      ) : (
        <>
          <h1 className="verify-email-not-found">Not Found</h1>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
