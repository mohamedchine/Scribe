import { Link } from "react-router-dom";
import AddCategoryForm from "./AddCategoryForm";
import { useEffect } from "react";
import { useCategoryStore } from "../../stores&apicalls/categoryStore";
import { useProfileStore } from "../../stores&apicalls/profileStore";
import { usePostStore } from "../../stores&apicalls/postStore";
import { useCommentStore } from "../../stores&apicalls/commentStore";


const AdminMain = () => {
    const categories = useCategoryStore((state) => state.categories);
    const usersCount = useProfileStore((state) => state.usersCount);
    const postsCount = usePostStore((state) => state.postsCount);
    const comments = useCommentStore((state) => state.comments);
    const fetchCategories = useCategoryStore((state) => state.fetchCategories);
    const getUsersCount = useProfileStore((state) => state.getUsersCount);
    const getPostsCount = usePostStore((state) => state.getPostsCount);
    const fetchAllComments = useCommentStore((state) => state.fetchAllComments);

    useEffect(() => {
     fetchCategories();
     getUsersCount();
     getPostsCount();
     fetchAllComments();
    }, [fetchCategories, getUsersCount, getPostsCount, fetchAllComments]);

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