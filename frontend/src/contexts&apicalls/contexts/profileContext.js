// holds currently visited profile while the authcontext holds the currently logged user
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState({
    pfp: false,      // profile photo upload
    pf: false,       // profile update
    getpf: false,    // get profile
  });
  const [isProfileDeleted, setIsProfileDeleted] = useState(false);
  const [usersCount, setUsersCount] = useState(null);
  const [profiles, setProfiles] = useState([]);

  // Update profile photo only
  const setProfilePhoto = (photoUrl) => {
    if (profile) {
      setProfile((prev) => ({
        ...prev,
        profilePic: photoUrl,
      }));
    }
  };

  const markProfileDeleted = () => {
    setIsProfileDeleted(true);
    setLoading((prev) => ({ ...prev, delete: false }));
  };

  const clearProfileDeleted = () => {
    setIsProfileDeleted(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        setProfilePhoto,
        loading,
        setLoading,
        isProfileDeleted,
        markProfileDeleted,
        clearProfileDeleted,
        usersCount,
        setUsersCount,
        profiles,
        setProfiles,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

