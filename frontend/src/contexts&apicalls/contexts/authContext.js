import { createContext, useContext, useState, useEffect } from "react";
import api from "../../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState({checkauth:true});
  // check auth status from HTTPONLY cookie on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.post("/api/auth/check");
        setUser(data);
      } catch (err) {
       
      } finally {
        setLoading(prev=>{return {...prev,checkauth:false}});
      }
    };

    checkAuth();
  }, []);
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const setUserPhoto = (photoUrl) => {
    setUser((prev) => ({ ...prev, profilePic: photoUrl }));
  };

  const verifyEmail = () => {
    setIsEmailVerified(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isEmailVerified,
        loading,
        login,
        logout,
        setUserPhoto,
        verifyEmail,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

