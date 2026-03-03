import { useState, useEffect } from "react";
import "./create-post.css";
import { useNavigate } from "react-router-dom";
import { Oval} from "react-loader-spinner";
import { usePostStore } from "../../stores&apicalls/postStore";
import { useCategoryStore } from "../../stores&apicalls/categoryStore";


const CreatePost = () => {
  
  const loading = usePostStore((state) => state.loading);
  const isPostCreated = usePostStore((state) => state.isPostCreated);
  const createPost = usePostStore((state) => state.createPost);
  const categories = useCategoryStore((state) => state.categories);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  // Form Submit Handler
  const formSubmitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postpic", file);
    formData.append("title", title);
    formData.append("desc", description);
    formData.append("category", category);
    
    await createPost(formData);
    
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="create-post-input"
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
          className="create-post-textarea"
          rows="5"
          placeholder="Post Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          {loading ? (
           <Oval  
           height={14}
           width={14}
           color="#fafafa"
           
           />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
