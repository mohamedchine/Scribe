import { useParams, Link } from "react-router-dom";
import "./category.css";
import PostList from "../../components/posts/PostList";
import { useEffect } from "react";
import { usePostStore } from "../../stores&apicalls/postStore";
import {  useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { Oval } from "react-loader-spinner";

const Category = () => {
  const postsCate = usePostStore((state) => state.postsCate);
  const fetchPostsBasedOnCategory = usePostStore((state) => state.fetchPostsBasedOnCategory);
  const loadfetchingposts = usePostStore((state) => state.loadfetchingposts);
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    fetchPostsBasedOnCategory(category);
    window.scrollTo(0, 0);
  }, [category, fetchPostsBasedOnCategory]);
   
    if(loadfetchingposts){
        return(
            <div className="post-list post-list-loading">
                <Oval
                    height={50}
                    width={50}
                    color="blue"
                    ariaLabel="loading"
                />
            </div>
        )
    }
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
