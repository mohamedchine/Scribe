import { toast } from "react-toastify";
import api from "../../utils/api";

import { useState } from "react";
import { getRecaptchaToken } from "../../utils/recaptcha";
// Forgot Password
export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const recaptchatoken = await getRecaptchaToken("forgot password");
      const { data } = await api.post("/api/password/reset-password-link", { email, recaptchatoken });
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send reset link");
    } finally {
        setLoading(false);
    }
  };

  return {forgotPassword ,loading};
};

// Get Reset Password (Verify token)
export const useGetResetPassword = () => {
  const [invalidlink , setinvalidlink] = useState(false);
  const [loadingv, setLoadingv] = useState(true);
  const getResetPassword = async (userId, token) => {
    try {
      await api.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
      setinvalidlink(true); 
    }
    finally{
      setLoadingv(false);
    }
  };

  return {getResetPassword,invalidlink ,loadingv};
};

// Reset Password
export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const resetPassword = async (newPassword, user) => {
    try {
      setLoading(true);
      const { data } = await api.post(
        `/api/password/reset-password/${user.userId}/${user.token}`,
        { password: newPassword }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    }finally{
      setLoading(false);
    }
  };

  return{ resetPassword,loading};
};

