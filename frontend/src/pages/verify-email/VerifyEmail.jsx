import "./verify-email.css";
import { Link,useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../../stores&apicalls/authStore";

const VerifyEmail = () => {
  const isEmailVerified = useAuthStore((state) => state.isEmailVerified);
  const verifyEmail = useAuthStore((state) => state.verifyEmail);

  const { userId, token } = useParams();

  useEffect(() => {
    verifyEmail(userId, token);
  }, [userId, token, verifyEmail]);

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
