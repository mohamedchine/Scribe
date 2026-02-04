import { useParams, Link } from "react-router-dom";
import "./category.css";
import PostList from "../../components/posts/PostList";
import { useEffect } from "react";
import { usePost } from "../../contexts&apicalls/contexts/postContext";
import { usePostApi } from "../../contexts&apicalls/apiCalls/postApiCall";
import {  useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";


const Category = () => {
  const { postsCate } = usePost();
  const { fetchPostsBasedOnCategory } = usePostApi();
   const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    fetchPostsBasedOnCategory(category);
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="category">
      {postsCate.length === 0 ? (
        <>
          <h1 className="category-not-found">
            theres no post with <span>{category}</span> category 
          </h1>
          <Link onClick={() => navigate(-1)} className="category-not-found-link">
            Go Back 
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>
          <PostList posts={postsCate} />
        </>
      )}
    </section>
  );
};

export default Category;
