import PostList from "../../components/posts/PostList";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { usePost } from "../../contexts&apicalls/contexts/postContext";
import { usePostApi } from "../../contexts&apicalls/apiCalls/postApiCall";


const Home = () => {
 
  const { posts } = usePost();
  const { fetchPosts } = usePostApi();

  useEffect(() => {
    fetchPosts(1);
  }, []);

  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <div className="home-hero-content">
            <h1 className="home-title">Welcome to Scribe</h1>
            <p className="home-tagline">Your space to write, share, and discover.</p>
          </div>
        </div>
      </div>
      <div className="home-latest-post">Latest Posts</div>
      <div className="home-container">
        <PostList posts={posts} />
        <Sidebar />
      </div>
      <div className="home-see-posts-link">
        <Link to="/posts" className="home-link">
          See All Posts
        </Link>
      </div>
    </section>
  );
};

export default Home;
