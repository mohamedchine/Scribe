import { useProfile } from "../contexts/profileContext";
import { useAuth } from "../contexts/authContext";
import api from "../../utils/api";
import { toast } from "react-toastify";

const useProfileActions = () => {
  const {
    setProfile,
    setProfilePhoto,
    setLoading,
    markProfileDeleted,
    clearProfileDeleted,
    setUsersCount,
    setProfiles,
  } = useProfile();

  const { setUserPhoto ,setUser } = useAuth(); // auth context values


  // Get User Profile
  const getUserProfile = async (userId) => {
    try {
      setLoading((prev) => ({ ...prev, getpf: true }));
      const { data } = await api.get(`/api/users/profile/${userId}`);
      setProfile(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile.");
    } finally {
      setLoading((prev) => ({ ...prev, getpf: false }));
    }
  };

  // Upload Profile Photo
  const uploadProfilePhoto = async (newPhoto) => {
    try {
      setLoading((prev) => ({ ...prev, pfp: true }));
      const { data } = await api.post(
        `/api/users/uploadpfp`,
        newPhoto,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfilePhoto(data.profilePic);
      setUserPhoto(data.profilePic);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Photo upload failed.");
    } finally {
      setLoading((prev) => ({ ...prev, pfp: false }));
    }
  };

  // Update Profile
  const updateProfile = async (userId, profileData) => {
    try {
      setLoading((prev) => ({ ...prev, pf: true }));
      const { data } = await api.put(
        `/api/users/profile/${userId}`,
        profileData);

      // Backend returns {message, updatedUser}
      const updatedUser = data.updatedUser || data;
      setProfile(updatedUser);
      setUser(updatedUser); //in the auth context the current user
      toast.success(data.message || "Profile updated successfully");
      return { success: true, data };
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
      throw error; // Re-throw so the caller knows it failed
    } finally {
      setLoading((prev) => ({ ...prev, pf: false }));
    }
  };

  // Delete Profile (Account)
  const deleteProfile = async (userId) => {
    try {
      setLoading((prev) => ({ ...prev, delete: true }));
      const { data } = await api.delete(`/api/users/profile/${userId}`);

      markProfileDeleted();
      toast.success(data?.message);

      setTimeout(() => {
        clearProfileDeleted();
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Deletion failed.");
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  // Get Users Count (for admin dashboard)
  const getUsersCount = async () => {
    try {
      const { data } = await api.get(`/api/users/count`);

      setUsersCount(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch count.");
    }
  };

  // Get All Users Profile (for admin dashboard)
  const getAllUsersProfile = async () => {
    try {
      const { data } = await api.get(`/api/users/`);
      setProfiles(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profiles.");
    }
  };

  return {
    getUserProfile,
    uploadProfilePhoto,
    updateProfile,
    deleteProfile,
    getUsersCount,
    getAllUsersProfile,
  };
};

export default useProfileActions;

