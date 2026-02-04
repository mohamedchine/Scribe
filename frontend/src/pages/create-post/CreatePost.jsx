import { useState, useEffect } from "react";
import "./create-post.css";
import { useNavigate } from "react-router-dom";
import { Oval} from "react-loader-spinner";
import { usePost } from "../../contexts&apicalls/contexts/postContext";
import { useCategory } from "../../contexts&apicalls/contexts/categoryContext";
import { usePostApi } from "../../contexts&apicalls/apiCalls/postApiCall";
import { useFetchCategories } from "../../contexts&apicalls/apiCalls/categoryApiCall";


const CreatePost = () => {
  
  const { loading, isPostCreated } = usePost();
  const { categories } = useCategory();
  const { createPost } = usePostApi();
  const fetchCategories = useFetchCategories();
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
  }, [isPostCreated]);

  useEffect(() => {
    fetchCategories();
  }, []);

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
