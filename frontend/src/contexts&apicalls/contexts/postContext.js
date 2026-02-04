import { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postsCount, setPostsCount] = useState(null);
  const [postsCate, setPostsCate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [post, setPost] = useState(null); // single post view
  const[loadingpostimg , setloadingpostimage] = useState(false);
  const [loadfetchingposts , setloadfetchingposts] = useState(false);
  // Like logic
  const setLike = (likes) => {
    if (post) {
      setPost((prev) => ({
        ...prev,
        likes,
      }));
    }
    
  };

  // Delete a post from posts array
  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  // Comment Handling inside a post
  const addCommentToPost = (comment) => {
    if (post) {
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, comment],
      }));
    }
  };

  const updateCommentPost = (updatedComment) => {
    if (post) {
      setPost((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c._id === updatedComment._id ? updatedComment : c
        ),
      }));
    }
  };

  const deleteCommentFromPost = (commentId) => {
    if (post) {
      setPost((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== commentId),
      }));
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        postsCount,
        setPostsCount,
        postsCate,
        setPostsCate,
        loading,
        setLoading,
        isPostCreated,
        setIsPostCreated,
        post,
        setPost,
        setLike,
        deletePost,
        addCommentToPost,
        updateCommentPost,
        deleteCommentFromPost,loadingpostimg,setloadingpostimage , loadfetchingposts,setloadfetchingposts
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);

