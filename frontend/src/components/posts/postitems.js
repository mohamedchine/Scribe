import {Link} from "react-router-dom";
const Postitems = ({post}) => {
    return (
        <div className="post-items">
            <div className="post-author-wrapper">   
                <div className="post-author-img-wrapper">
                    <img src={post.user.image} alt={post.user.fullname} className="post-author-img"/>
                </div>
                <Link to={"/profile/" + post.user.userId}> 
                    <p className="post-author-fullname">
                        {post.user.fullname}
                    </p>
                </Link>
            </div>
            <div className="hor-line-post-items" ></div>
            <div className="post-text-wrapper">
                <p className="post-title">
                    {post.title}
                </p>
                <Link to={"/category/"+post.category} >
                <p className="post-category">
                    # {post.category}
                </p>
                </Link>
                <p className="post-description">
                    {post.description}
                </p>
                </div>
                <div className="post-image-wrapper">
                    <img src={post.image} alt={post.title} className="post-image" />
                </div>
                <div className="post-dateandlike">
                <p className="post-created-at">
                    {new Date(post.createdAt).toDateString()}
                </p>
                
                <p className="post-likes">
                {post.likes.length} likes
                </p>
                </div>
                
            
        </div>
    );
}
 
export default Postitems;