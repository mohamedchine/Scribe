import { toast } from "react-toastify";
import api from "../../utils/api";
import { useAuth } from "../contexts/authContext";
import {getRecaptchaToken} from "../../utils/recaptcha"
export function useAuthActions() {
  const {
    login,
    logout,
    setLoading,
    verifyEmail: setEmailVerified,

  } = useAuth();

  const loginUser = async (userData) => {
    try {
      setLoading(prev=>{return {...prev,login:true}});
      const recaptchatoken = await getRecaptchaToken("login") ; 
      const { data } = await api.post("/api/auth/login", {...userData,recaptchatoken});
      login(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
     
    }finally{
        setLoading(prev=>{return {...prev,login:false}});
    }
  };

  const logoutUser = async () => {
    try {
      await api.post("/api/auth/logout");
      logout();
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  const registerUser = async (userData,navlog) => {
    try {
      setLoading(prev=>({...prev,register:true}));
      const recaptchatoken = await getRecaptchaToken("register") ; 
      const { data } = await api.post("/api/auth/register", {...userData,recaptchatoken});
      toast.success(data.message , {onClose:navlog}) ; 
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(prev=>({...prev,register:false}));
    }
  };

  const verifyEmail = async (userId, token) => {
    try {
      await api.get(`/api/auth/${userId}/verify/${token}`);
      setEmailVerified();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Email verification failed";
      console.error(error);
      toast.error(errorMessage);
    }
  };

 

  return {
    loginUser,
    logoutUser,
    registerUser,
    verifyEmail,
  };
}

