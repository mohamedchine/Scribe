import "./posts-page.css";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import { usePostStore } from "../../stores&apicalls/postStore";

const POST_PER_PAGE = 3;

const PostsPage = () => {
 
  const postsCount = usePostStore((state) => state.postsCount);
  const posts = usePostStore((state) => state.posts);
  const fetchPosts = usePostStore((state) => state.fetchPosts);
  const getPostsCount = usePostStore((state) => state.getPostsCount);

  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    fetchPosts(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage, fetchPosts]);

  useEffect(() => {
    getPostsCount();
  }, [getPostsCount]);

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar />
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PostsPage;
