import api from "../../utils/api";
import { toast } from "react-toastify";
import { usePost } from "../contexts/postContext";
import { useProfile } from "../contexts/profileContext";



export const usePostApi = () => {
  const {
    setPosts,
    setPostsCount,
    setPostsCate,
    setLoading,
    setIsPostCreated,
    setPost,
    setLike,
    deletePost: deletePostFromState,
    setloadingpostimage,
    setloadfetchingposts
  } = usePost();

  const { profile, setProfile } = useProfile();

  // Fetch Posts Based On Page Number
  const fetchPosts = async (pageNumber) => {
    try {
      setloadfetchingposts(true);
      const { data } = await api.get(`/api/posts?pageNumber=${pageNumber}`);
      setPosts(data);
    } catch (error) {
      toast.error(error.response?.data?.message ||"failed to fetch posts");
    }
    finally{
      setloadfetchingposts(false);
    }
  };

  // Get Posts Count
  const getPostsCount = async () => {
    try {
      const { data } = await api.get(`/api/posts/count`);
      setPostsCount(data);
    } catch (error) {
      toast.error(error.response?.data?.message ||"failed to fetch posts count");
    }
  };

  // Fetch Posts Based On Category
  const fetchPostsBasedOnCategory = async (category) => {
    try {
      const { data } = await api.get(`/api/posts?category=${category}`);
      setPostsCate(data);
    } catch (error) {
      toast.error(error.response?.data?.message ||"failed to fetch posts based on this category");
    }
  };

  // Create Post
  const createPost = async (newPost) => {
    try {
      setLoading(true);
      await api.post(`/api/posts/createpost`, newPost, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      setLoading(false);

      setIsPostCreated(true);
      setTimeout(() => setIsPostCreated(false), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message ||"failed to create post");
      setLoading(false);
    }
  };

  // Fetch Single Post
  const fetchSinglePost = async (postId) => {
    try {
      const { data } = await api.get(`/api/posts/${postId}`);
      setPost(data);
    } catch (error) {
      toast.error(error.response?.data?.message ||"failed to fetch single post");
    }
  };

  // Toggle Like Post
  const toggleLikePost = async (postId) => {
    try {
      const { data } = await api.put(`/api/posts/like/${postId}`);
      setLike(data.likes);
      
    } catch (error) {
      toast.error(error.response?.data?.message ||"failed to toggle like post");
    }
  };

  // U
  const updatePostImage = async (newImage, postId) => {
    try {
      setloadingpostimage(true);
      const { data } = await api.post(`/api/posts/${postId}/update-image/`, newImage);
      if (data.post) {
        setPost((prev) => ({ ...prev, photo: data.post.photo }));
      }
      toast.success("New post image uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to update post image");
    }
    finally{
      setloadingpostimage(false);
    }
  };

  // Update Post
  const updatePost = async (newPost, postId) => {
    try {
      const { data } = await api.put(`/api/posts/${postId}`, newPost);
      setPost(data.newpost);
      toast.success("Post updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message ||"failed to update post");
    }
  };

  // Delete Post
  const deletePost = async (postId , ondone) => {
    try {
      const { data } = await api.delete(`/api/posts/${postId}`);
      deletePostFromState(data.postId);
      // Also remove from profile.posts if it exists
      if (profile && profile.posts) {
        setProfile((prev) => ({
          ...prev,
          posts: prev.posts.filter((p) => p._id !== postId),
        }));
      }
      
      toast.success("post has been deleted successfuly" , {autoClose:800 ,onClose :ondone });
    } catch (error) {
      toast.error(error.response?.data?.message ||"failed to delete post");
    }
  };

  // Get All Posts
  const getAllPosts = async () => {
    try {
      const { data } = await api.get(`/api/posts/`);
      setPosts(data);
    } catch (error) {
      toast.error(error.response?.data?.message ||"failed to get all posts");
    }
  };

  return {
    fetchPosts,
    getPostsCount,
    fetchPostsBasedOnCategory,
    createPost,
    fetchSinglePost,
    toggleLikePost,
    updatePostImage,
    updatePost,
    deletePost,
    getAllPosts,
  };
};

