import { Link } from "react-router-dom";

const PostItem = ({ post, author }) => {
    const authorData = author ?? post.author;
    const profileLink = `/profile/${authorData._id}`;
    const fullname = authorData.fullname.trim();

    return ( 
        <div className="post-item">
            <div className="post-item-image-wrapper">
                <img src={post?.photo?.url} alt="" className="post-item-image" />
            </div>
            <div className="post-item-info-wrapper">
                <div className="post-item-info">
                    <div className="post-item-author">
                        <strong>Author: </strong>
                        <Link 
                            className="post-item-username" 
                            to={profileLink}>
                            {fullname}
                        </Link>
                    </div>
                    <div className="post-item-date">
                        {new Date(post?.createdAt).toDateString()}
                    </div>
                </div>
                <div className="post-item-details">
                    <h4 className="post-item-title">{post?.title}</h4>
                    <Link 
                        className="post-item-category" 
                        to={`/posts/categories/${post?.category}`}>
                        {post?.category}
                    </Link>
                </div>
                <p className="post-item-description">
                    {post?.description}
                </p>
                <Link className="post-item-link" to={`/posts/details/${post?._id}`}>
                    Read More...
                </Link>
            </div>
        </div>
    );
}
 
export default PostItem;
