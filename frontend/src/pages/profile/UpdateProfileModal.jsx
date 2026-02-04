import { useState } from "react";
import "./update-profile.css";
import useProfileActions from "../../contexts&apicalls/apiCalls/profileApiCall";
import { useProfile } from "../../contexts&apicalls/contexts/profileContext";

const UpdateProfileModal = ( { setUpdateProfile, profile } ) => {
   
    const { loading } = useProfile();
    const { updateProfile } = useProfileActions();

    const [name, setName] = useState(profile.name);
    const [lastname, setLastname] = useState(profile.lastname);
    const [bio, setBio] = useState(profile.bio);
    const [password, setPassword] = useState("");

    // Form Submit Handler
    const formSubmitHandler = async(e) => {
        e.preventDefault();
        
        const updatedUser = { name, lastname, bio }

        if(password.trim() !== "") {
            updatedUser.password = password;
        }
        try{
        await updateProfile(profile?._id, updatedUser);
        setUpdateProfile(false); //close only when the operation is successful
      }catch(e){

      }
    }

    return ( 
        <div className="update-profile">
            <form onSubmit={formSubmitHandler} className="update-profile-form">
                <abbr title="close">
                    <i 
                     onClick={() => setUpdateProfile(false)} 
                     className="bi bi-x-lg update-profile-form-close">
                    </i>
                </abbr>
                <h1 className="update-profile-title">Update Your Profile</h1>
                <input 
                  type="text" 
                  className="update-profile-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First Name"
                />
                <input 
                  type="text" 
                  className="update-profile-input"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Last Name"
                />
                <input 
                  type="text" 
                  className="update-profile-input"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Bio"
                />
                <input 
                  type="password" 
                  className="update-profile-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <button 
                    type="submit" 
                    className="update-profile-btn"
                    disabled={loading.pf}
                >
                    {loading.pf ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
     );
}
 
export default UpdateProfileModal;