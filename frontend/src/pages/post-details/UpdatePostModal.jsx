import { useState, useEffect } from "react";
import "./update-post.css";
import { toast } from "react-toastify";
import { useFetchCategories } from "../../contexts&apicalls/apiCalls/categoryApiCall";
import { usePostApi } from "../../contexts&apicalls/apiCalls/postApiCall";
import { useCategory } from "../../contexts&apicalls/contexts/categoryContext";


const UpdatePostModal = ({ setUpdatePost, post }) => {
  
  const { categories } = useCategory();
  
  const { updatePost } = usePostApi();
  const fetchCategories = useFetchCategories();

  const [title, setTitle] = useState(post.title);
  const [desc, setDesc] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (desc.trim() === "")
      return toast.error("Post Desc is required");

    await updatePost({ title, category, desc }, post?._id);
    setUpdatePost(false);
  };
//redundant but if somoene directly enters category page from url
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="update-post">
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => setUpdatePost(false)}
            className="bi bi-x-lg update-post-form-close"
          ></i>
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input
          type="text"
          className="update-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="update-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          className="update-post-textarea"
          rows="5"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button type="submit" className="update-post-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
