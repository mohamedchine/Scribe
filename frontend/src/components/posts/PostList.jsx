import { usePost } from "../../contexts&apicalls/contexts/postContext";
import PostItem from "./PostItem";
import "./posts.css";
import { Oval } from "react-loader-spinner";
const PostList = ({ posts }) => {
    const {loadfetchingposts} = usePost();
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
    <div className="post-list">
        {posts.map(item => <PostItem post={item} key={item._id} />)}
    </div>
    );
}
 
export default PostList;