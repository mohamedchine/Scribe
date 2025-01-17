import Postitems from './postitems'
import './post.css'
const Postlist = ({posts}) => {
    return (  
        <div className="post-list">
            {posts.map(post=>{ return <Postitems post={post} />})}
        </div>
    );
}
 
export default Postlist;