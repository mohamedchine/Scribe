import { AuthProvider } from "./contexts/authContext";
import { CommentProvider } from "./contexts/commentContext";
import { CategoryProvider } from "./contexts/categoryContext";
import { PostProvider } from "./contexts/postContext";
import { ProfileProvider } from "./contexts/profileContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <PostProvider>
          <CommentProvider>
            <CategoryProvider>
                {children}
            </CategoryProvider>
          </CommentProvider>
        </PostProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default AppProvider;

