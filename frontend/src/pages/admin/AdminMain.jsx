import { Link } from "react-router-dom";
import AddCategoryForm from "./AddCategoryForm";
import { useEffect } from "react";
import { useCategory } from "../../contexts&apicalls/contexts/categoryContext";
import { useProfile } from "../../contexts&apicalls/contexts/profileContext";
import { usePost } from "../../contexts&apicalls/contexts/postContext";
import { useComment } from "../../contexts&apicalls/contexts/commentContext";
import { useFetchCategories } from "../../contexts&apicalls/apiCalls/categoryApiCall";
import useProfileActions from "../../contexts&apicalls/apiCalls/profileApiCall";
import { usePostApi } from "../../contexts&apicalls/apiCalls/postApiCall";
import { useCommentApi } from "../../contexts&apicalls/apiCalls/commentApiCall";
import { useAuth } from "../../contexts&apicalls/contexts/authContext";

const AdminMain = () => {
    const { user } = useAuth();
    const { categories } = useCategory();
    const { usersCount } = useProfile();
    const { postsCount } = usePost();
    const { comments } = useComment();
    const fetchCategories = useFetchCategories();
    const { getUsersCount } = useProfileActions();
    const { getPostsCount } = usePostApi();
    const { fetchAllComments } = useCommentApi(user);

    useEffect(() => {
     fetchCategories();
     getUsersCount();
     getPostsCount();
     fetchAllComments();
    }, []);

    return ( 
        <div className="amdin-main">
            <div className="admin-main-header">
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Users</h5>
                    <div className="admin-card-count">
                        {usersCount}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link 
                         to="/admin-dashboard/users-table"
                         className="admin-card-link"
                        >
                           See all users
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-people-fill"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Posts</h5>
                    <div className="admin-card-count">
                        {postsCount}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link 
                         to="/admin-dashboard/posts-table"
                         className="admin-card-link"
                        >
                           See all posts
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-file-earmark-text-fill"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Categories</h5>
                    <div className="admin-card-count">
                        {categories.length}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link 
                         to="/admin-dashboard/categories-table"
                         className="admin-card-link"
                        >
                           See all categories
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-tags-fill"></i>
                        </div>
                    </div>
                </div>
                <div className="admin-main-card">
                    <h5 className="admin-card-title">Comments</h5>
                    <div className="admin-card-count">
                        {comments.length}
                    </div>
                    <div className="admin-card-link-wrapper">
                        <Link 
                         to="/admin-dashboard/comments-table"
                         className="admin-card-link"
                        >
                           See all comments
                        </Link>
                        <div className="admin-card-icon">
                            <i className="bi bi-chat-left-text-fill"></i>
                        </div>
                    </div>
                </div>
            </div>
            <AddCategoryForm />
        </div>
     );
}
 
export default AdminMain;