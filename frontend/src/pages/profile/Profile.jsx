import "./profile.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams,useNavigate } from "react-router-dom";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import PostItem from "../../components/posts/PostItem";
import { Oval } from "react-loader-spinner";
import { useProfileStore } from "../../stores&apicalls/profileStore";
import { useAuthStore } from "../../stores&apicalls/authStore";

const Profile = () => {
  const profile = useProfileStore((state) => state.profile);
  const loading = useProfileStore((state) => state.loading);
  const isProfileDeleted = useProfileStore((state) => state.isProfileDeleted);
  const getUserProfile = useProfileStore((state) => state.getUserProfile);
  const uploadProfilePhoto = useProfileStore((state) => state.uploadProfilePhoto);
  const deleteProfile = useProfileStore((state) => state.deleteProfile);
  
  const user = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getUserProfile(id);
    window.scrollTo(0, 0);
  }, [id, getUserProfile]);

  const navigate = useNavigate();
  useEffect(() => {
    if(isProfileDeleted) {
      navigate("/");
    }
  }, [isProfileDeleted, navigate]);

  // Form Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.warning("please select a picture!");

    const formData = new FormData();
    formData.append("pfp", file);

    await uploadProfilePhoto(formData);
    setFile(null);
  };

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        deleteProfile(user?._id);
        logoutUser();
      }
    });
  };

  if(loading.getpf) {
    return (
    <div className="profile-loader">
      <Oval
        height={120}
        width={120}
        color="#000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="grey"
        strokeWidth={3}
        strokeWidthSecondary={3}
        />
    </div>
  )}
  // if (file) {
  //   console.log(URL.createObjectURL(file));
  // }
  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePic?.url}
            alt=""
            className="profile-image"
          />
          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-card-image upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])} 
              />
              <button 
                className="upload-profile-photo-btn" 
                type="submit"
                disabled={loading.pfp}
              >
                {loading.pfp ? "Uploading..." : "upload"}
              </button>
            </form>
          )}
        </div>
        <h1 className="profile-username">{profile?.fullname}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {user?._id === profile?._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn"
          >
            <i className="bi bi-person-badge-fill"></i>
            Update Profile
          </button>
        )}
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.fullname.trim()} Posts</h2>
        {profile?.posts?.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            author={profile}
          />
        ))}
      </div>
      {user?._id === profile?._id && (
        <button onClick={deleteAccountHandler} className="delete-account-btn">
          Delete Your Account
        </button>
      )}
      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};

export default Profile;
