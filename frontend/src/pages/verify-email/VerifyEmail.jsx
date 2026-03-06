import "./verify-email.css";
import { Link,useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../../stores&apicalls/authStore";
const VerifyEmail = () => {
  const { userId, token } = useParams();

  const verifyEmail = useAuthStore((state) => state.verifyEmail);
  const verifyStatus = useAuthStore((state) => state.verifyStatus);

  useEffect(() => {
    verifyEmail(userId, token);
  }, [userId, token]);

  if (verifyStatus == "loading") {
    return (
      <section className="verfiy-email">
        <h1>Verifying your email...</h1>
      </section>
    );
  }

  if (verifyStatus == "error") {
    return (
      <section className="verfiy-email">
        <h1 className="verify-email-not-found">
          Invalid or expired verification link
        </h1>
      </section>
    );
  }

  if (verifyStatus == "success") {
    return (
      <section className="verfiy-email">
        <i className="bi bi-patch-check-fill verify-email-icon"></i>
        <h1 className="verfiy-email-title">
          Your email address has been successfully verified
        </h1>
        <Link to="/login" className="verify-email-link">
          Go To Login Page
        </Link>
      </section>
    );
  }

  return null;
};

export default VerifyEmail;
