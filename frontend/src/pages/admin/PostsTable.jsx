import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect } from "react";
import { usePost } from "../../contexts&apicalls/contexts/postContext";
import { usePostApi } from "../../contexts&apicalls/apiCalls/postApiCall";


const PostsTable = () => {
   
    const { posts } = usePost();
    const { getAllPosts, deletePost } = usePostApi();

    useEffect(() => {
     getAllPosts();
    }, []);

  // Delete Post Handler
  const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletePost(postId);
      }
    });
  };

    return ( 
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Posts</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Post Title</th>
                            <th className="action-column">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts && posts.length > 0 ? posts.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img 
                                         src={item.author?.profilePic?.url}
                                         alt=""
                                         className="table-user-image"
                                        />
                                        <span className="table-username">
                                            {item.author?.fullname.trim()}
                                        </span>
                                    </div>
                                </td>
                                <td>{item.title}</td>
                                <td className="action-column">
                                    <div className="table-button-group">
                                        <button>
                                            <Link to={`/posts/details/${item._id}`}>
                                               View Post
                                            </Link>
                                        </button>
                                        <button onClick={() => deletePostHandler(item._id)}>
                                            Delete Post
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>No posts found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
     );
}
 
export default PostsTable;